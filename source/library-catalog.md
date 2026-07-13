# Documentation Library Catalog

<div class="cover-meta">

**Document type:** Master index  
**Audience:** All client users  
**Domo instance:** https://regiscorp.domo.com  
**Status:** Complete  
**Last updated:** 2026-07-13

</div>

Use this catalog as the entry point to the full document library. Paths below refer to files under `dist/` after running `npm run docx:build`.

## Package overview

| Document | DOCX path | Status |
| --- | --- | --- |
| Client handoff overview | `00-handoff-overview.docx` | Complete |
| Library catalog (this document) | `library-catalog.docx` | Complete |

## Shared documentation

| Document | DOCX path | Status |
| --- | --- | --- |
| REGIS APP and REGIS FRANCHISEE APP — relationship guide | `shared/regis-app-relationship.docx` | Complete |
| Personalized Data Permissions — overview and testing | `shared/pdp-overview-and-testing.docx` | Complete |
| PDP policy inventory (live capture) | `shared/pdp-policy-inventory.docx` | Complete |
| Shared dataset inventory | `shared/dataset-inventory.docx` | Complete |
| Domo instance access | `shared/domo-access.docx` | Complete |
| Glossary — business terms and calculated fields | `shared/glossary.docx` | Complete |
| Escalation and support model | `shared/escalation-and-support.docx` | Complete |

## REGIS APP

**Corporate application** — full organizational view  
**URL:** https://regiscorp.domo.com/app-studio/183500481/pages/925282956

### Daily use

| Document | DOCX path | Status |
| --- | --- | --- |
| App overview | `apps/regis-app/daily-use/app-overview.docx` | Complete |
| Navigation and filters | `apps/regis-app/daily-use/navigation-and-filters.docx` | Complete |
| Corporate Overview | `apps/regis-app/daily-use/corporate-overview.docx` | Complete |
| Franchisee Performance | `apps/regis-app/daily-use/franchisee-performance.docx` | Complete |
| Store Performance Report Card | `apps/regis-app/daily-use/store-performance-report-card.docx` | Complete |
| Store Performance Scorecard | `apps/regis-app/daily-use/store-performance-scorecard.docx` | Complete |
| Daily Sales Email Report | `apps/regis-app/daily-use/daily-sales-email-report.docx` | Complete |
| Daily Laddering Report | `apps/regis-app/daily-use/daily-laddering-report.docx` | Complete |
| Reference page | `apps/regis-app/daily-use/reference-page.docx` | Complete |
| Exports and sharing | `apps/regis-app/daily-use/exports-and-sharing.docx` | Complete |

### Maintenance

| Document | DOCX path | Status |
| --- | --- | --- |
| User roles and access | `apps/regis-app/maintenance/user-roles-and-access.docx` | Complete |
| Change management and release checklist | `apps/regis-app/maintenance/change-management-checklist.docx` | Complete |
| Beast Mode edits | `apps/regis-app/maintenance/beast-mode-edits.docx` | Complete |
| Troubleshooting guide | `apps/regis-app/maintenance/troubleshooting-guide.docx` | Complete |
| Runbook — refresh failures | `apps/regis-app/maintenance/runbook-refresh-failures.docx` | Complete |

### Data sources

| Document | DOCX path | Status |
| --- | --- | --- |
| Daily Sales Master 2 | `apps/regis-app/data-sources/daily-sales-master-2.docx` | Complete |
| Store Scorecard Data | `apps/regis-app/data-sources/store-scorecard-data.docx` | Complete |
| DimSalon | `apps/regis-app/data-sources/dimsalon-dataset.docx` | Complete |
| Dataflow inventory | `apps/regis-app/data-sources/dataflow-inventory.docx` | Complete |

## REGIS FRANCHISEE APP

**Franchisee application** — subset of REGIS APP with PDP limiting view to a franchisee's stores  
**URL:** https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822

### Daily use

| Document | DOCX path | Status |
| --- | --- | --- |
| App overview | `apps/regis-franchisee-app/daily-use/app-overview.docx` | Complete |
| Navigation and filters | `apps/regis-franchisee-app/daily-use/navigation-and-filters.docx` | Complete |
| Franchisee Performance | `apps/regis-franchisee-app/daily-use/franchisee-performance.docx` | Complete |
| Store Performance Report Card | `apps/regis-franchisee-app/daily-use/store-performance-report-card.docx` | Complete |
| Store Performance Scorecard | `apps/regis-franchisee-app/daily-use/store-performance-scorecard.docx` | Complete |
| Reference page | `apps/regis-franchisee-app/daily-use/reference-page.docx` | Complete |
| Exports and sharing | `apps/regis-franchisee-app/daily-use/exports-and-sharing.docx` | Complete |

### Maintenance

| Document | DOCX path | Status |
| --- | --- | --- |
| User roles and access | `apps/regis-franchisee-app/maintenance/user-roles-and-access.docx` | Complete |
| Change checklist | `apps/regis-franchisee-app/maintenance/change-checklist.docx` | Complete |
| PDP troubleshooting | `apps/regis-franchisee-app/maintenance/pdp-troubleshooting.docx` | Complete |
| Troubleshooting guide | `apps/regis-franchisee-app/maintenance/troubleshooting-guide.docx` | Complete |
| Runbook — access and PDP issues | `apps/regis-franchisee-app/maintenance/runbook-access-issues.docx` | Complete |

### Data sources

| Document | DOCX path | Status |
| --- | --- | --- |
| Shared datasets (franchisee app) | `apps/regis-franchisee-app/data-sources/shared-datasets.docx` | Complete |

## Adding new documents

1. Create a Markdown file under the appropriate `source/` folder
2. Add a row to this catalog
3. Run `npm run docx:build:clean`
4. Verify the DOCX under `dist/`

See [DOCUMENTATION_GUIDE.md](../DOCUMENTATION_GUIDE.md) for templates and the full coverage checklist.
