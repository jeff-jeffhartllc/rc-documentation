# Domo Instance Access and SSO

<div class="cover-meta">

**Apps:** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Shared platform reference  
**Audience:** All users, IT / access administrators  
**Domo instance:** https://regiscorp.domo.com  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — IT / access owner_

</div>

## Domo instance

| Item | Value |
| --- | --- |
| Instance URL | https://regiscorp.domo.com |
| Environment | Production (single instance documented) |
| Sandbox | _TBD — confirm whether a separate sandbox instance exists_ |

## Signing in

1. Open https://regiscorp.domo.com in a supported browser (Chrome, Firefox, or Edge).
2. Sign in using your organization's SSO provider or Domo credentials.
3. After authentication, use the **Apps** menu or direct links to open:
   - **REGIS APP:** https://regiscorp.domo.com/app-studio/183500481/pages/925282956
   - **REGIS FRANCHISEE APP:** https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822

## Which app should I use?

| If you are… | Use |
| --- | --- |
| Corporate analyst, operations, or leadership | **REGIS APP** |
| Franchisee operator or franchisee support | **REGIS FRANCHISEE APP** |

Franchisee users should **not** use REGIS APP for daily work — PDP is configured on REGIS FRANCHISEE APP. Corporate users may have access to both apps depending on role assignment.

## Roles in regiscorp.domo.com

Domo standard roles observed in this instance:

| Role | Typical access |
| --- | --- |
| **Admin** | Full instance administration, PDP configuration, user management |
| **Privileged** | Advanced governance, content management, PDP |
| **Editor** | Create and edit cards, pages, dataflows |
| **Participant** | View and interact with shared content |
| **Social** | Limited social/collaboration features |

App-specific access is further controlled by group membership and page sharing settings.

## Access requests

1. Contact your Regis Domo administrator (_TBD — escalation contact_).
2. Specify:
   - User name and email
   - App needed (REGIS APP and/or REGIS FRANCHISEE APP)
   - Role required (typically Participant for daily users, Editor for analysts)
   - For franchisee users: franchisee entity / salon assignment for PDP
3. Administrator creates or updates the user, assigns groups, and validates PDP scope.

## SSO notes

> **Client action required:** Document your organization's SSO provider (e.g., Azure AD, Okta), attribute mapping, and session timeout policy here once confirmed with IT.

- SSO configuration is managed in Domo Admin → **Authentication**.
- Franchisee users may authenticate via a different IdP or email domain than corporate users — confirm with IT.
- If SSO fails, users see the Domo sign-in page with an option to use direct sign-on or identity provider selection.

## If sign-in fails

| Symptom | Likely cause | Action |
| --- | --- | --- |
| SSO redirect loop | IdP misconfiguration | Contact IT / Domo Admin |
| "No access" after login | User not provisioned | Request account from administrator |
| Cannot see REGIS APP | Missing group or page share | Verify group membership |
| Franchisee sees wrong app | Opened REGIS APP instead of franchisee app | Use REGIS FRANCHISEE APP URL |

## Related documents

- [Escalation and support](./escalation-and-support.md)
- [PDP overview and testing](./pdp-overview-and-testing.md)
- [REGIS APP user roles](../apps/regis-app/maintenance/user-roles-and-access.md)
