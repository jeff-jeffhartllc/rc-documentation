# Troubleshooting Guide — PDP and Access (Franchisee App)

<div class="cover-meta">

**App:** REGIS FRANCHISEE APP  
**Document type:** Troubleshooting guide  
**Audience:** Franchisee support, PDP owners, app owners  
**Last updated:** 2026-07-13  
**Author / owner:** _TBD — PDP / access owner_

</div>

## How to use this guide

Look up the symptom. Follow checks in order. PDP issues are **high priority** because they affect data privacy.

## Quick reference

| Symptom | Likely cause | First action |
| --- | --- | --- |
| Franchisee sees **no data** | Missing PDP assignment; data refresh failure | Verify user group and PDP policy |
| Franchisee sees **wrong stores** | Incorrect PDP mapping; stale DimSalon | Review PDP attribute and DimSalon franchisee key |
| Franchisee sees **all stores** | Using REGIS APP instead; PDP not applied | Confirm user opens REGIS FRANCHISEE APP |
| One salon missing | Salon not in DimSalon or not assigned | Check upstream master and PDP |
| Cards error after corporate change | Dataset schema or field change | Check dataflow status; update PDP field mapping |

## Franchisee sees no data

### Checks

1. Confirm user opens **REGIS FRANCHISEE APP** (not REGIS APP).
2. Verify user exists and is enabled in Domo Admin.
3. Verify user is in **RestrictedDataAccess** (Domo group ID `950576281`).
4. Verify the user's **Ownership** attribute matches `FranchiseeNumber` values in Daily Sales Master 2 (Admin → Governance → Attributes).
5. In **Data** → **Daily Sales Master 2** → **PDP**, confirm the **Franchisee** policy includes RestrictedDataAccess.
6. Check **Daily Sales Master 2** last refresh — blank cards may be a data issue, not PDP.

### Resolution

| Root cause | Fix |
| --- | --- |
| No PDP assignment | Add user to **RestrictedDataAccess**; set **Ownership** attribute to franchisee ID |
| Data refresh failure | [Runbook — refresh failures](../../regis-app/maintenance/runbook-refresh-failures.md) |
| New user not provisioned | Complete user setup per [User roles and access](./user-roles-and-access.md) |

## Franchisee sees wrong stores

### Checks

1. Log in as or impersonate the franchisee user.
2. Open Salon filter — list all visible salon names.
3. Compare to expected salon list from franchisee master data.
4. In Admin: review user's **Ownership** attribute and **Franchisee** PDP policy (`FranchiseeNumber` EQUALS Ownership).
5. Check **DimSalon** for franchisee key on the unexpected salons.

### Resolution

| Root cause | Fix |
| --- | --- |
| Wrong Ownership attribute on user | Correct **Ownership** in Governance → People / Attributes |
| Stale DimSalon | Wait for upstream refresh; re-run Daily Sales ETL 2 |
| Salon reassignment not reflected | Update upstream master; re-run ETL; re-test PDP |

## Franchisee sees all stores (data leakage)

**Escalate immediately** to PDP / access owner and Domo Admin.

### Checks

1. Confirm which app the user is viewing (URL must contain `2028360971`).
2. Check if user is in **AllDataAccess** or has Admin role (full data access for testing).
3. Review PDP policy — confirm it is attached to the user/group.

### Resolution

- Remove user from **AllDataAccess**; add to **RestrictedDataAccess** only.
- Confirm **Franchisee** PDP policy is enabled on Daily Sales Master 2 (`8d851507-f995-4918-abc8-90032b2eff65`).
- Audit recent access logs if available.

## After corporate app or dataset changes

1. Open franchisee test account.
2. Verify salon count and totals on Franchisee Performance.
3. Spot-check Store Performance Report Card for a known salon.
4. If cards error: identify changed dataset field and update PDP mapping.

## Related topics

- [PDP overview and testing (shared)](../../shared/pdp-overview-and-testing.md)
- [PDP policy inventory (shared)](../../shared/pdp-policy-inventory.md)
- [DimSalon data source](../../regis-app/data-sources/dimsalon-dataset.md)
- [Escalation and support (shared)](../../shared/escalation-and-support.md)
