# Troubleshooting Guide — REGIS FRANCHISEE APP

<div class="cover-meta">

**App:** REGIS FRANCHISEE APP  
**Document type:** Troubleshooting guide  
**Audience:** Franchisee users, support staff, app owners  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — primary app owner_

</div>

## Quick reference

| Symptom | Likely cause | First action | Section |
| --- | --- | --- | --- |
| Blank cards | Data refresh failure or PDP issue | Check data then PDP | [Stale data](#stale-or-missing-data) |
| No data at all | PDP not assigned | See PDP guide | [PDP issues](#pdp-issues) |
| Wrong stores visible | PDP misconfiguration | Escalate immediately | [PDP issues](#pdp-issues) |
| Scorecard empty | Store Scorecard by Brand ETL failure | Check dataflow | [Stale data](#stale-or-missing-data) |
| Cannot open app | Missing access | Contact administrator | [Access issues](#access-issues) |

## Stale or missing data

1. Check if the issue affects all franchisee users or just one.
2. If all users: likely a data refresh issue — see [Runbook — refresh failures](../../regis-app/maintenance/runbook-refresh-failures.md).
3. If one user: likely a PDP issue — see [PDP troubleshooting](./pdp-troubleshooting.md).

## PDP issues

See the dedicated guide: [PDP troubleshooting](./pdp-troubleshooting.md).

## Access issues

1. Verify user has REGIS FRANCHISEE APP access (not just REGIS APP).
2. Confirm Participant role.
3. Contact administrator to verify group and PDP assignment.

## Related documents

- [PDP troubleshooting](./pdp-troubleshooting.md)
- [Troubleshooting (REGIS APP)](../../regis-app/maintenance/troubleshooting-guide.md)
- [Escalation and support (shared)](../../shared/escalation-and-support.md)
