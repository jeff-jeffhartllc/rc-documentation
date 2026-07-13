import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { resolveSourcePath, normalizeSourcePath, rootDir } from './books.mjs'

/** Simplify cover-meta blocks for DOCX. */
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

/** Remove the first top-level # heading (topic title comes from the book manifest). */
export function stripLeadingTitle(markdown) {
  return markdown.replace(/^\s*#\s+[^\n]+\n+/, '')
}

/** Demote all ATX headings by one level so topic H1/H2 nest under book sections. */
export function demoteHeadings(markdown) {
  return markdown.replace(/^(#{1,5})\s/gm, '#$1 ')
}

/**
 * Prepare a topic for inclusion in a compiled Word book.
 * - Resolves images to file:// for embedding
 * - Rewrites .md cross-links to plain “see … in this/other guide” text
 * - Strips leading title and demotes headings under the book structure
 */
export function prepareMarkdownForDocxBook(markdown, sourceFile, fileIndex, currentBookId) {
  let content = stripCoverMeta(markdown)
  content = stripLeadingTitle(content)
  content = demoteHeadings(content)

  const baseDir = path.dirname(path.join(rootDir, normalizeSourcePath(sourceFile)))

  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (/^(https?:|file:)/.test(src)) return match
    let absolute = path.resolve(baseDir, src)
    if (!existsSync(absolute)) {
      // Common case: app topics used ../../assets but need ../../../assets
      const byName = path.join(rootDir, 'assets', path.basename(src))
      if (existsSync(byName)) absolute = byName
    }
    if (!existsSync(absolute)) {
      console.warn(`  ⚠ missing image: ${src} (from ${sourceFile})`)
      return match
    }
    const bytes = readFileSync(absolute)
    const ext = path.extname(absolute).toLowerCase()
    const mime =
      ext === '.jpg' || ext === '.jpeg'
        ? 'image/jpeg'
        : ext === '.gif'
          ? 'image/gif'
          : ext === '.webp'
            ? 'image/webp'
            : 'image/png'
    return `![${alt}](data:${mime};base64,${bytes.toString('base64')})`
  })

  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, text, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return match
    if (!href.endsWith('.md') && !href.endsWith('.html')) return match

    if (href.endsWith('.html')) {
      if (href.includes('user-guide')) {
        return `${text} (see Regis-User-Guide.docx)`
      }
      if (href.includes('admin-guide')) {
        return `${text} (see Regis-Admin-Guide.docx)`
      }
      return text
    }

    const targetPath = resolveSourcePath(sourceFile, href)
    const entry = fileIndex.get(targetPath)
    if (!entry) return text
    if (entry.bookId === currentBookId) {
      return `${text} (see “${entry.title}” in this guide)`
    }
    const other =
      entry.bookId === 'user-guide' ? 'Regis-User-Guide.docx' : 'Regis-Admin-Guide.docx'
    return `${text} (see “${entry.title}” in ${other})`
  })

  return content.trim()
}
