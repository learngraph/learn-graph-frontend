#!/usr/bin/env python
import os
import json
import re
import sys
from google import genai

# Function to load the GEMINI_API_KEY from a .env file
def load_api_key_from_dotenv(filepath):
    try:
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                # Skip empty or comment lines
                if not line or line.startswith("#"):
                    continue
                if line.startswith("GEMINI_API_KEY="):
                    key = line.split("=", 1)[1].strip()
                    # Remove surrounding quotes if present
                    if key.startswith('"') and key.endswith('"'):
                        key = key[1:-1]
                    return key
    except Exception as e:
        raise Exception(f"Error reading {filepath}: {str(e)}")
    return None

def strip_code_blocks(text):
    """
    Remove any triple-backtick code block markers from the text.
    """
    return re.sub(r"```", "", text).lstrip("json\n ").strip()

def translate_content(content, target_language, client):
    """
    Build a translation prompt for the given content and target language, and call the Gemini API.
    Expects the response (with any code block markers removed) to be valid JSON.
    """
    # Construct a prompt asking the model to translate the JSON content
    prompt = (
        f"Translate the following JSON into {target_language} language. "
        "Ensure that the output is valid JSON with exactly the same structure as the input, "
        "and do not include any markdown formatting or code block markers.\n"
        "The json structure is a single object like this, with potentially nested objects & lists:\n"
        "{\n"
        "   \"key\": \"value\",\n"
        "   \"key2\": {\n"
        "       \"potentially multiple nested objects\": \"value\"\n"
        "   }\n"
        "}\n\n"
        f"JSON input:\n```\n{json.dumps(content, ensure_ascii=False)}\n```\n"
    )
    
    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash-preview-04-17",
            #model="gemini-2.0-flash",
            contents=prompt,
        )
    except Exception as e:
        raise Exception(f"API call failed for {target_language}: {str(e)}")
    
    # Remove any code block markers from the response text
    cleaned_response = strip_code_blocks(response.text)
    
    try:
        translated_json = json.loads(cleaned_response)
    except json.JSONDecodeError as e:
        raise Exception(
            f"JSON decoding error for '{target_language}': {str(e)}. "
            f"Response received: {cleaned_response}"
        )
    
    return translated_json

def main():
    # Load the GEMINI_API_KEY from .env
    api_key = load_api_key_from_dotenv(".env")
    if not api_key:
        print("Error: GEMINI_API_KEY not found in .env file.")
        sys.exit(1)

    # Initialize the GenAI client with the API key
    client = genai.Client(api_key=api_key)
    
    path = "./src/shared"
    # Mapping target languages to their output files (based on i18n.ts)
    TARGET_LANGUAGES = [
        ["de", {"language": "German", "output_file": f"{path}/i18n/German.json"}],
        ["zh", {"language": "Chinese Traditional", "output_file": f"{path}/i18n/Chinese Traditional.json"}],
        ["es", {"language": "Spanish", "output_file": f"{path}/i18n/Spanish.json"}],
        ["it", {"language": "Italian", "output_file": f"{path}/i18n/Italian.json"}],
    ]
    
    # Load the source i18n.json file (see :contentReference[oaicite:2]{index=2})
    try:
        with open(f"{path}/i18n.json", "r", encoding="utf-8") as f:
            source_data = json.load(f)
    except Exception as e:
        print(f"Error reading i18n.json: {str(e)}")
        sys.exit(1)
    
    # Process translation for each target language
    for lang_code, details in TARGET_LANGUAGES:
        print(f"Translating content to {details['language']}...")
        try:
            translated_content = translate_content(source_data, details["language"], client)
        except Exception as e:
            print(f"Translation failed for {details['language']}: {str(e)}")
            sys.exit(1)
        
        # Validate the translated JSON and write it to the respective file
        try:
            with open(details["output_file"], "w", encoding="utf-8") as out_file:
                json.dump(translated_content, out_file, ensure_ascii=False, indent=2)
            print(f"Translation for {details['language']} written successfully to {details['output_file']}")
        except Exception as e:
            print(f"Error writing file {details['output_file']}: {str(e)}")
            sys.exit(1)

if __name__ == "__main__":
    main()
