import { useParams } from 'react-router'
import { getService } from '@/data/catalog'
import { offerState } from '@/data/publicOffer'
import Gone from './Gone'
import HeldService from './HeldService'
import NotFound from './NotFound'
import ServicePage from './ServicePage'

export default function ServiceGate({ slug: slugProp }: { slug?: string }) {
  const params = useParams()
  const service = getService(slugProp || params.slug || '')
  const state = offerState(service?.slug || '')
  if (state === 'core' && service) return <ServicePage slug={service.slug} />
  if (state === 'held' && service) return <HeldService slug={service.slug} />
  if (state === 'unpublished') return <Gone />
  return <NotFound />
}
