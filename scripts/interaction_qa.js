async page => {
  const origin = 'http://127.0.0.1:4173'
  const results = []
  const errors = []
  const postRequests = []
  const externalRequests = []
  let offlineMode = false

  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => {
    if (!offlineMode && message.type() === 'error') errors.push(message.text())
  })
  page.on('request', request => {
    if (request.method() !== 'GET') postRequests.push(`${request.method()} ${request.url()}`)
    if (/^https?:/.test(request.url()) && !request.url().startsWith(origin)) externalRequests.push(request.url())
  })

  async function test(name, fn) {
    try {
      const detail = await fn()
      results.push({ name, pass: true, detail })
    } catch (error) {
      results.push({ name, pass: false, error: error.message })
    }
  }

  await page.setViewportSize({ width: 1280, height: 900 })
  await page.context().grantPermissions(['clipboard-read', 'clipboard-write'], { origin })

  await test('Desktop navigation and route metadata', async () => {
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' })
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Pricing', exact: true }).click()
    await page.waitForURL('**/pricing')
    await page.waitForFunction(() => document.title.includes('Clear Personalised Session Quotes'))
    const title = await page.title()
    const description = await page.locator('meta[name="description"]').getAttribute('content')
    if (!title.includes('Clear Personalised Session Quotes') || !description.includes('private session quote')) {
      throw new Error(`Incorrect metadata: ${title} / ${description}`)
    }
    return title
  })

  await test('Skip link keyboard focus', async () => {
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' })
    await page.keyboard.press('Tab')
    const focused = await page.evaluate(() => document.activeElement?.textContent?.trim())
    if (focused !== 'Skip to content') throw new Error(`First tab stop was ${focused}`)
    await page.keyboard.press('Enter')
    await page.waitForTimeout(100)
    const activeId = await page.evaluate(() => document.activeElement?.id)
    if (activeId !== 'main-content') throw new Error(`Skip target did not receive focus: ${activeId}`)
    return 'First Tab reaches Skip to content; Enter focuses main content'
  })

  await test('Service and city links prefill the enquiry', async () => {
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' })
    await page.locator('.service-card').filter({ hasText: 'Personal training' }).click()
    await page.waitForURL('**/services/personal-training')
    await page.getByRole('link', { name: 'Check personal training availability' }).click()
    await page.waitForURL('**/contact?service=personal-training')
    if (await page.getByLabel('Service *').inputValue() !== 'personal-training') throw new Error('Service was not prefilled')
    await page.goto(`${origin}/locations`, { waitUntil: 'networkidle' })
    await page.getByRole('link', { name: 'Enquire for Bali', exact: true }).click()
    await page.waitForURL('**/contact?city=Bali')
    if (await page.getByLabel('City *').inputValue() !== 'Bali') throw new Error('City was not prefilled')
    return 'Service card, service CTA and Bali CTA all preserved the selected context'
  })

  await test('Enquiry validation, generation, copy, download and reset', async () => {
    await page.goto(`${origin}/contact?service=private-yoga&city=Bali`, { waitUntil: 'networkidle' })
    if (await page.getByLabel('Service *').inputValue() !== 'private-yoga') throw new Error('Combined service prefill failed')
    if (await page.getByLabel('City *').inputValue() !== 'Bali') throw new Error('Combined city prefill failed')
    await page.getByLabel('Area / venue context *').fill('Canggu, private villa')
    await page.getByLabel('Preferred date / time *').fill('18 November 2026, 07:00–09:00')
    await page.getByLabel('Participants *').fill('2')
    await page.getByLabel('Goals / preferences').fill('General mobility, beginner-friendly')
    await page.getByRole('button', { name: 'Create enquiry message' }).click()
    const acknowledgementError = await page.getByRole('alert').textContent()
    if (!acknowledgementError.includes('no sensitive health')) throw new Error('Sensitive-data acknowledgement validation missing')
    await page.getByRole('checkbox').check()
    await page.getByRole('button', { name: 'Create enquiry message' }).click()
    const preview = page.locator('#message-preview pre')
    await preview.waitFor()
    const value = await preview.textContent()
    if (!value.includes('Private yoga') || !value.includes('Bali') || !value.includes('Canggu') ||
        !value.includes('Participants: 2') || !value.includes('not a booking confirmation')) {
      throw new Error('Generated message lacks required context')
    }
    await page.getByRole('button', { name: 'Copy enquiry message' }).click()
    const clipboard = await page.evaluate(() => navigator.clipboard.readText())
    if (clipboard !== value) throw new Error('Clipboard did not receive the exact generated message')
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download .txt' }).click()
    const download = await downloadPromise
    if (download.suggestedFilename() !== 'PersonalFitness-enquiry.txt') throw new Error('Incorrect download filename')
    await page.getByRole('button', { name: 'Reset', exact: true }).click()
    if (await page.locator('#message-preview').count()) throw new Error('Reset did not remove the draft')
    if (await page.getByLabel('Service *').inputValue() || await page.getByLabel('City *').inputValue()) throw new Error('Reset did not clear selections')
    await page.getByRole('button', { name: 'Create enquiry message' }).click()
    const requiredError = await page.getByRole('alert').textContent()
    if (!requiredError.includes('complete the service')) throw new Error('Required-field validation missing')
    return `Draft only; exact clipboard copy; ${download.suggestedFilename()}; reset and validation passed`
  })

  await test('Participant limits and reload privacy', async () => {
    await page.goto(`${origin}/contact`, { waitUntil: 'networkidle' })
    await page.getByLabel('Service *').selectOption('mat-pilates')
    await page.getByLabel('City *').selectOption('Jakarta')
    await page.getByLabel('Area / venue context *').fill('Central Jakarta, apartment')
    await page.getByLabel('Preferred date / time *').fill('20 November 2026, 18:00')
    await page.getByLabel('Participants *').fill('21')
    await page.getByRole('checkbox').check()
    await page.getByRole('button', { name: 'Create enquiry message' }).click()
    const limitError = await page.getByRole('alert').textContent()
    if (!limitError.includes('between 1 and 20')) throw new Error('Participant limit was not enforced')
    await page.reload({ waitUntil: 'networkidle' })
    if (await page.getByLabel('Area / venue context *').inputValue()) throw new Error('Reload did not clear entered details')
    return 'Out-of-range group rejected; reload cleared form entries'
  })

  await test('FAQ keyboard operation', async () => {
    await page.goto(`${origin}/faq`, { waitUntil: 'networkidle' })
    const first = page.locator('.faq-item').first()
    const summary = first.locator('summary')
    await summary.focus()
    await page.keyboard.press('Enter')
    if (!await first.evaluate(element => element.hasAttribute('open'))) throw new Error('Enter did not open the FAQ')
    if (!await first.locator('.faq-body').isVisible()) throw new Error('FAQ answer is not visible')
    await page.keyboard.press('Enter')
    if (await first.evaluate(element => element.hasAttribute('open'))) throw new Error('Enter did not close the FAQ')
    return 'Native disclosure opens and closes from the keyboard'
  })

  await test('Mobile menu, Escape and navigation', async () => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' })
    await page.getByRole('button', { name: 'Open menu' }).click()
    const nav = page.getByRole('navigation', { name: 'Mobile navigation' })
    await nav.waitFor()
    await page.keyboard.press('Escape')
    if (await nav.count()) throw new Error('Escape did not close the mobile menu')
    await page.getByRole('button', { name: 'Open menu' }).click()
    await nav.getByRole('link', { name: 'Services', exact: true }).click()
    await page.waitForURL('**/services')
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - innerWidth)
    if (overflow > 2) throw new Error(`Mobile overflow ${overflow}px`)
    return `Escape dismissed the menu; Services navigation worked; overflow ${overflow}px`
  })

  await test('Reduced motion and public palette contrast', async () => {
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' })
    const motion = await page.evaluate(() => ({
      transform: getComputedStyle(document.querySelector('.session-image img')).transform,
      scroll: getComputedStyle(document.documentElement).scrollBehavior,
    }))
    if (motion.transform !== 'none' || motion.scroll !== 'auto') throw new Error(JSON.stringify(motion))
    const luminance = hex => {
      const values = hex.replace('#', '').match(/.{2}/g).map(value => parseInt(value, 16) / 255)
        .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4)
      return values[0] * 0.2126 + values[1] * 0.7152 + values[2] * 0.0722
    }
    const contrast = (a, b) => {
      const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x)
      return (high + 0.05) / (low + 0.05)
    }
    const pairs = [
      ['#ffffff', '#d9331d'], ['#62625c', '#ededed'], ['#62625c', '#f6f5f2'],
      ['#a92817', '#ededed'], ['#f4a491', '#1b1b1b'], ['#cecec7', '#1b1b1b'],
      ['#aaa9a2', '#1b1b1b'], ['#6b2418', '#f2dfd9'], ['#707069', '#f6f5f2'],
    ]
    const weak = pairs.map(([a, b]) => ({ a, b, ratio: contrast(a, b) })).filter(item => item.ratio < 4.5)
    if (weak.length) throw new Error(`Contrast below 4.5: ${JSON.stringify(weak)}`)
    return `Image transform ${motion.transform}; all ${pairs.length} measured text pairs meet 4.5:1`
  })

  await test('PWA manifest, service worker and offline reload', async () => {
    await page.emulateMedia({ reducedMotion: 'no-preference' })
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      const registrations = await navigator.serviceWorker.getRegistrations()
      await Promise.all(registrations.map(registration => registration.unregister()))
      const keys = await caches.keys()
      await Promise.all(keys.map(key => caches.delete(key)))
      localStorage.removeItem('personalfitness-public-site-2026-11')
    })
    await page.goto(`${origin}/pricing`, { waitUntil: 'networkidle' })
    const manifest = await page.evaluate(async () => (await fetch('/manifest.webmanifest')).json())
    if (!manifest.icons?.length || manifest.name.includes('Blueprint') || manifest.start_url !== '/') {
      throw new Error('Incorrect public PWA manifest')
    }
    const sw = await page.evaluate(async () => Promise.race([
      navigator.serviceWorker.ready.then(() => true),
      new Promise(resolve => setTimeout(() => resolve(false), 10000)),
    ]))
    if (!sw) throw new Error('Service worker was not ready')
    await page.reload({ waitUntil: 'networkidle' })
    offlineMode = true
    try {
      await page.context().setOffline(true)
      await page.reload({ waitUntil: 'domcontentloaded', timeout: 20000 })
      await page.locator('main h1').waitFor({ timeout: 10000 })
      const heading = await page.locator('main h1').textContent()
      if (!heading.includes('A clear quote')) throw new Error(`Offline page failed: ${heading}`)
    } finally {
      await page.context().setOffline(false)
      offlineMode = false
    }
    return `${manifest.icons.length} manifest icons; service worker ready; Pricing reloaded offline`
  })

  await test('One-time legacy cache cleanup', async () => {
    await page.goto(`${origin}/`, { waitUntil: 'networkidle' })
    await page.evaluate(async () => {
      localStorage.removeItem('personalfitness-public-site-2026-11')
      const cache = await caches.open('pf-legacy-internal-test')
      await cache.put('/__legacy_internal_test__', new Response('not public'))
    })
    await page.reload({ waitUntil: 'networkidle' })
    await page.waitForFunction(() => localStorage.getItem('personalfitness-public-site-2026-11') === 'done')
    const keys = await page.evaluate(() => caches.keys())
    if (keys.includes('pf-legacy-internal-test')) throw new Error('Legacy cache survived cleanup')
    return `Legacy test cache removed; ${keys.length} current public caches remain`
  })

  return {
    passed: results.filter(item => item.pass).length,
    failed: results.filter(item => !item.pass).length,
    results,
    consoleErrors: [...new Set(errors)],
    postRequests: [...new Set(postRequests)],
    externalRequests: [...new Set(externalRequests)],
  }
}
