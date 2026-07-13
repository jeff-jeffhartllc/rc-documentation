# Documentation Library Catalog

<div class="cover-meta">

**Document type:** Master index  
**Audience:** All client users  
**Domo instance:** https://regiscorp.domo.com  
**Status:** Complete  
**Last updated:** 2026-07-13

</div>

Use this catalog as the entry point to the full PDF library. Paths below refer to files under `dist/` after running `npm run pdf:build`.

## Package overview

| Document | PDF path | Status |
| --- | --- | --- |
| Client handoff overview | `00-handoff-overview.pdf` | Complete |
| Library catalog (this document) | `library-catalog.pdf` | Complete |

## Shared documentation

| Document | PDF path | Status |
| --- | --- | --- |
| REGIS APP and REGIS FRANCHISEE APP — relationship guide | `shared/regis-app-relationship.pdf` | Complete |
| Personalized Data Permissions — overview and testing | `shared/pdp-overview-and-testing.pdf` | Complete |
| PDP policy inventory (live capture) | `shared/pdp-policy-inventory.pdf` | Complete |
| Shared dataset inventory | `shared/dataset-inventory.pdf` | Complete |
| Domo instance access and SSO | `shared/domo-access-and-sso.pdf` | Complete |
| Glossary — business terms and calculated fields | `shared/glossary.pdf` | Complete |
| Escalation and support model | `shared/escalation-and-support.pdf` | Complete |

## REGIS APP

**Corporate application** — full organizational view  
**URL:** https://regiscorp.domo.com/app-studio/183500481/pages/925282956

### Daily use

| Document | PDF path | Status |
| --- | --- | --- |
| App overview | `apps/regis-app/daily-use/app-overview.pdf` | Complete |
| Navigation and filters | `apps/regis-app/daily-use/navigation-and-filters.pdf` | Complete |
| Corporate Overview | `apps/regis-app/daily-use/corporate-overview.pdf` | Complete |
| Franchisee Performance | `apps/regis-app/daily-use/franchisee-performance.pdf` | Complete |
| Store Performance Report Card | `apps/regis-app/daily-use/store-performance-report-card.pdf` | Complete |
| Store Performance Scorecard | `apps/regis-app/daily-use/store-performance-scorecard.pdf` | Complete |
| Daily Sales Email Report | `apps/regis-app/daily-use/daily-sales-email-report.pdf` | Complete |
| Daily Laddering Report | `apps/regis-app/daily-use/daily-laddering-report.pdf` | Complete |
| Reference page | `apps/regis-app/daily-use/reference-page.pdf` | Complete |
| Exports and sharing | `apps/regis-app/daily-use/exports-and-sharing.pdf` | Complete |

### Maintenance

| Document | PDF path | Status |
| --- | --- | --- |
| User roles and access | `apps/regis-app/maintenance/user-roles-and-access.pdf` | Complete |
| Change management and release checklist | `apps/regis-app/maintenance/change-management-checklist.pdf` | Complete |
| Beast Mode edits | `apps/regis-app/maintenance/beast-mode-edits.pdf` | Complete |
| Troubleshooting guide | `apps/regis-app/maintenance/troubleshooting-guide.pdf` | Complete |
| Runbook — refresh failures | `apps/regis-app/maintenance/runbook-refresh-failures.pdf` | Complete |

### Data sources

| Document | PDF path | Status |
| --- | --- | --- |
| Daily Sales Master 2 | `apps/regis-app/data-sources/daily-sales-master-2.pdf` | Complete |
| Store Scorecard Data | `apps/regis-app/data-sources/store-scorecard-data.pdf` | Complete |
| DimSalon | `apps/regis-app/data-sources/dimsalon-dataset.pdf` | Complete |
| Dataflow inventory | `apps/regis-app/data-sources/dataflow-inventory.pdf` | Complete |

## REGIS FRANCHISEE APP

**Franchisee application** — subset of REGIS APP with PDP limiting view to a franchisee's stores  
**URL:** https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822

### Daily use

| Document | PDF path | Status |
| --- | --- | --- |
| App overview | `apps/regis-franchisee-app/daily-use/app-overview.pdf` | Complete |
| Navigation and filters | `apps/regis-franchisee-app/daily-use/navigation-and-filters.pdf` | Complete |
| Franchisee Performance | `apps/regis-franchisee-app/daily-use/franchisee-performance.pdf` | Complete |
| Store Performance Report Card | `apps/regis-franchisee-app/daily-use/store-performance-report-card.pdf` | Complete |
| Store Performance Scorecard | `apps/regis-franchisee-app/daily-use/store-performance-scorecard.pdf` | Complete |
| Reference page | `apps/regis-franchisee-app/daily-use/reference-page.pdf` | Complete |
| Exports and sharing | `apps/regis-franchisee-app/daily-use/exports-and-sharing.pdf` | Complete |

### Maintenance

| Document | PDF path | Status |
| --- | --- | --- |
| User roles and access | `apps/regis-franchisee-app/maintenance/user-roles-and-access.pdf` | Complete |
| Change checklist | `apps/regis-franchisee-app/maintenance/change-checklist.pdf` | Complete |
| PDP troubleshooting | `apps/regis-franchisee-app/maintenance/pdp-troubleshooting.pdf` | Complete |
| Troubleshooting guide | `apps/regis-franchisee-app/maintenance/troubleshooting-guide.pdf` | Complete |
| Runbook — access and PDP issues | `apps/regis-franchisee-app/maintenance/runbook-access-issues.pdf` | Complete |

### Data sources

| Document | PDF path | Status |
| --- | --- | --- |
| Shared datasets (franchisee app) | `apps/regis-franchisee-app/data-sources/shared-datasets.pdf` | Complete |

## Adding new documents

1. Create a Markdown file under the appropriate `source/` folder
2. Add a row to this catalog
3. Run `npm run pdf:build:clean`
4. Verify the PDF under `dist/`

See [DOCUMENTATION_GUIDE.md](../DOCUMENTATION_GUIDE.md) for templates and the full coverage checklist.
