# RC Documentation Library

Source workspace used to **build** three Word guides for REGIS APP and REGIS FRANCHISEE APP. The customer receives those Word files only — not this repository.

## Customer deliverable

```
dist/delivery/
  Regis-User-Guide.docx          ← corporate REGIS APP daily users
  Regis-Franchisee-Guide.docx    ← franchisee REGIS FRANCHISEE APP users
  Regis-Admin-Guide.docx         ← admins (platform, PDP, maintenance)
  README.txt                     ← how to open and maintain
```

Zip `dist/delivery/` and hand it off. Give franchisee operators **only** the Franchisee Guide. After handoff, the customer owns and edits the three `.docx` files in Microsoft Word.

## Build (vendor only)

```powershell
npm.cmd install
npm.cmd run build:all
```

## Repository layout

```
source/          Markdown used to generate the Word books
books/           Topic order for each guide (JSON manifests)
assets/          Screenshots embedded into Word
scripts/         Build scripts
templates/       (legacy HTML styling — not used for delivery)
archive/         Exploration artifacts — ignore
```

## Three guides

| File | Audience |
| --- | --- |
| `Regis-User-Guide.docx` | Corporate daily use of REGIS APP |
| `Regis-Franchisee-Guide.docx` | Franchisee daily use of REGIS FRANCHISEE APP |
| `Regis-Admin-Guide.docx` | Handoff, PDP, dataflows, maintenance, runbooks |

Each book has a clickable **Contents** page and Heading styles that work with Word’s Navigation pane.

## Apps

| App | URL |
| --- | --- |
| REGIS APP | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| REGIS FRANCHISEE APP | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |
