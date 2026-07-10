# REGIS APP — Navigation and Filters

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Daily use guide  
**Audience:** Corporate daily users  
**Domo URL:** https://regiscorp.domo.com/app-studio/183500481  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Purpose

This guide explains how to navigate REGIS APP and use the shared filter bar that appears on most pages.

## Opening the app

1. Sign in to https://regiscorp.domo.com.
2. Open **REGIS APP** from the Apps menu, or go directly to:  
   https://regiscorp.domo.com/app-studio/183500481/pages/925282956
3. **Expected result:** The **Corporate Overview** page loads with the filter bar at the top and KPI cards below.

## Page navigation

Use the **left navigation panel** to switch pages:

| Page | When to use |
| --- | --- |
| Corporate Overview | Daily executive / ops review of org-wide KPIs |
| Franchisee Performance | Focus on franchisee-level metrics across all franchisees |
| Store Performance Report Card | Monthly store coaching and cumulative scores |
| Store Performance Scorecard | SPH and peer comparison analysis |
| Daily Sales Email Report | Daily sales snapshot for distribution |
| Daily Laddering Report | Day-over-day metric tracking |
| Reference | Filter definitions and usage tips |

## Using filters

Most pages share a filter bar at the top. Filters apply to **all cards on the page** unless noted on the Reference page.

### Step-by-step: apply filters

1. Click a filter dropdown (e.g., **Brand**, **Franchisee**, **Salon**).
2. Select one or more values.
3. Wait for cards to refresh (status shows "Filtering…").
4. **Expected result:** All cards on the page reflect the selected filter scope.

### Key filters explained

| Filter | What it does | Typical default |
| --- | --- | --- |
| **Entity Type** | Scopes to corporate-owned, franchise, or other entity types | _Varies — select as needed_ |
| **Brand** | Limits to one or more Regis brands | All brands |
| **Franchisee** | Limits to a specific franchisee operator | All franchisees |
| **Salon** | Limits to a specific salon | All salons in scope |
| **From Date / Through Date** | Sets the date range for time-based metrics | Current month |
| **Country / State / Territory / DMA** | Geographic scoping | All |
| **Is Active?** | Includes only currently active salons | Active Only |
| **Is PY Comp?** | Limits to prior-year comparable salons | PY Comp Only |
| **Distribution Pattern** | Filters by operating/distribution model | Normal Only (where shown) |
| **Rollup Levels** | Controls aggregation level for heat maps | Brand |

### Filter source

Filter values are sourced from **Daily Sales Master 2** (shown in the Brand filter label as "Source: Daily Sales Master 2"). If filter values look stale, the dataset may not have refreshed — see the refresh runbook.

## Page toolbar actions

| Button | Purpose |
| --- | --- |
| **Controls** | Access page-level settings |
| **Distribute** | Schedule or send page/report distribution |
| **Details** | View page metadata and sharing settings |

See [Exports and sharing](./exports-and-sharing.md) for distribution procedures.

## Tips

- Start with broad filters (Brand, date range) and drill down to Franchisee or Salon.
- Use **Is Active? = Active Only** to exclude closed locations from counts.
- Use **Is PY Comp? = PY Comp Only** for fair year-over-year comparisons.
- Check the **Reference** page for SST letter grade definitions and filter notes.

## If this fails

| Symptom | Action |
| --- | --- |
| Page does not load | Verify you have access to REGIS APP; contact app owner |
| Filters show no values | Check Daily Sales Master 2 refresh status |
| Cards show "Filtering…" indefinitely | Refresh browser; if persists, escalate to app owner |
| Unexpected totals | Verify filter selections; check Reference page for metric definitions |

## Related documents

- [Corporate Overview guide](./corporate-overview.md)
- [Exports and sharing](./exports-and-sharing.md)
- [Daily Sales Master 2 data source](../data-sources/daily-sales-master-2.md)
