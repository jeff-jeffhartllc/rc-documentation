# RC Documentation Library

Client handoff documentation for **REGIS APP** and **REGIS FRANCHISEE APP** on regiscorp.domo.com, built for self-maintenance.

This repository is the **authoring workspace** and **PDF library** for that handoff. Markdown lives under `source/`; generated PDFs are written to `dist/` for delivery to the client.

## Purpose

Provide a complete, ready-to-use document library covering:

- **Daily use** — how client teams operate the apps day to day
- **Maintenance** — how to update, troubleshoot, and extend the apps
- **Data sources** — lineage, refresh behavior, ownership, and change procedures

Documents are authored in Markdown and exported primarily as **PDFs**.

## Repository layout

```
source/
  00-handoff-overview.md          # Start here — handoff package overview
  library-catalog.md              # Master index of all documents
  shared/                         # Cross-app documentation
  apps/
    regis-app/                    # REGIS APP (corporate)
      daily-use/
      maintenance/
      data-sources/
    regis-franchisee-app/         # REGIS FRANCHISEE APP (PDP-limited subset)
      daily-use/
      maintenance/
      data-sources/
  _templates/                     # Copy these when creating new docs (not built to PDF)

dist/                             # Generated PDF library (mirrors source/ structure)
assets/                           # Images, logos, PDF styling
scripts/build-pdfs.mjs            # Batch PDF builder
```

## Development setup

```bash
npm install
npm run pdf:build
```

Generated PDFs appear under `dist/` with the same folder structure as `source/`.

### Commands

| Command | Description |
| --- | --- |
| `npm run pdf:build` | Build all PDFs from `source/` into `dist/` |
| `npm run pdf:build:clean` | Delete `dist/` and rebuild all PDFs |
| `npm run pdf:watch` | Rebuild PDFs when markdown files change |

## For documentation authors

See [DOCUMENTATION_GUIDE.md](./DOCUMENTATION_GUIDE.md) for:

- Required document types and coverage checklist
- Naming conventions and folder rules
- Template usage
- PDF build workflow

## Client delivery

When the library is complete, deliver the contents of `dist/` (or a packaged zip of that folder) to the client. `library-catalog.pdf` is the recommended entry point.

## Apps documented

| App | Folder | URL |
| --- | --- | --- |
| REGIS APP | `source/apps/regis-app/` | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| REGIS FRANCHISEE APP | `source/apps/regis-franchisee-app/` | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |

REGIS FRANCHISEE APP is a subset of REGIS APP with Personalized Data Permissions (PDP) applied so franchisee users see only their own stores. See `source/shared/regis-app-relationship.md`.
