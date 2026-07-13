import { mkdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { rootDir } from './lib/books.mjs'
import { buildAllBookDocx } from './build-book-docx.mjs'

const deliveryDir = path.join(rootDir, 'dist', 'delivery')

const README = `REGIS Domo Documentation
=======================

This package contains three Microsoft Word guides for REGIS APP and
REGIS FRANCHISEE APP on https://regiscorp.domo.com.

CONTENTS
--------

  Regis-User-Guide.docx          Corporate REGIS APP daily users
  Regis-Franchisee-Guide.docx    Franchisee REGIS FRANCHISEE APP users
  Regis-Admin-Guide.docx         Domo admins, app owners, and data owners
  README.txt                     This file

HOW TO OPEN
-----------

Open any .docx file in Microsoft Word (or compatible software such as
Word for the web, LibreOffice Writer, or Google Docs via upload).

HOW TO NAVIGATE
---------------

1. Use the Contents page at the front of the document — Ctrl+click (Windows)
   or Cmd+click (Mac) a topic to jump to it.
2. Or turn on View → Navigation pane to browse by heading.

WHO SHOULD USE WHICH FILE
-------------------------

  User Guide         Corporate day-to-day use of REGIS APP
  Franchisee Guide   Franchisee day-to-day use of REGIS FRANCHISEE APP
  Admin Guide        Domo access, PDP, datasets, dataflows, maintenance

  Give franchisee operators ONLY the Franchisee Guide.
  Do not distribute the corporate User Guide or Admin Guide to
  franchisee end users.

HOW TO MAINTAIN AFTER HANDOFF
-----------------------------

These three Word files are the documentation. Edit them directly in Microsoft Word.

Detailed editing guidance (heading styles, updating Contents, backups, and
optional addendum notes) is in the Admin Guide under:

  About this guide → Maintaining this documentation

Generated: {{DATE}}
`

async function buildDelivery({ clean = true } = {}) {
  if (clean) {
    await rm(deliveryDir, { recursive: true, force: true })
  }
  await mkdir(deliveryDir, { recursive: true })

  console.log('Building client delivery package (Word guides only)...\n')
  await buildAllBookDocx()

  const readme = README.replace('{{DATE}}', new Date().toISOString().slice(0, 10))
  await writeFile(path.join(deliveryDir, 'README.txt'), readme, 'utf8')
  console.log('  ✓ README.txt')

  console.log(`\nDone. Package written to dist/delivery/`)
  console.log(
    'Deliver three files: Regis-User-Guide.docx, Regis-Franchisee-Guide.docx, and Regis-Admin-Guide.docx'
  )
}

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])

if (isMain) {
  const args = new Set(process.argv.slice(2))
  buildDelivery({ clean: args.has('--clean') }).catch((err) => {
    console.error(err)
    process.exit(1)
  })
}

export { buildDelivery }
