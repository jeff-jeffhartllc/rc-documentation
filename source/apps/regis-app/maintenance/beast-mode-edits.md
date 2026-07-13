# REGIS APP — Beast Mode Edits

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Maintenance guide  
**Audience:** App owners, Domo analysts (Editor role)  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Purpose

This guide explains how to safely edit Beast Mode calculated fields on REGIS APP cards.

## Prerequisites

- Editor role or higher in regiscorp.domo.com
- Familiarity with the underlying dataset fields (see data-source guides)

## Procedure

1. Open the target page in REGIS APP.
2. Click **Edit** (pencil icon) on the page or card.
3. Select the card to edit → open **Beast Mode** (calculated field editor).
4. Review existing calculations and their field references.
5. Make the desired change to the formula.
6. Click **Save** and preview the card with multiple filter combinations.
7. Publish the page.

## Validation

1. Compare the card total against the source dataset in Data Center for a known filter scope.
2. Verify the calculation on at least two filter combinations (e.g., single brand, single franchisee).
3. If the card appears on a shared page, validate the franchisee app equivalent.
4. Update the Reference page or glossary if the metric definition changed.

## Common pitfalls

| Pitfall | Prevention |
| --- | --- |
| Division by zero | Use `CASE WHEN` guards |
| Filter context mismatch | Test with same filters users apply daily |
| Field rename in dataset | Update Beast Mode after dataflow schema changes |
| Aggregations at wrong grain | Verify SUM vs. AVG at salon vs. brand level |

## Rollback

1. Open the card in edit mode.
2. Use Beast Mode version history (if available) or restore the previous formula from your pre-change screenshot/notes.
3. Save and publish.

## Related topics

- [Change management checklist](./change-management-checklist.md)
- [Daily Sales Master 2 — key fields](../data-sources/daily-sales-master-2.md)
- [Glossary (shared)](../../shared/glossary.md)
