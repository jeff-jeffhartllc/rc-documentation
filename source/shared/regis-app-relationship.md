# REGIS APP and REGIS FRANCHISEE APP — Relationship Guide

<div class="cover-meta">

**Apps:** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Shared cross-app reference  
**Audience:** App owners, analysts, data owners, and support staff  
**Status:** Draft — to be expanded by the documentation agent  
**Last updated:** 2026-07-10

</div>

## Summary

Regis operates two closely related Domo App Studio applications on **regiscorp.domo.com**:

| App | Purpose | Default URL |
| --- | --- | --- |
| **REGIS APP** | Primary corporate application with the full store and metrics view | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| **REGIS FRANCHISEE APP** | Franchisee-facing subset with PDP-limited store visibility | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |

REGIS FRANCHISEE APP is **not a separate product**. It is a franchisee-facing view built from a subset of REGIS APP content, with **Personalized Data Permissions (PDP)** applied so each franchisee user sees only their own stores.

## Architecture at a glance

```
REGIS APP (corporate, full view)
    │
    ├── shared pages / cards / datasets
    │
    └── REGIS FRANCHISEE APP (franchisee subset)
            └── PDP filters rows to franchisee's stores
```

## Key differences

| Topic | REGIS APP | REGIS FRANCHISEE APP |
| --- | --- | --- |
| Users | Corporate teams | Franchisee operators |
| Data scope | Organization-wide (by role) | Single franchisee's stores via PDP |
| Pages / cards | Full inventory | Subset of main app |
| Maintenance impact | Source of truth for shared content | Inherits changes; PDP must be validated separately |

## Shared vs. app-specific documentation

| Document in… | Covers |
| --- | --- |
| `apps/regis-app/` | Corporate app pages, cards, maintenance, and datasets owned by the main app |
| `apps/regis-franchisee-app/` | Franchisee UX, PDP behavior, franchisee-specific maintenance |
| `shared/` (this section) | Cross-app relationships, shared datasets, PDP overview, glossary |

## PDP maintenance notes (to be completed)

The documentation agent should document:

- Which datasets and fields PDP rules depend on
- How franchisee store assignments are determined
- How to test PDP as a franchisee user vs. as an admin
- What breaks when upstream store or franchisee master data changes
- Runbook for "franchisee sees wrong stores" or "franchisee sees no data"

## Change management guidance

When changing REGIS APP, ask:

1. Is this page/card also used in REGIS FRANCHISEE APP?
2. Does the change affect a dataset referenced by PDP rules?
3. Do franchisee users need release notes or re-training?
4. Has PDP been re-tested for at least one franchisee account after the change?

## Related documents

- [REGIS APP overview](../apps/regis-app/daily-use/app-overview.md)
- [REGIS FRANCHISEE APP overview](../apps/regis-franchisee-app/daily-use/app-overview.md)
- Full index: `library-catalog.pdf`
