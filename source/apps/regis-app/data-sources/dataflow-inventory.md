# Data Source Guide — Dataflow Inventory

<div class="cover-meta">

**App(s):** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Data source guide  
**Audience:** Data owners, analysts  
**Domo instance:** https://regiscorp.domo.com  
**Last updated:** 2026-07-13  
**Author / owner:** _TBD — data owner_

</div>

## Summary

This document inventories all Magic ETL dataflows observed in regiscorp.domo.com that feed datasets used by REGIS APP and REGIS FRANCHISEE APP. All flows were **ENABLED** with last execution **SUCCESS** at time of documentation.

Schedules below were captured from Domo **Dataflows** → each flow → **Schedule** (API: `triggerSettings` on `/api/dataprocessing/v1/dataflows/{id}`) on **2026-07-13**.

## Refresh schedule summary

| Dataflow | Trigger type | Schedule / dependency | Time zone |
| --- | --- | --- | --- |
| **Daily Sales ETL 2** | Dataset update | Runs when **domo_regis.FactDailySales** updates | America/Chicago |
| **Daily Sales Master Indexing 2** | Dataset update | Runs when **Daily Sales Master 2** updates | UTC |
| **Store Scorecard by Brand ETL** | Dataset update + condition | Runs when **domo_regis.MonthlyMetrics** updates, after **Daily Sales Master 2** and **domo_regis.MonthlyMetrics** have both completed successfully since the last run | UTC |
| **Daily Sales ETL** (legacy) | Cron | Daily at **6:40 AM** | America/Chicago |
| **Daily Sales Master Indexing** (legacy) | Dataset update | Runs when **Daily Sales Master** updates | UTC |
| **Corp Employees Daily Sales ETL** | Dataset update | Runs when **domo.CorpEmployeeDailySales** or **Daily Sales Master** updates | UTC |
| **Sales by Store by Day ETL** | Dataset update | Runs when **Daily Sales** or **Daily Labor** updates | America/Chicago |
| **Regis Stock History Builder** | Dataset update | Runs when **Regis Stock Data Current** updates | UTC |

**Critical path for app data:** upstream warehouse loads refresh **domo_regis.FactDailySales** → **Daily Sales ETL 2** → **Daily Sales Master 2** → dependent flows (indexing, scorecard). If cards look stale, check **Daily Sales ETL 2** and **Daily Sales Master 2** last-run timestamps first.

## Dataflow inventory

### Daily Sales ETL 2

| Item | Value |
| --- | --- |
| **Status** | ENABLED — last run SUCCESS |
| **Refresh trigger** | When **domo_regis.FactDailySales** updates (America/Chicago) |
| **Inputs** | AllineDailyLabor, DimSalon, domo_regis.FactDailySales, DimDate, Alline Total Sales Forecast |
| **Outputs** | Daily Sales Master 2, DSM2 - Daily Sales By Traffic, Daily Sales Unpivoted Services 2 |
| **App impact** | **Critical** — primary dataset for both apps |

### Daily Sales ETL (legacy)

| Item | Value |
| --- | --- |
| **Status** | ENABLED — last run SUCCESS |
| **Refresh trigger** | Daily cron **6:40 AM** (America/Chicago) |
| **Inputs** | AllineDailyLabor, DimSalon, DimDate, FactDailySales, Alline Total Sales Forecast |
| **Outputs** | Daily Sales Master, Daily Sales Unpivoted Services |
| **App impact** | Legacy; Daily Sales Master 2 is current primary |

### Daily Sales Master Indexing 2

| Item | Value |
| --- | --- |
| **Status** | ENABLED — last run SUCCESS |
| **Refresh trigger** | When **Daily Sales Master 2** updates (UTC) |
| **Inputs** | Daily Sales Master 2 |
| **Outputs** | Daily Sales Indexed by Store 2 |
| **App impact** | Indexed performance cards |

### Daily Sales Master Indexing (legacy)

| Item | Value |
| --- | --- |
| **Status** | ENABLED — last run SUCCESS |
| **Refresh trigger** | When **Daily Sales Master** updates (UTC) |
| **Inputs** | Daily Sales Master |
| **Outputs** | Daily Sales Indexed by Store |

### Store Scorecard by Brand ETL

| Item | Value |
| --- | --- |
| **Status** | ENABLED — last run SUCCESS |
| **Refresh trigger** | When **domo_regis.MonthlyMetrics** updates, after **Daily Sales Master 2** and **domo_regis.MonthlyMetrics** last successful runs (UTC) |
| **Inputs** | Daily Sales Master 2, domo_regis.MonthlyMetrics |
| **Outputs** | Store Scorecard Data_Brand Peers |
| **App impact** | Store Performance Report Card and Scorecard pages (both apps) |

### Corp Employees Daily Sales ETL

| Item | Value |
| --- | --- |
| **Status** | ENABLED — last run SUCCESS |
| **Refresh trigger** | When **domo.CorpEmployeeDailySales** or **Daily Sales Master** updates (UTC) |
| **Inputs** | Daily Sales Master, domo.CorpEmployeeDailySales |
| **Outputs** | Corp Employee Daily Sales Master |
| **App impact** | Corporate employee daily sales (if used on pages) |

### Sales by Store by Day ETL

| Item | Value |
| --- | --- |
| **Status** | ENABLED — last run SUCCESS |
| **Refresh trigger** | When **Daily Sales** or **Daily Labor** updates (America/Chicago) |
| **Inputs** | Monthly Employee Retention, Monthly New Guests, DimDateOld, Daily Labor, Daily Sales, Monthly Days Between Visits, Alline Salon Master, Alline Total Sales Forecast, Corporate Salons, Salons |
| **Outputs** | Employee Retention, Alline Stores Month Targets, Days Between Visits, Sales by Store by Day, New Guests |
| **App impact** | Retention and guest metrics feeding master datasets |

### Regis Stock History Builder

| Item | Value |
| --- | --- |
| **Status** | ENABLED — last run SUCCESS |
| **Refresh trigger** | When **Regis Stock Data Current** updates (UTC) |
| **Inputs** | Regis Stock Data Current, Regis Stock Data History |
| **Outputs** | Regis Stock Data History |
| **App impact** | Stock data (not directly on main app pages) |

## Dependency chain

```
Upstream connectors / warehouse
    │
    ├── Sales by Store by Day ETL ──► (retention, guest datasets)
    │
    ├── Daily Sales ETL 2 ──► Daily Sales Master 2
    │       │
    │       ├── Daily Sales Master Indexing 2 ──► Daily Sales Indexed by Store 2
    │       └── Store Scorecard by Brand ETL ──► Store Scorecard Data_Brand Peers
    │
    └── Corp Employees Daily Sales ETL ──► Corp Employee Daily Sales Master
```

## Manual re-run order

When recovering from a failure, re-run in this order:

1. Daily Sales ETL 2
2. Daily Sales Master Indexing 2
3. Store Scorecard by Brand ETL
4. Corp Employees Daily Sales ETL (if needed)

## Related documents

- [Runbook — refresh failures](../maintenance/runbook-refresh-failures.md)
- [Daily Sales Master 2](./daily-sales-master-2.md)
- [Shared dataset inventory (shared)](../../shared/dataset-inventory.md)
