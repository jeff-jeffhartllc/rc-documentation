# REGIS FRANCHISEE APP — Change Checklist

<div class="cover-meta">

**App:** REGIS FRANCHISEE APP  
**Document type:** Maintenance guide  
**Audience:** App owners, Domo analysts  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Purpose

Change management checklist specific to REGIS FRANCHISEE APP, including coordination with REGIS APP changes.

## When editing franchisee app pages

Franchisee pages are **separate App Studio page objects** from their corporate equivalents (different page IDs). A change on a corporate page does **not** automatically propagate to the franchisee page.

| Step | Action |
| --- | --- |
| 1 | Identify whether the change is on a shared page (see relationship guide) |
| 2 | If editing cards: determine if the card is shared or page-specific |
| 3 | Make the edit on the franchisee page ID (e.g., `1195391822` not `1429176950`) |
| 4 | Test with a franchisee test account (PDP scope) |
| 5 | Verify no cross-franchisee data leakage |

## When corporate changes REGIS APP

If the corporate team changes REGIS APP, the franchisee app owner should:

- [ ] Check if the changed page exists in franchisee app (4 shared pages)
- [ ] Check if the change affects Daily Sales Master 2 or scorecard datasets
- [ ] Replicate layout/card changes on franchisee page IDs if desired
- [ ] Re-test PDP for at least one franchisee account
- [ ] Communicate metric definition changes to franchisee users

## Validation checklist

- [ ] Franchisee test user sees only their stores
- [ ] All 4 pages load without errors
- [ ] Cards match expected values for known salon/date
- [ ] No new filters expose cross-franchisee data
- [ ] Reference page updated if definitions changed

## Related documents

- [Change management (REGIS APP)](../../regis-app/maintenance/change-management-checklist.md)
- [REGIS app relationship (shared)](../../shared/regis-app-relationship.md)
- [PDP overview (shared)](../../shared/pdp-overview-and-testing.md)
