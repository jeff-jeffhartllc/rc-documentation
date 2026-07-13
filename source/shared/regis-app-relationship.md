# REGIS APP and REGIS FRANCHISEE APP — Relationship Guide

<div class="cover-meta">

**Apps:** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Shared cross-app reference  
**Audience:** App owners, analysts, data owners, and support staff  
**Domo instance:** https://regiscorp.domo.com  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — client app owner_

</div>

## Summary

Regis operates two closely related Domo App Studio applications on **regiscorp.domo.com**:

| App | App Studio ID | Default landing page | Audience |
| --- | --- | --- | --- |
| **REGIS APP** | `183500481` | Corporate Overview (`925282956`) | Corporate users |
| **REGIS FRANCHISEE APP** | `2028360971` | Franchisee Performance (`1195391822`) | Franchisee users (PDP-limited) |

REGIS FRANCHISEE APP is **not a separate product**. It is a franchisee-facing view built from a **subset of REGIS APP pages**, with **Personalized Data Permissions (PDP)** applied so each franchisee user sees only their own stores.

## Architecture at a glance

```
Upstream sources (Zenoti, warehouse tables, Alline feeds)
    │
    ▼
Magic ETL dataflows (Daily Sales ETL 2, Store Scorecard ETL, …)
    │
    ▼
Shared datasets (Daily Sales Master 2, Store Scorecard Data, DimSalon, …)
    │
    ├── REGIS APP (corporate, 7 pages, full org view)
    │       └── Role-based filters (Entity Type, Franchisee, Brand, …)
    │
    └── REGIS FRANCHISEE APP (4 pages, franchisee subset)
            └── PDP row-level filter on franchisee / salon assignment
```

## Page inventory — shared vs. app-specific

### REGIS APP pages (7 total)

| Page name | Page ID | In franchisee app? |
| --- | --- | --- |
| Corporate Overview | `925282956` | **No** — corporate default landing page |
| Franchisee Performance | `1429176950` | **Yes** — equivalent page ID `1195391822` |
| Store Performance Report Card | `686205723` | **Yes** — equivalent page ID `1731862460` |
| Store Performance Scorecard | `1910351785` | **Yes** — equivalent page ID `1073407012` |
| Daily Sales Email Report | `1756569987` | **No** — corporate reporting only |
| Daily Laddering Report | `82436821` | **No** — corporate operations only |
| Reference | `52287357` | **Yes** — equivalent page ID `507890851` |

### REGIS FRANCHISEE APP pages (4 total)

All four franchisee pages have **matching page names and card layouts** to their corporate counterparts. They are separate App Studio page objects (different page IDs) but present the same metrics and filters, scoped by PDP.

| Page name | Page ID | Corporate equivalent |
| --- | --- | --- |
| Franchisee Performance | `1195391822` | Franchisee Performance (`1429176950`) |
| Store Performance Report Card | `1731862460` | Store Performance Report Card (`686205723`) |
| Store Performance Scorecard | `1073407012` | Store Performance Scorecard (`1910351785`) |
| Reference | `507890851` | Reference (`52287357`) |

## Key behavioral differences

| Topic | REGIS APP | REGIS FRANCHISEE APP |
| --- | --- | --- |
| Default landing | Corporate Overview | Franchisee Performance |
| Data scope | Organization-wide (by role and filters) | Single franchisee's stores via PDP |
| Entity Type filter | Present on most pages | **Absent** — PDP replaces entity scoping |
| Location map card | "Active Regis Locations" | "Active Franchise Locations" |
| Corporate-only pages | Corporate Overview, Daily Sales Email Report, Daily Laddering Report | Not included |
| Page count | 7 | 4 |

## Shared datasets

Both apps draw from the same underlying datasets. The primary dataset powering page filters and most cards is **Daily Sales Master 2**.

| Dataset | Used by | Notes |
| --- | --- | --- |
| Daily Sales Master 2 | Both apps — primary card and filter source | Filter labels show "Source: Daily Sales Master 2" |
| Store Scorecard Data | Store Performance Report Card, Store Performance Scorecard | Built by Store Scorecard ETL |
| Store Scorecard Data_Brand Peers | Store Performance Scorecard (brand peer comparisons) | Built by Store Scorecard by Brand ETL |
| Daily Sales Indexed by Store 2 | Indexed lookups / performance cards | Built by Daily Sales Master Indexing 2 |
| DimSalon | Salon dimension filters (Brand, Salon, Territory, DMA, …) | Upstream dimension table |
| domo_regis.MonthlyMetrics | Scorecard monthly metrics | Warehouse-fed input to scorecard ETL |

See **Shared dataset inventory** in this guide for the full dataset and dataflow reference.

## PDP in practice

Personalized Data Permissions (PDP) restrict which rows each franchisee user can see in shared datasets. When a franchisee opens REGIS FRANCHISEE APP:

1. Domo applies PDP rules tied to the user's identity or group membership.
2. Rows are filtered to salons assigned to that franchisee.
3. Page filters (Brand, Salon, DMA, etc.) further narrow within the PDP-permitted set.

Corporate users opening REGIS APP are **not** subject to franchisee PDP rules; they use standard role permissions and page filters instead.

See **PDP overview and testing** in this guide for configuration, testing, and troubleshooting detail.

## Change management — impact on franchisee app

When changing REGIS APP, ask:

1. **Is this page also in REGIS FRANCHISEE APP?**  
   If yes, the franchisee app has a separate page object with the same layout. Changes to shared cards or datasets affect both apps; page layout changes may need to be replicated on the franchisee page ID.

2. **Does the change affect a dataset referenced by PDP rules?**  
   Schema changes to `DimSalon`, `Daily Sales Master 2`, or fields used in PDP attribute mapping can break franchisee visibility.

3. **Do franchisee users need release notes or re-training?**  
   Filter changes, new cards, or metric definition changes on shared pages should be communicated.

4. **Has PDP been re-tested after the change?**  
   Validate with at least one franchisee test account that sees only their stores.

### What breaks when corporate changes the main app

| Change type | Franchisee impact | Action required |
| --- | --- | --- |
| Dataset schema change (rename/remove field) | Cards may error; PDP rules may fail | Update PDP mappings; validate franchisee pages |
| New card on shared page (corporate only) | No impact unless replicated | Optionally add to franchisee page |
| Beast Mode edit on shared card | Both apps affected if same card instance | Test both apps after publish |
| New corporate-only page | No franchisee impact | None |
| Dataflow logic change | Both apps reflect new data | Monitor refresh; validate metrics |
| PDP rule change | Direct franchisee impact | Test all franchisee accounts |

## Related topics

- [PDP overview and testing](./pdp-overview-and-testing.md)
- [Shared dataset inventory](./dataset-inventory.md)
- [Glossary](./glossary.md)
- [REGIS APP overview](../apps/regis-app/daily-use/app-overview.md)
- [REGIS FRANCHISEE APP overview](../apps/regis-franchisee-app/daily-use/app-overview.md)
