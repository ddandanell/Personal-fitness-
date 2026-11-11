import { lazy, Suspense, type ComponentType } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Layout from '@/components/Layout'
import { Loading } from '@/components/Primitives'
import type { City } from '@/data/catalog'

const Home = lazy(() => import('@/pages/public/Home'))
const ServicePage = lazy(() => import('@/pages/public/ServicePage'))
const NotFound = lazy(() => import('@/pages/public/NotFound'))
const CityPage = lazy(() => import('@/pages/public/CityPages').then((m) => ({ default: m.CityPage as ComponentType<{ city: City }> })))
const CityOrAreaOrService = lazy(() => import('@/pages/public/CityPages').then((m) => ({ default: m.CityOrAreaOrService })))
const Professionals = lazy(() => import('@/pages/public/Professionals').then((m) => ({ default: m.Professionals })))
const ProfessionalDetail = lazy(() => import('@/pages/public/Professionals').then((m) => ({ default: m.ProfessionalDetail })))
const ServicesHub = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.ServicesHub })))
const Programmes = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.Programmes })))
const ServiceAreas = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.ServiceAreas })))
const Standards = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.Standards })))
const Reviews = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.Reviews })))
const BlogIndex = lazy(() => import('@/pages/public/Blog').then((m) => ({ default: m.BlogIndex })))
const BlogArticle = lazy(() => import('@/pages/public/Blog').then((m) => ({ default: m.BlogArticle })))
const FaqPage = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.FaqPage })))
const HowItWorksPage = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.HowItWorksPage })))
const PricingPage = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.PricingPage })))
const ContactPage = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.ContactPage })))
const AboutPage = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.AboutPage })))
const LegalPrivacy = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="privacy" /> })))
const LegalTerms = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="terms" /> })))
const LegalRefunds = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="refunds" /> })))
const LegalSafety = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="safety" /> })))
const LegalEditorial = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="editorial" /> })))
const LegalNutrition = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="nutrition" /> })))
const LegalPhysio = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="physio" /> })))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServicesHub />} />
          <Route path="/services/:slug" element={<ServicePage />} />
          <Route path="/personal-training" element={<ServicePage slug="personal-training" />} />
          <Route path="/private-yoga" element={<ServicePage slug="private-yoga" />} />
          <Route path="/mat-pilates" element={<ServicePage slug="mat-pilates" />} />
          <Route path="/mobility-coaching" element={<ServicePage slug="mobility-coaching" />} />
          <Route path="/boxing-fitness" element={<ServicePage slug="boxing-fitness" />} />
          <Route path="/guided-meditation" element={<ServicePage slug="guided-meditation" />} />
          <Route path="/swimming" element={<ServicePage slug="swimming" />} />
          <Route path="/private-chef" element={<ServicePage slug="private-chef" />} />
          <Route path="/private-chef-bali" element={<Navigate to="/private-chef" replace />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/professionals/:slug" element={<ProfessionalDetail />} />
          <Route path="/locations" element={<Navigate to="/service-areas" replace />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/bali" element={<CityPage city="Bali" />} />
          <Route path="/jakarta" element={<CityPage city="Jakarta" />} />
          <Route path="/bali/:slug" element={<CityOrAreaOrService />} />
          <Route path="/jakarta/:slug" element={<CityOrAreaOrService />} />
          <Route path="/professional-standards" element={<Standards />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<Navigate to="/resources" replace />} />
          <Route path="/resources" element={<BlogIndex />} />
          <Route path="/resources/:slug" element={<BlogArticle />} />
          <Route path="/privacy" element={<LegalPrivacy />} />
          <Route path="/terms" element={<LegalTerms />} />
          <Route path="/refunds-rescheduling" element={<LegalRefunds />} />
          <Route path="/safety" element={<LegalSafety />} />
          <Route path="/editorial-policy" element={<LegalEditorial />} />
          <Route path="/nutrition-consultation" element={<LegalNutrition />} />
          <Route path="/physiotherapy" element={<LegalPhysio />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
