# Troubleshooting Guide — REGIS APP

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Troubleshooting guide  
**Audience:** Users, app owners, data owners  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## How to use this guide

Look up the symptom you see in Domo. Follow the recommended checks in order.

## Quick reference

| Symptom | Likely cause | First action | Section |
| --- | --- | --- | --- |
| Blank cards | Stale or failed dataset refresh | Check Daily Sales Master 2 last run | [Stale data](#stale-or-missing-data) |
| "Filtering…" never completes | Browser or query timeout | Refresh browser; check dataset size | [Display issues](#calculation-or-display-issues) |
| Cannot see app | Missing group/role | Verify user access | [Access issues](#access-issues) |
| Wrong totals | Filter combination | Reset filters; verify PY Comp / Active settings | [Display issues](#calculation-or-display-issues) |
| Scorecard shows no data | Store Scorecard by Brand ETL failure | Check dataflow status | [Stale data](#stale-or-missing-data) |
| Scheduled report missing | Distribute schedule inactive | Check Distribute settings | [Scheduled reports](#scheduled-report-issues) |

## Stale or missing data

### Symptoms

- Cards show old timestamps or yesterday's date
- Empty results where data is expected
- All cards blank across multiple pages

### Checks

1. Open **Data Center** → search for **Daily Sales Master 2**.
2. Review **Last Updated** timestamp — should be within the last 24 hours.
3. Check **Daily Sales ETL 2** dataflow last execution status (should be SUCCESS).
4. If scorecard pages affected, check **Store Scorecard by Brand ETL** status.
5. Verify upstream sources (domo_regis.FactDailySales, AllineDailyLabor) have refreshed.

### Resolution

- If dataflow failed: see [Runbook — refresh failures](./runbook-refresh-failures.md).
- If upstream source is late: contact data owner; wait for upstream refresh and re-run ETL.
- If only one card affected: check that card's dataset binding in edit mode.

## Access issues

### Symptoms

- User cannot see REGIS APP in Apps menu
- "Permission denied" or blank page

### Checks

1. Verify user exists in Domo Admin → Users.
2. Confirm role is Participant or higher.
3. Verify group membership includes REGIS APP access group (_TBD — group name_).
4. Check page-level sharing settings.

### Resolution

- Add user to appropriate group with Participant role.
- See [User roles and access](./user-roles-and-access.md).

## Calculation or display issues

### Symptoms

- Unexpected totals, percentages, or trends
- Single card shows error icon

### Checks

1. Review active filters (Entity Type, PY Comp, Active Only).
2. Open the card's dataset in Data Center and compare raw values.
3. Check for recent Beast Mode or dataflow changes.
4. Review Reference page for metric definitions.

### Resolution

- Reset filters to defaults and re-test.
- If Beast Mode issue: see [Beast Mode edits](./beast-mode-edits.md).
- Escalate to app owner if metric definition may have changed.

## Scheduled report issues

### Symptoms

- Recipients stop receiving scheduled reports
- Report content doesn't match page

### Checks

1. Open the source page → **Distribute** → verify schedule is active.
2. Confirm recipients and email addresses are current.
3. Check whether filter defaults changed since schedule was created.

### Resolution

- Re-save the Distribute schedule with current filter defaults.
- See [Exports and sharing](../daily-use/exports-and-sharing.md).

## Related topics

- [Runbook — refresh failures](./runbook-refresh-failures.md)
- [Daily Sales Master 2 data source](../data-sources/daily-sales-master-2.md)
- [Escalation and support (shared)](../../shared/escalation-and-support.md)
