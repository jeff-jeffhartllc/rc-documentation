# Data Source Guide — Store Scorecard Data_Brand Peers

<div class="cover-meta">

**App(s):** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Data source guide  
**Audience:** Data owners, analysts  
**Domo dataset:** Store Scorecard Data_Brand Peers  
**Dataset ID:** `41cb7308-2860-431e-92ca-7b63049b8ce9`  
**Last updated:** 2026-07-13  
**Author / owner:** _TBD — data owner_

</div>

## Summary

**Store Scorecard Data_Brand Peers** is the scorecard dataset used by the Store Performance Report Card and Store Performance Scorecard pages in both apps. It contains monthly store scores, SSS metrics, SPH, and brand peer comparisons.

> **Naming note:** There is a single scorecard dataset — **Store Scorecard Data_Brand Peers**. There is no separate Domo dataset named “Store Scorecard Data.”

## Lineage

```
Daily Sales Master 2 ──┐
                        ├──► Store Scorecard by Brand ETL ──► Store Scorecard Data_Brand Peers
domo_regis.MonthlyMetrics ┘          (PDP enabled — ID 41cb7308-2860-431e-92ca-7b63049b8ce9)
```

## Downstream usage

| App | Page | Dataset |
| --- | --- | --- |
| REGIS APP | Store Performance Report Card (`686205723`) | Store Scorecard Data_Brand Peers |
| REGIS APP | Store Performance Scorecard (`1910351785`) | Store Scorecard Data_Brand Peers |
| REGIS FRANCHISEE APP | Store Performance Report Card (`1731862460`) | Store Scorecard Data_Brand Peers |
| REGIS FRANCHISEE APP | Store Performance Scorecard (`1073407012`) | Store Scorecard Data_Brand Peers |

## Key metrics on scorecard pages

| Metric | Description |
| --- | --- |
| Avg Cumulative Score — In Scope | Average cumulative score for filtered stores |
| SSS — MTD / QTD | Same-store sales month/quarter to date |
| SPH (Svc Sales) | Service sales per hour |
| SST Letter Grade | Letter grade per Reference page definitions |

## PDP note

**domo_regis.MonthlyMetrics** (upstream input) and **Store Scorecard Data_Brand Peers** (ETL output) have PDP row filtering with the **Franchisee** policy (`FranchiseeNumber` = **Ownership** → RestrictedDataAccess). See [PDP policy inventory](../../shared/pdp-policy-inventory.md).

## Failure handling

| Failure mode | Response |
| --- | --- |
| Store Scorecard by Brand ETL fails | Re-run after Daily Sales Master 2 and MonthlyMetrics are current |
| Scorecard cards blank | Check Store Scorecard by Brand ETL status and last run |
| Peer comparison missing | Verify Store Scorecard Data_Brand Peers last updated timestamp |

## Related topics

- [Store Performance Report Card (daily use)](../daily-use/store-performance-report-card.md)
- [Dataflow inventory](./dataflow-inventory.md)
- [Daily Sales Master 2](./daily-sales-master-2.md)
- [PDP policy inventory (shared)](../../shared/pdp-policy-inventory.md)
