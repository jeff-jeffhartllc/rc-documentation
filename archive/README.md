# Archive

This folder holds **internal exploration artifacts** from building the documentation library. Nothing here is required to build or deliver the client package.

You can ignore this folder for day-to-day work.

## Contents

| Folder | What it is |
| --- | --- |
| `exploration-scripts/` | One-off Puppeteer/API scripts used to capture PDP policies and dataflow schedules from Domo |
| `exploration-assets/` | Extra screenshots from exploration sessions (superseded by images in `assets/`) |
| `exploration-data/` | Raw JSON captures from API exploration |
| `legacy-build/` | Old per-topic DOCX builder (`build-docx.mjs`) — replaced by `npm run build:all` |

## Active repo (what you use)

```
source/          Markdown content (edit here)
books/           User Guide and Admin Guide topic lists
scripts/         build-delivery.mjs, build-html.mjs, build-book-docx.mjs
assets/          Screenshots referenced in the docs
templates/html/  HTML stylesheet
```

Build client package: `npm run build:all` → output in `dist/delivery/`
