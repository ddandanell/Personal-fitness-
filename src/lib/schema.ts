import { COMPANY_EMAIL, SITE_ORIGIN } from '@/data/company'
import { CITY_SERVICE_RELEASED, publicServices, sessionPhoto } from '@/data/publicOffer'
import type { Service } from '@/data/catalog'

const BUSINESS_ID = SITE_ORIGIN + '/#business'
const WEBSITE_ID = SITE_ORIGIN + '/#website'
const LOGO = SITE_ORIGIN + '/brand/personalfitness-mark.png'
const HERO = SITE_ORIGIN + '/images/wellness/villa-yoga-partners.webp'

function cityOffer(service: Service, city: 'Bali' | 'Jakarta', offerPath?: string) {
  const price = service.prices[city]
  if (price == null) return null
  return {
    '@type': 'Offer',
    url: SITE_ORIGIN + (offerPath || '/' + service.slug),
    name: service.title + ' in ' + city,
    description: service.short,
    price: String(price),
    priceCurrency: 'IDR',
    availability: 'https://schema.org/LimitedAvailability',
    eligibleDuration: { '@type': 'QuantitativeValue', value: service.durationMin, unitCode: 'MIN' },
    areaServed: { '@type': 'AdministrativeArea', name: city },
  }
}

function cityServicePath(service: Service, city: 'Bali' | 'Jakarta') {
  return CITY_SERVICE_RELEASED.includes(service.slug as typeof CITY_SERVICE_RELEASED[number])
    ? '/' + city.toLowerCase() + '/' + service.slug
    : '/' + service.slug
}

export function faqJsonLd(pairs: Array<readonly string[]>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map(([question, answer]) => ({
      '@type': 'Question',
      name: question,
      acceptedAnswer: { '@type': 'Answer', text: answer },
    })),
  }
}

export function howToJsonLd(name: string, description: string, steps: Array<{ name: string; text: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    url: SITE_ORIGIN + '/how-it-works',
    image: HERO,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      url: SITE_ORIGIN + '/how-it-works#step-' + String(index + 1).padStart(2, '0'),
    })),
  }
}

export function collectionJsonLd(name: string, path: string, description: string, items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name,
    description,
    url: SITE_ORIGIN + path,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: items.length,
      itemListElement: items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        url: SITE_ORIGIN + item.url,
      })),
    },
  }
}

export function contactPageJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Check availability on WhatsApp',
    url: SITE_ORIGIN + '/contact',
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': BUSINESS_ID },
    mainEntity: { '@id': BUSINESS_ID },
  }
}

export function cityHubJsonLd(city: 'Bali' | 'Jakarta', title: string, description: string) {
  const path = '/' + city.toLowerCase()
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title,
    description,
    url: SITE_ORIGIN + path,
    image: HERO,
    serviceType: 'Private fitness at home',
    provider: { '@id': BUSINESS_ID, '@type': 'LocalBusiness', name: 'PersonalFitness.id', url: SITE_ORIGIN },
    areaServed: { '@type': 'AdministrativeArea', name: city },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Private fitness sessions in ' + city,
      itemListElement: publicServices
        .filter((service) => service.cities.includes(city))
        .map((service) => cityOffer(service, city, cityServicePath(service, city)))
        .filter(Boolean),
    },
  }
}

export function siteGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': BUSINESS_ID,
        name: 'PersonalFitness.id',
        legalName: 'PersonalFitness.id',
        url: SITE_ORIGIN,
        logo: LOGO,
        image: {
          '@type': 'ImageObject',
          url: HERO,
          width: 1100,
          height: 619,
        },
        telephone: '+628113803488',
        email: COMPANY_EMAIL,
        priceRange: 'IDR 650000-1600000',
        currenciesAccepted: 'IDR',
        paymentAccepted: 'Invoice, online payment link',
        availableLanguage: ['English', 'Indonesian'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. Tukad Barito Timur III No.16, Panjer',
          addressLocality: 'Denpasar Selatan',
          addressRegion: 'Bali',
          postalCode: '80226',
          addressCountry: 'ID',
        },
        contactPoint: [
          {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            telephone: '+628113803488',
            email: COMPANY_EMAIL,
            availableLanguage: ['English', 'Indonesian'],
            areaServed: 'ID',
          },
        ],
        areaServed: ['Canggu', 'Seminyak', 'Ubud', 'Sanur', 'Uluwatu', 'South Jakarta', 'Central Jakarta'].map((name) => ({
          '@type': 'AdministrativeArea',
          name,
        })),
        knowsAbout: publicServices.map((item) => item.title),
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Private fitness sessions at home',
          itemListElement: publicServices.map((service) => ({
            '@type': 'OfferCatalog',
            name: service.title,
            itemListElement: [cityOffer(service, 'Bali'), cityOffer(service, 'Jakarta')].filter(Boolean),
          })),
        },
      },
      {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        url: SITE_ORIGIN,
        name: 'PersonalFitness.id',
        inLanguage: 'en-ID',
        publisher: { '@id': BUSINESS_ID },
      },
    ],
  }
}

export function serviceJsonLd(service: Service, title?: string, description?: string) {
  const image = SITE_ORIGIN + sessionPhoto(service.slug, service.image)
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title || service.title,
    description: description || service.description,
    url: SITE_ORIGIN + '/' + service.slug,
    image,
    serviceType: service.title,
    provider: { '@id': BUSINESS_ID, '@type': 'LocalBusiness', name: 'PersonalFitness.id', url: SITE_ORIGIN },
    areaServed: service.cities.map((city) => ({ '@type': 'AdministrativeArea', name: city })),
    offers: [cityOffer(service, 'Bali'), cityOffer(service, 'Jakarta')].filter(Boolean),
  }
}

export function cityServiceJsonLd(service: Service, city: 'Bali' | 'Jakarta', title?: string, description?: string) {
  const path = cityServicePath(service, city)
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title || service.title + ' in ' + city,
    description: description || service.short,
    url: SITE_ORIGIN + path,
    image: SITE_ORIGIN + sessionPhoto(service.slug, service.image),
    serviceType: service.title,
    provider: { '@id': BUSINESS_ID, '@type': 'LocalBusiness', name: 'PersonalFitness.id', url: SITE_ORIGIN },
    areaServed: [{ '@type': 'AdministrativeArea', name: city }],
    offers: [cityOffer(service, city, path)].filter(Boolean),
  }
}
