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
| `npm run build:all` | Full package (HTML books + Word books + README.txt) |
| `npm run delivery:build:clean` | Same as `build:all` |
| `npm run html:build:clean` | HTML only |
| `npm run docx:build:clean` | Legacy per-topic DOCX under `dist/` (optional) |

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

## Source layout

| Folder | Purpose |
| --- | --- |
| `source/apps/regis-app/` | Corporate app docs |
| `source/apps/regis-franchisee-app/` | Franchisee app docs |
| `source/shared/` | Cross-app platform docs |
| `source/delivery/` | Book intros and admin→user pointer pages |
| `source/_templates/` | Templates (not built) |

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

## Quality bar

Each topic should answer who, when, what steps, where in Domo, expected results, and what to do if something fails.

Avoid credentials and transient URLs. Reference Domo object names consistently.
