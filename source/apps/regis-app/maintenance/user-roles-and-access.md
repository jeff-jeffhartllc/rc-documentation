# REGIS APP — User Roles and Access

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Maintenance guide  
**Audience:** App owners, Domo administrators  
**Last updated:** 2026-07-13  
**Author / owner:** _TBD — Domo Admin / access owner_

</div>

## Purpose

This guide documents roles, groups, and access management for REGIS APP.

## Domo roles

| Role | Can view REGIS APP? | Can edit cards/pages? | Can manage users/PDP? |
| --- | --- | --- | --- |
| Admin | Yes | Yes | Yes |
| Privileged | Yes | Yes | Yes (governance) |
| Editor | Yes | Yes | No |
| Participant | Yes | No | No |
| Social | Limited | No | No |

## Domo groups (PDP and app access)

These groups control row-level data access on PDP-enabled datasets. Group names and IDs were captured from the live instance on 2026-07-13. See [PDP overview](../../shared/pdp-overview-and-testing.md) for full policy detail.

| Group name | Group ID | Members (2026-07-13) | Use for |
| --- | --- | --- | --- |
| **AllDataAccess** | `2014419418` | 49 | Corporate users who see all salon rows via the **All Rows** PDP policy |
| **RestrictedDataAccess** | `950576281` | 15 | Franchisee users scoped by **Ownership** attribute |
| **3c090c15-223e-4377-bf0f-60e2eec980b4** | `1197243980` | 3 | Internal / test full-access group (UUID name) |

**Admin → Governance → Groups** is where membership is managed. Franchisee users belong in **RestrictedDataAccess**, not **AllDataAccess**.

## Granting access to REGIS APP

1. Sign in as Admin or Privileged user.
2. Go to **Admin** → **Governance** → **People** (or **Groups**).
3. Add the user to **AllDataAccess** for full corporate row access on PDP datasets, or assign another appropriate group for their role.
4. Assign Domo role: **Participant** for daily users, **Editor** for analysts who maintain cards.
5. Verify the user can open: https://regiscorp.domo.com/app-studio/183500481/pages/925282956

## Franchisee vs. corporate access

| User type | App | Group | Notes |
| --- | --- | --- | --- |
| Corporate user | REGIS APP | **AllDataAccess** (typical) | Standard role-based access plus **All Rows** PDP |
| Franchisee user | REGIS FRANCHISEE APP | **RestrictedDataAccess** | Separate app; **Ownership** attribute limits store scope |
| Corporate user with franchisee oversight | Both apps | Case by case | May need both app shares |

Do **not** grant franchisee users **AllDataAccess** or access to REGIS APP unless there is a specific business reason — franchisee scoping is enforced on REGIS FRANCHISEE APP via **RestrictedDataAccess** and **Ownership**.

## Validation checklist

- [ ] User can open REGIS APP default page
- [ ] User sees expected pages in navigation (7 pages for corporate users)
- [ ] User cannot edit cards (Participant) or can edit (Editor) as intended
- [ ] Franchisee users are routed to REGIS FRANCHISEE APP, not REGIS APP
- [ ] Franchisee users are in **RestrictedDataAccess** with **Ownership** set — not in **AllDataAccess**

## Related topics

- [Domo instance access (shared)](../../shared/domo-access.md)
- [PDP overview (franchisee app)](../../shared/pdp-overview-and-testing.md)
- [Escalation and support (shared)](../../shared/escalation-and-support.md)
