import { readdir, readFile } from 'fs/promises'
import { join } from 'path'

export interface SpecPage {
  url: string
  html: string
}

interface MetaFile {
  url?: string
  resolved_url?: string
}

export async function readSpecPages(inputDir: string, urlPatterns: string[]): Promise<SpecPage[]> {
  const files = await readdir(inputDir)
  const metaFiles = files.filter((f) => f.endsWith('.meta.json'))

  const pages: SpecPage[] = []

  for (const metaFile of metaFiles) {
    const raw = await readFile(join(inputDir, metaFile), 'utf-8')
    const meta: MetaFile = JSON.parse(raw)
    const url = meta.resolved_url ?? meta.url ?? ''

    if (!urlPatterns.some((pattern) => url.includes(pattern))) continue

    const htmlFile = metaFile.replace('.meta.json', '.html')
    try {
      const html = await readFile(join(inputDir, htmlFile), 'utf-8')
      pages.push({ url, html })
    } catch {
      // HTML file missing for this metadata entry — skip
    }
  }

  return pages
}
