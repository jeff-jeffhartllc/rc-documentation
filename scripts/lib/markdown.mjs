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

/** Strip URL fragments and query strings from a link target. */
export function stripLinkExtras(href) {
  return href.split('#')[0].split('?')[0]
}

/** Normalize fake per-topic .docx paths to .md for lookup. */
function toMarkdownLookupPath(href) {
  return stripLinkExtras(href).replace(/\\/g, '/').replace(/\.docx$/i, '.md')
}

/**
 * Resolve a cross-reference path to a book topic entry.
 * Accepts relative links, source/-rooted paths, and shared/... / apps/... paths.
 */
export function lookupTopicEntry(fromFile, linkHref, fileIndex) {
  const pathOnly = toMarkdownLookupPath(linkHref)
  if (!pathOnly) return null

  const candidates = []
  candidates.push(resolveSourcePath(fromFile, pathOnly))

  const normalized = normalizeSourcePath(pathOnly)
  if (normalized.startsWith('source/')) {
    candidates.push(normalized)
  } else {
    candidates.push(normalizeSourcePath(`source/${normalized}`))
  }

  // Basename fallback (e.g. `pdp-overview-and-testing.md`)
  const base = path.posix.basename(normalized)
  if (base.endsWith('.md')) {
    for (const key of fileIndex.keys()) {
      if (key === base || key.endsWith(`/${base}`)) candidates.push(key)
    }
  }

  for (const candidate of candidates) {
    const entry = fileIndex.get(candidate)
    if (entry) return entry
  }
  return null
}

export function formatTopicReference(entry, currentBookId) {
  const guideLabel =
    entry.bookId === currentBookId
      ? 'this guide'
      : entry.bookId === 'user-guide'
        ? 'Regis-User-Guide.docx'
        : 'Regis-Admin-Guide.docx'
  return `“${entry.title}” (${guideLabel})`
}

function isDeliverableFilename(name) {
  return /^(Regis-(User|Admin)-Guide\.docx|README\.txt)$/i.test(name)
}

/**
 * Prepare a topic for inclusion in a compiled Word book.
 * - Resolves images to embedded data URIs
 * - Rewrites topic cross-links and path-like backticks to Word guide references
 * - Strips leading title and demotes headings under the book structure
 */
export function prepareMarkdownForDocxBook(markdown, sourceFile, fileIndex, currentBookId) {
  let content = stripCoverMeta(markdown)
  content = stripLeadingTitle(content)
  content = demoteHeadings(content)

  const baseDir = path.dirname(path.join(rootDir, normalizeSourcePath(sourceFile)))

  content = content.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (/^(https?:|file:|data:)/.test(src)) return match
    let absolute = path.resolve(baseDir, src)
    if (!existsSync(absolute)) {
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

  content = content.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (match, _text, href) => {
    if (/^(https?:|mailto:|#)/.test(href)) return match

    const pathOnly = stripLinkExtras(href)
    if (pathOnly.endsWith('.html')) {
      if (pathOnly.includes('user-guide')) return 'Regis-User-Guide.docx'
      if (pathOnly.includes('admin-guide')) return 'Regis-Admin-Guide.docx'
      return _text
    }

    if (!/\.(md|docx)$/i.test(pathOnly)) return match

    const entry = lookupTopicEntry(sourceFile, href, fileIndex)
    if (!entry) {
      console.warn(`  ⚠ unresolved link: ${href} (from ${sourceFile})`)
      return _text
    }
    return formatTopicReference(entry, currentBookId)
  })

  content = content.replace(/`([^`\n]+\.(?:md|docx))`/g, (match, rawPath) => {
    if (isDeliverableFilename(rawPath)) return match
    const entry = lookupTopicEntry(sourceFile, rawPath, fileIndex)
    if (!entry) {
      console.warn(`  ⚠ unresolved path ref: ${rawPath} (from ${sourceFile})`)
      return rawPath.replace(/^.*\//, '').replace(/\.(md|docx)$/i, '')
    }
    return formatTopicReference(entry, currentBookId)
  })

  // Vendor folder shorthand that must not appear in Word guides
  content = content.replace(/`maintenance\/` guides/g, 'Admin Guide maintenance topics')
  content = content.replace(/`data-sources\/` guides/g, 'Admin Guide data platform topics')

  content = content.replace(/^## Related documents\s*$/gm, '## Related topics')

  return content.trim()
}
