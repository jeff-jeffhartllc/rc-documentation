# Runbook — Franchisee Access and PDP Issues

<div class="cover-meta">

**App:** REGIS FRANCHISEE APP  
**Document type:** Runbook  
**Audience:** PDP / access owners, app owners  
**Trigger:** Franchisee reports wrong or missing data access  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — PDP / access owner_

</div>

## Objective

Restore correct PDP-scoped access for a franchisee user.

## When to use

- Franchisee reports they see no data
- Franchisee reports missing salons
- Franchisee reports seeing another franchisee's stores (**urgent**)
- New franchisee user onboarding

## Required access

- Admin or Privileged role in regiscorp.domo.com
- Access to PDP configuration in Domo Admin

## Procedure — new franchisee user

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Create user in Domo Admin | User account active |
| 2 | Assign Participant role | User can sign in |
| 3 | Set **Ownership** (and any other attributes required by dynamic group rules) | Attributes saved |
| 4 | Confirm **RestrictedDataAccess** dynamic membership includes the user | Group membership set by rules |
| 5 | User opens REGIS FRANCHISEE APP | Franchisee Performance loads with data |
| 6 | Verify Salon filter shows only assigned salons | Correct salon list |
| 7 | Compare Active Salon Count to expected | Counts match |

## Procedure — franchisee sees wrong stores (urgent)

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Confirm user is on REGIS FRANCHISEE APP (URL contains `2028360971`) | Correct app |
| 2 | Impersonate or interview user — list visible salon names | Document unexpected salons |
| 3 | Review user's group and attribute in Admin | Identify mapping error |
| 4 | Review PDP policy — correct franchisee attribute | Policy matches intended franchisee |
| 5 | Check DimSalon for affected salons' franchisee key | Master data correct |
| 6 | Fix PDP mapping or user attribute | User sees only correct stores |
| 7 | Re-test with user | Issue resolved |

## Procedure — franchisee sees no data

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Confirm issue is user-specific (not all franchisees) | Isolated to one user |
| 2 | Verify PDP assignment exists | Policy attached |
| 3 | If PDP correct: check Daily Sales Master 2 refresh | Data is current |
| 4 | If new salon: verify salon in DimSalon with correct franchisee key | Salon in master |
| 5 | Re-test after fix | Data visible |

## Escalation

| If… | Contact |
| --- | --- |
| PDP policy structure unclear | _TBD — Domo Admin_ |
| DimSalon master data wrong | _TBD — data owner_ |
| Suspected data privacy breach | _TBD — escalation contact_ (immediate) |

## Related topics

- [PDP troubleshooting](./pdp-troubleshooting.md)
- [PDP overview (shared)](../../shared/pdp-overview-and-testing.md)
- [User roles and access](./user-roles-and-access.md)
