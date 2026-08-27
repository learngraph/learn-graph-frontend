# Graph website decisions

## Palette

- Preserve the current black, warm-white, and acid-green graph palette exactly as a named website palette.
- Do not overwrite it while exploring a blue-toned bridge to the LearnGraph app.
- If an app-related blue variation is explored, compare both palettes in the same interface and judge their structural roles—not preference from isolated color swatches.
- Keep the final palette token-driven and compact. This website does not need the app's full theme complexity.

### Named palette sets

- `green` remains the default and preserves the approved visual state: near-black, warm white, and nuclear lime (`212 255 57`).
- `blue` is an equivalent alternate system rather than a replacement: blue-black ground, mineral blue atmosphere (`42 78 108`), and neon cyan interaction (`103 246 255`).
- Palette changes happen only through graph-scoped semantic tokens. Components and interaction states do not contain palette-specific variants.
- During development, `?palette=blue` activates the alternate set; the absence of that parameter keeps `green`.

## Content addresses

- Public content has stable, human-readable paths such as `/about/why-learngraph` and `/platform/evidence`.
- `node` does not appear in public URLs because it describes the current interface, not the idea itself.
- Article copy lives in one file per topic under `src/content/nodes/`; graph topology and layout remain separate.
- A territory path such as `/about` opens that part of the graph. A topic path adds the focused article.
- Palette selection remains a query parameter, so `/about/why-learngraph?palette=blue` identifies the same content in the alternate visual system.
