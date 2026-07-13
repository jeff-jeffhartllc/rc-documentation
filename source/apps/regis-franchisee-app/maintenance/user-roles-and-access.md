# REGIS FRANCHISEE APP — User Roles and Access

<div class="cover-meta">

**App:** REGIS FRANCHISEE APP  
**Document type:** Maintenance guide  
**Audience:** App owners, PDP / access owners  
**Last updated:** 2026-07-13  
**Author / owner:** _TBD — PDP / access owner_

</div>

## Purpose

How to provision franchisee users for REGIS FRANCHISEE APP and ensure correct PDP scope.

## Domo groups for franchisee access

| Group name | Group ID | Members (2026-07-13) | PDP policy |
| --- | --- | --- | --- |
| **RestrictedDataAccess** | `950576281` | 15 | **Franchisee** — `FranchiseeNumber` **EQUALS** user's **Ownership** attribute |

Franchisee users must be in **RestrictedDataAccess** and must **not** be in **AllDataAccess** (`2014419418`). See [PDP overview and testing](../../shared/pdp-overview-and-testing.md).

## Granting franchisee access

1. Sign in as Admin or Privileged user.
2. Create or locate the user in **Admin** → **Governance** → **People**.
3. Assign **Participant** role (standard for franchisee daily users).
4. Add user to **RestrictedDataAccess** (group ID `950576281`).
5. Set the user's **Ownership** custom attribute to the franchisee entity ID (must match `FranchiseeNumber` in Daily Sales Master 2).
6. Confirm the user is **not** in **AllDataAccess**.
7. Verify the user can open: https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822

## PDP assignment checklist

- [ ] User in **RestrictedDataAccess**; not in **AllDataAccess**
- [ ] **Ownership** attribute set to correct franchisee entity
- [ ] User sees only their salons in Salon filter
- [ ] Active Salon Count matches expected count for franchisee
- [ ] User cannot access REGIS APP (unless explicitly granted)
- [ ] User cannot see other franchisee data

## Removing or changing access

| Scenario | Action |
| --- | --- |
| Franchisee sells salons | Update **Ownership** attribute; verify DimSalon franchisee key after refresh |
| New franchisee user | Create user; add to **RestrictedDataAccess**; set **Ownership** |
| User leaves organization | Disable user in Domo Admin |
| Franchisee acquires new salons | Update upstream master; verify PDP after refresh |

## Related topics

- [PDP overview and testing (shared)](../../shared/pdp-overview-and-testing.md)
- [PDP troubleshooting](./pdp-troubleshooting.md)
- [Domo instance access (shared)](../../shared/domo-access.md)
