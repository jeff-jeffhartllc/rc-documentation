# Runbook — Data Refresh Failures

<div class="cover-meta">

**App(s):** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Runbook  
**Audience:** Data owners, app owners  
**Trigger:** Cards show stale data; dataflow execution failed  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — data owner_

</div>

## Objective

Restore current data to REGIS APP and REGIS FRANCHISEE APP by identifying and resolving the failed dataflow or upstream source.

## When to use

- Daily Sales Master 2 has not refreshed in >24 hours
- Dataflow execution shows FAILED status in Domo
- Multiple cards across both apps show blank or stale data
- Alert notification received for dataflow failure

## Required access

- Editor or Admin role in regiscorp.domo.com
- Access to **Data Center** and **Magic ETL** (Dataflows)

## Procedure

| Step | Action | Expected result |
| --- | --- | --- |
| 1 | Open **Data Center** → search **Daily Sales Master 2** → check Last Updated | Identify how stale the data is |
| 2 | Go to **Dataflows** → open **Daily Sales ETL 2** → check last execution | Status SUCCESS or FAILED |
| 3 | If FAILED: open execution history → read error message | Identify failing step and input dataset |
| 4 | Check upstream inputs: domo_regis.FactDailySales, AllineDailyLabor, DimSalon, DimDate | Each input should have recent Last Updated |
| 5 | If upstream source is stale: contact upstream owner or wait for connector refresh | Upstream refreshes |
| 6 | If upstream is current: click **Run** on Daily Sales ETL 2 | Execution completes with SUCCESS |
| 7 | Verify Daily Sales Master 2 Last Updated timestamp is current | Dataset refreshed |
| 8 | Check dependent dataflows: Daily Sales Master Indexing 2, Store Scorecard ETL | Re-run if triggered by input update |
| 9 | Open REGIS APP → Corporate Overview → verify cards show current data | Cards populated |
| 10 | Open REGIS FRANCHISEE APP → Franchisee Performance → spot-check | Franchisee app also current |

## Dataflow dependency order

When manually re-running, follow this order:

1. **Daily Sales ETL 2** → produces Daily Sales Master 2
2. **Daily Sales Master Indexing 2** → produces Daily Sales Indexed by Store 2
3. **Store Scorecard ETL** / **Store Scorecard by Brand ETL** → produces scorecard datasets
4. **Corp Employees Daily Sales ETL** → if corp employee cards affected

## Verification

- Daily Sales Master 2 Last Updated is within the last few hours
- REGIS APP Corporate Overview cards show today's or yesterday's data (depending on cut-off)
- No error icons on cards in either app

## Escalation

| If… | Then… | Contact |
| --- | --- | --- |
| Upstream connector failed | Escalate to IT / data engineering | _TBD — data owner_ |
| Dataflow error persists after re-run | Escalate to Domo analyst / Admin | _TBD — app owner_ |
| Data correct in dataset but cards wrong | Escalate to app owner (card config issue) | _TBD — app owner_ |
| Platform outage | Check status.domo.com; contact Domo Support | Domo account team |

## Related documents

- [Dataflow inventory](../data-sources/dataflow-inventory.md)
- [Daily Sales Master 2 data source](../data-sources/daily-sales-master-2.md)
- [Troubleshooting guide](./troubleshooting-guide.md)
