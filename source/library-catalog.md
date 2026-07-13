# Documentation Library Catalog

<div class="cover-meta">

**Document type:** Master index (vendor source)  
**Audience:** Documentation maintainers  
**Domo instance:** https://regiscorp.domo.com  
**Status:** Complete  
**Last updated:** 2026-07-13

</div>

## Client delivery

Customers receive **two Word files** (plus a short README):

| Deliverable | Description |
| --- | --- |
| `Regis-User-Guide.docx` | User Guide — daily use |
| `Regis-Admin-Guide.docx` | Admin Guide — platform and maintenance |
| `README.txt` | How to open and maintain |

Build: `npm run build:all` → zip `dist/delivery/`

Topic order and source file mapping: `books/user-guide.json` and `books/admin-guide.json`.

After handoff, customers edit the Word files directly. This repository is not required for maintenance. Do not put repository paths (for example `shared/…md`) in customer-facing prose — use topic titles and guide names instead.

## Topics by Word guide

### Admin Guide — Getting started

| Topic title in Word |
| --- |
| About this guide |
| Client handoff overview |

### Admin Guide — Platform and relationship

| Topic title in Word |
| --- |
| REGIS APP and franchisee app relationship |
| Domo instance access |
| Escalation and support model |

### Admin Guide — Data platform

| Topic title in Word |
| --- |
| Shared dataset inventory |
| Dataflow inventory |
| Daily Sales Master 2 |
| Store Scorecard Data_Brand Peers |
| DimSalon dataset |
| Franchisee app shared datasets |

### Admin Guide — PDP and access

| Topic title in Word |
| --- |
| PDP overview and testing |
| PDP policy inventory |
| REGIS APP — user roles and access |
| Franchisee app — user roles and access |

### Admin Guide — Maintenance

| Topic title in Word |
| --- |
| Change management checklist |
| Beast Mode edits |
| Troubleshooting guide (REGIS APP) |
| Runbook — refresh failures |
| Change checklist (franchisee) |
| PDP troubleshooting |
| Troubleshooting guide (franchisee) |
| Runbook — access and PDP issues |
| Glossary |

### User Guide — REGIS APP (corporate)

| Topic title in Word |
| --- |
| App overview |
| Navigation and filters |
| Corporate Overview |
| Franchisee Performance |
| Store Performance Report Card |
| Store Performance Scorecard |
| Daily Sales Email Report |
| Daily Laddering Report |
| Reference page |
| Exports and sharing |

### User Guide — REGIS FRANCHISEE APP

| Topic title in Word |
| --- |
| App overview |
| Navigation and filters |
| Franchisee Performance |
| Store Performance Report Card |
| Store Performance Scorecard |
| Reference page |
| Exports and sharing |
| Glossary |
| Getting help |

## Adding new topics (before handoff)

1. Create Markdown under `source/`
2. Add the topic (title + file) to `books/user-guide.json` and/or `books/admin-guide.json`
3. Cross-link with Markdown link text that names the topic; avoid writing `shared/…md` path strings in prose
4. Run `npm run build:all`
5. Verify Contents and Navigation in the generated Word files
