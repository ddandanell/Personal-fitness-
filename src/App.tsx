import { Navigate, Outlet, Route, Routes } from 'react-router'
import Layout from '@/components/Layout'
import { isVillaDemoHost, isVillasHost } from '@/villa-demo/host'
import { DemoStateProvider } from '@/villa-demo/store'
import { DemoShell } from '@/villa-demo/shell'
import { BookingLookup, BookingPage, GuestHome, HelpPage, QrCard, RequestPage, ServiceDetail, ServicesIndex } from '@/villa-demo/GuestPages'
import Home from '@/pages/public/Home'
import IndonesianHome from '@/pages/public/IndonesianHome'
import ServiceGate from '@/pages/public/ServiceGate'
import Gone from '@/pages/public/Gone'
import NotFound from '@/pages/public/NotFound'
import { CityPage, CityOrAreaOrService } from '@/pages/public/CityPages'
import { AboutPage, ContactPage, FaqPage, LegalPage, PricingPage, Programmes, ServiceAreas, ServicesHub, Standards } from '@/pages/public/MorePages'
import { BlogArticle, BlogIndex } from '@/pages/public/Blog'
import HowItWorksPage from '@/pages/public/WellnessHowItWorks'
import Partners from '@/pages/public/Partners'
import IndonesianPartners from '@/pages/public/IndonesianPartners'
import PartnerTerms from '@/pages/public/PartnerTerms'
import PartnerMenu from '@/pages/public/PartnerMenu'
import Team from '@/pages/public/Team'

function DemoRoot() {
  return (
    <DemoStateProvider>
      <DemoShell>
        <Outlet />
      </DemoShell>
    </DemoStateProvider>
  )
}

function portalChildren() {
  return (
    <>
      <Route index element={<GuestHome />} />
      <Route path="services" element={<ServicesIndex />} />
      <Route path="services/:slug" element={<ServiceDetail />} />
      <Route path="request/:slug" element={<RequestPage />} />
      <Route path="booking" element={<BookingLookup />} />
      <Route path="booking/:token" element={<BookingPage />} />
      <Route path="help" element={<HelpPage />} />
      <Route path="card" element={<QrCard />} />
      <Route path="q/:code" element={<GuestHome />} />
      <Route path="*" element={<GuestHome />} />
    </>
  )
}

export default function App() {
  const onDemoHost = isVillaDemoHost()
  const onVillasHost = isVillasHost()
  return (
    <Routes>
      {(onDemoHost || onVillasHost) && (
        <Route path="/" element={<DemoRoot />}>{portalChildren()}</Route>
      )}
      {onVillasHost && <Route path="/v/:slug" element={<DemoRoot />}>{portalChildren()}</Route>}
      <Route path="/villademo" element={<DemoRoot />}>{portalChildren()}</Route>
      {!onDemoHost && !onVillasHost && (
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/id" element={<IndonesianHome />} />
          <Route path="/id/mitra-villa" element={<IndonesianPartners />} />
          <Route path="/410" element={<Gone />} />
          <Route path="/services" element={<ServicesHub />} />
          <Route path="/services/:slug" element={<ServiceGate />} />
          <Route path="/personal-training" element={<ServiceGate slug="personal-training" />} />
          <Route path="/private-yoga" element={<ServiceGate slug="private-yoga" />} />
          <Route path="/mat-pilates" element={<ServiceGate slug="mat-pilates" />} />
          <Route path="/mobility-coaching" element={<ServiceGate slug="mobility-coaching" />} />
          <Route path="/boxing-fitness" element={<ServiceGate slug="boxing-fitness" />} />
          <Route path="/guided-meditation" element={<ServiceGate slug="guided-meditation" />} />
          <Route path="/bodywork-recovery" element={<ServiceGate slug="bodywork-recovery" />} />
          <Route path="/zumba-dance-fitness" element={<ServiceGate slug="zumba-dance-fitness" />} />
          <Route path="/swimming" element={<ServiceGate slug="swimming" />} />
          <Route path="/nutrition-consultation" element={<ServiceGate slug="nutrition-consultation" />} />
          <Route path="/physiotherapy" element={<ServiceGate slug="physiotherapy" />} />
          <Route path="/programmes" element={<Programmes />} />
          <Route path="/wellness-plan" element={<Navigate to="/programmes" replace />} />
          <Route path="/fitness-programmes" element={<Navigate to="/programmes" replace />} />
          <Route path="/villa-hotel-partners" element={<Partners />} />
          <Route path="/partner-terms" element={<PartnerTerms />} />
          <Route path="/partners/menu" element={<PartnerMenu />} />
          <Route path="/team" element={<Team />} />
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
        </Route>
      )}
    </Routes>
  )
}
