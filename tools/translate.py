#!/usr/bin/env python
import os
import json
import re
import sys
import time
import logging
from typing import Dict, Any, List, Tuple
from google import genai

# Custom exception for JSON parsing failures after retries
class JSONTranslationError(Exception):
    """Raised when translation result cannot be parsed into JSON after retries."""
    pass

# Configure logging
def setup_logging(level=logging.INFO):
    logging.basicConfig(level=level)
    return logging.getLogger(__name__)

# Load GEMINI_API_KEY from .env file
def get_api_key(env_path: str = ".env") -> str:
    try:
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                if line.strip().startswith("GEMINI_API_KEY="):
                    return line.split("=", 1)[1].strip().strip('"')
    except Exception as e:
        raise Exception(f"Error reading {env_path}: {e}")
    raise Exception("GEMINI_API_KEY not found in .env file.")

# Remove triple-backtick markers from API response
def strip_code_blocks(text: str) -> str:
    return re.sub(r"```", "", text).lstrip("json\n ").strip()

# Call Gemini API and parse JSON with retry
def translate_chunk(
    data: Dict[str, Any], language: str, client: Any, chunk_index: int, retries: int = 2
) -> Dict[str, Any]:
    prompt = (
        f"Translate the following JSON into {language}. "
        "Output must be valid JSON matching the input structure, with no markdown or code fences.\n"
        f"JSON input:\n```\n{json.dumps(data, ensure_ascii=False)}\n```\n"
    )

    for attempt in range(retries + 1):
        try:
            logger.info(f"Translating {language} (chunk {chunk_index} attempt {attempt+1}/{retries+1})")
            resp = client.models.generate_content(
                model="gemini-2.0-flash",
                contents=prompt,
            )
            cleaned = strip_code_blocks(resp.text)
            return json.loads(cleaned)

        except json.JSONDecodeError as e:
            logger.warning(
                f"JSON decode error for {language}, attempt {attempt+1}: {e}\nResponse: {cleaned}"
            )
            if attempt < retries:
                time.sleep(2 ** attempt)
            else:
                raise JSONTranslationError(
                    f"Could not parse JSON for {language} after {retries+1} attempts"
                )

# Bin-packing by byte-size: split keys into roughly N bins
def split_keys_by_size(data: Dict[str, Any], num_bins: int) -> List[List[str]]:
    # Compute size of each key's JSON payload
    sizes = [(k, len(json.dumps({k: data[k]}, ensure_ascii=False))) for k in data]
    total_size = sum(size for _, size in sizes)
    target = total_size / max(1, num_bins)

    chunks: List[List[str]] = []
    current_chunk: List[str] = []
    current_size = 0

    for key, size in sizes:
        # If adding this key exceeds target and chunk is non-empty, start a new chunk
        if current_chunk and (current_size + size) > target:
            chunks.append(current_chunk)
            current_chunk = []
            current_size = 0
        current_chunk.append(key)
        current_size += size

    # Append any remaining keys
    if current_chunk:
        chunks.append(current_chunk)

    return chunks

# Process translation for one language using size-based chunks
def translate_language(
    source: Dict[str, Any], language: str, output_path: str,
    client: Any, num_bins: int
) -> None:
    combined: Dict[str, Any] = {}
    chunks = split_keys_by_size(source, num_bins)
    if len(chunks) > 1:
        logger.info(f"Translating in {len(chunks)} size-based bins (target {num_bins})")

    for idx, key_list in enumerate(chunks, 1):
        chunk_data = {k: source[k] for k in key_list}
        translated = translate_chunk(chunk_data, language, client, idx)
        combined.update(translated)
        if len(chunks) > 1:
            logger.info(f"Completed bin {idx}/{len(chunks)} for {language}")

    tmp_file = output_path + ".tmp"
    with open(tmp_file, "w", encoding="utf-8") as f:
        json.dump(combined, f, ensure_ascii=False, indent=2)
    os.replace(tmp_file, output_path)
    logger.info(f"Wrote translated file to {output_path}")

# Entry point
def main():
    global logger
    logger = setup_logging()

    api_key = get_api_key()
    client = genai.Client(api_key=api_key)

    path = "./src/shared"
    # Desired number of bins for translation payload balance
    num_bins = int(os.getenv("JSON_CHUNK_BINS", 5))
    i18n_file = os.path.join(path, "i18n.json")

    languages: List[Tuple[str, Dict[str, str]]] = [
        ("de", {"name": "German", "path": f"{path}/i18n/German.json"}),
        ("zh", {"name": "Chinese Traditional", "path": f"{path}/i18n/Chinese Traditional.json"}),
        ("es", {"name": "Spanish", "path": f"{path}/i18n/Spanish.json"}),
        ("it", {"name": "Italian", "path": f"{path}/i18n/Italian.json"}),
        ("ar", {"name": "Arabic", "path": f"{path}/i18n/Arabic.json"}),
    ]

    try:
        with open(i18n_file, "r", encoding="utf-8") as f:
            source_data = json.load(f)
    except Exception as e:
        logger.error(f"Failed to read source JSON: {e}")
        sys.exit(1)

    for code, info in languages:
        try:
            logger.info(f"Starting translation to {info['name']}")
            translate_language(
                source_data, info['name'], info['path'], client, num_bins
            )
        except JSONTranslationError as e:
            logger.error(e)
            sys.exit(1)
        except Exception as e:
            logger.error(f"Error translating {info['name']}: {e}")
            sys.exit(1)

if __name__ == "__main__":
    main()
