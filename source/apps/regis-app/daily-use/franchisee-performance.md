# REGIS APP — Franchisee Performance

<div class="cover-meta">

**App:** REGIS APP  
**Document type:** Daily use guide  
**Audience:** Corporate users monitoring franchisee operations  
**Domo page:** Franchisee Performance (`1429176950`)  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Purpose

The **Franchisee Performance** page provides the same KPI structure as Corporate Overview but is optimized for franchisee-level analysis. Corporate users can filter across all franchisees to compare performance.

> **Note:** REGIS FRANCHISEE APP has an equivalent page (`1195391822`) scoped by PDP to a single franchisee. See the franchisee app guide for franchisee-user instructions.

## Opening the page

1. Open REGIS APP → **Franchisee Performance** in the left navigation.  
   Direct link: https://regiscorp.domo.com/app-studio/183500481/pages/1429176950
2. **Expected result:** Franchisee Performance page loads with filter bar and KPI cards.

![Franchisee Performance — REGIS APP](../../assets/app-183500481-page-franchisee-performance.png)

## Filters

Same filter set as Corporate Overview except **Entity Type** may default differently:

| Filter | Notes |
| --- | --- |
| Brand, Franchisee, Salon | Primary drill-down path |
| From Date / Through Date | Date range |
| Country, State / Province, Territory, DMA | Geographic |
| Is Active? | Active Only |
| Is PY Comp? | PY Comp Only |
| Rollup Levels | DMA (default on this page vs. Brand on Corporate Overview) |

## Key cards

Card sections mirror Corporate Overview: **Sales**, **Traffic**, **Locations**, **Productivity**, **Products & Services**, **Loyalty & Retention**, **Digital Engagement**.

Notable difference from franchisee app equivalent:

| Card (corporate page) | Franchisee app equivalent |
| --- | --- |
| Active Regis Locations | Active Franchise Locations |

## Common tasks

### Task: Review a single franchisee's performance

1. Select the **Franchisee** filter → choose the target franchisee.
2. Set date range (From / Through Date).
3. Review **Total Sales Trend**, **AUV**, **Total Traffic**, and **SPH** cards.
4. **Expected result:** All metrics scoped to the selected franchisee's salons.

### Task: Compare two franchisees

1. Open **Franchisee** filter and select two franchisees (if multi-select supported).
2. Use **Brand Distribution by Total Sales** and **Financial Performance Heat Map** for comparison.
3. **Expected result:** Side-by-side or aggregated view of selected franchisees.

## Related documents

- [Corporate Overview](./corporate-overview.md)
- [Franchisee app — Franchisee Performance](../../regis-franchisee-app/daily-use/franchisee-performance.md)
- [REGIS app relationship (shared)](../../shared/regis-app-relationship.md)
