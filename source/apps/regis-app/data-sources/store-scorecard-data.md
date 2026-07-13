# Data Source Guide — Store Scorecard Data

<div class="cover-meta">

**App(s):** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Data source guide  
**Audience:** Data owners, analysts  
**Domo datasets:** Store Scorecard Data, Store Scorecard Data_Brand Peers  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — data owner_

</div>

## Summary

**Store Scorecard Data** and **Store Scorecard Data_Brand Peers** power the Store Performance Report Card and Store Performance Scorecard pages in both apps. They contain monthly store scores, SSS metrics, SPH, and brand peer comparisons.

## Lineage

```
Daily Sales Master 2 ──┐
                        ├──► Store Scorecard ETL ──► Store Scorecard Data
domo_regis.MonthlyMetrics ┘          (PDP enabled — FranchiseeNumber = Ownership)

Daily Sales Master 2 ──┐
                        ├──► Store Scorecard by Brand ETL ──► Store Scorecard Data_Brand Peers
domo_regis.MonthlyMetrics ┘          (PDP enabled — FranchiseeNumber = Ownership)
```

## Downstream usage

| App | Page | Dataset |
| --- | --- | --- |
| REGIS APP | Store Performance Report Card (`686205723`) | Store Scorecard Data |
| REGIS APP | Store Performance Scorecard (`1910351785`) | Store Scorecard Data + Brand Peers |
| REGIS FRANCHISEE APP | Store Performance Report Card (`1731862460`) | Store Scorecard Data |
| REGIS FRANCHISEE APP | Store Performance Scorecard (`1073407012`) | Store Scorecard Data + Brand Peers |

## Key metrics on scorecard pages

| Metric | Description |
| --- | --- |
| Avg Cumulative Score — In Scope | Average cumulative score for filtered stores |
| SSS — MTD / QTD | Same-store sales month/quarter to date |
| SPH (Svc Sales) | Service sales per hour |
| SST Letter Grade | Letter grade per Reference page definitions |

## PDP note

**domo_regis.MonthlyMetrics** (upstream input) has PDP row filtering enabled with the same **Franchisee** policy as Daily Sales Master 2 (`FranchiseeNumber` = **Ownership** → RestrictedDataAccess). PDP on **Store Scorecard Data** and **Store Scorecard Data_Brand Peers** (ETL outputs) was not captured in this documentation pass — verify in Data Center if franchisee scorecard scope looks incorrect.

## Failure handling

| Failure mode | Response |
| --- | --- |
| Store Scorecard ETL fails | Re-run after Daily Sales Master 2 is current |
| Scorecard cards blank | Check both Store Scorecard ETL and by Brand ETL status |
| Peer comparison missing | Verify Store Scorecard by Brand ETL output |

## Related documents

- [Store Performance Report Card (daily use)](../daily-use/store-performance-report-card.md)
- [Dataflow inventory](./dataflow-inventory.md)
- [Daily Sales Master 2](./daily-sales-master-2.md)
- [PDP policy inventory (shared)](../../shared/pdp-policy-inventory.md)
