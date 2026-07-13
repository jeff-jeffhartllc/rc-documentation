# Data Source Guide — DimSalon

<div class="cover-meta">

**App(s):** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Data source guide  
**Audience:** Data owners, analysts, PDP owners  
**Domo dataset:** DimSalon (warehouse: **domo_regis.MonthlySalonCounts**)  
**Last updated:** 2026-07-13  
**Author / owner:** _TBD — data owner_

</div>

## Summary

**DimSalon** is the salon dimension table containing brand, franchisee, salon, geographic, and status attributes. It is an input to Daily Sales ETL 2. In Domo Data Center the underlying warehouse dataset is **domo_regis.MonthlySalonCounts**.

**PDP is not enabled** on this dataset. Franchisee row scoping is applied on downstream datasets (Daily Sales Master 2, Store Scorecard Data, etc.) via the **Ownership** attribute and **RestrictedDataAccess** group. See [PDP overview](../../shared/pdp-overview-and-testing.md).

## Lineage

```
Upstream salon master (Alline Salon Master / warehouse) ──► DimSalon / MonthlySalonCounts ──► Daily Sales ETL 2 ──► Daily Sales Master 2 (PDP enabled)
```

## Key fields

| Field | Description | Notes |
| --- | --- | --- |
| Salon | Salon/location identifier | Primary store key |
| Brand | Regis brand | Filter dimension (via DSM2) |
| Franchisee | Franchisee operator | Propagates to `FranchiseeNumber` in DSM2 |
| Country, State / Province, Territory, DMA | Geographic attributes | Filter dimensions |
| Is Active? | Active salon flag | Used in Active Only filter default |
| Distribution Pattern | Operating model | Normal Only filter |
| Entity Type | Corporate vs. franchise | Corporate app filter |

## PDP relevance

DimSalon does **not** have its own PDP policies. Franchisee access is controlled by:

1. **Ownership** custom attribute on the user profile
2. **RestrictedDataAccess** membership (via that group's **dynamic group rules**)
3. **Franchisee** row policy on Daily Sales Master 2 and other governed datasets (`FranchiseeNumber` = **Ownership**)

When salon ownership changes, update upstream master data so ETL refreshes `FranchiseeNumber` in downstream datasets — PDP policies do not need to change unless attribute or column names change.

## Failure handling

| Failure mode | Response |
| --- | --- |
| New salon missing from filters | Check DimSalon / MonthlySalonCounts refresh and upstream master |
| Franchisee sees wrong stores | Validate franchisee key in DSM2; check user's **Ownership** attribute (not DimSalon PDP) |
| Geographic filters stale | Re-run upstream connector and ETL |

## Related documents

- [PDP overview (shared)](../../shared/pdp-overview-and-testing.md)
- [PDP policy inventory (shared)](../../shared/pdp-policy-inventory.md)
- [Daily Sales Master 2](./daily-sales-master-2.md)
- [Franchisee PDP troubleshooting](../../regis-franchisee-app/maintenance/pdp-troubleshooting.md)
