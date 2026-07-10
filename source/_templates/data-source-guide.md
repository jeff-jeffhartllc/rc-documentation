# Data Source Guide: [Dataset or Connector Name]

<div class="cover-meta">

**App(s):** [App A, App B, or Shared]  
**Document type:** Data source guide  
**Audience:** [e.g. Data owners, analysts]  
**Domo dataset / dataflow:** [Exact name in Domo]  
**Last updated:** YYYY-MM-DD  
**Author / owner:** [Name or team]

</div>

## Summary

One-paragraph description of what this dataset provides and which apps depend on it.

## Source system

| Item | Value |
| --- | --- |
| Upstream system | _e.g. Salesforce, warehouse, file drop_ |
| Connection type | _Connector / FTP / API / warehouse_ |
| Owner | _Team or person_ |
| Refresh schedule | _e.g. Daily at 6:00 AM ET_ |
| Historical depth | _e.g. 24 months rolling_ |

## Lineage

```
[Source system] → [Ingestion / connector] → [Magic ETL / dataflow] → [Domo dataset] → [App cards]
```

Describe each hop in plain language.

## Key fields

| Field | Type | Description | Business rules / notes |
| --- | --- | --- | --- |
| _example_field_ | _type_ | _meaning_ | _calcs, null handling_ |

## Downstream usage

| App | Page / card | How this dataset is used |
| --- | --- | --- |
| _App A_ | _Page name_ | _Usage_ |

## Change management

Explain how to request or implement schema changes, new fields, or logic updates.

## Failure handling

| Failure mode | How it surfaces | Response steps |
| --- | --- | --- |
| Refresh failure | _Symptom_ | _Runbook link or steps_ |
| Late upstream data | _Symptom_ | _Steps_ |
| Schema change | _Symptom_ | _Steps_ |

## Related documents

- [Maintenance guide](../maintenance/example.md)
- [Runbook](../../shared/example-runbook.md)
