# Client Handoff Overview

<div class="cover-meta">

**Document type:** Handoff package overview  
**Audience:** Client stakeholders and app owners  
**Domo instance:** https://regiscorp.domo.com  
**Status:** Complete — pending client ownership contacts  
**Last updated:** 2026-07-13

</div>

## Documentation package

The client receives a **zip of `dist/delivery/`** (not this repository) containing:

| Guide | HTML entry point | Word book |
| --- | --- | --- |
| **User Guide** | `user-guide/index.html` | `Regis-User-Guide.docx` |
| **Admin Guide** | `admin-guide/index.html` | `Regis-Admin-Guide.docx` |

See `README.txt` in the package for opening and editing instructions.

## Purpose of this library

This document library supports Regis's transition to **self-maintenance** for two closely related Domo applications:

- **REGIS APP** — the primary corporate application (7 pages, full organizational view)
- **REGIS FRANCHISEE APP** — a franchisee-facing 4-page subset with Personalized Data Permissions (PDP)

It is designed as a practical reference for daily use and for ongoing upkeep of the apps and their data sources.

## What is included

| Guide | Audience | Contents |
| --- | --- | --- |
| **User Guide** | Daily users, analysts | REGIS APP and franchisee app daily-use topics, glossary, getting help |
| **Admin Guide** | Admins, data owners, app owners | Handoff, PDP, datasets, dataflows, maintenance, runbooks; links to User Guide for daily use |

## App quick reference

| App | Audience | Pages | URL |
| --- | --- | --- | --- |
| REGIS APP | Corporate users | 7 | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| REGIS FRANCHISEE APP | Franchisee users (PDP-limited) | 4 | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |

REGIS FRANCHISEE APP reuses 4 pages from REGIS APP with PDP limiting each franchisee to their own stores. See the Admin Guide topic **REGIS APP and franchisee app relationship**.

## How to use this library

### For daily users

Open the **User Guide** (`user-guide/index.html` or `Regis-User-Guide.docx`):

- Corporate users → start with **App overview** (REGIS APP section)
- Franchisee users → start with **App overview** (REGIS FRANCHISEE APP section)

### For app owners and analysts

Use the **Admin Guide** maintenance sections for card edits, change checklists, and access management.

### For data owners

Use the **Admin Guide** data platform sections for dataflow, refresh, and lineage information.

## Recommended reading order

1. This overview (Admin Guide)
2. REGIS APP and franchisee app relationship
3. Your role’s topics in the User Guide or Admin Guide
4. PDP overview and policy inventory (if you manage franchisee access)

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

The following item requires client completion before handoff is fully closed:

1. **Ownership contacts** — All owner and escalation fields marked _TBD_ in the support model and individual documents (primary app owner, data owner, PDP / access owner, escalation contact, change approval process).

## Document conventions

- **Screenshots** from live Domo exploration are in `assets/` and referenced in guides
- **Tables** summarize datasets, pages, and ownership
- **Runbooks** provide step-by-step operational procedures
- **Troubleshooting guides** map symptoms to likely causes and fixes

## Feedback and updates

Your documentation maintainer rebuilds the package from source and ships an updated zip. If you edit `Regis-User-Guide.docx` or `Regis-Admin-Guide.docx` locally, merge those changes when you receive a new package, or keep org-specific notes in a separate addendum document.
