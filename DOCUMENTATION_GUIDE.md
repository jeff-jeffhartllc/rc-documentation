# Documentation Authoring Guide

This guide is for agents and authors who explore the Domo apps and populate this library.

## Goal

Produce a **complete client handoff library** so the client can:

1. Use both Domo apps confidently in daily operations
2. Maintain the apps and their data sources without vendor dependency
3. Troubleshoot common issues and know when to escalate

Deliverables are **PDF-first**. Author in Markdown under `source/`; run `npm run pdf:build` to generate PDFs in `dist/`.

## Two apps, one library

Document these Domo apps under:

| App | Folder | URL |
| --- | --- | --- |
| **REGIS APP** | `source/apps/regis-app/` | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| **REGIS FRANCHISEE APP** | `source/apps/regis-franchisee-app/` | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |

REGIS FRANCHISEE APP is a **subset** of REGIS APP with **Personalized Data Permissions (PDP)** that limits each franchisee user to their own stores. Document this relationship in `source/shared/regis-app-relationship.md` and reference it from both app doc sets.

Use `source/shared/` for cross-app documentation (PDP behavior, shared datasets, governance, glossary, etc.).

## Required document categories

Each app should include documents in these folders:

| Folder | Purpose | Examples |
| --- | --- | --- |
| `daily-use/` | End-user and operator workflows | Navigation, filters, exports, scheduled reports, role-based views |
| `maintenance/` | How to keep the app healthy | Card/page changes, Beast Mode edits, access management, release checklist |
| `data-sources/` | Source-of-truth for data | Connectors, datasets, Magic ETL/dataflows, refresh schedules, field definitions |

Also maintain these top-level documents:

| File | Purpose |
| --- | --- |
| `source/00-handoff-overview.md` | Executive summary and how to use the library |
| `source/library-catalog.md` | Master index with links to every document |
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

Templates are **not** exported to PDF. Remove template placeholder text before marking a document complete.

## Authoring rules

1. **One topic per file** — e.g. `daily-use/sales-dashboard-overview.md`, not one giant file
2. **Use clear filenames** — lowercase, hyphen-separated, descriptive
3. **Include metadata** at the top of each doc (app name, audience, last reviewed date, owner)
4. **Screenshot placeholders** — use `![description](../assets/...)` and add images under `assets/`
5. **Be actionable** — numbered steps, expected outcomes, and “what to do if this fails”
6. **Update the catalog** — add every new document to `source/library-catalog.md`

## Coverage checklist

Before handoff, confirm the library includes at least:

### Per app

- [ ] App overview and business purpose
- [ ] User roles and permissions model
- [ ] Page/card inventory with daily-use guides
- [ ] Export and sharing procedures
- [ ] Maintenance ownership and change process
- [ ] Dataset inventory with refresh schedules
- [ ] Dataflow / ETL documentation with upstream/downstream lineage
- [ ] Field dictionary or data dictionary for key datasets
- [ ] Troubleshooting guide for common failures
- [ ] Runbook for refresh failures and access issues

### Shared / cross-app

- [ ] Domo instance access and SSO notes
- [ ] Shared datasets between REGIS APP and REGIS FRANCHISEE APP
- [ ] PDP rules, testing, and franchisee access troubleshooting
- [ ] Naming conventions and environment notes (prod vs sandbox)
- [ ] Escalation contacts and support boundaries
- [ ] Glossary of business terms and calculated fields

## Building PDFs

```bash
npm install
npm run pdf:build
```

While authoring:

```bash
npm run pdf:watch
```

Review output under `dist/` before client delivery. Fix formatting issues in the Markdown or `assets/pdf-style.css`.

## Suggested workflow for the exploration agent

1. Inventory both apps on regiscorp.domo.com (pages, cards, datasets, dataflows, schedules, roles, PDP rules)
2. Map which REGIS APP pages/cards appear in REGIS FRANCHISEE APP
3. Create overview docs first, then daily-use, then maintenance, then data-sources
4. Expand `source/shared/regis-app-relationship.md` with PDP and shared-dataset detail
5. Update `library-catalog.md` and `00-handoff-overview.md`
6. Run `npm run pdf:build:clean` and QA every PDF in `dist/`

## Quality bar

Each document should answer:

- **Who** is this for?
- **When** do they use it?
- **What** steps do they follow?
- **Where** in Domo do they click?
- **What** should they expect to see?
- **What** do they do if something goes wrong?

Avoid internal-only notes, credentials, or transient URLs. Reference Domo object names consistently so the client can search for them in the platform.
