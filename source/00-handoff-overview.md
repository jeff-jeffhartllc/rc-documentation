# Client Handoff Overview

<div class="cover-meta">

**Document type:** Handoff package overview  
**Audience:** Client stakeholders and app owners  
**Status:** Draft — populate as apps are documented  
**Last updated:** 2026-07-10

</div>

## Purpose of this library

This document library supports your transition to **self-maintenance** for two closely related Domo applications. It is designed as a practical reference for daily use and for ongoing upkeep of the apps and their data sources.

## What is included

| Section | Location | Description |
| --- | --- | --- |
| Library catalog | `library-catalog.pdf` | Master index of all documents |
| App A documentation | `apps/app-a/` | Daily use, maintenance, and data sources for the first app |
| App B documentation | `apps/app-b/` | Daily use, maintenance, and data sources for the second app |
| Shared documentation | `shared/` | Cross-app platform, governance, and glossary material |

> **Note:** Folder names `app-a` and `app-b` are placeholders and will be renamed to match your Domo app names.

## How to use this library

### For daily users

Start with the **daily-use** guides for your app. These explain how to navigate pages, apply filters, interpret key cards, and perform routine tasks.

### For app owners and analysts

Use the **maintenance** guides when you need to change cards, pages, calculated fields, or access. Follow the change checklist in each guide before publishing updates.

### For data owners

Use the **data-sources** guides to understand datasets, refresh schedules, upstream systems, and how to respond to refresh or quality issues.

## Recommended reading order

1. This overview
2. `library-catalog.pdf`
3. Shared platform and glossary documents (if present)
4. Your app’s overview and daily-use guides
5. Maintenance and data-source guides for your role

## Support model after handoff

Define the following before final delivery (to be completed by the documentation author):

| Item | Owner | Notes |
| --- | --- | --- |
| Primary app owner | _TBD_ | |
| Data owner | _TBD_ | |
| Escalation contact | _TBD_ | |
| Domo instance URL | _TBD_ | |
| Change approval process | _TBD_ | |

## Document conventions

- **Screenshots** illustrate Domo UI steps where helpful
- **Tables** summarize datasets, schedules, and ownership
- **Runbooks** provide step-by-step procedures for common operational tasks
- **Troubleshooting guides** map symptoms to likely causes and fixes

## Feedback and updates

As your team uses these documents, record gaps or corrections and update the corresponding Markdown source files in this repository, then rebuild PDFs with:

```bash
npm run pdf:build
```
