# REGIS APP — Change Management and Release Checklist

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Maintenance guide  
**Audience:** App owners, Domo analysts (Editor role)  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Purpose

This guide defines the safe change process for editing pages, cards, and Beast Mode calculations in REGIS APP, including downstream impact on REGIS FRANCHISEE APP.

## Scope

**In scope:**

- Card edits (visualization, Beast Mode, filters)
- Page layout changes
- New cards on existing pages
- Filter default changes

**Out of scope:**

- Dataflow / ETL logic changes (see data-sources guides)
- PDP policy changes (see franchisee maintenance docs)
- Connector credential rotation (IT)

## Before you change anything

1. Confirm you are in **regiscorp.domo.com** (production).
2. Identify affected pages, cards, and downstream datasets.
3. Check whether the page exists in REGIS FRANCHISEE APP (see relationship guide).
4. Notify stakeholders if the change impacts published views or scheduled reports.
5. Capture screenshots of the current state for rollback.

## Change procedure

1. Open the target page in REGIS APP edit mode.
2. Make the card or page change.
3. Save and preview with representative filter combinations.
4. If the page has a franchisee equivalent, open REGIS FRANCHISEE APP and verify whether the same change is needed on the franchisee page ID.
5. Publish the change.
6. Run the validation checklist below.

## Validation checklist

- [ ] Page loads without errors for Admin and Participant users
- [ ] Filters and Beast Mode calculations behave as expected
- [ ] Key cards show expected values against Daily Sales Master 2 source data
- [ ] Scheduled reports (Distribute) still run successfully
- [ ] If shared page: REGIS FRANCHISEE APP equivalent page validated
- [ ] If dataset field changed: PDP tested for at least one franchisee account
- [ ] Reference page updated if metric definitions changed

## Impact on REGIS FRANCHISEE APP

| Change type | Franchisee impact | Required action |
| --- | --- | --- |
| Edit shared card (same card ID) | Both apps affected | Test franchisee app |
| Edit page on corporate page ID only | Franchisee page unchanged | Replicate edit on franchisee page ID if desired |
| Dataset schema change | Both apps may break | Update PDP; test franchisee accounts |
| New corporate-only page | No franchisee impact | None |
| Filter default change on shared page | Both apps if same card | Test both apps |

See `shared/regis-app-relationship.pdf` for the shared page mapping.

## Rollback

1. If the change was a card edit: use Domo card version history to revert.
2. If the change was a page layout edit: restore from pre-change screenshot and rebuild, or use Domo page history if available.
3. If a dataset change caused the issue: revert the dataflow change first, then re-run the dataflow.

## Related documents

- [Beast Mode edits](./beast-mode-edits.md)
- [REGIS app relationship (shared)](../../shared/regis-app-relationship.md)
- [Franchisee app change checklist](../../regis-franchisee-app/maintenance/change-checklist.md)
