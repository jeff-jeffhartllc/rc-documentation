import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import chokidar from 'chokidar'
import { mdToPdf } from 'md-to-pdf'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const sourceDir = path.join(rootDir, 'source')
const distDir = path.join(rootDir, 'dist')
const assetsDir = path.join(rootDir, 'assets')
const stylesheet = path.join(assetsDir, 'pdf-style.css')

const args = new Set(process.argv.slice(2))
const shouldClean = args.has('--clean')
const shouldWatch = args.has('--watch')

const skipDirNames = new Set(['_templates'])

function shouldSkip(relativePath) {
  const parts = relativePath.split(path.sep)
  return parts.some((part) => part.startsWith('_') || skipDirNames.has(part))
}

async function collectMarkdownFiles(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true })

  for (const entry of entries) {
    const absolutePath = path.join(dir, entry.name)
    const relativePath = path.relative(sourceDir, absolutePath)

    if (shouldSkip(relativePath)) {
      continue
    }

    if (entry.isDirectory()) {
      await collectMarkdownFiles(absolutePath, files)
      continue
    }

    if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push({ absolutePath, relativePath })
    }
  }

  return files
}

async function ensurePdfStylesheet() {
  await mkdir(assetsDir, { recursive: true })
  try {
    await stat(stylesheet)
  } catch {
    await writeFile(
      stylesheet,
      `body { font-family: "Helvetica Neue", Arial, sans-serif; line-height: 1.5; color: #1a1a1a; }
h1, h2, h3 { color: #0f2d52; page-break-after: avoid; }
table { border-collapse: collapse; width: 100%; margin: 1rem 0; }
th, td { border: 1px solid #d0d7de; padding: 0.4rem 0.6rem; text-align: left; }
code, pre { font-family: "SFMono-Regular", Consolas, monospace; }
pre { background: #f6f8fa; padding: 0.75rem; overflow-x: auto; }
.page-break { page-break-before: always; }`,
      'utf8'
    )
  }
}

async function buildPdf({ absolutePath, relativePath }) {
  const pdfRelativePath = relativePath.replace(/\.md$/, '.pdf')
  const dest = path.join(distDir, pdfRelativePath)
  await mkdir(path.dirname(dest), { recursive: true })

  const sourceContent = await readFile(absolutePath, 'utf8')
  const pdf = await mdToPdf(
    { content: sourceContent },
    {
      dest,
      basedir: path.dirname(absolutePath),
      css: stylesheet,
      pdf_options: {
        format: 'Letter',
        margin: { top: '20mm', right: '18mm', bottom: '22mm', left: '18mm' },
        printBackground: true,
        displayHeaderFooter: true,
        headerTemplate: '<div></div>',
        footerTemplate:
          '<div style="font-size:8px;width:100%;text-align:center;color:#666;">' +
          '<span class="pageNumber"></span> / <span class="totalPages"></span>' +
          '</div>'
      }
    }
  )

  if (!pdf?.filename) {
    throw new Error(`Failed to build PDF for ${relativePath}`)
  }

  return pdfRelativePath
}

async function buildAll() {
  await ensurePdfStylesheet()

  if (shouldClean) {
    await rm(distDir, { recursive: true, force: true })
  }

  const files = await collectMarkdownFiles(sourceDir)
  if (files.length === 0) {
    console.log('No markdown files found under source/.')
    return
  }

  console.log(`Building ${files.length} PDF(s)...`)
  const built = []

  for (const file of files) {
    const output = await buildPdf(file)
    built.push(output)
    console.log(`  ✓ ${output}`)
  }

  console.log(`\nDone. ${built.length} PDF(s) written to dist/`)
}

async function watch() {
  console.log('Watching source/ for markdown changes...')
  const watcher = chokidar.watch(path.join(sourceDir, '**/*.md'), {
    ignoreInitial: false,
    ignored: (filePath) => shouldSkip(path.relative(sourceDir, filePath))
  })

  watcher.on('add', async (filePath) => {
    const relativePath = path.relative(sourceDir, filePath)
    try {
      const output = await buildPdf({ absolutePath: filePath, relativePath })
      console.log(`  ✓ ${output}`)
    } catch (error) {
      console.error(`  ✗ ${relativePath}:`, error.message)
    }
  })

  watcher.on('change', async (filePath) => {
    const relativePath = path.relative(sourceDir, filePath)
    try {
      const output = await buildPdf({ absolutePath: filePath, relativePath })
      console.log(`  ↻ ${output}`)
    } catch (error) {
      console.error(`  ✗ ${relativePath}:`, error.message)
    }
  })
}

try {
  if (shouldWatch) {
    await ensurePdfStylesheet()
    await watch()
  } else {
    await buildAll()
  }
} catch (error) {
  console.error(error)
  process.exit(1)
}
