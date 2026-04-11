import process from 'node:process'

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '')
const KEY = process.env.INDEXNOW_KEY
const ENDPOINT = 'https://api.indexnow.org/indexnow'

async function fetchSitemapUrls(sitemapUrl: string): Promise<string[]> {
  const res = await fetch(sitemapUrl)
  if (!res.ok) throw new Error(`sitemap fetch 실패 (HTTP ${res.status}) ${sitemapUrl}`)
  const xml = await res.text()
  const urls: string[] = []
  const re = /<loc>([^<]+)<\/loc>/g
  let m: RegExpExecArray | null
  while ((m = re.exec(xml)) !== null) {
    const loc = m[1]
    if (loc) urls.push(loc.trim())
  }
  return urls
}

async function verifyKeyFile(keyLocation: string): Promise<void> {
  const res = await fetch(keyLocation).catch(() => null)
  if (!res || !res.ok) {
    throw new Error(`키 파일 ${keyLocation} 접근 불가 (HTTP ${res?.status ?? '?'}). 배포가 끝났는지, public/{KEY}.txt가 서빙되는지 확인하세요.`)
  }
  const body = (await res.text()).trim()
  if (body !== KEY) throw new Error(`키 파일 내용 불일치 (${keyLocation})`)
}

async function main(): Promise<void> {
  if (!KEY) {
    console.log('IndexNow: INDEXNOW_KEY 미설정 → 스킵')
    return
  }
  if (!SITE_URL) {
    console.log('IndexNow: NEXT_PUBLIC_SITE_URL 미설정 → 스킵')
    return
  }

  const sitemapUrl = `${SITE_URL}/sitemap.xml`
  console.log(`IndexNow: ${sitemapUrl} 에서 URL 수집 중...`)
  const all = await fetchSitemapUrls(sitemapUrl)
  if (all.length === 0) {
    console.log('IndexNow: sitemap에 URL 없음 → 스킵')
    return
  }

  const extra = process.argv
    .slice(2)
    .flatMap((a) => a.split(/\s+/))
    .filter(Boolean)

  const host = new URL(SITE_URL).host
  const unique = [...new Set([...all, ...extra])].filter((u) => {
    try {
      return new URL(u).host === host
    } catch {
      return false
    }
  })

  const keyLocation = `${SITE_URL}/${KEY}.txt`
  await verifyKeyFile(keyLocation)

  console.log(`IndexNow: ${unique.length}개 URL 제출 중 → ${ENDPOINT}`)

  const CHUNK = 500
  for (let i = 0; i < unique.length; i += CHUNK) {
    const batch = unique.slice(i, i + CHUNK)
    const body = { host, key: KEY, keyLocation, urlList: batch }

    const res = await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body)
    })

    if (res.status >= 200 && res.status < 300) {
      console.log(`  ✓ batch ${i / CHUNK + 1} (${batch.length}개) HTTP ${res.status}`)
    } else {
      const text = await res.text().catch(() => '')
      throw new Error(`IndexNow 실패 (HTTP ${res.status}) ${text}`)
    }
  }

  console.log(`✓ IndexNow: 제출 완료 (${unique.length} URLs)`)
}

main().catch((e: Error) => {
  console.error(`✗ IndexNow: ${e.message}`)
  process.exit(1)
})
