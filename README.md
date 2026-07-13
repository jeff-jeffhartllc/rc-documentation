# RC Documentation Library

Source workspace used to **build** two Word guides for REGIS APP and REGIS FRANCHISEE APP. The customer receives those Word files only — not this repository.

## Customer deliverable

```
dist/delivery/
  Regis-User-Guide.docx    ← operators (daily use)
  Regis-Admin-Guide.docx   ← admins (platform, PDP, maintenance)
  README.txt               ← how to open and maintain
```

Zip `dist/delivery/` and hand it off. After handoff, the customer owns and edits the two `.docx` files in Microsoft Word. No further repo access or rebuilds are required from the vendor.

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

## Two guides

| File | Audience |
| --- | --- |
| `Regis-User-Guide.docx` | Daily use — navigation, pages, exports |
| `Regis-Admin-Guide.docx` | Handoff, PDP, dataflows, maintenance, runbooks |

Each book has a clickable **Contents** page and Heading styles that work with Word’s Navigation pane.

## Apps

| App | URL |
| --- | --- |
| REGIS APP | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| REGIS FRANCHISEE APP | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |
