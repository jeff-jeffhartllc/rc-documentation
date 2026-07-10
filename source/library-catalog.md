# Documentation Library Catalog

<div class="cover-meta">

**Document type:** Master index  
**Audience:** All client users  
**Status:** Draft — update as documents are added  
**Last updated:** 2026-07-10

</div>

Use this catalog as the entry point to the full PDF library. Paths below refer to files under `dist/` after running `npm run pdf:build`.

## Package overview

| Document | PDF path | Status |
| --- | --- | --- |
| Client handoff overview | `00-handoff-overview.pdf` | Draft |
| Library catalog (this document) | `library-catalog.pdf` | Draft |

## Shared documentation

| Document | PDF path | Status |
| --- | --- | --- |
| _No shared documents yet_ | `shared/` | Pending |

## App A (placeholder name)

Rename folder `apps/app-a` when the Domo app name is confirmed.

### Daily use

| Document | PDF path | Status |
| --- | --- | --- |
| App overview | `apps/app-a/daily-use/app-overview.pdf` | Draft |

### Maintenance

| Document | PDF path | Status |
| --- | --- | --- |
| _No maintenance documents yet_ | `apps/app-a/maintenance/` | Pending |

### Data sources

| Document | PDF path | Status |
| --- | --- | --- |
| _No data source documents yet_ | `apps/app-a/data-sources/` | Pending |

## App B (placeholder name)

Rename folder `apps/app-b` when the Domo app name is confirmed.

### Daily use

| Document | PDF path | Status |
| --- | --- | --- |
| App overview | `apps/app-b/daily-use/app-overview.pdf` | Draft |

### Maintenance

| Document | PDF path | Status |
| --- | --- | --- |
| _No maintenance documents yet_ | `apps/app-b/maintenance/` | Pending |

### Data sources

| Document | PDF path | Status |
| --- | --- | --- |
| _No data source documents yet_ | `apps/app-b/data-sources/` | Pending |

## Adding new documents

1. Create a Markdown file under the appropriate `source/` folder
2. Add a row to this catalog
3. Run `npm run pdf:build`
4. Verify the PDF under `dist/`

See [DOCUMENTATION_GUIDE.md](../DOCUMENTATION_GUIDE.md) for templates and the full coverage checklist.
