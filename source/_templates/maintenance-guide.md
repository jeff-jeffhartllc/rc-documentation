# Maintenance Guide: [Topic]

<div class="cover-meta">

**App:** [App name]  
**Document type:** Maintenance guide  
**Audience:** [e.g. App owners, Domo analysts]  
**Last updated:** YYYY-MM-DD  
**Author / owner:** [Name or team]

</div>

## Purpose

Explain what maintenance activity this guide covers and when it is needed.

## Scope

- In scope: _e.g. card edits, Beast Mode updates, page layout_
- Out of scope: _e.g. connector credential rotation handled by IT_

## Roles and permissions

| Role | Can perform this work? | Notes |
| --- | --- | --- |
| _Domo Admin_ | Yes / No | |
| _App owner_ | Yes / No | |

## Before you change anything

1. Confirm you are in the production Domo instance (https://regiscorp.domo.com)
2. Identify affected pages, cards, and downstream datasets
3. Notify stakeholders if the change impacts published views or schedules
4. Capture screenshots or export configs if rollback may be needed

## Change procedure

1. _Step-by-step maintenance steps_
2. _Validation steps_
3. _Publish or share updates_

## Validation checklist

- [ ] Page loads without errors
- [ ] Filters and Beast Mode calculations behave as expected
- [ ] Dependent cards or apps still refresh correctly
- [ ] Appropriate users retain access

## Rollback

Describe how to revert the change if validation fails.

## Related documents

- [Daily use guide](../daily-use/example.md)
- [Data source guide](../data-sources/example-dataset.md)
