# RC Documentation Library

Client handoff documentation for **REGIS APP** and **REGIS FRANCHISEE APP** on regiscorp.domo.com.

You edit Markdown here; the customer receives a **zip of `dist/delivery/`** — not this repo.

## Repository layout

```
rc-documentation/
├── README.md                 ← you are here
├── DOCUMENTATION_GUIDE.md    ← how to author and build
├── package.json              ← one build command
│
├── source/                   ← EDIT CONTENT HERE
│   ├── 00-handoff-overview.md
│   ├── library-catalog.md
│   ├── delivery/             ← book intro pages
│   ├── shared/               ← cross-app docs (PDP, datasets, …)
│   └── apps/
│       ├── regis-app/
│       └── regis-franchisee-app/
│
├── books/                    ← topic order for User Guide & Admin Guide
│   ├── user-guide.json
│   └── admin-guide.json
│
├── assets/                   ← screenshots used in the docs
├── templates/html/           ← HTML styling
├── scripts/                  ← build scripts (don't edit unless changing build)
│
├── archive/                  ← old exploration scripts & extras (ignore)
└── dist/delivery/            ← CLIENT PACKAGE (generated — do not edit)
```

## Build and deliver

```powershell
npm.cmd install
npm.cmd run build:all
```

Zip **`dist\delivery\`** and send to the client. It contains:

| Item | Purpose |
| --- | --- |
| `user-guide\index.html` | Linked HTML for daily users |
| `admin-guide\index.html` | Linked HTML for admins |
| `Regis-User-Guide.docx` | Editable Word book (operators) |
| `Regis-Admin-Guide.docx` | Editable Word book (admins) |
| `README.txt` | Instructions for the customer |

## Two guides

| Guide | Audience |
| --- | --- |
| **User Guide** | Daily use — navigation, pages, exports |
| **Admin Guide** | Handoff, PDP, dataflows, maintenance, runbooks |

Topic lists: `books/user-guide.json` and `books/admin-guide.json`.

## Typical workflow

1. Edit files under `source/`
2. Add new topics to the appropriate book JSON if needed
3. `npm.cmd run build:all`
4. Zip `dist\delivery\` for the client

See [DOCUMENTATION_GUIDE.md](./DOCUMENTATION_GUIDE.md) for full detail.

## Apps

| App | URL |
| --- | --- |
| REGIS APP | https://regiscorp.domo.com/app-studio/183500481/pages/925282956 |
| REGIS FRANCHISEE APP | https://regiscorp.domo.com/app-studio/2028360971/pages/1195391822 |
