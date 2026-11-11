import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router'
import Layout from '@/components/Layout'
import { Loading } from '@/components/Primitives'
import Home from '@/pages/public/Home'
import ServiceGate from '@/pages/public/ServiceGate'
import { CityPage, CityOrAreaOrService } from '@/pages/public/CityPages'

const Gone = lazy(() => import('@/pages/public/Gone'))
const NotFound = lazy(() => import('@/pages/public/NotFound'))
const ServicesHub = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.ServicesHub })))
const Programmes = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.Programmes })))
const ServiceAreas = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.ServiceAreas })))
const Standards = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.Standards })))
const BlogIndex = lazy(() => import('@/pages/public/Blog').then((m) => ({ default: m.BlogIndex })))
const BlogArticle = lazy(() => import('@/pages/public/Blog').then((m) => ({ default: m.BlogArticle })))
const FaqPage = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.FaqPage })))
const HowItWorksPage = lazy(() => import('@/pages/public/WellnessHowItWorks'))
const Partners = lazy(() => import('@/pages/public/Partners'))
const PricingPage = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.PricingPage })))
const ContactPage = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.ContactPage })))
const AboutPage = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: m.AboutPage })))
const LegalPrivacy = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="privacy" /> })))
const LegalTerms = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="terms" /> })))
const LegalRefunds = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="refunds" /> })))
const LegalSafety = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="safety" /> })))
const LegalEditorial = lazy(() => import('@/pages/public/MorePages').then((m) => ({ default: () => <m.LegalPage kind="editorial" /> })))

function RouteFallback() {
  return (
    <div className="route-fallback" aria-hidden="true">
      <Loading />
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/410" element={<Gone />} />
          <Route path="/services" element={<ServicesHub />} />
          <Route path="/services/:slug" element={<ServiceGate />} />
          <Route path="/personal-training" element={<ServiceGate slug="personal-training" />} />
          <Route path="/private-yoga" element={<ServiceGate slug="private-yoga" />} />
          <Route path="/mat-pilates" element={<ServiceGate slug="mat-pilates" />} />
          <Route path="/mobility-coaching" element={<ServiceGate slug="mobility-coaching" />} />
          <Route path="/boxing-fitness" element={<ServiceGate slug="boxing-fitness" />} />
          <Route path="/guided-meditation" element={<ServiceGate slug="guided-meditation" />} />
          <Route path="/swimming" element={<ServiceGate slug="swimming" />} />
          <Route path="/nutrition-consultation" element={<ServiceGate slug="nutrition-consultation" />} />
          <Route path="/physiotherapy" element={<ServiceGate slug="physiotherapy" />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/wellness-plan" element={<Navigate to="/programmes" replace />} />
          <Route path="/fitness-programmes" element={<Navigate to="/programmes" replace />} />
          <Route path="/villa-hotel-partners" element={<Partners />} />
          <Route path="/professionals" element={<Navigate to="/professional-standards" replace />} />
          <Route path="/professionals/:slug" element={<Gone />} />
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
          <Route path="/reviews" element={<Gone />} />
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
          <Route path="/:slug" element={<ServiceGate />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
