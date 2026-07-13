# Documentation Library Catalog

<div class="cover-meta">

**Document type:** Master index (vendor source)  
**Audience:** Documentation maintainers  
**Domo instance:** https://regiscorp.domo.com  
**Status:** Complete  
**Last updated:** 2026-07-13

</div>

## Client delivery

Customers receive **two Word files** (plus a short README):

| Deliverable | Description |
| --- | --- |
| `Regis-User-Guide.docx` | User Guide — daily use |
| `Regis-Admin-Guide.docx` | Admin Guide — platform and maintenance |
| `README.txt` | How to open and maintain |

Build: `npm run build:all` → zip `dist/delivery/`

Topic order: `books/user-guide.json` and `books/admin-guide.json`.

After handoff, customers edit the Word files directly. This repository is not required for maintenance.

## Source topics (Markdown)

All content is authored under `source/`. The tables below list source files used to build the Word books.

### Package overview

| Document | Source file |
| --- | --- |
| Client handoff overview | `00-handoff-overview.md` |
| Library catalog (this document) | `library-catalog.md` |

### Shared documentation

| Document | Source file |
| --- | --- |
| REGIS APP and REGIS FRANCHISEE APP — relationship guide | `shared/regis-app-relationship.md` |
| Personalized Data Permissions — overview and testing | `shared/pdp-overview-and-testing.md` |
| PDP policy inventory (live capture) | `shared/pdp-policy-inventory.md` |
| Shared dataset inventory | `shared/dataset-inventory.md` |
| Domo instance access | `shared/domo-access.md` |
| Glossary — business terms and calculated fields | `shared/glossary.md` |
| Escalation and support model | `shared/escalation-and-support.md` |

### REGIS APP

**URL:** https://regiscorp.domo.com/app-studio/183500481/pages/925282956

#### Daily use → User Guide

| Document | Source file |
| --- | --- |
| App overview | `apps/regis-app/daily-use/app-overview.md` |
| Navigation and filters | `apps/regis-app/daily-use/navigation-and-filters.md` |
| Corporate Overview | `apps/regis-app/daily-use/corporate-overview.md` |
| Franchisee Performance | `apps/regis-app/daily-use/franchisee-performance.md` |
| Store Performance Report Card | `apps/regis-app/daily-use/store-performance-report-card.md` |
| Store Performance Scorecard | `apps/regis-app/daily-use/store-performance-scorecard.md` |
| Daily Sales Email Report | `apps/regis-app/daily-use/daily-sales-email-report.md` |
| Daily Laddering Report | `apps/regis-app/daily-use/daily-laddering-report.md` |
| Reference page | `apps/regis-app/daily-use/reference-page.md` |
| Exports and sharing | `apps/regis-app/daily-use/exports-and-sharing.md` |

#### Maintenance → Admin Guide

| Document | Source file |
| --- | --- |
| User roles and access | `apps/regis-app/maintenance/user-roles-and-access.md` |
| Change management and release checklist | `apps/regis-app/maintenance/change-management-checklist.md` |
| Beast Mode edits | `apps/regis-app/maintenance/beast-mode-edits.md` |
| Troubleshooting guide | `apps/regis-app/maintenance/troubleshooting-guide.md` |
| Runbook — refresh failures | `apps/regis-app/maintenance/runbook-refresh-failures.md` |

#### Data sources → Admin Guide

| Document | Source file |
| --- | --- |
| Daily Sales Master 2 | `apps/regis-app/data-sources/daily-sales-master-2.md` |
| Store Scorecard Data_Brand Peers | `apps/regis-app/data-sources/store-scorecard-data.md` |
| DimSalon | `apps/regis-app/data-sources/dimsalon-dataset.md` |
| Dataflow inventory | `apps/regis-app/data-sources/dataflow-inventory.md` |

### REGIS FRANCHISEE APP

**URL:** https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822

#### Daily use → User Guide

| Document | Source file |
| --- | --- |
| App overview | `apps/regis-franchisee-app/daily-use/app-overview.md` |
| Navigation and filters | `apps/regis-franchisee-app/daily-use/navigation-and-filters.md` |
| Franchisee Performance | `apps/regis-franchisee-app/daily-use/franchisee-performance.md` |
| Store Performance Report Card | `apps/regis-franchisee-app/daily-use/store-performance-report-card.md` |
| Store Performance Scorecard | `apps/regis-franchisee-app/daily-use/store-performance-scorecard.md` |
| Reference page | `apps/regis-franchisee-app/daily-use/reference-page.md` |
| Exports and sharing | `apps/regis-franchisee-app/daily-use/exports-and-sharing.md` |

#### Maintenance → Admin Guide

| Document | Source file |
| --- | --- |
| User roles and access | `apps/regis-franchisee-app/maintenance/user-roles-and-access.md` |
| Change checklist | `apps/regis-franchisee-app/maintenance/change-checklist.md` |
| PDP troubleshooting | `apps/regis-franchisee-app/maintenance/pdp-troubleshooting.md` |
| Troubleshooting guide | `apps/regis-franchisee-app/maintenance/troubleshooting-guide.md` |
| Runbook — access and PDP issues | `apps/regis-franchisee-app/maintenance/runbook-access-issues.md` |

#### Data sources → Admin Guide

| Document | Source file |
| --- | --- |
| Shared datasets (franchisee app) | `apps/regis-franchisee-app/data-sources/shared-datasets.md` |

## Adding new documents (before handoff)

1. Create Markdown under `source/`
2. Add the topic to `books/user-guide.json` and/or `books/admin-guide.json`
3. Run `npm run build:all`
4. Verify Contents and Navigation in the generated Word files
