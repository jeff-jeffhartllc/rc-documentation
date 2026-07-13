# Personalized Data Permissions (PDP) — Overview and Testing

<div class="cover-meta">

**Apps:** REGIS FRANCHISEE APP (primary), REGIS APP (reference)  
**Document type:** Shared cross-app reference  
**Audience:** PDP / access owners, app owners, support staff  
**Domo instance:** https://regiscorp.domo.com  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — PDP / access owner_

</div>

## Purpose

This guide explains how Personalized Data Permissions (PDP) limit franchisee users to their own stores in REGIS FRANCHISEE APP, how to maintain PDP rules, and how to test that access is correct.

## How PDP works in REGIS FRANCHISEE APP

1. A franchisee user logs in to **regiscorp.domo.com** and opens **REGIS FRANCHISEE APP**.
2. Domo evaluates PDP rules assigned to that user (via user attribute, group, or policy).
3. PDP filters rows in governed datasets — typically by **franchisee** and/or **salon** identifiers — before cards render.
4. Page-level filters (Brand, Salon, DMA, etc.) operate **within** the PDP-permitted row set.

Corporate users in **REGIS APP** are governed by standard Domo roles (Admin, Privileged, Editor, Participant) and page filters, not franchisee PDP rules.

## Expected PDP behavior

| User type | App | Expected data scope |
| --- | --- | --- |
| Corporate analyst | REGIS APP | All stores (subject to page filters and role) |
| Franchisee operator | REGIS FRANCHISEE APP | Only salons assigned to their franchisee entity |
| Franchisee with multiple brands | REGIS FRANCHISEE APP | All assigned salons across their brands |
| Unassigned franchisee user | REGIS FRANCHISEE APP | **No data** or empty cards |

## Datasets likely governed by PDP

Based on app filter sources and dataflow lineage, PDP rules most likely apply to:

| Dataset | Why |
| --- | --- |
| **Daily Sales Master 2** | Primary card and filter source for all performance pages |
| **Store Scorecard Data** | Store-level scorecard metrics |
| **Store Scorecard Data_Brand Peers** | Brand peer comparisons |
| **Daily Sales Indexed by Store 2** | Indexed store performance |
| **DimSalon** | Salon dimension used in filters (Brand, Salon, Territory, DMA) |

> **Client action required:** Confirm exact PDP policy names, attribute mappings, and governed dataset list. The sections below describe where to find them in Domo; the automated exploration did not capture policy-level detail.

## Where PDP is configured in Domo

PDP is **not always a single admin page**. On many Domo instances (including regiscorp.domo.com), policies are managed in one or more of these places:

| Location | How to open | What you configure |
| --- | --- | --- |
| **DataSet PDP (most common)** | **Data** → open a dataset (e.g. Daily Sales Master 2) → **PDP** or **Permissions** tab | Row filters and column masks per user/group |
| **Admin → Governance** | **More** → **Admin** → **Governance** | Users, groups, roles, attributes used by Dynamic PDP |
| **Governance Toolkit → PDP Automation** | **Admin** → **Governance** → **Toolkit** → **PDP Automation** | Automated PDP jobs (if enabled on your instance) |

During library authoring, scripted navigation tried deep links such as `/admin/personalizeddata` and several REST API paths. Those URLs returned “page does not exist” or HTTP 404 on this instance — which indicates **wrong paths for this Domo version**, not necessarily missing Admin role. PDP policy detail was therefore documented from app behavior (franchisee scoping, shared datasets) rather than from the policy editor UI.

### Recommended Admin walkthrough (complete the gaps)

1. Sign in as Admin (e.g. Jeff Hart) on https://regiscorp.domo.com.
2. Open **Data Center** → **Daily Sales Master 2** → **PDP** / **Permissions**.
3. Record each policy: name, users/groups, filter column(s), operator, value(s).
4. Repeat for **Store Scorecard Data**, **DimSalon**, and any other governed datasets.
5. In **Admin** → **Governance** → **Attributes**, note attributes used for franchisee mapping (if Dynamic PDP).
6. Add findings to this document and to franchisee access runbooks.

## How franchisee store assignments are determined

Franchisee store assignments are typically determined by:

1. **User attribute or group membership** — each franchisee user is mapped to a franchisee entity (e.g., franchisee ID, email domain, or group name).
2. **PDP policy** — the policy maps the user's attribute to rows in `DimSalon` or `Daily Sales Master 2` where the franchisee/salon key matches.
3. **Upstream master data** — salon-to-franchisee relationships in `DimSalon` and related warehouse tables must stay current.

When a salon changes franchisee ownership or a new salon opens, update upstream master data **and** verify the franchisee user's PDP scope reflects the change.

## Accessing PDP configuration in Domo

You need **Admin** or appropriate governance grants.

1. Sign in to https://regiscorp.domo.com as an Admin user.
2. Open **More** → **Admin** → **Governance** for users, groups, roles, and attributes.
3. For each governed dataset, open **Data** → dataset → **PDP** tab and review row/column policies.
4. Note policy names, groups/users, and filter fields (typically franchisee and/or salon identifiers).

**If a menu item is missing:** Some features (e.g. Governance Toolkit) require additional grants even for Admin users. Check **Admin** → **Roles** for governance-related grants.

## Testing PDP

### Test as an admin (impersonation)

1. Identify a franchisee test account (or create one in a test group).
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

See `apps/regis-franchisee-app/maintenance/pdp-troubleshooting.md` for symptom → cause → fix detail.

| Symptom | Likely cause | First action |
| --- | --- | --- |
| Franchisee sees **no data** | User not mapped in PDP; stale session; dataset refresh failure | Verify group/attribute assignment; check dataflow status |
| Franchisee sees **wrong stores** | Incorrect PDP mapping; stale DimSalon | Review PDP policy attribute; validate DimSalon franchisee key |
| Franchisee sees **all stores** | PDP not applied to user/group; wrong app | Confirm user opens REGIS FRANCHISEE APP, not REGIS APP |
| Cards error after dataset change | PDP field renamed/removed | Update PDP policy field mapping |

## Related documents

- [REGIS app relationship guide](./regis-app-relationship.md)
- [Franchisee PDP troubleshooting](../apps/regis-franchisee-app/maintenance/pdp-troubleshooting.md)
- [DimSalon data source guide](../apps/regis-app/data-sources/dimsalon-dataset.md)
- [Escalation and support](./escalation-and-support.md)
