# Personalized Data Permissions (PDP) — Overview and Testing

<div class="cover-meta">

**Apps:** REGIS FRANCHISEE APP (primary), REGIS APP (reference)  
**Document type:** Shared cross-app reference  
**Audience:** PDP / access owners, app owners, support staff  
**Domo instance:** https://regiscorp.domo.com  
**Last updated:** 2026-07-13  
**Author / owner:** _TBD — PDP / access owner_

</div>

## Purpose

This guide explains how Personalized Data Permissions (PDP) limit franchisee users to their own stores in REGIS FRANCHISEE APP, how to maintain PDP rules, and how to test that access is correct.

For the **live policy inventory** (policy names, groups, filter columns, dataset IDs), see [PDP policy inventory](./pdp-policy-inventory.md).

## PDP architecture: groups, custom attributes, and row policies

Regis franchisee scoping uses Domo **Personalized Data Permissions (PDP)** with **Dynamic PDP** — row filters whose values come from **custom user attributes**, applied to users via **Domo group membership**. This is a two-step model:

```
┌─────────────────────┐     ┌──────────────────────────┐     ┌─────────────────────────┐
│  Domo group         │     │  PDP row policy on       │     │  Rows returned at       │
│  membership         │ ──► │  each governed dataset   │ ──► │  query time             │
└─────────────────────┘     └──────────────────────────┘     └─────────────────────────┘
         │                              │
         │                              └── Dynamic filter: dataset column EQUALS user attribute
         │
         └── Determines WHICH policy applies (All Rows vs Franchisee vs Territory)
```

**Group membership** decides which row policy applies to a user. **Custom attributes** on the user profile supply the filter value for dynamic policies. Both must be correct for franchisee access to work.

### Custom attributes (Governance → Attributes)

| Attribute | Used by | PDP filter pattern | Audience |
| --- | --- | --- | --- |
| **Ownership** | **Franchisee** row policy on all franchisee-scoped datasets | `FranchiseeNumber` **EQUALS** `Ownership` (dynamic) | Franchisee users in **RestrictedDataAccess** |
| **Territory** | **TerritoryDataAccess** row policy on legacy Daily Sales Master only | `Alline_territory` **EQUALS** `Territory` (dynamic) | Territory leaders in **TerritoryDataAccess** |

**Ownership** is the primary franchisee key. Each franchisee user's **Ownership** value must match the `FranchiseeNumber` column in governed datasets (for example Daily Sales Master 2). Values are set in **Admin → Governance → People** when the user is provisioned.

**Territory** applies only to the legacy **Daily Sales Master** dataset, not to Daily Sales Master 2 or REGIS FRANCHISEE APP.

### Domo groups tied to PDP policies

| Group | Group ID | Members (2026-07-13) | PDP policy | Effect |
| --- | --- | --- | --- | --- |
| **AllDataAccess** | `2014419418` | 49 | **All Rows** (open) | Sees all rows on governed datasets |
| **RestrictedDataAccess** | `950576281` | 15 | **Franchisee** (dynamic) | Sees rows where `FranchiseeNumber` = user's **Ownership** |
| **TerritoryDataAccess** | `1547677730` | _not counted_ | **TerritoryDataAccess** on legacy DSM | Sees rows where `Alline_territory` = user's **Territory** |
| **3c090c15-223e-4377-bf0f-60e2eec980b4** | `1197243980` | 3 | **All Rows** (open) | Internal / test full access (group name is a UUID) |

All Admins and DataSet Owners also receive **All Rows** access via Domo's built-in open-policy rule.

> **Note on dynamic groups:** Domo supports **dynamic groups** (membership rules based on attributes). This documentation captures **group names, IDs, and PDP bindings** from the live instance. Whether **RestrictedDataAccess** or **AllDataAccess** membership is maintained manually or by dynamic group rules should be confirmed in **Admin → Governance → Groups** → select group → membership rules.

### Standard row policies (replicated across datasets)

Nearly every PDP-enabled dataset uses the same two franchisee policies:

| Policy name | Type | Groups | Filter |
| --- | --- | --- | --- |
| **All Rows** | Open (all data) | AllDataAccess, admins, UUID test group | None |
| **Franchisee** | User (filtered) | RestrictedDataAccess | `FranchiseeNumber` = **Ownership** |

Legacy **Daily Sales Master** adds **TerritoryDataAccess** (`Alline_territory` = **Territory**) for territory leaders.

PDP is configured **per dataset** (Data → dataset → **PDP** → Row Policies → enable **Row Filtering**). The same group and attribute bindings are repeated on each governed dataset listed in [PDP policy inventory](./pdp-policy-inventory.md).

### Datasets without PDP

| Dataset | Domo name | PDP | Notes |
| --- | --- | --- | --- |
| Salon dimension | **DimSalon** / **domo_regis.MonthlySalonCounts** | **No** | Master dimension input to ETL; franchisee scoping happens on downstream datasets (DSM2, scorecard outputs, etc.) |

Franchisee users do not need PDP on the salon master because app cards and filters read from PDP-governed datasets where `FranchiseeNumber` is already present.

### Provisioning a new franchisee user

1. **Admin → Governance → People** — create or locate the user.
2. Set custom attribute **Ownership** to the franchisee identifier (must match `FranchiseeNumber` in Daily Sales Master 2).
3. **Admin → Governance → Groups** — add user to **RestrictedDataAccess**; confirm they are **not** in **AllDataAccess**.
4. Grant access to **REGIS FRANCHISEE APP** (not REGIS APP unless intentional).
5. Test per [Testing PDP](#testing-pdp) below.

### Changing franchisee scope

1. Update **Ownership** on the user (or group membership if moving between corporate and franchisee).
2. Confirm upstream salon master and ETL have refreshed so `FranchiseeNumber` values are current.
3. Re-test in REGIS FRANCHISEE APP. No PDP policy edit is required unless the filter column or attribute name changes.

## How PDP works in REGIS FRANCHISEE APP

1. A franchisee user logs in to **regiscorp.domo.com** and opens **REGIS FRANCHISEE APP**.
2. Domo evaluates PDP row policies on governed datasets — primarily **Daily Sales Master 2**.
3. For users in **RestrictedDataAccess**, the **Franchisee** policy filters rows where `FranchiseeNumber` equals the user's **Ownership** attribute.
4. Page-level filters (Brand, Salon, DMA, etc.) operate **within** the PDP-permitted row set.

Corporate users in **REGIS APP** are governed by standard Domo roles (Admin, Privileged, Editor, Participant) and page filters. Users in **AllDataAccess** see all rows via the **All Rows** open policy.

## Expected PDP behavior

| User type | App | Expected data scope |
| --- | --- | --- |
| Corporate analyst (AllDataAccess) | REGIS APP | All stores (subject to page filters and role) |
| Territory leader (TerritoryDataAccess) | REGIS APP | Territory-scoped on legacy Daily Sales Master; confirm DSM2 access separately |
| Franchisee operator (RestrictedDataAccess) | REGIS FRANCHISEE APP | Only salons where `FranchiseeNumber` matches user's **Ownership** attribute |
| Franchisee with multiple brands | REGIS FRANCHISEE APP | All assigned salons across brands (if Ownership covers them) |
| Unassigned franchisee user | REGIS FRANCHISEE APP | **No data** or empty cards |

## Governed datasets

| Dataset | Dataset ID | PDP confirmed | Policy summary |
| --- | --- | --- | --- |
| **Daily Sales Master 2** | `8d851507-f995-4918-abc8-90032b2eff65` | **Yes** | **All Rows** (AllDataAccess + admins) · **Franchisee** (`FranchiseeNumber` = Ownership) |
| Daily Sales Master (legacy) | `19ae8295-9dab-4277-963a-f9c7aab23f78` | Yes | **All Rows** · **TerritoryDataAccess** (`Alline_territory` = Territory) |
| **domo_regis.MonthlyMetrics** | `f303a86a-67b5-49fa-8874-195eab30506c` | **Yes** | Same as DSM2: **All Rows** · **Franchisee** (`FranchiseeNumber` = Ownership) |
| **domo_regis.FactDailySales** | `5bdaf9aa-0950-432e-a9ce-eaa7cffb2796` | **Yes** | Same as DSM2: **All Rows** · **Franchisee** (`FranchiseeNumber` = Ownership) |
| **Daily Sales Unpivoted Services 2** | `e8d85e2e-6464-40d2-b4e4-a2f138de815d` | **Yes** | Same as DSM2 (ETL derivative; not primary app source) |
| **DSM2 - Daily Sales By Traffic** | `b5bac1e5-bd22-47b9-b8de-a19bc0237de0` | **Yes** | Same as DSM2 (ETL derivative; not primary app source) |
| **Store Scorecard Data_Brand Peers** | `41cb7308-2860-431e-92ca-7b63049b8ce9` | **Yes** | **All Rows** · **Franchisee** (`FranchiseeNumber` = Ownership) |
| **Daily Sales Indexed by Store 2** | `0239c170-55d5-43e1-9a92-a3498ba68548` | **Yes** | **All Rows** · **Franchisee** (`FranchiseeNumber` = Ownership) |
| **Store Scorecard Data** | _same pattern as Brand Peers_ | **Yes** | **All Rows** · **Franchisee** (confirmed; identical to Brand Peers capture) |
| DimSalon / domo_regis.MonthlySalonCounts | Salon dimension (ETL input) | **No** | Scoping via downstream PDP datasets |

## Where PDP is configured in Domo

| Location | How to open | What you configure |
| --- | --- | --- |
| **Dataset PDP tab (primary)** | **Data** → **Daily Sales Master 2** → **PDP** → **Row Policies** | Row filters per group/user; enable/disable row filtering |
| Direct URL | `https://regiscorp.domo.com/datasources/{dataset-id}/details/rls` | Same PDP editor |
| **Admin → Governance** | **More** → **Admin** → **Governance** | Users, groups, roles, **Ownership** and other attributes used by Dynamic PDP |

During library authoring, legacy deep links such as `/admin/personalizeddata` returned 404 on this instance. Use the dataset **PDP** tab instead.

## How franchisee store assignments are determined

1. **Group membership** — franchisee users belong to **RestrictedDataAccess** (15 members as of 2026-07-13).
2. **Ownership attribute** — each user's **Ownership** value must match `FranchiseeNumber` in Daily Sales Master 2.
3. **PDP policy** — the **Franchisee** row policy applies the dynamic filter `FranchiseeNumber EQUALS Ownership`.
4. **Upstream master data** — salon-to-franchisee relationships must stay current in DimSalon / **domo_regis.MonthlySalonCounts** so `FranchiseeNumber` in DSM2 is accurate after ETL runs (DimSalon itself has no PDP).

When a salon changes franchisee ownership or a new salon opens, update upstream master data **and** verify the franchisee user's **Ownership** attribute and PDP scope.

## Accessing PDP configuration in Domo

You need **Admin** or appropriate governance grants.

1. Sign in to https://regiscorp.domo.com as an Admin user.
2. Open **Data** → **Daily Sales Master 2** → **PDP** → **Row Policies**.
3. Review **All Rows** and **Franchisee** policies; use **IMPACT** to see affected users.
4. In **Admin** → **Governance** → **Groups**, manage **RestrictedDataAccess** and **AllDataAccess** membership.
5. In **Admin** → **Governance** → **Attributes**, confirm the **Ownership** attribute mapping for franchisee users.

## Testing PDP

### Test as an admin (impersonation)

1. Use test accounts **Jeff Franchisee** or a known franchisee user in **RestrictedDataAccess**.
2. In Domo Admin, use **View as User** (or equivalent impersonation) to open REGIS FRANCHISEE APP as that franchisee.
3. On **Franchisee Performance**, verify:
   - Only the franchisee's salons appear in the Salon filter.
   - Totals match expected salon count for that franchisee.
   - No other franchisee's salon names or totals are visible.
4. Repeat on **Store Performance Report Card** and **Store Performance Scorecard**.
5. Document test date, account used, and expected vs. actual salon count.

### Test as a franchisee user

1. Log in directly as the franchisee test account (not impersonation).
2. Open REGIS FRANCHISEE APP → **Franchisee Performance**.
3. Confirm the default view shows data (not blank cards).
4. Open the **Salon** filter — verify only assigned salons are listed.
5. Compare **Active Salon Count** to the known salon count for that franchisee.

### Expected outcomes

| Test | Pass criteria |
| --- | --- |
| Correct scope | User sees only their franchisee's salons |
| No cross-franchisee leakage | No other franchisee names in filters or drill paths |
| Non-assigned user | Sees no data or empty cards with no errors |
| After master data update | New/changed salons appear within 24 hours of data refresh |

## Troubleshooting PDP issues

See **PDP troubleshooting** in this guide for symptom → cause → fix detail.

| Symptom | Likely cause | First action |
| --- | --- | --- |
| Franchisee sees **no data** | Not in RestrictedDataAccess; missing Ownership attribute; data refresh failure | Verify group + Ownership; check Daily Sales Master 2 refresh |
| Franchisee sees **wrong stores** | Incorrect Ownership value; stale DimSalon / ETL | Review Ownership attribute; validate FranchiseeNumber in DSM2 |
| Franchisee sees **all stores** | User in AllDataAccess; using REGIS APP; Admin role | Confirm RestrictedDataAccess only; confirm REGIS FRANCHISEE APP URL |
| Cards error after dataset change | PDP field renamed/removed | Update **Franchisee** policy if `FranchiseeNumber` changes |

## Related topics

- [PDP policy inventory](./pdp-policy-inventory.md)
- [REGIS app relationship guide](./regis-app-relationship.md)
- [Franchisee PDP troubleshooting](../apps/regis-franchisee-app/maintenance/pdp-troubleshooting.md)
- [Daily Sales Master 2 data source](../apps/regis-app/data-sources/daily-sales-master-2.md)
- [Escalation and support](./escalation-and-support.md)
