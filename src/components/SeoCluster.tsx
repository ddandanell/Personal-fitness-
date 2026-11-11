import { Link } from 'react-router'
import StructuredData from './StructuredData'
import { crumbsFor, relatedFor } from '@/data/seo'
import { SITE_ORIGIN } from '@/data/company'

export function Breadcrumbs({ path }: { path: string }) {
  const crumbs = crumbsFor(path)
  if (path === '/' || crumbs.length < 2) return null
  return (
    <>
      <StructuredData data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.label,
          item: SITE_ORIGIN + (item.to === '/' ? '/' : item.to),
        })),
      }} />
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <ol>
          {crumbs.map((item, index) => (
            <li key={item.to + index}>
              {index === crumbs.length - 1 ? <span aria-current="page">{item.label}</span> : <Link to={item.to}>{item.label}</Link>}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

export function RelatedLinks({ path, title = 'Keep exploring' }: { path: string; title?: string }) {
  const links = relatedFor(path).filter((link) => !link.to.startsWith('/professionals') && link.to !== '/reviews' && link.to !== '/wellness-plan' && !link.to.includes('massage'))
  if (!links.length) return null
  return (
    <section className="seo-related" aria-label="Related pages">
      <div className="shell">
        <p className="eyebrow">{title}</p>
        <ul>
          {links.map((item) => (
            <li key={item.to}><Link to={item.to}>{item.label}</Link></li>
          ))}
        </ul>
      </div>
    </section>
  )
}
