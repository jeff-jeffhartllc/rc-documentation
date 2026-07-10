# Client Handoff Overview

<div class="cover-meta">

**Document type:** Handoff package overview  
**Audience:** Client stakeholders and app owners  
**Domo instance:** https://regiscorp.domo.com  
**Status:** Draft — populate as apps are documented  
**Last updated:** 2026-07-10

</div>

## Purpose of this library

This document library supports Regis's transition to **self-maintenance** for two closely related Domo applications:

- **REGIS APP** — the primary corporate application
- **REGIS FRANCHISEE APP** — a franchisee-facing subset with Personalized Data Permissions (PDP)

It is designed as a practical reference for daily use and for ongoing upkeep of the apps and their data sources.

## What is included

| Section | Location | Description |
| --- | --- | --- |
| Library catalog | `library-catalog.pdf` | Master index of all documents |
| Shared documentation | `shared/` | Cross-app relationship, PDP overview, glossary |
| REGIS APP | `apps/regis-app/` | Daily use, maintenance, and data sources for the corporate app |
| REGIS FRANCHISEE APP | `apps/regis-franchisee-app/` | Daily use, maintenance, and data sources for the franchisee app |

## App quick reference

| App | Audience | URL |
| --- | --- | --- |
| REGIS APP | Corporate users | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| REGIS FRANCHISEE APP | Franchisee users (PDP-limited) | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |

REGIS FRANCHISEE APP reuses a subset of REGIS APP content. PDP narrows each franchisee user's view to their own stores. See `shared/regis-app-relationship.pdf` for details.

## How to use this library

### For daily users

Start with the **daily-use** guides for your app. These explain how to navigate pages, apply filters, interpret key cards, and perform routine tasks.

- Corporate users → `apps/regis-app/daily-use/`
- Franchisee users → `apps/regis-franchisee-app/daily-use/`

### For app owners and analysts

Use the **maintenance** guides when you need to change cards, pages, calculated fields, PDP rules, or access. Follow the change checklist in each guide before publishing updates.

### For data owners

Use the **data-sources** guides to understand datasets, refresh schedules, upstream systems, and how to respond to refresh or quality issues.

## Recommended reading order

1. This overview
2. `library-catalog.pdf`
3. `shared/regis-app-relationship.pdf`
4. Your app's overview and daily-use guides
5. Maintenance and data-source guides for your role

## Support model after handoff

Define the following before final delivery (to be completed by the documentation author):

| Item | Owner | Notes |
| --- | --- | --- |
| Primary app owner | _TBD_ | |
| Data owner | _TBD_ | |
| PDP / access owner | _TBD_ | Franchisee store assignments |
| Escalation contact | _TBD_ | |
| Domo instance URL | regiscorp.domo.com | |
| Change approval process | _TBD_ | |

## Document conventions

- **Screenshots** illustrate Domo UI steps where helpful
- **Tables** summarize datasets, schedules, and ownership
- **Runbooks** provide step-by-step procedures for common operational tasks
- **Troubleshooting guides** map symptoms to likely causes and fixes

## Feedback and updates

As your team uses these documents, record gaps or corrections and update the corresponding Markdown source files in this repository, then rebuild PDFs with:

```bash
npm run pdf:build
```
