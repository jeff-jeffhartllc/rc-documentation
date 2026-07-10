# Troubleshooting Guide: [App or Area]

<div class="cover-meta">

**App:** [App name]  
**Document type:** Troubleshooting guide  
**Audience:** [Users, app owners, data owners]  
**Last updated:** YYYY-MM-DD  
**Author / owner:** [Name or team]

</div>

## How to use this guide

Look up the symptom you see in Domo or in the data. Follow the recommended checks in order.

## Quick reference

| Symptom | Likely cause | First action | Detailed section |
| --- | --- | --- | --- |
| _Blank card_ | _Stale dataset_ | _Check refresh history_ | [Section link](#stale-or-missing-data) |
| _Access denied_ | _Missing group_ | _Verify role assignment_ | [Section link](#access-issues) |

## Stale or missing data

### Symptoms

- Cards show old timestamps
- Empty results where data is expected

### Checks

1. Open the dataset in Domo Data Center and review last run status
2. Confirm upstream source availability
3. Review related dataflow execution history

### Resolution

_Document fixes or link to a runbook._

## Access issues

### Symptoms

- User cannot see app, page, or card

### Checks

1. Verify user group membership
2. Confirm page-level sharing settings
3. Check whether row-level security applies

### Resolution

_Document fixes._

## Calculation or display issues

### Symptoms

- Unexpected totals, percentages, or filters

### Checks

1. Review Beast Mode logic and filter context
2. Compare against source dataset values
3. Check for recent card or dataset changes

### Resolution

_Document fixes or link to maintenance guide._

## Related documents

- [Daily use guide](../daily-use/example.md)
- [Maintenance guide](../maintenance/example.md)
- [Data source guide](../data-sources/example-dataset.md)
