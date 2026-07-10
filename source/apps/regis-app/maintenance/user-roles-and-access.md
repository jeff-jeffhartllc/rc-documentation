# REGIS APP — User Roles and Access

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Maintenance guide  
**Audience:** App owners, Domo administrators  
**Last updated:** 2026-07-10  
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

## Granting access to REGIS APP

1. Sign in as Admin or Privileged user.
2. Go to **Admin** → **Users** (or **Groups**).
3. Add the user to the appropriate group for REGIS APP access.
4. Assign role: **Participant** for daily users, **Editor** for analysts who maintain cards.
5. Verify the user can open: https://regiscorp.domo.com/app-studio/183500481/pages/925282956

## Franchisee vs. corporate access

| User type | App | Notes |
| --- | --- | --- |
| Corporate user | REGIS APP | Standard role-based access |
| Franchisee user | REGIS FRANCHISEE APP | Separate app; PDP limits store scope |
| Corporate user with franchisee oversight | Both apps | May need both app shares |

Do **not** grant franchisee users access to REGIS APP unless there is a specific business reason — PDP is configured on REGIS FRANCHISEE APP.

## Validation checklist

- [ ] User can open REGIS APP default page
- [ ] User sees expected pages in navigation (7 pages for corporate users)
- [ ] User cannot edit cards (Participant) or can edit (Editor) as intended
- [ ] Franchisee users are routed to REGIS FRANCHISEE APP, not REGIS APP

## Related documents

- [Domo access and SSO (shared)](../../shared/domo-access-and-sso.md)
- [PDP overview (franchisee app)](../../shared/pdp-overview-and-testing.md)
- [Escalation and support (shared)](../../shared/escalation-and-support.md)
