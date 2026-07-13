# Client Handoff Overview

<div class="cover-meta">

**Document type:** Handoff package overview  
**Audience:** Client stakeholders and app owners  
**Domo instance:** https://regiscorp.domo.com  
**Status:** Complete — pending client ownership contacts; scorecard/dimension PDP verification  
**Last updated:** 2026-07-13

</div>

## Purpose of this library

This document library supports Regis's transition to **self-maintenance** for two closely related Domo applications:

- **REGIS APP** — the primary corporate application (7 pages, full organizational view)
- **REGIS FRANCHISEE APP** — a franchisee-facing 4-page subset with Personalized Data Permissions (PDP)

It is designed as a practical reference for daily use and for ongoing upkeep of the apps and their data sources.

## What is included

| Section | Location | Description |
| --- | --- | --- |
| Library catalog | `library-catalog.pdf` | Master index of all documents |
| Shared documentation | `shared/` | Cross-app relationship, PDP, datasets, glossary, support |
| REGIS APP | `apps/regis-app/` | 7 daily-use guides, 5 maintenance docs, 4 data-source guides |
| REGIS FRANCHISEE APP | `apps/regis-franchisee-app/` | 6 daily-use guides, 5 maintenance docs, 1 data-source guide |

## App quick reference

| App | Audience | Pages | URL |
| --- | --- | --- | --- |
| REGIS APP | Corporate users | 7 | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| REGIS FRANCHISEE APP | Franchisee users (PDP-limited) | 4 | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |

REGIS FRANCHISEE APP reuses 4 pages from REGIS APP with PDP limiting each franchisee to their own stores. See `shared/regis-app-relationship.pdf`.

## How to use this library

### For daily users

Start with the **daily-use** guides for your app:

- Corporate users → `apps/regis-app/daily-use/app-overview.pdf`
- Franchisee users → `apps/regis-franchisee-app/daily-use/app-overview.pdf`

### For app owners and analysts

Use the **maintenance** guides for card edits, change checklists, and access management.

### For data owners

Use the **data-sources** guides and the shared dataset inventory for dataflow, refresh, and lineage information.

## Recommended reading order

1. This overview
2. `library-catalog.pdf`
3. `shared/regis-app-relationship.pdf`
4. Your app's overview and daily-use guides
5. Maintenance and data-source guides for your role
6. `shared/pdp-overview-and-testing.pdf` and `shared/pdp-policy-inventory.pdf` (if you manage franchisee access)

## Support model after handoff

| Item | Owner | Notes |
| --- | --- | --- |
| Primary app owner | _TBD_ | REGIS APP and REGIS FRANCHISEE APP |
| Data owner | _TBD_ | Datasets, dataflows, refresh schedules |
| PDP / access owner | _TBD_ | Franchisee store assignments |
| Escalation contact | _TBD_ | |
| Domo instance URL | regiscorp.domo.com | Production |
| Change approval process | _TBD_ | |

## Known gaps requiring client input

The following items could not be fully verified during documentation and require client completion:

1. **Scorecard / dimension PDP** — Most app-related datasets are documented (see `shared/pdp-policy-inventory.md`). **Store Scorecard Data** and **DimSalon** still need PDP tab verification.
2. **Ownership contacts** — All owner/escalation fields marked _TBD_.
3. **Refresh schedules** — Dataflows are documented with lineage; exact cron schedules need confirmation in Domo Dataflows.
4. **Full field dictionary** — Key fields documented; complete schema export from Data Center recommended.
5. **SSO provider details** — Authentication configuration to be documented by IT.
6. **Scheduled report recipients** — Distribute schedules to be documented by app owner.

## Document conventions

- **Screenshots** from live Domo exploration are in `assets/` and referenced in guides
- **Tables** summarize datasets, pages, and ownership
- **Runbooks** provide step-by-step operational procedures
- **Troubleshooting guides** map symptoms to likely causes and fixes

## Feedback and updates

Update Markdown source files in this repository, then rebuild PDFs:

```bash
npm run pdf:build:clean
```
