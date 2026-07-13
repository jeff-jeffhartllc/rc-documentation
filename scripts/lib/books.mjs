import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
export const rootDir = path.resolve(__dirname, '../..')

export async function loadBookManifest(bookId) {
  const manifestPath = path.join(rootDir, 'books', `${bookId}.json`)
  const raw = await readFile(manifestPath, 'utf8')
  return JSON.parse(raw)
}

/** Flat ordered list of topics from a manifest. */
export function flattenTopics(manifest) {
  const topics = []
  for (const section of manifest.sections) {
    for (const topic of section.topics) {
      topics.push({
        ...topic,
        sectionTitle: section.title,
        bookId: manifest.id,
        bookTitle: manifest.title,
      })
    }
  }
  return topics
}

/** Map normalized source file path -> { bookId, slug, title }. */
export function buildFileIndex(manifests) {
  const index = new Map()
  for (const manifest of manifests) {
    for (const topic of flattenTopics(manifest)) {
      const key = normalizeSourcePath(topic.file)
      index.set(key, {
        bookId: manifest.id,
        slug: topic.slug,
        title: topic.title,
      })
    }
  }
  return index
}

export function normalizeSourcePath(filePath) {
  return filePath.replace(/\\/g, '/').replace(/^\.\//, '')
}

export function resolveSourcePath(fromFile, linkTarget) {
  const fromDir = path.dirname(normalizeSourcePath(fromFile))
  const joined = path.posix.normalize(path.posix.join(fromDir, linkTarget))
  return joined.replace(/^\.\//, '')
}
