import { mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { convertMarkdownToDocx } from '@mohtasham/md-to-docx'
import {
  buildFileIndex,
  flattenTopics,
  loadBookManifest,
  rootDir,
} from './lib/books.mjs'
import { prepareMarkdownForDocxBook } from './lib/markdown.mjs'

const deliveryDir = path.join(rootDir, 'dist', 'delivery')

async function buildBookDocx(manifest, fileIndex) {
  const topics = flattenTopics(manifest)
  const parts = [
    `# ${manifest.title}`,
    '',
    manifest.subtitle,
    '',
    '---',
    '',
  ]

  for (const topic of topics) {
    const sourcePath = path.join(rootDir, topic.file)
    const raw = await readFile(sourcePath, 'utf8')
    const prepared = prepareMarkdownForDocxBook(raw, topic.file, fileIndex, manifest.id)
    parts.push(`## ${topic.title}`, '', prepared, '', '---', '')
  }

  const markdown = parts.join('\n')
  const blob = await convertMarkdownToDocx(markdown)
  const buffer = Buffer.from(await blob.arrayBuffer())
  const dest = path.join(deliveryDir, manifest.docxFilename)
  await writeFile(dest, buffer)
  console.log(`  ✓ ${manifest.docxFilename}`)
}

export async function buildAllBookDocx() {
  await mkdir(deliveryDir, { recursive: true })

  const userManifest = await loadBookManifest('user-guide')
  const adminManifest = await loadBookManifest('admin-guide')
  const fileIndex = buildFileIndex([userManifest, adminManifest])

  console.log('Building compiled Word books...')
  await buildBookDocx(userManifest, fileIndex)
  await buildBookDocx(adminManifest, fileIndex)
}

const isMain = import.meta.url === `file://${process.argv[1]}` || fileURLToPath(import.meta.url) === path.resolve(process.argv[1])

if (isMain) {
  buildAllBookDocx()
    .then(() => console.log('\nWord books written to dist/delivery/'))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
