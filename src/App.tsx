import { Navigate, Route, Routes } from 'react-router'
import Layout from '@/components/Layout'
import Home from '@/pages/public/Home'
import ServiceGate from '@/pages/public/ServiceGate'
import Gone from '@/pages/public/Gone'
import NotFound from '@/pages/public/NotFound'
import { CityPage, CityOrAreaOrService } from '@/pages/public/CityPages'
import { AboutPage, ContactPage, FaqPage, LegalPage, PricingPage, Programmes, ServiceAreas, ServicesHub, Standards } from '@/pages/public/MorePages'
import { BlogArticle, BlogIndex } from '@/pages/public/Blog'
import HowItWorksPage from '@/pages/public/WellnessHowItWorks'
import Partners from '@/pages/public/Partners'

export default function App() {
  return (
    <Layout>
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
        <Route path="/privacy" element={<LegalPage kind="privacy" />} />
        <Route path="/terms" element={<LegalPage kind="terms" />} />
        <Route path="/refunds-rescheduling" element={<LegalPage kind="refunds" />} />
        <Route path="/safety" element={<LegalPage kind="safety" />} />
        <Route path="/editorial-policy" element={<LegalPage kind="editorial" />} />
        <Route path="/:slug" element={<ServiceGate />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  )
}
