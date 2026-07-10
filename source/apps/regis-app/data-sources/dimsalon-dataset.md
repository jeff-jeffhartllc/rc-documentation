# Data Source Guide — DimSalon

<div class="cover-meta">

**App(s):** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Data source guide  
**Audience:** Data owners, analysts, PDP owners  
**Domo dataset:** DimSalon  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — data owner_

</div>

## Summary

**DimSalon** is the salon dimension table containing brand, franchisee, salon, geographic, and status attributes. It is an input to Daily Sales ETL 2 and likely a key dataset for PDP store assignments.

## Lineage

```
Upstream salon master (Alline Salon Master / warehouse) ──► DimSalon ──► Daily Sales ETL 2 ──► Daily Sales Master 2
```

## Key fields

| Field | Description | Notes |
| --- | --- | --- |
| Salon | Salon/location identifier | Primary store key |
| Brand | Regis brand | Filter dimension |
| Franchisee | Franchisee operator | **Critical for PDP mapping** |
| Country, State / Province, Territory, DMA | Geographic attributes | Filter dimensions |
| Is Active? | Active salon flag | Used in Active Only filter default |
| Distribution Pattern | Operating model | Normal Only filter |
| Entity Type | Corporate vs. franchise | Corporate app filter |

## PDP relevance

Franchisee store assignments in PDP most likely map user attributes to **Franchisee** and/or **Salon** fields in DimSalon (or the same fields propagated into Daily Sales Master 2). When salon ownership changes:

1. Update upstream salon master data.
2. Wait for DimSalon refresh.
3. Re-run Daily Sales ETL 2.
4. Verify PDP scope for affected franchisee users.

## Failure handling

| Failure mode | Response |
| --- | --- |
| New salon missing from filters | Check DimSalon refresh and upstream master |
| Franchisee sees wrong stores | Validate franchisee key in DimSalon; check PDP mapping |
| Geographic filters stale | Re-run upstream connector and ETL |

## Related documents

- [PDP overview (shared)](../../shared/pdp-overview-and-testing.md)
- [Daily Sales Master 2](./daily-sales-master-2.md)
- [Franchisee PDP troubleshooting](../../regis-franchisee-app/maintenance/pdp-troubleshooting.md)
