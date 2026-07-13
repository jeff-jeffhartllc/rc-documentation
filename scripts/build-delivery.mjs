import { writeFile, rm } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rootDir } from './lib/books.mjs'
import { buildAllHtml } from './build-html.mjs'
import { buildAllBookDocx } from './build-book-docx.mjs'

const deliveryDir = path.join(rootDir, 'dist', 'delivery')

const README = `REGIS Domo Documentation Package
================================

This package contains linked HTML guides and editable Word books for REGIS APP
and REGIS FRANCHISEE APP on https://regiscorp.domo.com.

CONTENTS
--------

  README.txt                 This file
  Regis-User-Guide.docx      User guide (Word — for editing)
  Regis-Admin-Guide.docx     Admin guide (Word — for editing)
  user-guide/                User guide (HTML — for browsing)
    index.html               Start here — table of contents
    topics/                  Individual topic pages
    assets/                  Screenshots
  admin-guide/               Admin guide (HTML — for browsing)
    index.html               Start here — table of contents
    topics/                  Individual topic pages
    assets/                  Screenshots

HOW TO USE (HTML)
-----------------

1. Unzip this folder anywhere on your computer or copy to a network share.
2. Open user-guide/index.html or admin-guide/index.html in a web browser
   (Chrome, Edge, or Firefox recommended).
3. Use the table of contents and sidebar links to navigate between topics.

No internet connection is required after unzip. Links work offline.

HOW TO EDIT (WORD)
------------------

1. Open Regis-User-Guide.docx or Regis-Admin-Guide.docx in Microsoft Word.
2. Use Word's Navigation pane (View → Navigation pane) to jump between sections.
3. Save your edited copy locally.

Your Word edits are not automatically synced back to the vendor. When you receive
an updated package from your documentation maintainer, merge your local changes
into the new files or keep a separate "local addendum" document for org-specific notes.

WHICH GUIDE?
------------

  User Guide   Daily use — navigation, filters, pages, exports (operators)
  Admin Guide  Handoff, access, PDP, datasets, dataflows, maintenance, runbooks

The Admin Guide links to the User Guide for daily-use topics instead of duplicating them.

UPDATES
-------

When your vendor sends a new documentation package, replace this folder or merge
your Word edits into the new Regis-User-Guide.docx and Regis-Admin-Guide.docx files.

Generated: {{DATE}}
`

async function buildDelivery({ clean = true } = {}) {
  if (clean) {
    await rm(deliveryDir, { recursive: true, force: true })
  }

  console.log('Building client delivery package...\n')
  await buildAllHtml({ clean: false })
  await buildAllBookDocx()

  const readme = README.replace('{{DATE}}', new Date().toISOString().slice(0, 10))
  await writeFile(path.join(deliveryDir, 'README.txt'), readme, 'utf8')
  console.log('  ✓ README.txt')

  console.log(`\nDone. Delivery package written to dist/delivery/`)
  console.log('Zip dist/delivery/ for client handoff.')
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])

if (isMain) {
  const args = new Set(process.argv.slice(2))
  buildDelivery({ clean: args.has('--clean') })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}

export { buildDelivery }
