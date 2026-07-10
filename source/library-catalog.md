# Documentation Library Catalog

<div class="cover-meta">

**Document type:** Master index  
**Audience:** All client users  
**Domo instance:** https://regiscorp.domo.com  
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
| REGIS APP and REGIS FRANCHISEE APP — relationship guide | `shared/regis-app-relationship.pdf` | Draft |

## REGIS APP

**Corporate application** — full organizational view  
**URL:** https://regiscorp.domo.com/app-studio/183500481/pages/925282956

### Daily use

| Document | PDF path | Status |
| --- | --- | --- |
| App overview | `apps/regis-app/daily-use/app-overview.pdf` | Draft |

### Maintenance

| Document | PDF path | Status |
| --- | --- | --- |
| _No maintenance documents yet_ | `apps/regis-app/maintenance/` | Pending |

### Data sources

| Document | PDF path | Status |
| --- | --- | --- |
| _No data source documents yet_ | `apps/regis-app/data-sources/` | Pending |

## REGIS FRANCHISEE APP

**Franchisee application** — subset of REGIS APP with PDP limiting view to a franchisee's stores  
**URL:** https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822

### Daily use

| Document | PDF path | Status |
| --- | --- | --- |
| App overview | `apps/regis-franchisee-app/daily-use/app-overview.pdf` | Draft |

### Maintenance

| Document | PDF path | Status |
| --- | --- | --- |
| _No maintenance documents yet_ | `apps/regis-franchisee-app/maintenance/` | Pending |

### Data sources

| Document | PDF path | Status |
| --- | --- | --- |
| _No data source documents yet_ | `apps/regis-franchisee-app/data-sources/` | Pending |

## Adding new documents

1. Create a Markdown file under the appropriate `source/` folder
2. Add a row to this catalog
3. Run `npm run pdf:build`
4. Verify the PDF under `dist/`

See [DOCUMENTATION_GUIDE.md](../DOCUMENTATION_GUIDE.md) for templates and the full coverage checklist.
