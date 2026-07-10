# REGIS FRANCHISEE APP — User Roles and Access

<div class="cover-meta">

**App:** REGIS FRANCHISEE APP  
**Document type:** Maintenance guide  
**Audience:** App owners, PDP / access owners  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — PDP / access owner_

</div>

## Purpose

How to provision franchisee users for REGIS FRANCHISEE APP and ensure correct PDP scope.

## Granting franchisee access

1. Sign in as Admin or Privileged user.
2. Create or locate the user in **Admin** → **Users**.
3. Assign **Participant** role (standard for franchisee daily users).
4. Add user to the franchisee access group (_TBD — group name_).
5. Configure PDP policy mapping the user to their franchisee entity.
6. Verify the user can open: https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822

## PDP assignment checklist

- [ ] User mapped to correct franchisee entity in PDP policy
- [ ] User sees only their salons in Salon filter
- [ ] Active Salon Count matches expected count for franchisee
- [ ] User cannot access REGIS APP (unless explicitly granted)
- [ ] User cannot see other franchisee data

## Removing or changing access

| Scenario | Action |
| --- | --- |
| Franchisee sells salons | Update PDP mapping; verify DimSalon franchisee key |
| New franchisee user | Create user, assign group, configure PDP |
| User leaves organization | Disable user in Domo Admin |
| Franchisee acquires new salons | Update upstream master; verify PDP after refresh |

## Related documents

- [PDP overview and testing (shared)](../../shared/pdp-overview-and-testing.md)
- [PDP troubleshooting](./pdp-troubleshooting.md)
- [Domo access and SSO (shared)](../../shared/domo-access-and-sso.md)
