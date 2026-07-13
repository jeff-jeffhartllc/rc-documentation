import { mkdir, readdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { convertMarkdownToDocx } from '@mohtasham/md-to-docx'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const sourceDir = path.join(rootDir, 'source')
const distDir = path.join(rootDir, 'dist-docx')

const args = new Set(process.argv.slice(2))
const shouldClean = args.has('--clean')

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

/** Turn relative image paths into file:// URLs so the converter can embed screenshots. */
function prepareMarkdownForDocx(markdown, markdownFilePath) {
  const baseDir = path.dirname(markdownFilePath)

  let content = markdown
  // Simplify cover-meta HTML blocks into a plain blockquote for easier editing in Word.
  content = content.replace(
    /<div class="cover-meta">\s*([\s\S]*?)\s*<\/div>/gi,
    (_, inner) => {
      const lines = inner
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => `> ${line}`)
        .join('\n')
      return `${lines}\n`
    }
  )

  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('file://')) {
      return match
    }
    const absolute = path.resolve(baseDir, src)
    const fileUrl = `file:///${absolute.split(path.sep).join('/')}`
    return `![${alt}](${fileUrl})`
  })

  return content
}

async function buildDocx({ absolutePath, relativePath }) {
  const docxRelativePath = relativePath.replace(/\.md$/, '.docx')
  const dest = path.join(distDir, docxRelativePath)
  await mkdir(path.dirname(dest), { recursive: true })

  const sourceContent = await readFile(absolutePath, 'utf8')
  const markdown = prepareMarkdownForDocx(sourceContent, absolutePath)
  const blob = await convertMarkdownToDocx(markdown)
  const buffer = Buffer.from(await blob.arrayBuffer())
  await writeFile(dest, buffer)

  return docxRelativePath
}

async function buildAll() {
  if (shouldClean) {
    await rm(distDir, { recursive: true, force: true })
  }

  const files = await collectMarkdownFiles(sourceDir)
  if (files.length === 0) {
    console.log('No markdown files found under source/.')
    return
  }

  console.log(`Building ${files.length} DOCX file(s)...`)
  const built = []

  for (const file of files) {
    const output = await buildDocx(file)
    built.push(output)
    console.log(`  ✓ ${output}`)
  }

  console.log(`\nDone. ${built.length} DOCX file(s) written to dist-docx/`)
}

try {
  await buildAll()
} catch (error) {
  console.error(error)
  process.exit(1)
}
