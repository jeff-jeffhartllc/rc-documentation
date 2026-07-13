# Client Handoff Overview

<div class="cover-meta">

**Document type:** Handoff package overview  
**Audience:** Client stakeholders and app owners  
**Domo instance:** https://regiscorp.domo.com  
**Status:** Complete — pending client ownership contacts  
**Last updated:** 2026-07-13

</div>

## Documentation package

The documentation consists of **three Microsoft Word files**:

| Guide | File | Audience |
| --- | --- | --- |
| **User Guide** | `Regis-User-Guide.docx` | Corporate REGIS APP users |
| **Franchisee Guide** | `Regis-Franchisee-Guide.docx` | Franchisee REGIS FRANCHISEE APP users |
| **Admin Guide** | `Regis-Admin-Guide.docx` | Domo admins, app owners, data owners |

Open each file in Microsoft Word. Use **Contents** at the front of the document (Ctrl+click / Cmd+click) or **View → Navigation pane** to jump between topics.

Distribute the **Franchisee Guide** to franchisee operators. Do **not** give franchisee end users the corporate User Guide or Admin Guide.

After handoff, Regis owns these three files. For how to edit them in Word, see **About this guide → Maintaining this documentation** at the start of this Admin Guide.

## Purpose of this library

This documentation supports Regis's transition to **self-maintenance** for two closely related Domo applications:

- **REGIS APP** — the primary corporate application (7 pages, full organizational view)
- **REGIS FRANCHISEE APP** — a franchisee-facing 4-page subset with Personalized Data Permissions (PDP)

## What is included

| Guide | Contents |
| --- | --- |
| **User Guide** | REGIS APP daily-use topics, glossary, getting help |
| **Franchisee Guide** | REGIS FRANCHISEE APP daily-use topics only (no corporate-only page inventory) |
| **Admin Guide** | Handoff, PDP, datasets, dataflows, maintenance, runbooks; points to the operator guides for daily use |

## App quick reference

| App | Audience | Pages | URL |
| --- | --- | --- | --- |
| REGIS APP | Corporate users | 7 | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| REGIS FRANCHISEE APP | Franchisee users (PDP-limited) | 4 | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |

REGIS FRANCHISEE APP reuses 4 pages from REGIS APP with PDP limiting each franchisee to their own stores. See the Admin Guide topic **REGIS APP and franchisee app relationship**.

## How to use this library

### For corporate daily users

Open **Regis-User-Guide.docx** and start with **App overview**.

### For franchisee operators

Open **Regis-Franchisee-Guide.docx** only.

### For app owners and analysts

Use the **Admin Guide** maintenance sections for card edits, change checklists, and access management.

### For data owners

Use the **Admin Guide** data platform sections for dataflow, refresh, and lineage information.

## Recommended reading order

1. This overview (in the Admin Guide)
2. REGIS APP and franchisee app relationship
3. Your role’s topics in the User Guide, Franchisee Guide, or Admin Guide
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

1. **Ownership contacts** — All owner and escalation fields marked _TBD_ in the support model and individual documents (primary app owner, data owner, PDP / access owner, escalation contact, change approval process).

## Document conventions

Inside this guide you will find:

- **Screenshots** of Domo pages and PDP settings
- **Tables** that summarize datasets, pages, groups, and ownership
- **Step-by-step procedures** for common operational tasks (for example, refresh failures and access / PDP issues)
- **Troubleshooting sections** that map symptoms to likely causes and fixes
