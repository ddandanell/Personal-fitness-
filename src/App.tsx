import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'
import Layout from '@/components/Layout'
import { Loading } from '@/components/Primitives'

const Home = lazy(() => import('@/pages/public/Home'))
const Services = lazy(() => import('@/pages/public/Services'))
const ServiceDetail = lazy(() => import('@/pages/public/ServiceDetail'))
const Locations = lazy(() => import('@/pages/public/Locations'))
const HowItWorks = lazy(() => import('@/pages/public/HowItWorks'))
const Pricing = lazy(() => import('@/pages/public/Pricing'))
const About = lazy(() => import('@/pages/public/About'))
const Faq = lazy(() => import('@/pages/public/Faq'))
const Privacy = lazy(() => import('@/pages/public/Privacy'))
const Contact = lazy(() => import('@/pages/public/Contact'))
const NotFound = lazy(() => import('@/pages/public/NotFound'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceDetail />} />
          <Route path="/locations" element={<Locations />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/about" element={<About />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}
