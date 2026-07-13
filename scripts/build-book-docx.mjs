import { mkdir, readFile, writeFile } from 'node:fs/promises'
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
import { styleDocxHyperlinks } from './lib/style-docx-hyperlinks.mjs'

const deliveryDir = path.join(rootDir, 'dist', 'delivery')

const docxOptions = {
  toc: {
    title: 'Contents',
    minDepth: 1,
    maxDepth: 2,
  },
  imageHandling: {
    maxImages: 100,
  },
  style: {
    fontFamily: 'Calibri',
    titleSize: 48,
    heading1Size: 36,
    heading2Size: 28,
    heading3Size: 24,
    paragraphSize: 22,
    headingSpacing: 200,
    paragraphSpacing: 120,
    lineSpacing: 1.15,
    tocFontSize: 22,
    tocHeading1FontSize: 24,
    tocHeading1Bold: true,
    tocHeading2FontSize: 22,
    tocHeading2Bold: false,
  },
}

async function buildBookDocx(manifest, fileIndex) {
  const topics = flattenTopics(manifest)
  const parts = [
    `# ${manifest.title}`,
    '',
    `*${manifest.subtitle}*`,
    '',
    '**How to use this guide**',
    '',
    '- Use the **Contents** list below to jump to a topic (Ctrl+click / Cmd+click a link).',
    '- Or open **View → Navigation pane** in Microsoft Word to browse by heading.',
    '',
    '[TOC]',
    '',
  ]

  let currentSection = null
  for (const topic of topics) {
    if (topic.sectionTitle !== currentSection) {
      currentSection = topic.sectionTitle
      parts.push(`# ${currentSection}`, '')
    }

    const sourcePath = path.join(rootDir, topic.file)
    const raw = await readFile(sourcePath, 'utf8')
    const prepared = prepareMarkdownForDocxBook(raw, topic.file, fileIndex, manifest.id)
    // Topic title as Heading 2 under the section Heading 1 (drives TOC + Navigation pane).
    parts.push(`## ${topic.title}`, '', prepared, '')
  }

  const markdown = parts.join('\n')
  const blob = await convertMarkdownToDocx(markdown, docxOptions)
  const buffer = Buffer.from(await blob.arrayBuffer())
  const dest = path.join(deliveryDir, manifest.docxFilename)
  await writeFile(dest, buffer)
  await styleDocxHyperlinks(dest)
  console.log(`  ✓ ${manifest.docxFilename} (${topics.length} topics)`)
}

export async function buildAllBookDocx() {
  await mkdir(deliveryDir, { recursive: true })

  const userManifest = await loadBookManifest('user-guide')
  const adminManifest = await loadBookManifest('admin-guide')
  const fileIndex = buildFileIndex([userManifest, adminManifest])

  console.log('Building Word guides...')
  await buildBookDocx(userManifest, fileIndex)
  await buildBookDocx(adminManifest, fileIndex)
}

const isMain =
  process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])

if (isMain) {
  buildAllBookDocx()
    .then(() => console.log('\nWord guides written to dist/delivery/'))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
