import { COMPANY_EMAIL, SITE_ORIGIN } from '@/data/company'
import { publicServices } from '@/data/publicOffer'
import type { Service } from '@/data/catalog'

const BUSINESS_ID = SITE_ORIGIN + '/#business'
const WEBSITE_ID = SITE_ORIGIN + '/#website'

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
        logo: SITE_ORIGIN + '/brand/personalfitness-mark.png',
        image: SITE_ORIGIN + '/images/wellness/villa-yoga-partners.webp',
        telephone: '+628113803488',
        email: COMPANY_EMAIL,
        priceRange: 'IDR 650000-1600000',
        currenciesAccepted: 'IDR',
        availableLanguage: ['English', 'Indonesian'],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. Tukad Barito Timur III No.16, Panjer',
          addressLocality: 'Denpasar Selatan',
          addressRegion: 'Bali',
          postalCode: '80226',
          addressCountry: 'ID',
        },
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
        inLanguage: 'en',
        publisher: { '@id': BUSINESS_ID },
      },
    ],
  }
}

export function serviceJsonLd(service: Service, title?: string, description?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title || service.title,
    description: description || service.description,
    url: SITE_ORIGIN + '/' + service.slug,
    image: SITE_ORIGIN + service.image,
    serviceType: service.title,
    provider: { '@id': BUSINESS_ID, '@type': 'LocalBusiness', name: 'PersonalFitness.id', url: SITE_ORIGIN },
    areaServed: service.cities.map((city) => ({ '@type': 'AdministrativeArea', name: city })),
    offers: [cityOffer(service, 'Bali'), cityOffer(service, 'Jakarta')].filter(Boolean),
  }
}

export function cityServiceJsonLd(service: Service, city: 'Bali' | 'Jakarta', title?: string, description?: string) {
  const path = '/' + city.toLowerCase() + '/' + service.slug
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: title || service.title + ' in ' + city,
    description: description || service.short,
    url: SITE_ORIGIN + path,
    image: SITE_ORIGIN + service.image,
    serviceType: service.title,
    provider: { '@id': BUSINESS_ID, '@type': 'LocalBusiness', name: 'PersonalFitness.id', url: SITE_ORIGIN },
    areaServed: [{ '@type': 'AdministrativeArea', name: city }],
    offers: [cityOffer(service, city, path)].filter(Boolean),
  }
}
