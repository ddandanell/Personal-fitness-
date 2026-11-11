async page => {
  const origin = 'http://127.0.0.1:4173'
  const captureDir = '/tmp/pf-public-qa'

  const routes = [
    '/', '/services', '/services/personal-training', '/services/private-yoga',
    '/services/mat-pilates', '/locations', '/how-it-works', '/pricing', '/about',
    '/faq', '/privacy', '/contact', '/not-a-real-page',
  ]
  const legacyRoutes = [
    '/blueprint', '/blueprint/pages/150', '/blueprint/data/keywords',
    '/blueprint/finance', '/blueprint/documents', '/blueprint/downloads',
    '/resources', '/resources/personal-trainer-in-bali-what-a-managed-in-villa-session-includes',
    '/services/swimming', '/services/boxing', '/services/physiotherapy',
    '/services/nutrition', '/services/guided-meditation', '/services/mobility',
  ]
  const removedAssets = [
    '/data/keywords.json', '/downloads/PersonalFitness_AI_Handoff.zip',
    '/handoff/README.md', '/images/blueprint/master/page-001.png', '/CREDITS.md',
  ]
  const forbidden = /blueprint|handoff|workstream|evidence|keyword research|editorial brief|calendar 130|150-page|release gate|planning assumption|candidate zone|core test|controlled extension|owner input|operating model|\bA(?:0[0-9]|1[0-2])\b/i
  const errors = []
  const badResponses = []
  const failures = []
  const checked = []
  const screenshots = []

  page.on('pageerror', error => errors.push(`pageerror: ${error.message}`))
  page.on('console', message => {
    if (message.type() === 'error') errors.push(`console: ${message.text()}`)
  })
  page.on('response', response => {
    if (response.url().startsWith(origin) && response.status() >= 400) {
      badResponses.push(`${response.status()} ${response.url()}`)
    }
  })

  const coldContext = await page.context().browser().newContext({
    viewport: { width: 1440, height: 900 },
  })
  const coldPage = await coldContext.newPage()
  let coldNetworkResponses = 0
  coldPage.on('response', response => {
    if (response.url().startsWith(origin)) coldNetworkResponses += 1
  })
  await coldPage.goto(`${origin}/`, { waitUntil: 'networkidle' })
  const homepagePerformance = await coldPage.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0]
    const resources = performance.getEntriesByType('resource')
    return {
      domContentLoadedMs: Math.round(navigation.domContentLoadedEventEnd),
      loadMs: Math.round(navigation.loadEventEnd),
      resourceCount: resources.length + 1,
      transferBytes: Math.round(navigation.transferSize + resources.reduce((sum, item) => sum + (item.transferSize || 0), 0)),
    }
  })
  homepagePerformance.networkResponses = coldNetworkResponses
  await coldContext.close()

  for (const width of [1440, 1024, 768, 375]) {
    const height = width === 375 ? 812 : 900
    await page.setViewportSize({ width, height })
    for (const route of routes) {
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
      await page.locator('main h1').waitFor()
      const imageCount = await page.locator('img').count()
      for (let index = 0; index < imageCount; index += 1) {
        await page.locator('img').nth(index).scrollIntoViewIfNeeded()
        await page.waitForTimeout(60)
      }
      await page.locator('footer').scrollIntoViewIfNeeded()
      await page.waitForTimeout(120)
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await page.waitForTimeout(120)
      await page.waitForFunction(() => [...document.images].every(image => image.complete), null, { timeout: 5000 }).catch(() => {})

      const result = await page.evaluate(({ pattern, mobile }) => {
        const main = document.querySelector('main')
        const bodyText = document.body.innerText || ''
        const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
        const headings = [...main.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(node => Number(node.tagName[1]))
        const skippedHeadings = headings.some((level, index) => index > 0 && level > headings[index - 1] + 1)
        const badImages = [...document.images]
          .filter(image => !image.complete || image.naturalWidth === 0 || !image.alt.trim())
          .map(image => image.getAttribute('src'))
        const unnamedButtons = [...document.querySelectorAll('button')]
          .filter(button => !(button.textContent || '').trim() && !button.getAttribute('aria-label')).length
        const unnamedLinks = [...document.querySelectorAll('a')]
          .filter(link => !(link.textContent || '').trim() && !link.getAttribute('aria-label') && !link.querySelector('img[alt]:not([alt=""])')).length
        const unlabelledFields = [...document.querySelectorAll('input,select,textarea')]
          .filter(field => !(field.labels && field.labels.length) && !field.getAttribute('aria-label') && !field.getAttribute('aria-labelledby')).length
        const deadLinks = [...document.querySelectorAll('a')]
          .map(link => link.getAttribute('href'))
          .filter(href => !href || href === '#' || href.startsWith('javascript:'))
        const legacyLinks = [...document.querySelectorAll('a')]
          .map(link => link.getAttribute('href') || '')
          .filter(href => /\/blueprint|\/resources|\/downloads|\/handoff|\/data\//.test(href))
        const smallTargets = mobile ? [...document.querySelectorAll('.button,.icon-button,.mobile-nav a,input:not([type="checkbox"]),select,summary')]
          .filter(node => {
            const style = getComputedStyle(node)
            const rect = node.getBoundingClientRect()
            return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0 && rect.height < 43
          })
          .map(node => `${node.tagName}.${node.className}`) : []
        return {
          h1: main.querySelector('h1')?.textContent?.trim() || '',
          h1Count: main.querySelectorAll('h1').length,
          overflow: document.documentElement.scrollWidth - innerWidth,
          badImages,
          unnamedButtons,
          unnamedLinks,
          unlabelledFields,
          deadLinks,
          legacyLinks,
          smallTargets,
          skippedHeadings,
          textLength: (main.textContent || '').trim().length,
          title: document.title,
          description,
          internalTerm: bodyText.match(new RegExp(pattern, 'i'))?.[0] || '',
        }
      }, { pattern: forbidden.source, mobile: width === 375 })

      const failed = !result.h1 || result.h1Count !== 1 || result.overflow > 2 ||
        result.badImages.length || result.unnamedButtons || result.unnamedLinks ||
        result.unlabelledFields || result.deadLinks.length || result.legacyLinks.length ||
        result.smallTargets.length || result.skippedHeadings || result.textLength < 100 ||
        !result.title.includes('PersonalFitness.id') || !result.description || result.internalTerm ||
        forbidden.test(result.title) || forbidden.test(result.description)
      if (failed) failures.push({ width, route, ...result })
      checked.push({ width, route, h1: result.h1.slice(0, 70), overflow: result.overflow })

      const name = route === '/' ? 'home' : route.slice(1).replaceAll('/', '--')
      const filename = `${captureDir}/${width}-${name}.png`
      await page.screenshot({ path: filename, fullPage: false })
      screenshots.push(filename)
      if (route === '/' && (width === 1440 || width === 375)) {
        await page.screenshot({ path: `${captureDir}/${width}-home-full.png`, fullPage: true })
      }
    }
  }

  await page.setViewportSize({ width: 1440, height: 900 })
  const legacyChecks = []
  for (const route of legacyRoutes) {
    await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' })
    const h1 = await page.locator('main h1').textContent()
    const pass = h1?.trim() === 'This page is not here.'
    legacyChecks.push({ route, h1: h1?.trim(), pass })
    if (!pass) failures.push({ legacyRoute: route, h1 })
  }

  const assetChecks = await page.evaluate(async ({ paths, pattern }) => {
    const results = []
    for (const path of paths) {
      const response = await fetch(path)
      const type = response.headers.get('content-type') || ''
      const text = await response.text()
      const appShell = type.includes('text/html') && text.includes('<div id="root"></div>')
      const pass = response.status === 404 || (response.status === 200 && appShell && !new RegExp(pattern, 'i').test(text))
      results.push({ path, status: response.status, type, appShell, pass })
    }
    return results
  }, { paths: removedAssets, pattern: forbidden.source })
  for (const check of assetChecks) if (!check.pass) failures.push({ removedAsset: check })

  return {
    routeChecks: checked.length,
    publicRoutes: routes.length,
    widths: 4,
    screenshots: screenshots.length + 2,
    screenshotDirectory: captureDir,
    failures,
    errors: [...new Set(errors)],
    badResponses: [...new Set(badResponses)],
    legacyChecks,
    assetChecks,
    homepagePerformance,
    checked,
  }
}
