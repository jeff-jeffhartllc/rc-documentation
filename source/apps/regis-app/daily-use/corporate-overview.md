# REGIS APP — Corporate Overview

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Daily use guide  
**Audience:** Corporate users, leadership, operations  
**Domo page:** Corporate Overview (`925282956`)  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Purpose

The **Corporate Overview** page is the default landing page for REGIS APP. It provides a comprehensive dashboard of organization-wide sales, traffic, location, productivity, loyalty, and digital engagement metrics.

## Prerequisites

- Access to REGIS APP (Participant role or higher)
- Daily Sales Master 2 dataset current (refreshed daily)

## Opening the page

1. Open REGIS APP: https://regiscorp.domo.com/app-studio/183500481/pages/925282956
2. **Expected result:** Corporate Overview loads with filter bar and KPI sections.

![Corporate Overview](../../assets/app-183500481-page-corporate-overview.png)

## Filters on this page

| Filter | Default / notes |
| --- | --- |
| Entity Type | Select corporate vs. franchise scope |
| Brand, Franchisee, Salon | Drill-down hierarchy |
| From Date / Through Date | Date range for trends |
| Country, State / Province, Territory, DMA | Geographic filters |
| Is Active? | Active Only |
| Is PY Comp? | PY Comp Only |
| Distribution Pattern | Normal Only |
| Rollup Levels | Brand (controls heat map aggregation) |

## Key card sections

### Sales

| Card | What it shows |
| --- | --- |
| Total Sales | Aggregate net sales for the filtered scope and period |
| Total Sales Trend | Last 13 months compared to prior 13 months |
| Brand Distribution by Total Sales | Sales split by brand |
| Service Sales / Retail Sales | Service vs. retail breakdown |
| AUV | Average unit volume (active salons only) |
| Avg Ticket | Average transaction value |
| Service Sales Trend / Retail Sales Trend | Monthly trend lines |
| Sales Trend by Service Type | Service category breakdown over time |
| Discount % Trending | Discount rate trend |
| Average Haircut Price | Monthly average haircut price |
| Financial Performance Heat Map | YoY sales % change by rollup level |

### Traffic

| Card | What it shows |
| --- | --- |
| Total Traffic | Guest visit count |
| Traffic Heatmap by Day of Week | Day-of-week traffic pattern |
| Avg Traffic | Per salon per day |
| Service Only / Retail Only / Combo Traffic | Traffic type splits |
| Traffic Trend | Last 13 months vs. prior period |

### Locations

| Card | What it shows |
| --- | --- |
| Active Salon Count | Count of active salons as of prior day |
| Active Regis Locations | Map of active locations |
| AUV / Avg Traffic — Top 5 and Bottom 5 | Ranked salon lists |
| Top / Bottom 5 by Net Sales and Traffic | Performance extremes |
| Sundays Closed Trend | Stores closed on latest Sunday |
| Store Counts by Brand | Active salon count by brand |

### Productivity

| Card | What it shows |
| --- | --- |
| Total Productive Hours | Stylist productive hours |
| Total / Service Sales per Hour Trending | SPH trends |
| Avg Productive Hours | Per salon per day |
| SPH (Svc Sales) — MTD, QTD, YTD, FYTD | Period SPH snapshots |
| Stylist Distribution Trend | Stylist count/tenure distribution |
| Service Guests / Hr, Cuts / Hr | Productivity rates |

### Products & Services

| Card | What it shows |
| --- | --- |
| Retail Attach % | Retail attachment rate |
| Combo Tickets Trend | Combo transaction percentage |
| Color % of Sales Trend | Color service share |
| Stylist Experience Trend | Stylist tenure/experience |

### Loyalty & Retention

| Card | What it shows |
| --- | --- |
| New Guest 90-Day Retention % Trend | New guest retention |
| Loyalty Member 90-Day Retention % Trend | Loyalty member retention |
| All Guest 90/180-Day Retention % Trend | Overall retention |
| Average Loyalty / Redemption Ticket Trends | Loyalty ticket values |
| Loyalty Sales % of Total Sales | Loyalty revenue share |
| Member vs. PreMember Average Visit Frequency | Visit frequency differential |

### Digital Engagement

| Card | What it shows |
| --- | --- |
| % Transactions With Valid Email | Email capture rate |
| Online Booking % | Online booking share |
| Booking Segmentation | Booking channel breakdown |

## Common tasks

### Task: Review month-to-date sales performance

1. Open Corporate Overview.
2. Set **From Date** to the first of the current month; **Through Date** to today.
3. Set **Is Active?** to Active Only and **Is PY Comp?** to PY Comp Only.
4. Review **Total Sales**, **Total Sales Trend**, and **Financial Performance Heat Map**.
5. **Expected result:** Cards show MTD totals and YoY comparison for comparable active salons.

### Task: Compare franchisee performance

1. Set **Entity Type** to franchise (if applicable).
2. Use **Franchisee** filter to select one or more franchisees.
3. Compare **AUV**, **Total Traffic**, and **SPH** cards.
4. **Expected result:** Metrics scoped to selected franchisee(s).

## If this fails

| Symptom | Likely cause | Action |
| --- | --- | --- |
| All cards blank | Dataset refresh failure | Check Daily Sales Master 2 refresh; see runbook |
| Stale date on cards | Dataflow not run today | Re-run Daily Sales ETL 2 or wait for schedule |
| Unexpected totals | Filter combination | Reset filters; verify Entity Type and PY Comp settings |

## Related topics

- [Navigation and filters](./navigation-and-filters.md)
- [Franchisee Performance page](./franchisee-performance.md)
- [Daily Sales Master 2 data source](../data-sources/daily-sales-master-2.md)
