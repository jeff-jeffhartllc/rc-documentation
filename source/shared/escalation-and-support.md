# Escalation and Support Model

<div class="cover-meta">

**Apps:** REGIS APP, REGIS FRANCHISEE APP  
**Document type:** Shared operations reference  
**Audience:** All users, app owners, support staff  
**Domo instance:** https://regiscorp.domo.com  
**Last updated:** 2026-07-10  
**Author / owner:** _TBD — service owner_

</div>

## Support tiers

| Tier | Owner | Handles |
| --- | --- | --- |
| **Tier 1 — Daily users** | Self-service via this library | Navigation, filters, exports, basic troubleshooting |
| **Tier 2 — App / data owners** | _TBD — primary app owner_ | Card errors, access requests, data quality questions |
| **Tier 3 — Domo Admin / IT** | _TBD — Domo Admin_ | PDP configuration, user provisioning, connector credentials |
| **Tier 4 — Vendor / Domo Support** | Domo account team | Platform outages, Domo product defects |

## Ownership matrix (to be completed by client)

| Area | Owner | Contact | Notes |
| --- | --- | --- | --- |
| Primary app owner | _TBD_ | | REGIS APP and REGIS FRANCHISEE APP |
| Data owner | _TBD_ | | Datasets, dataflows, refresh schedules |
| PDP / access owner | _TBD_ | | Franchisee store assignments, PDP policies |
| IT / access owner | _TBD_ | | Domo user provisioning (native credentials) |
| Escalation contact | _TBD_ | | Single point for unresolved issues |
| Change approval | _TBD_ | | Production app and dataflow changes |

## When to escalate

| Situation | Escalate to | Urgency |
| --- | --- | --- |
| Blank cards across multiple pages | Data owner → check dataflow refresh | High if during business hours |
| Single user cannot access app | App owner → verify group/role | Medium |
| Franchisee sees wrong stores | PDP / access owner | **High — data privacy** |
| Franchisee sees no data | PDP / access owner → data owner | Medium |
| Dataflow failure | Data owner | High |
| Login failure | Domo Admin / access owner | High |
| Incorrect metric after confirmed good data | App owner / analyst | Medium |
| Need new page or major app change | App owner + change approval | Planned |

## Support boundaries

**In scope for client self-maintenance (with this library):**

- Daily app navigation and filter usage
- Routine card and Beast Mode edits
- Dataflow re-run and refresh monitoring
- User access requests (with Admin role)
- PDP testing and basic troubleshooting

**Out of scope / requires specialist:**

- Connector credential rotation (typically IT / data owner)
- Major data model redesign
- Custom Domo plugin development
- Domo platform licensing and billing

## Domo Support

For platform-level issues (Domo outage, product bug):

1. Check https://status.domo.com for known incidents.
2. Contact your Domo account representative or open a ticket through Domo Support.
3. Include the **TOE** (trace ID) from any error message when reporting to Domo.

## Related documents

- [Domo instance access](./domo-access.md)
- [Refresh failure runbook](../apps/regis-app/maintenance/runbook-refresh-failures.md)
- [PDP troubleshooting](../apps/regis-franchisee-app/maintenance/pdp-troubleshooting.md)
- [Troubleshooting guide (REGIS APP)](../apps/regis-app/maintenance/troubleshooting-guide.md)
