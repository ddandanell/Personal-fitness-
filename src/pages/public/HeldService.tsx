import { ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { PageIntro } from '@/components/Primitives'
import { getService } from '@/data/catalog'

export default function HeldService({ slug: slugProp }: { slug?: string }) {
  const params = useParams()
  const slug = slugProp || params.slug || ''
  const service = getService(slug)
  const title = service?.title || 'This service'
  return (
    <>
      <PageIntro
        eyebrow="Not currently available"
        title={title + ' is not currently available.'}
        description="This service is not on the public offer. Check availability for personal training, private yoga, mat Pilates or mobility coaching at your villa or home."
      >
        <div className="cluster">
          <Link to="/contact" className="button button-primary">Check availability<ArrowUpRight size={16} /></Link>
          <Link to="/services" className="button button-outline">See session prices<ArrowUpRight size={16} /></Link>
        </div>
      </PageIntro>
    </>
  )
}
