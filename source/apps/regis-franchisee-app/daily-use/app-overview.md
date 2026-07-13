# REGIS FRANCHISEE APP — Overview

<div class="cover-meta">

**App:** REGIS FRANCHISEE APP  
**Document type:** Daily use — app overview  
**Audience:** Franchisee users and their support contacts  
**Domo URL:** https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822  
**App Studio ID:** 2028360971  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Business purpose

REGIS FRANCHISEE APP gives franchisee operators a focused view of their own salon performance. It is a **4-page subset** of REGIS APP with **Personalized Data Permissions (PDP)** applied so each franchisee user sees only their assigned stores.

Primary use cases:

- Monitor daily and monthly sales, traffic, and productivity for your salons
- Review store report cards and scorecards for coaching
- Look up filter definitions and metric explanations on the Reference page

## App quick reference

| Item | Value |
| --- | --- |
| App name | REGIS FRANCHISEE APP |
| App Studio ID | `2028360971` |
| Default landing page | Franchisee Performance (`1195391822`) |
| Pages | 4 |
| Primary dataset | Daily Sales Master 2 (PDP-scoped) |
| Audience | Franchisee operators |

![REGIS FRANCHISEE APP landing page](../../assets/regis-franchisee-app-landing.png)

## Navigation

| # | Page | Page ID | Corporate equivalent |
| --- | --- | --- | --- |
| 1 | **Franchisee Performance** | `1195391822` | Franchisee Performance (`1429176950`) |
| 2 | **Store Performance Report Card** | `1731862460` | Store Performance Report Card (`686205723`) |
| 3 | **Store Performance Scorecard** | `1073407012` | Store Performance Scorecard (`1910351785`) |
| 4 | **Reference** | `507890851` | Reference (`52287357`) |

### Pages NOT in this app

These REGIS APP pages are corporate-only:

- Corporate Overview
- Daily Sales Email Report
- Daily Laddering Report

## How PDP affects your view

- You see **only your franchisee's salons** — no other franchisee's data.
- The **Entity Type** filter is not present — PDP handles your scope automatically.
- The location map shows **Active Franchise Locations** (not "Active Regis Locations").
- Page filters (Brand, Salon, DMA, etc.) work within your assigned stores.

See `shared/pdp-overview-and-testing.docx` for full PDP detail.

## Who should read this

- **Franchisee daily users** — start here, then open page-specific guides
- **Franchisee support / app owners** — also read `maintenance/` guides
- **Data owners** — also read `data-sources/` guides (shared with corporate)

## Related documents

- [Franchisee Performance guide](./franchisee-performance.md)
- [Navigation and filters](./navigation-and-filters.md)
- [REGIS app relationship (shared)](../../shared/regis-app-relationship.md)
- [PDP overview (shared)](../../shared/pdp-overview-and-testing.md)
