# PDP Policy Inventory — Live Capture

<div class="cover-meta">

**Apps:** REGIS FRANCHISEE APP (primary), REGIS APP (reference)  
**Document type:** Shared cross-app reference  
**Audience:** PDP / access owners, app owners, support staff  
**Domo instance:** https://regiscorp.domo.com  
**Last updated:** 2026-07-13  
**Author / owner:** _TBD — PDP / access owner_

</div>

## Purpose

This document records **live Personalized Data Permission (PDP) row policies** captured from regiscorp.domo.com on 2026-07-13 while signed in as Jeff Hart (Admin). It supplements `pdp-overview-and-testing.md` with exact policy names, groups, filter columns, and dataset IDs.

## How to open PDP in Domo

| Step | Action |
| --- | --- |
| 1 | **Data** → search for the dataset (e.g. **Daily Sales Master 2**) |
| 2 | Open the dataset → select the **PDP** tab |
| 3 | Confirm **Row Policies** sub-tab; toggle **Enable PDP - Row Filtering** should be **ON** |

Direct URL pattern:

```
https://regiscorp.domo.com/datasources/{dataset-id}/details/rls
```

> **Note:** Older documentation paths such as `/admin/personalizeddata` and `/page/datacenter/pdp/{id}` do not work on this Domo instance. Use the dataset **PDP** tab or `/details/rls` instead.

## Daily Sales Master 2 (primary franchisee dataset)

This is the dataset referenced by app filter labels ("Source: Daily Sales Master 2") and the main PDP scope for REGIS FRANCHISEE APP.

| Item | Value |
| --- | --- |
| **Domo dataset name** | Daily Sales Master 2 |
| **Dataset ID** | `8d851507-f995-4918-abc8-90032b2eff65` |
| **Type** | DataFlow output |
| **Owner** | Jeff Hart |
| **Scale** | 204 columns · 1,513,506 rows (as of 2026-07-13) |
| **PDP status** | **Enabled** — Row Filtering ON |
| **PDP URL** | https://regiscorp.domo.com/datasources/8d851507-f995-4918-abc8-90032b2eff65/details/rls |

![Daily Sales Master 2 PDP row policies](../../assets/daily-sales-master-2-pdp-policies.png)

### Row policies

| Policy name | Type | Data access / filter | Groups & people | Notes |
| --- | --- | --- | --- | --- |
| **All Rows** | Open (all data) | All Data | All Admins and DataSet Owners; **3c090c15-223e-4377-bf0f-60e2eec980b4** (3 people); **AllDataAccess** (49 people) | For users that can access all salons without restriction |
| **Franchisee** | User (filtered) | `FranchiseeNumber` **EQUALS** `Ownership` (dynamic) | **RestrictedDataAccess** (15 people) | Restricted users based on Ownership / franchisee association |

### Franchisee policy detail

The **Franchisee** policy uses **Dynamic PDP**:

| Filter component | Value |
| --- | --- |
| Column | `FranchiseeNumber` |
| Operator | EQUALS |
| Value type | **DYNAMIC** |
| Dynamic attribute | **Ownership** |

Domo resolves each user's **Ownership** attribute at login and filters rows where `FranchiseeNumber` matches that value. Franchisee users in **RestrictedDataAccess** therefore see only salons tied to their ownership / franchisee entity.

### Domo groups referenced (Daily Sales Master 2)

| Group name | Group ID | Approx. members | Role in PDP |
| --- | --- | --- | --- |
| **AllDataAccess** | `2014419418` | 49 | Full row access via **All Rows** policy |
| **RestrictedDataAccess** | `950576281` | 15 | Franchisee-scoped access via **Franchisee** policy |
| **3c090c15-223e-4377-bf0f-60e2eec980b4** | `1197243980` | 3 | Full row access via **All Rows** policy (internal / test group name is a UUID) |

Test accounts visible in dataset sharing include **Jeff Franchisee** and **Jeff Territory** — useful for PDP validation.

## Daily Sales Master (legacy dataset — not the app primary)

The older **Daily Sales Master** dataset (without "2") is a separate DataFlow output. REGIS APP and REGIS FRANCHISEE APP cards reference **Daily Sales Master 2**, not this dataset. PDP on this legacy dataset is documented for completeness.

| Item | Value |
| --- | --- |
| **Domo dataset name** | Daily Sales Master |
| **Dataset ID** | `19ae8295-9dab-4277-963a-f9c7aab23f78` |
| **Owner** | Keela Davis |
| **Scale** | 180 columns · 1,430,571 rows |
| **Tags** | PROD, PDP |
| **PDP URL** | https://regiscorp.domo.com/datasources/19ae8295-9dab-4277-963a-f9c7aab23f78/details/rls |

### Row policies (Daily Sales Master)

| Policy name | Type | Data access / filter | Groups & people |
| --- | --- | --- | --- |
| **All Rows** | Open | All Data | **AllDataAccess** (`2014419418`) |
| **TerritoryDataAccess** | User (filtered) | `Alline_territory` **EQUALS** `Territory` (dynamic) | **TerritoryDataAccess** (`1547677730`) |

This territory-scoped policy supports corporate territory leaders, not franchisee app users.

## domo_regis.MonthlyMetrics (scorecard upstream input)

Warehouse-fed monthly metrics dataset used as an input to **Store Scorecard ETL** and **Store Scorecard by Brand ETL**. PDP on this dataset uses the **same franchisee pattern** as Daily Sales Master 2.

| Item | Value |
| --- | --- |
| **Domo dataset name** | domo_regis.MonthlyMetrics |
| **Dataset ID** | `f303a86a-67b5-49fa-8874-195eab30506c` |
| **Owner** | Jeff Hart |
| **Scale** | 117 columns · 47,479 rows |
| **Tags** | PROD, PDP |
| **PDP status** | **Enabled** — Row Filtering ON |
| **PDP URL** | https://regiscorp.domo.com/datasources/f303a86a-67b5-49fa-8874-195eab30506c/details/rls |

![domo_regis.MonthlyMetrics PDP row policies](../../assets/monthly-metrics-pdp-policies.png)

### Row policies (domo_regis.MonthlyMetrics)

| Policy name | Type | Data access / filter | Groups & people | Notes |
| --- | --- | --- | --- | --- |
| **All Rows** | Open (all data) | All Data | All Admins and DataSet Owners; **3c090c15-223e-4377-bf0f-60e2eec980b4** (3 people); **AllDataAccess** (49 people) | For users that can access all salons without restriction |
| **Franchisee** | User (filtered) | `FranchiseeNumber` **EQUALS** `Ownership` (dynamic) | **RestrictedDataAccess** (15 people) | Restricted users based on Ownership / franchisee association |

Scorecard app pages consume **Store Scorecard Data** (ETL output), not this dataset directly — but franchisee PDP on scorecard pages may depend on aligned policies across the scorecard lineage (MonthlyMetrics → ETL → Store Scorecard Data).

## domo_regis.FactDailySales (warehouse sales fact)

Upstream warehouse fact table feeding **Daily Sales ETL 2** (and legacy Daily Sales ETL). PDP uses the same franchisee pattern as Daily Sales Master 2.

| Item | Value |
| --- | --- |
| **Domo dataset name** | domo_regis.FactDailySales |
| **Dataset ID** | `5bdaf9aa-0950-432e-a9ce-eaa7cffb2796` |
| **Owner** | Keela Davis |
| **Scale** | 145 columns · 1,513,506 rows |
| **Tags** | PROD, PDP |
| **PDP status** | **Enabled** — Row Filtering ON |
| **PDP URL** | https://regiscorp.domo.com/datasources/5bdaf9aa-0950-432e-a9ce-eaa7cffb2796/details/rls |

![domo_regis.FactDailySales PDP row policies](../../assets/domo-regis-factdailysales-pdp-policies.png)

### Row policies (domo_regis.FactDailySales)

| Policy name | Type | Data access / filter | Groups & people | Notes |
| --- | --- | --- | --- | --- |
| **All Rows** | Open (all data) | All Data | All Admins and DataSet Owners; **3c090c15-223e-4377-bf0f-60e2eec980b4** (3 people); **AllDataAccess** (49 people) | For users that can access all salons without restriction |
| **Franchisee** | User (filtered) | `FranchiseeNumber` **EQUALS** `Ownership` (dynamic) | **RestrictedDataAccess** (15 people) | Restricted users based on Ownership / franchisee association |

This is the root sales fact in the Daily Sales lineage. If franchisee users can query this dataset directly (outside app cards), the same **Franchisee** policy applies.

## Daily Sales Unpivoted Services 2 (ETL derivative)

Service-type breakdown dataset output from **Daily Sales ETL 2**. Not a primary REGIS app card source, but PDP is enabled with the standard franchisee pattern.

| Item | Value |
| --- | --- |
| **Domo dataset name** | Daily Sales Unpivoted Services 2 |
| **Dataset ID** | `e8d85e2e-6464-40d2-b4e4-a2f138de815d` |
| **Owner** | Jeff Hart |
| **Scale** | 35 columns · 12,108,048 rows |
| **Tags** | PDP |
| **PDP status** | **Enabled** — Row Filtering ON |
| **PDP URL** | https://regiscorp.domo.com/datasources/e8d85e2e-6464-40d2-b4e4-a2f138de815d/details/rls |

![Daily Sales Unpivoted Services 2 PDP row policies](../../assets/daily-sales-unpivoted-services-2-pdp-policies.png)

### Row policies (Daily Sales Unpivoted Services 2)

| Policy name | Type | Data access / filter | Groups & people | Notes |
| --- | --- | --- | --- | --- |
| **All Rows** | Open (all data) | All Data | All Admins and DataSet Owners; **3c090c15-223e-4377-bf0f-60e2eec980b4** (3 people); **AllDataAccess** (49 people) | For users that can access all salons without restriction |
| **Franchisee** | User (filtered) | `FranchiseeNumber` **EQUALS** `Ownership` (dynamic) | **RestrictedDataAccess** (15 people) | Restricted users based on Ownership / franchisee association |

## Other datasets (PDP status TBD)

Scorecard and dimension datasets below are used by app cards and filters. Their PDP settings were **not fully captured** in this session. An Admin should open each dataset's **PDP** tab and confirm whether row policies mirror Daily Sales Master 2 or are inherited through card filter linkage.

| Dataset | Used by | PDP status |
| --- | --- | --- |
| Store Scorecard Data | Store Performance Report Card, Store Performance Scorecard | _TBD — verify in Data Center_ |
| Store Scorecard Data_Brand Peers | Store Performance Scorecard (brand peers) | _TBD — verify in Data Center_ |
| Daily Sales Indexed by Store 2 | Indexed performance cards | _TBD — verify in Data Center_ |
| DimSalon | Filter dimensions (Brand, Salon, Territory, DMA) | _TBD — verify in Data Center_ |

If franchisee users see scorecard data outside their salon scope, add or align PDP row policies on those datasets to match the **Franchisee** policy pattern above.

## API reference (for automation)

Internal Domo API used by the PDP UI (session cookie auth):

```
GET /api/query/v1/data-control/{dataset-id}/filter-groups?options=load_associations,include_open_policy,load_filters,sort&paginate=true&limit=50&offset=0
```

Returns policy names, group IDs, and filter parameters. Standard sharing permissions (not PDP) are at:

```
GET /api/data/v3/datasources/{dataset-id}/permissions
```

## Change management

When adding a franchisee user:

1. Add the user to **RestrictedDataAccess** (or a franchisee-specific group covered by the **Franchisee** policy).
2. Set the user's **Ownership** attribute to the correct franchisee identifier (must match `FranchiseeNumber` values in Daily Sales Master 2).
3. Test in REGIS FRANCHISEE APP per `pdp-overview-and-testing.md`.

When a salon changes franchisee ownership:

1. Update upstream salon master / DimSalon.
2. Re-run **Daily Sales ETL 2**.
3. Confirm `FranchiseeNumber` values in Daily Sales Master 2 reflect the change.
4. Re-test affected franchisee users.

## Related documents

- [PDP overview and testing](./pdp-overview-and-testing.md)
- [Daily Sales Master 2 data source guide](../apps/regis-app/data-sources/daily-sales-master-2.md)
- [Franchisee PDP troubleshooting](../apps/regis-franchisee-app/maintenance/pdp-troubleshooting.md)
- [Shared dataset inventory](./dataset-inventory.md)
