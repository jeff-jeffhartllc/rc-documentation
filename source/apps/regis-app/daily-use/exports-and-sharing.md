# REGIS APP — Exports and Sharing

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Daily use guide  
**Audience:** Corporate users, report distributors  
**Domo URL:** https://regiscorp.domo.com/app-studio/183500481  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Purpose

This guide explains how to export data from REGIS APP pages and schedule report distribution.

## Export a single card

1. Open the target page and apply desired filters.
2. Hover over the card you want to export.
3. Click the **card menu** (⋯ or export icon).
4. Select **Export** → choose format (CSV, Excel, image).
5. **Expected result:** File downloads with data matching current filter context.

## Export an entire page

1. Open the page with filters set.
2. Click **Distribute** or the page-level export option in the toolbar.
3. Select export format and scope (all cards or selected cards).
4. **Expected result:** Export file or PDF of the page.

## Schedule a report (Distribute)

1. Open the page (e.g., Daily Sales Email Report).
2. Click **Distribute** in the page toolbar.
3. Configure:
   - **Recipients** — email addresses or Domo groups
   - **Schedule** — daily, weekly, or custom cadence
   - **Format** — PDF, CSV, or link
   - **Filters** — whether to use current filter state or fixed defaults
4. Save the schedule.
5. **Expected result:** Recipients receive the report on schedule.

## Share a page link

1. Copy the URL from the browser address bar while on the target page.
2. Share with colleagues who have REGIS APP access.
3. **Note:** Recipients must have appropriate role and group membership to view the page.

## Scheduled reports in this app

| Page | Typical schedule | Audience |
| --- | --- | --- |
| Daily Sales Email Report | Daily | Operations leadership |
| Corporate Overview | Daily or weekly (varies by deployment) | Executive team |
| Daily Laddering Report | Daily | Operations |

Configure recipients, cadence, and filter defaults in Domo **Distribute** on each page.

## If this fails

| Symptom | Action |
| --- | --- |
| Export button missing | Verify Editor role or higher; check card permissions |
| Scheduled report not received | Verify Distribute schedule is active; check recipient email |
| Export data doesn't match screen | Confirm filter state at time of export |

## Related topics

- [Daily Sales Email Report](./daily-sales-email-report.md)
- [User roles and access](../maintenance/user-roles-and-access.md)
