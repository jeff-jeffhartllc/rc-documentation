# RC Documentation Library

Client handoff documentation for **REGIS APP** and **REGIS FRANCHISEE APP** on regiscorp.domo.com.

This repository is the **vendor authoring workspace**. The customer receives a **self-contained zip** — not this repo. Markdown lives under `source/`; the client package is built to `dist/delivery/`.

## Client deliverable

Each build produces:

```
dist/delivery/
  README.txt
  Regis-User-Guide.docx       ← editable Word book (operators)
  Regis-Admin-Guide.docx      ← editable Word book (admins)
  user-guide/
    index.html                ← linked HTML user guide
    topics/
    assets/
  admin-guide/
    index.html                ← linked HTML admin guide
    topics/
    assets/
```

Zip `dist/delivery/` and send to the client. They open HTML in a browser for navigation, or edit the two Word books locally.

## Build

```bash
npm install
npm run build:all
```

On Windows (PowerShell execution policy): use `npm.cmd run build:all` if `npm` is blocked.

| Command | Description |
| --- | --- |
| `npm run build:all` | Full client package (HTML + Word books + README) |
| `npm run delivery:build:clean` | Same as `build:all` |
| `npm run html:build:clean` | HTML books only |
| `npm run docx:build:clean` | Legacy per-topic DOCX under `dist/` (internal use) |

## Repository layout

```
source/                 Markdown source (canonical)
books/                  User vs admin guide manifests (topic order)
source/delivery/        Intro and pointer pages for the books
templates/html/         HTML stylesheet
scripts/                Build scripts
assets/                 Screenshots
```

## Two guides

| Guide | Audience | Contents |
| --- | --- | --- |
| **User Guide** | Operators, analysts | Daily use for both apps, glossary, getting help |
| **Admin Guide** | Admins, data owners | Handoff, PDP, datasets, dataflows, maintenance, runbooks; links to User Guide for daily use |

Book structure is defined in `books/user-guide.json` and `books/admin-guide.json`.

## For documentation authors

See [DOCUMENTATION_GUIDE.md](./DOCUMENTATION_GUIDE.md).

## Apps documented

| App | URL |
| --- | --- |
| REGIS APP | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| REGIS FRANCHISEE APP | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |
