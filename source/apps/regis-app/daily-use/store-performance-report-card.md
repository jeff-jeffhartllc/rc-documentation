# REGIS APP — Store Performance Report Card

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Daily use guide  
**Audience:** Corporate operations, field leadership  
**Domo page:** Store Performance Report Card (`686205723`)  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Purpose

The **Store Performance Report Card** page provides monthly store-level performance scores, cumulative metrics, and same-store sales (SSS) tracking for coaching and accountability.

## Opening the page

1. REGIS APP → **Store Performance Report Card**  
   https://regiscorp.domo.com/app-studio/183500481/pages/686205723
2. **Expected result:** Report card layout with monthly filter and score tables.

![Store Performance Report Card](../../assets/app-183500481-page-store-performance-report-card.png)

## Filters

| Filter | Notes |
| --- | --- |
| Entity Type, Brand, Franchisee, Salon | Scope drill-down |
| Country, State / Province, Territory, DMA | Geographic |
| Is Active? | Active Only |
| Distribution Pattern | Normal Only |
| Filter by Month | Select reporting month for report card |

## Key cards

| Card | What it shows |
| --- | --- |
| Report Card | Main store report card table with scores |
| Avg Cumulative Score — In Scope | Average cumulative score for filtered stores |
| SSS — MTD | Same-store sales month-to-date |
| SSS — QTD | Same-store sales quarter-to-date |
| _(additional score/metric cards)_ | Monthly and cumulative performance metrics |

## Common tasks

### Task: Review a salon's monthly report card

1. Set **Filter by Month** to the target month.
2. Filter **Salon** to the specific location.
3. Review **Report Card** and **Avg Cumulative Score — In Scope**.
4. **Expected result:** Monthly scores and SSS metrics for the selected salon.

## Data source

Primary dataset: **Store Scorecard Data_Brand Peers** (built by Store Scorecard by Brand ETL from Daily Sales Master 2 and domo_regis.MonthlyMetrics).

## Related documents

- [Store Performance Scorecard](./store-performance-scorecard.md)
- [Store Scorecard Data_Brand Peers source](../data-sources/store-scorecard-data.md)
