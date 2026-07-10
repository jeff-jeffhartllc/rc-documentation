# Data Sources — REGIS FRANCHISEE APP

<div class="cover-meta">

**App:** REGIS FRANCHISEE APP  
**Document type:** Data source guide  
**Audience:** Data owners, franchisee support  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — data owner_

</div>

## Summary

REGIS FRANCHISEE APP uses the **same datasets** as REGIS APP. PDP filters rows at query time so franchisee users see only their stores. There are no franchisee-specific datasets.

## Shared datasets

| Dataset | Franchisee app usage | PDP governed? |
| --- | --- | --- |
| Daily Sales Master 2 | All performance pages | Yes (likely) |
| Store Scorecard Data | Report Card page | Yes (likely) |
| Store Scorecard Data_Brand Peers | Scorecard page | Yes (likely) |
| Daily Sales Indexed by Store 2 | Indexed cards | Yes (likely) |
| DimSalon | Filter dimensions | Yes (likely) |

## Data refresh

Franchisee users depend on the same dataflow schedule as corporate users. If data is stale for all franchisees, follow the corporate refresh runbook — this is not a PDP issue.

See:

- [Dataflow inventory (REGIS APP)](../regis-app/data-sources/dataflow-inventory.md)
- [Daily Sales Master 2 (REGIS APP)](../regis-app/data-sources/daily-sales-master-2.md)
- [Shared dataset inventory (shared)](../../shared/dataset-inventory.md)
- [Runbook — refresh failures (REGIS APP)](../regis-app/maintenance/runbook-refresh-failures.md)

## When data issues look like PDP issues

| Observation | Likely cause |
| --- | --- |
| All franchisees see stale data | Dataflow failure |
| One franchisee sees no data | PDP assignment |
| One franchisee sees wrong stores | PDP mapping or DimSalon |
| Cards error for all users | Dataset schema change |

## Related documents

- [PDP troubleshooting](../maintenance/pdp-troubleshooting.md)
- [REGIS app relationship (shared)](../../shared/regis-app-relationship.md)
