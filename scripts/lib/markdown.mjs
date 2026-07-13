import path from 'node:path'
import { resolveSourcePath, normalizeSourcePath, rootDir } from './books.mjs'

/** Simplify cover-meta blocks for HTML and DOCX. */
export function stripCoverMeta(markdown) {
  return markdown.replace(
    /<div class="cover-meta">\s*([\s\S]*?)\s*<\/div>/gi,
    (_, inner) => {
      const lines = inner
        .split('\n')
        .map((line) => line.replace(/<\/?[^>]+>/g, '').trim())
        .filter(Boolean)
        .map((line) => `> ${line}`)
        .join('\n')
      return `${lines}\n\n`
    }
  )
}

/**
 * Rewrite markdown links and images for HTML output.
 */
export function prepareMarkdownForHtml(markdown, sourceFile, currentBookId, fileIndex) {
  const assetsPrefix = '../assets'
  let content = stripCoverMeta(markdown)
  const baseDir = path.dirname(normalizeSourcePath(sourceFile))

  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (/^(https?:|data:|#)/.test(src)) return match
    const imageAbs = path.resolve(rootDir, baseDir, src)
    const assetsAbs = path.join(rootDir, 'assets')
    const rel = path.relative(assetsAbs, imageAbs).split(path.sep).join('/')
    return `![${alt}](${assetsPrefix}/${rel})`
  })

  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return match
    if (!href.endsWith('.md')) return match

    const targetPath = resolveSourcePath(sourceFile, href)
    const entry = fileIndex.get(targetPath)
    if (!entry) return match

    const sameBook = entry.bookId === currentBookId
    const prefix = sameBook ? '' : entry.bookId === 'user-guide' ? '../user-guide/' : '../admin-guide/'
    const url = `${prefix}topics/${entry.slug}.html`
    return `[${text}](${url})`
  })

  return content
}

/** Prepare markdown for merged DOCX (file:// images). */
export function prepareMarkdownForDocxBook(markdown, sourceFile, fileIndex, currentBookId) {
  let content = stripCoverMeta(markdown)
  const baseDir = path.dirname(path.join(rootDir, normalizeSourcePath(sourceFile)))

  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (/^(https?:|file:)/.test(src)) return match
    const absolute = path.resolve(baseDir, src)
    const fileUrl = `file:///${absolute.split(path.sep).join('/')}`
    return `![${alt}](${fileUrl})`
  })

  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return match
    if (!href.endsWith('.md')) return match

    const targetPath = resolveSourcePath(sourceFile, href)
    const entry = fileIndex.get(targetPath)
    if (!entry) return text
    if (entry.bookId === currentBookId) {
      return `${text} (see “${entry.title}” in this guide)`
    }
    const other = entry.bookId === 'user-guide' ? 'User Guide' : 'Admin Guide'
    return `${text} (see “${entry.title}” in the ${other})`
  })

  return content
}
