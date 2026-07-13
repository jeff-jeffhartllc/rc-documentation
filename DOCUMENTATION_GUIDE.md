# Documentation Authoring Guide (vendor)

This repository builds **two Word files** for the customer. Customers do not use this repo.

## Deliverable

| File | Audience |
| --- | --- |
| `Regis-User-Guide.docx` | Operators |
| `Regis-Admin-Guide.docx` | Admins / data owners |

Build:

```bash
npm install
npm run build:all
```

Zip `dist/delivery/` for handoff.

## After handoff

Customer ownership is the two `.docx` files. They edit in Microsoft Word. No Markdown, HTML, or git is involved on the customer side.

## Vendor authoring (optional, until handoff)

1. Edit Markdown under `source/`
2. Adjust topic order in `books/user-guide.json` / `books/admin-guide.json`
3. `npm run build:all`
4. Verify Contents links and Navigation pane headings in Word

## Book structure

- `#` section titles (Heading 1) — from the manifest section name
- `##` topic titles (Heading 2) — from the manifest topic title
- `[TOC]` generates a clickable Contents list at the front of each book

Intro pages live in `source/delivery/`.

## Coverage

### User Guide

- REGIS APP and franchisee daily-use topics
- Glossary and getting help

### Admin Guide

- Handoff, access, PDP, datasets, dataflows
- Maintenance and runbooks
- Pointer to User Guide (no duplicate daily-use content)

## Quality bar

Each topic should answer who, when, what steps, where in Domo, expected results, and what to do on failure. Avoid credentials.
