# Data Source Guide — Daily Sales Master 2

<div class="cover-meta">

**App(s):** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Data source guide  
**Audience:** Data owners, analysts  
**Domo dataset:** Daily Sales Master 2  
**Dataset ID:** `8d851507-f995-4918-abc8-90032b2eff65`  
**Last updated:** 2026-07-13  
**Author / owner:** Jeff Hart (dataset owner); _TBD — data owner contact_

</div>

## Summary

**Daily Sales Master 2** is the primary dataset powering filters and KPI cards on both REGIS APP and REGIS FRANCHISEE APP. Filter labels on app pages show "Source: Daily Sales Master 2". It contains daily salon-level sales, traffic, productivity, loyalty, and dimension attributes.

## Source system

| Item | Value |
| --- | --- |
| Upstream system | Regis data warehouse (domo_regis schema) + Alline feeds |
| Connection type | Magic ETL (Daily Sales ETL 2) |
| Owner | Jeff Hart |
| Dataset ID | `8d851507-f995-4918-abc8-90032b2eff65` |
| Scale (2026-07-13) | 204 columns · 1,513,506 rows |
| Refresh schedule | Triggered when **domo_regis.FactDailySales** updates → **Daily Sales ETL 2** runs (America/Chicago). See [Dataflow inventory](./dataflow-inventory.md). |
| Historical depth | 1,513,506 rows as of 2026-07-13 |

## Lineage

```
AllineDailyLabor ──┐
DimSalon ──────────┤
domo_regis.FactDailySales ──┼──► Daily Sales ETL 2 ──► Daily Sales Master 2 ──► App cards / filters
DimDate ───────────┤                                    │
Alline Total Sales Forecast ┘                           ├──► Daily Sales Master Indexing 2
                                                         └──► Store Scorecard by Brand ETL
```

## Key fields

| Field / filter | Description | Business rules / notes |
| --- | --- | --- |
| Brand | Regis brand name | Filter dropdown source |
| Franchisee | Franchisee operator name/ID | Used for franchisee drill-down; PDP key for franchisee app |
| Salon | Salon/location identifier | Store-level drill-down; PDP key |
| Entity Type | Corporate vs. franchise classification | Corporate app only |
| Country, State / Province, Territory, DMA | Geographic dimensions | Derived from DimSalon |
| Is Active? | Whether salon is currently active | Default filter: Active Only |
| Is PY Comp? | Prior-year comparable flag | Default filter: PY Comp Only |
| Distribution Pattern | Operating/distribution model | Normal Only common default |
| Date fields | Transaction / reporting dates | From Date / Through Date filters |
| Net Sales / Total Sales | Revenue metrics | Core sales KPIs |
| Service Sales / Retail Sales | Sales type splits | |
| Traffic metrics | Guest visit counts | Total, service-only, retail-only, combo |
| Productive Hours | Stylist productive time | Used in SPH calculations |
| Retention metrics | 90-day / 180-day retention rates | Loyalty section cards |

> **Client action required:** Export the full column list from Data Center → Daily Sales Master 2 → Schema and append to this guide as a complete field dictionary.

## Personalized Data Permissions (PDP)

PDP row filtering is **enabled** on this dataset. Franchisee users in REGIS FRANCHISEE APP are scoped by the **Franchisee** policy.

| Policy | Filter | Groups |
| --- | --- | --- |
| **All Rows** | All data (open policy) | AllDataAccess (49 people); admins; 3c090c15-223e-4377-bf0f-60e2eec980b4 (3 people) |
| **Franchisee** | `FranchiseeNumber` EQUALS **Ownership** (dynamic user attribute) | RestrictedDataAccess (15 people) |

Open PDP settings: **Data** → **Daily Sales Master 2** → **PDP** → **Row Policies**, or  
https://regiscorp.domo.com/datasources/8d851507-f995-4918-abc8-90032b2eff65/details/rls

See [PDP policy inventory](../../shared/pdp-policy-inventory.md) for full detail and change procedures.

## Downstream usage

| App | Page(s) | Usage |
| --- | --- | --- |
| REGIS APP | Corporate Overview, Franchisee Performance, Reference, Daily Sales Email Report, Daily Laddering Report | Primary card data and all page filters |
| REGIS FRANCHISEE APP | Franchisee Performance, Reference | Primary card data and filters (PDP-scoped) |

## Change management

1. Schema changes must be coordinated with the app owner and PDP owner.
2. Test both REGIS APP and REGIS FRANCHISEE APP after any field rename or removal.
3. Update Beast Mode calculations referencing changed fields.
4. Re-run Daily Sales ETL 2 after upstream schema changes.

## Failure handling

| Failure mode | How it surfaces | Response |
| --- | --- | --- |
| Daily Sales ETL 2 fails | All app cards blank or stale | [Runbook — refresh failures](../maintenance/runbook-refresh-failures.md) |
| Upstream FactDailySales late | Dataset refreshes with yesterday's data | Wait for upstream; re-run ETL |
| Field removed | Card errors; PDP may break | Restore field or update cards and PDP |

## Related documents

- [Dataflow inventory](./dataflow-inventory.md)
- [DimSalon dataset](./dimsalon-dataset.md)
- [Shared dataset inventory (shared)](../../shared/dataset-inventory.md)
