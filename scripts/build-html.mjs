import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import MarkdownIt from 'markdown-it'
import {
  buildFileIndex,
  flattenTopics,
  loadBookManifest,
  rootDir,
} from './lib/books.mjs'
import { prepareMarkdownForHtml } from './lib/markdown.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const deliveryDir = path.join(rootDir, 'dist', 'delivery')
const assetsSource = path.join(rootDir, 'assets')
const templateCss = path.join(rootDir, 'templates', 'html', 'style.css')

const md = new MarkdownIt({ html: true, linkify: true, typographer: true })

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderSidebar(manifest, activeSlug) {
  const linkPrefix = activeSlug ? '' : 'topics/'
  let html = ''
  for (const section of manifest.sections) {
    html += `<h2>${escapeHtml(section.title)}</h2><ul>`
    for (const topic of section.topics) {
      const active = topic.slug === activeSlug ? ' class="active"' : ''
      html += `<li><a href="${linkPrefix}${topic.slug}.html"${active}>${escapeHtml(topic.title)}</a></li>`
    }
    html += '</ul>'
  }
  return html
}

function renderIndex(manifest) {
  let toc = ''
  for (const section of manifest.sections) {
    toc += `<div class="toc-section"><h2>${escapeHtml(section.title)}</h2><ul>`
    for (const topic of section.topics) {
      toc += `<li><a href="topics/${topic.slug}.html">${escapeHtml(topic.title)}</a></li>`
    }
    toc += '</ul></div>'
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(manifest.title)}</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <header class="site-header">
    <h1>${escapeHtml(manifest.title)}</h1>
    <p>${escapeHtml(manifest.subtitle)}</p>
  </header>
  <main class="content index-page">
    <p>Select a topic below. Each page includes a table of contents in the sidebar and links to related topics.</p>
    ${toc}
  </main>
</body>
</html>`
}

function renderTopicPage(manifest, topic, topics, htmlBody, fileIndex) {
  const idx = topics.findIndex((t) => t.slug === topic.slug)
  const prev = idx > 0 ? topics[idx - 1] : null
  const next = idx < topics.length - 1 ? topics[idx + 1] : null

  let topicNav = '<nav class="topic-nav">'
  if (prev) {
    topicNav += `<div class="prev">← <a href="${prev.slug}.html">${escapeHtml(prev.title)}</a></div>`
  }
  if (next) {
    topicNav += `<div class="next"><a href="${next.slug}.html">${escapeHtml(next.title)}</a> →</div>`
  }
  topicNav += '</nav>'

  const sidebar = renderSidebar(manifest, topic.slug)

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(topic.title)} — ${escapeHtml(manifest.title)}</title>
  <link rel="stylesheet" href="../style.css">
</head>
<body>
  <header class="site-header">
    <h1><a href="../index.html" style="color:inherit;text-decoration:none">${escapeHtml(manifest.title)}</a></h1>
    <p>${escapeHtml(manifest.subtitle)}</p>
  </header>
  <div class="layout">
    <aside class="sidebar" aria-label="Table of contents">
      ${sidebar}
    </aside>
    <main class="content">
      <div class="breadcrumb"><a href="../index.html">Home</a> / ${escapeHtml(topic.sectionTitle)} / ${escapeHtml(topic.title)}</div>
      <article class="article">
        ${htmlBody}
      </article>
      ${topicNav}
    </main>
  </div>
</body>
</html>`
}

async function buildBookHtml(manifest, fileIndex) {
  const bookDir = path.join(deliveryDir, manifest.id)
  const topicsDir = path.join(bookDir, 'topics')
  await mkdir(topicsDir, { recursive: true })

  await cp(templateCss, path.join(bookDir, 'style.css'))
  await cp(assetsSource, path.join(bookDir, 'assets'), { recursive: true })

  const topics = flattenTopics(manifest)

  await writeFile(path.join(bookDir, 'index.html'), renderIndex(manifest), 'utf8')
  console.log(`  ✓ ${manifest.id}/index.html`)

  for (const topic of topics) {
    const sourcePath = path.join(rootDir, topic.file)
    const raw = await readFile(sourcePath, 'utf8')
    const prepared = prepareMarkdownForHtml(raw, topic.file, manifest.id, fileIndex)
    const htmlBody = md.render(prepared)
    const page = renderTopicPage(manifest, topic, topics, htmlBody, fileIndex)
    const dest = path.join(topicsDir, `${topic.slug}.html`)
    await writeFile(dest, page, 'utf8')
    console.log(`  ✓ ${manifest.id}/topics/${topic.slug}.html`)
  }
}

export async function buildAllHtml({ clean = false } = {}) {
  if (clean) {
    await rm(deliveryDir, { recursive: true, force: true })
  }
  await mkdir(deliveryDir, { recursive: true })

  const userManifest = await loadBookManifest('user-guide')
  const adminManifest = await loadBookManifest('admin-guide')
  const fileIndex = buildFileIndex([userManifest, adminManifest])

  console.log('Building HTML books...')
  await buildBookHtml(userManifest, fileIndex)
  await buildBookHtml(adminManifest, fileIndex)
}

const isMain = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])

if (isMain) {
  const args = new Set(process.argv.slice(2))
  buildAllHtml({ clean: args.has('--clean') })
    .then(() => console.log('\nHTML books written to dist/delivery/'))
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
}
