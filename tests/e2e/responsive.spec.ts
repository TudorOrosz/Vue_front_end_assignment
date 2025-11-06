import { test, expect } from '@playwright/test'

const ACCOUNT_URL = '/account/NL14ABNA4415260276'
type Overflow = { error?: string; containerWidth?: number; searchScroll?: number }

test.describe('E2E responsive checks', () => {
  test('filter row does not overflow container at 380px width', async ({ page }) => {
    await page.setViewportSize({ width: 380, height: 800 })
    await page.goto(ACCOUNT_URL)
    await page.waitForSelector('.card')

    const overflow = await page.evaluate(() => {
      const card = document.querySelector('.card') as HTMLElement | null
      const searchRow = document.querySelector('.search-row') as HTMLElement | null
      if (!card || !searchRow) return { error: 'missing' }

      const containerWidth = card.clientWidth
      const searchScroll = searchRow.scrollWidth

      return { containerWidth, searchScroll }
    })

    if ((overflow as Overflow).error) throw new Error('Required elements not found on the page')

    const { containerWidth, searchScroll } = overflow as { containerWidth: number, searchScroll: number }

    expect(searchScroll).toBeLessThanOrEqual(containerWidth)
  })

  test('filter row does not overflow container at desktop width', async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 800 })
    await page.goto(ACCOUNT_URL)
    await page.waitForSelector('.card')

    const overflow = await page.evaluate(() => {
      const card = document.querySelector('.card') as HTMLElement | null
      const searchRow = document.querySelector('.search-row') as HTMLElement | null
      if (!card || !searchRow) return { error: 'missing' }
      return { containerWidth: card.clientWidth, searchScroll: searchRow.scrollWidth }
    })
    
    if ((overflow as Overflow).error) throw new Error('Required elements not found')

    const { containerWidth, searchScroll } = overflow as { containerWidth: number, searchScroll: number }
    expect(searchScroll).toBeLessThanOrEqual(containerWidth)
  })
})