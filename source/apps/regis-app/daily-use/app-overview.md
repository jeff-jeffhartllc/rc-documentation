# REGIS APP — Overview

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Daily use — app overview  
**Audience:** Corporate users, analysts, and app owners  
**Domo URL:** https://regiscorp.domo.com/app-studio/183500481/pages/925282956  
**App Studio ID:** 183500481  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Business purpose

REGIS APP is the **primary Domo application** for Regis corporate users. It provides an organization-wide view of salon sales, traffic, productivity, loyalty, and store performance across all brands, franchisees, and corporate-owned locations.

Primary use cases:

- Monitor corporate and franchise performance at brand, franchisee, and salon levels
- Review store scorecards and report cards for operational coaching
- Track daily sales trends, traffic patterns, and productivity metrics
- Access daily operational reports (email report, laddering report)

## App quick reference

| Item | Value |
| --- | --- |
| App name | REGIS APP |
| App Studio ID | `183500481` |
| Default landing page | Corporate Overview (`925282956`) |
| Pages | 7 (see navigation below) |
| Primary dataset | Daily Sales Master 2 |
| Audience | Corporate teams |

![REGIS APP landing page — Corporate Overview](../../assets/regis-app-landing.png)

## Navigation

REGIS APP has seven pages accessible from the left navigation:

| # | Page | Page ID | Purpose |
| --- | --- | --- | --- |
| 1 | **Corporate Overview** | `925282956` | Default landing — org-wide KPIs across sales, traffic, locations, productivity, loyalty, digital |
| 2 | **Franchisee Performance** | `1429176950` | Franchisee-focused performance view (all franchisees) |
| 3 | **Store Performance Report Card** | `686205723` | Monthly store report card with cumulative scores |
| 4 | **Store Performance Scorecard** | `1073407012` | Store scorecard with SPH and peer comparisons |
| 5 | **Daily Sales Email Report** | `1756569987` | Daily sales summary for email distribution |
| 6 | **Daily Laddering Report** | `82436821` | Day-over-day operational laddering metrics |
| 7 | **Reference** | `52287357` | Filter definitions, SST letter grades, usage tips |

## Common filters (most pages)

| Filter | Source dataset | Notes |
| --- | --- | --- |
| Entity Type | Daily Sales Master 2 | Corporate vs. franchise scoping |
| Brand | Daily Sales Master 2 | Regis brand selection |
| Franchisee | Daily Sales Master 2 | Filter to specific franchisee |
| Salon | Daily Sales Master 2 | Filter to specific salon |
| From Date / Through Date | Daily Sales Master 2 | Date range |
| Country, State / Province, Territory, DMA | Daily Sales Master 2 / DimSalon | Geographic filters |
| Is Active? | Daily Sales Master 2 | Default: Active Only |
| Is PY Comp? | Daily Sales Master 2 | Default: PY Comp Only (where shown) |
| Distribution Pattern | Daily Sales Master 2 | Default: Normal Only (where shown) |

## Relationship to REGIS FRANCHISEE APP

REGIS FRANCHISEE APP is a **4-page subset** of this application with PDP applied so franchisee users see only their stores. Four pages are shared by name and layout; three pages (Corporate Overview, Daily Sales Email Report, Daily Laddering Report) are corporate-only.

When maintaining REGIS APP, consider downstream impact on the franchisee app. See `shared/regis-app-relationship.docx`.

## Who should read this

- **Corporate daily users** — start here, then open page-specific daily-use guides
- **App owners and analysts** — also read `maintenance/` guides
- **Data owners** — also read `data-sources/` guides

## Recommended reading order

1. This overview
2. [Navigation and filters guide](./navigation-and-filters.md)
3. Page guide for your primary workflow (e.g., Corporate Overview)
4. [Export and sharing procedures](./exports-and-sharing.md)

## Related documents

- [REGIS app relationship (shared)](../../shared/regis-app-relationship.md)
- [REGIS FRANCHISEE APP overview](../../regis-franchisee-app/daily-use/app-overview.md)
- Full index: `library-catalog.docx`
