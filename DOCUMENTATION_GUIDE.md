# Documentation Authoring Guide

This guide is for vendors and authors who maintain this library. **Customers receive the built package in `dist/delivery/`**, not this repository.

## Goal

Produce a **complete client handoff package** with:

1. **User Guide** — daily use for operators (HTML + Word)
2. **Admin Guide** — platform, data, PDP, maintenance (HTML + Word)

## Build the client package

```bash
npm install
npm run build:all
```

Output: `dist/delivery/` — zip this folder for the client.

| Command | Output |
| --- | --- |
| `npm run build:all` | Full client package in `dist/delivery/` |

## Two apps, one library

| App | Folder | URL |
| --- | --- | --- |
| **REGIS APP** | `source/apps/regis-app/` | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| **REGIS FRANCHISEE APP** | `source/apps/regis-franchisee-app/` | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |

REGIS FRANCHISEE APP is a **subset** of REGIS APP with **Personalized Data Permissions (PDP)** that limits each franchisee user to their own stores. Document this relationship in `source/shared/regis-app-relationship.md`.

Use `source/shared/` for cross-app documentation (PDP behavior, shared datasets, governance, glossary, etc.).

## Book structure

Topic order and inclusion are defined in:

- `books/user-guide.json` — daily use topics only
- `books/admin-guide.json` — admin topics; daily use links to User Guide

Intro and pointer pages live in `source/delivery/`.

When adding a new document:

1. Create Markdown under `source/`
2. Add the topic to the appropriate book manifest (user and/or admin)
3. Run `npm run build:all`
4. Verify HTML links and Word book sections

## Required document categories

Each app should include documents in these folders:

| Folder | Purpose | Examples |
| --- | --- | --- |
| `daily-use/` | End-user and operator workflows | Navigation, filters, exports, scheduled reports |
| `maintenance/` | How to keep the app healthy | Card/page changes, Beast Mode edits, access management |
| `data-sources/` | Source-of-truth for data | Datasets, dataflows, refresh schedules, field definitions |

Also maintain:

| File | Purpose |
| --- | --- |
| `source/00-handoff-overview.md` | Executive summary and how to use the library |
| `source/library-catalog.md` | Master index of source topics |
| `source/shared/` | Cross-app platform, governance, and glossary docs |

## Templates

Copy from `source/_templates/` when creating new documents:

| Template | Use for |
| --- | --- |
| `daily-use-guide.md` | Page/card walkthroughs and user procedures |
| `maintenance-guide.md` | Change management and app upkeep |
| `data-source-guide.md` | Dataset and pipeline documentation |
| `runbook.md` | Step-by-step operational procedures |
| `troubleshooting-guide.md` | Symptom → cause → fix reference |

Templates are **not** exported to the client package. Remove placeholder text before marking a document complete.

## Authoring rules

1. **One topic per file** — lowercase, hyphen-separated filenames
2. **Include metadata** at the top of each doc (app name, audience, last reviewed date, owner)
3. **Screenshots** — use `![description](../../assets/...)` and add images under `assets/`
4. **Be actionable** — numbered steps, expected outcomes, and failure handling
5. **Update manifests** — add every new topic to `books/user-guide.json` and/or `books/admin-guide.json`

## Customer editing (no repo access)

Customers edit **`Regis-User-Guide.docx`** or **`Regis-Admin-Guide.docx`** locally, or browse **`user-guide/index.html`** / **`admin-guide/index.html`**.

When you ship updates, send a new zip; they merge Word edits or maintain a local addendum. See `README.txt` in the delivery package.

## Coverage checklist

### User Guide

- [ ] REGIS APP daily-use guides (all pages)
- [ ] REGIS FRANCHISEE APP daily-use guides
- [ ] Glossary and getting help

### Admin Guide

- [ ] Handoff overview and app relationship
- [ ] Domo access, escalation, datasets, dataflows
- [ ] PDP overview and policy inventory
- [ ] User roles and maintenance for both apps
- [ ] Runbooks and troubleshooting
- [ ] Pointer to User Guide (no duplicate daily-use content)

### Shared / cross-app

- [ ] Domo instance access notes
- [ ] Shared datasets between REGIS APP and REGIS FRANCHISEE APP
- [ ] PDP rules, testing, and franchisee access troubleshooting
- [ ] Escalation contacts and support boundaries
- [ ] Glossary of business terms and calculated fields

## Suggested workflow for exploration

1. Inventory both apps on regiscorp.domo.com (pages, cards, datasets, dataflows, schedules, roles, PDP rules)
2. Map which REGIS APP pages/cards appear in REGIS FRANCHISEE APP
3. Create overview docs first, then daily-use, then maintenance, then data-sources
4. Expand `source/shared/regis-app-relationship.md` with PDP and shared-dataset detail
5. Update book manifests, `library-catalog.md`, and `00-handoff-overview.md`
6. Run `npm run build:all` and QA HTML and Word books in `dist/delivery/`

## Quality bar

Each topic should answer who, when, what steps, where in Domo, expected results, and what to do if something fails.

Avoid credentials and transient URLs. Reference Domo object names consistently.
