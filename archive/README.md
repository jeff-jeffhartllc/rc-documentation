# Archive

Internal exploration and superseded build tooling. **Not required** to build or deliver the client package.

| Path | What it is |
| --- | --- |
| `exploration-scripts/` | One-off Domo PDP/dataflow capture scripts |
| `exploration-assets/` | Extra exploration screenshots |
| `exploration-data/` | Raw API JSON captures |
| `legacy-build/` | Old per-topic DOCX builder |
| `legacy-html/` | Obsolete linked-HTML delivery (replaced by two Word guides) |

## What you use

```
source/     → Markdown (vendor build input)
books/      → Topic order for each Word guide
assets/     → Screenshots
scripts/    → build-delivery.mjs → two .docx files
```

`npm run build:all` → `dist/delivery/Regis-User-Guide.docx` + `Regis-Admin-Guide.docx`
