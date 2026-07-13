# Shared Dataset Inventory

<div class="cover-meta">

**Apps:** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Shared data reference  
**Audience:** Data owners, analysts, app owners  
**Domo instance:** https://regiscorp.domo.com  
**Last updated:** 2026-07-13  
**Author / owner:** _TBD — data owner_

</div>

## Purpose

This document lists datasets shared between REGIS APP and REGIS FRANCHISEE APP, their upstream dataflows, and which app pages depend on them.

## Primary datasets (both apps)

| Dataset | Dataflow output | Primary app usage | Refresh dependency |
| --- | --- | --- | --- |
| **Daily Sales Master 2** | Daily Sales ETL 2 | All performance pages — primary card and filter source | Daily Sales ETL 2; upstream FactDailySales |
| **Daily Sales Indexed by Store 2** | Daily Sales Master Indexing 2 | Performance cards, indexed lookups | Daily Sales Master 2 |
| **Store Scorecard Data_Brand Peers** | Store Scorecard by Brand ETL | Store Performance Report Card, Store Performance Scorecard | Daily Sales Master 2; domo_regis.MonthlyMetrics |
| **DimSalon** | Upstream connector / warehouse | Brand, Salon, Territory, DMA, Country filters | Upstream salon master sync; **no PDP** (Domo: domo_regis.MonthlySalonCounts) |

## Secondary datasets

| Dataset | Dataflow output | Notes |
| --- | --- | --- |
| Daily Sales Indexed by Store 2 | Daily Sales Master Indexing 2 | Also listed in primary datasets; **PDP enabled** (ID `0239c170-55d5-43e1-9a92-a3498ba68548`) |
| Daily Sales Unpivoted Services 2 | Daily Sales ETL 2 | Service-type breakdowns; **PDP enabled** |
| DSM2 - Daily Sales By Traffic | Daily Sales ETL 2 | Traffic-based sales splits; **PDP enabled** |
| Corp Employee Daily Sales Master | Corp Employees Daily Sales ETL | Corporate employee daily sales |
| Sales by Store by Day | Sales by Store by Day ETL | Daily store-level sales |
| Employee Retention | Sales by Store by Day ETL | Loyalty / retention metrics |
| New Guests | Sales by Store by Day ETL | New guest counts |
| Days Between Visits | Sales by Store by Day ETL | Visit frequency metrics |

## Upstream warehouse / connector datasets

These feed the Magic ETL dataflows and are not directly bound to app cards:

| Dataset | Used by dataflow | PDP |
| --- | --- | --- |
| domo_regis.FactDailySales | Daily Sales ETL 2 | **Enabled** — see [PDP policy inventory](./pdp-policy-inventory.md) |
| domo_regis.MonthlyMetrics | Store Scorecard by Brand ETL | **Enabled** — see [PDP policy inventory](./pdp-policy-inventory.md) |
| AllineDailyLabor | Daily Sales ETL 2 | _TBD_ |
| Alline Total Sales Forecast | Daily Sales ETL 2 | _TBD_ |
| DimDate | Daily Sales ETL 2 | _TBD_ |
| domo.CorpEmployeeDailySales | Corp Employees Daily Sales ETL | _TBD_ |
| Alline Salon Master | Sales by Store by Day ETL | _TBD_ |
| Daily Labor, Daily Sales | Sales by Store by Day ETL | _TBD_ |
| Corporate Salons, Salons | Sales by Store by Day ETL | _TBD_ |

## Dataset → page mapping

| Dataset | REGIS APP pages | REGIS FRANCHISEE APP pages |
| --- | --- | --- |
| Daily Sales Master 2 | Corporate Overview, Franchisee Performance, Reference | Franchisee Performance, Reference |
| Store Scorecard Data_Brand Peers | Store Performance Report Card, Store Performance Scorecard | Store Performance Report Card, Store Performance Scorecard |
| Daily Sales Indexed by Store 2 | Performance pages (indexed cards) | Performance pages (indexed cards) |

## PDP-governed datasets

Captured from live Domo on 2026-07-13. See [PDP policy inventory](./pdp-policy-inventory.md) for full policy detail.

| Dataset | Dataset ID | PDP | Franchisee filter |
| --- | --- | --- | --- |
| **Daily Sales Master 2** | `8d851507-f995-4918-abc8-90032b2eff65` | **Yes** — Row Filtering ON | `FranchiseeNumber` = **Ownership** (RestrictedDataAccess) |
| **domo_regis.MonthlyMetrics** | `f303a86a-67b5-49fa-8874-195eab30506c` | **Yes** — Row Filtering ON | `FranchiseeNumber` = **Ownership** (RestrictedDataAccess) |
| **domo_regis.FactDailySales** | `5bdaf9aa-0950-432e-a9ce-eaa7cffb2796` | **Yes** — Row Filtering ON | `FranchiseeNumber` = **Ownership** (RestrictedDataAccess) |
| **Daily Sales Unpivoted Services 2** | `e8d85e2e-6464-40d2-b4e4-a2f138de815d` | **Yes** — Row Filtering ON | `FranchiseeNumber` = **Ownership** (RestrictedDataAccess) |
| **DSM2 - Daily Sales By Traffic** | `b5bac1e5-bd22-47b9-b8de-a19bc0237de0` | **Yes** — Row Filtering ON | `FranchiseeNumber` = **Ownership** (RestrictedDataAccess) |
| **Store Scorecard Data_Brand Peers** | `41cb7308-2860-431e-92ca-7b63049b8ce9` | **Yes** — Row Filtering ON | `FranchiseeNumber` = **Ownership** (RestrictedDataAccess) |
| **Daily Sales Indexed by Store 2** | `0239c170-55d5-43e1-9a92-a3498ba68548` | **Yes** — Row Filtering ON | `FranchiseeNumber` = **Ownership** (RestrictedDataAccess) |
| DimSalon / domo_regis.MonthlySalonCounts | — | **No** | Scoping via downstream PDP datasets |

**Domo groups (Daily Sales Master 2):**

| Group | ID | PDP role |
| --- | --- | --- |
| AllDataAccess | `2014419418` | Full row access |
| RestrictedDataAccess | `950576281` | Franchisee-scoped access |

## Related documents

- [Daily Sales Master 2 data source guide](../apps/regis-app/data-sources/daily-sales-master-2.md)
- [PDP policy inventory](./pdp-policy-inventory.md)
- [Dataflow inventory](../apps/regis-app/data-sources/dataflow-inventory.md)
- [PDP overview and testing](./pdp-overview-and-testing.md)
- [REGIS app relationship guide](./regis-app-relationship.md)
