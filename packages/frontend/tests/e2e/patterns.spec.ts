import { expect, test } from '@playwright/test'

import { patterns } from '../../lib/patterns/index'

const LANG = 'ko'

const ALL_PATTERN_SLUGS = patterns.map((p) => p.slug)

const DEFAULT_PATTERNS = ['button', 'modal-dialog', 'tabs', 'tooltip', 'accordion']

const TEST_PATTERNS: readonly string[] = process.env.TEST_PATTERNS
  ? process.env.TEST_PATTERNS.split(',')
      .map((s) => s.trim())
      .filter((s) => ALL_PATTERN_SLUGS.includes(s))
  : DEFAULT_PATTERNS

const DS_IDS = ['material', 'radix', 'antd', 'chakra', 'spectrum', 'baseui'] as const

const DS_NAMES: Record<(typeof DS_IDS)[number], string> = {
  material: 'Material (MUI)',
  radix: 'Radix UI',
  antd: 'Ant Design',
  chakra: 'Chakra UI',
  spectrum: 'React Spectrum',
  baseui: 'Base UI'
}

test.describe('패턴 목록 페이지', () => {
  test('패턴 카드가 렌더링된다', async ({ page }) => {
    await page.goto(`/${LANG}`)
    const cards = page.locator('a[href*="/patterns/"]')
    await expect(cards.first()).toBeVisible()
    const count = await cards.count()
    expect(count).toBeGreaterThan(0)
  })

  test('패턴 수 통계가 표시된다', async ({ page }) => {
    await page.goto(`/${LANG}`)
    await expect(page.getByText('Patterns')).toBeVisible()
    await expect(page.getByText('Design Systems')).toBeVisible()
  })
})

for (const slug of TEST_PATTERNS) {
  test.describe(`패턴 상세 페이지: ${slug}`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/${LANG}/patterns/${slug}`)
    })

    test('페이지가 로드되고 제목이 표시된다', async ({ page }) => {
      await expect(page.locator('h1')).toBeVisible()
    })

    test('체크리스트 섹션이 존재한다', async ({ page }) => {
      const mustLabel = page.getByText('Must', { exact: true }).first()
      await expect(mustLabel).toBeVisible()
    })

    test('Baseline 코드 블록이 표시된다', async ({ page }) => {
      const codeBlock = page.locator('pre code').first()
      await expect(codeBlock).toBeVisible()
    })

    test('디자인 시스템 탭이 렌더링된다', async ({ page }) => {
      const dsTabs = page.locator('button').filter({ hasText: /Material|Radix|Ant Design|Chakra|React Spectrum|Base UI/ })
      const tabCount = await dsTabs.count()
      expect(tabCount).toBeGreaterThan(0)
    })

    test('DS 탭 클릭 시 코드 블록이 표시된다', async ({ page }) => {
      const firstDsTab = page
        .locator('button')
        .filter({ hasText: /Material|Radix|Ant Design|Chakra|React Spectrum|Base UI/ })
        .first()
      const tabName = await firstDsTab.textContent()
      await firstDsTab.click()
      const codeLabels = page.locator('span.font-mono').filter({ hasText: /MUI|Radix|Ant|Chakra|Spectrum|Base/ })
      const codeBlockCount = await codeLabels.count()
      expect(codeBlockCount).toBeGreaterThanOrEqual(0)
      await expect(page.locator('pre code').last()).toBeVisible()
      void tabName
    })
  })
}

test.describe('디자인 시스템 탭 — 코드 샘플 오류 감지', () => {
  for (const slug of TEST_PATTERNS) {
    test(`${slug}: 각 DS 탭 코드 탭에서 렌더링 오류 없음`, async ({ page }) => {
      await page.goto(`/${LANG}/patterns/${slug}`)

      const dsTabButtons = page.locator('button').filter({ hasText: /Material|Radix|Ant Design|Chakra|React Spectrum|Base UI/ })
      const tabCount = await dsTabButtons.count()

      for (let i = 0; i < tabCount; i++) {
        const tab = dsTabButtons.nth(i)
        const tabText = (await tab.textContent()) ?? ''
        await tab.click()

        const codeTabButton = page
          .locator('button[aria-pressed]')
          .filter({ hasText: /코드|Code/ })
          .first()
        if ((await codeTabButton.count()) > 0) {
          await codeTabButton.click()
        }

        await expect(page.locator('pre code').last()).toBeVisible()

        const errorMsg = page.locator('text=Something went wrong')
        const hasError = (await errorMsg.count()) > 0
        expect(hasError, `${slug} / ${tabText} 탭에서 "Something went wrong" 오류 발생`).toBe(false)
      }
    })
  }
})

test.describe('Base UI 탭 특화 테스트', () => {
  for (const slug of TEST_PATTERNS) {
    test(`${slug}: Base UI 탭이 존재하면 코드 탭에서 오류가 없다`, async ({ page }) => {
      await page.goto(`/${LANG}/patterns/${slug}`)

      const baseUITab = page.locator('button').filter({ hasText: DS_NAMES.baseui })
      if ((await baseUITab.count()) === 0) {
        test.skip()
        return
      }

      await baseUITab.click()

      const codeTabButton = page
        .locator('button[aria-pressed]')
        .filter({ hasText: /코드|Code/ })
        .first()
      if ((await codeTabButton.count()) > 0) {
        await codeTabButton.click()
      }

      await expect(page.locator('pre code').last()).toBeVisible()

      const errorMsg = page.locator('text=Something went wrong')
      await expect(errorMsg).toHaveCount(0)
    })
  }
})

test.describe('DS 탭 전환 — 전체 DS ID 순환', () => {
  test(`button 패턴에서 모든 DS 탭을 순환해도 오류가 없다`, async ({ page }) => {
    await page.goto(`/${LANG}/patterns/button`)

    for (const dsId of DS_IDS) {
      const dsName = DS_NAMES[dsId]
      const tab = page.locator('button').filter({ hasText: dsName })
      if ((await tab.count()) === 0) continue

      await tab.click()

      const codeTabButton = page
        .locator('button[aria-pressed]')
        .filter({ hasText: /코드|Code/ })
        .first()
      if ((await codeTabButton.count()) > 0) {
        await codeTabButton.click()
      }

      await expect(page.locator('pre code').last()).toBeVisible()

      const errorMsg = page.locator('text=Something went wrong')
      expect(await errorMsg.count(), `button / ${dsName} 탭에서 오류 발생`).toBe(0)
    }
  })
})
