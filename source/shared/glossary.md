# Glossary — Business Terms and Calculated Fields

<div class="cover-meta">

**Apps:** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Shared reference  
**Audience:** All users  
**Domo instance:** https://regiscorp.domo.com  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — app owner / analytics lead_

</div>

## Business terms

| Term | Definition |
| --- | --- |
| **Salon / Store / Location** | A single Regis-operated or franchised salon location. Used interchangeably in filters and cards. |
| **Franchisee** | A franchise operator who owns/operates one or more salons under a Regis brand. |
| **Brand** | Regis salon brand (e.g., Supercuts, SmartStyle, Cost Cutters, First Choice Haircutters, Roosters). |
| **Entity Type** | Corporate filter distinguishing corporate-owned vs. franchise vs. other entity classifications. Present in REGIS APP; absent in franchisee app (PDP handles scope). |
| **PY Comp** | Prior-year comparable — filters or metrics limited to salons open in both current and prior-year periods. |
| **Distribution Pattern** | Classification of salon operating/distribution model. "Normal Only" is a common filter default. |
| **DMA** | Designated Market Area — geographic market grouping used in filters and rollup. |
| **Territory** | Regional territory grouping for salon operations. |
| **AUV** | Average Unit Volume — average sales per active salon. |
| **SSS** | Same-store sales — year-over-year sales comparison for comparable salons. |
| **SPH** | Sales per hour — service sales divided by productive hours. Variants: MTD, QTD, YTD, FYTD. |
| **Combo Ticket / Combo %** | Transaction including both service and retail. |
| **Retail Attach %** | Percentage of service transactions that include retail product purchase. |
| **Laddering** | Daily operational report tracking day-over-day metric progression (corporate Daily Laddering Report page). |
| **Report Card / Scorecard** | Store performance evaluation views with cumulative scores and peer comparisons. |
| **SST Letter Grade** | Store Scorecard letter grade metric (see Reference page). |
| **Zenoti** | Upstream salon technology platform (post-2024 migration) feeding warehouse data into Domo. |

## Common card groupings

| Section | Example cards |
| --- | --- |
| **Sales** | Total Sales, Service Sales, Retail Sales, AUV, Avg Ticket, Total Sales Trend |
| **Traffic** | Total Traffic, Avg Traffic, Service Only Traffic, Retail Only Traffic, Combo Traffic |
| **Locations** | Active Salon Count, Top/Bottom 5 by Net Sales or Traffic, Store Counts by Brand |
| **Productivity** | Total Productive Hours, SPH (Svc Sales), Service Guests / Hr, Cuts / Hr |
| **Products & Services** | Retail Attach %, Combo Tickets Trend, Color % of Sales, Stylist Experience Trend |
| **Loyalty & Retention** | 90-Day / 180-Day Retention %, Loyalty Sales %, Member vs. PreMember Frequency |
| **Digital Engagement** | % Transactions With Valid Email, Online Booking %, Booking Segmentation |

## Filter defaults commonly observed

| Filter | Typical default | Notes |
| --- | --- | --- |
| Is Active? | Active Only | Excludes closed salons |
| Is PY Comp? | PY Comp Only (where present) | Comparable store filter |
| Distribution Pattern | Normal Only (where present) | Report Card page |
| Rollup Levels | Brand (corporate overview) / DMA (franchisee performance) | Controls heat map aggregation |

## Dataset abbreviations

| Abbreviation | Full name |
| --- | --- |
| DSM / DSM2 | Daily Sales Master / Daily Sales Master 2 |
| DimSalon | Salon dimension table |
| FactDailySales | Fact table for daily sales transactions |

## Related documents

- [Reference page guide (REGIS APP)](../apps/regis-app/daily-use/reference-page.md)
- [Shared dataset inventory](./dataset-inventory.md)
- [REGIS app relationship guide](./regis-app-relationship.md)
