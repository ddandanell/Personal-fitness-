import { ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { Eyebrow, PageIntro } from '@/components/Primitives'
import { CtaBand } from '@/components/SiteBlocks'
import StructuredData from '@/components/StructuredData'
import { blogPosts, getBlogPost, relatedPosts } from '@/data/blog'
import { getResource, resources } from '@/data/content'
import { ArticleBody } from '@/lib/articleMarkup'
import { COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_EMAIL_HREF, SITE_ORIGIN } from '@/data/company'
import { EditorialPhoto, pageImage, responsiveSource } from '@/components/EditorialPhoto'
import { collectionJsonLd } from '@/lib/schema'
import { WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import NotFound from './NotFound'

function wordCount(markdown: string) {
  return markdown.trim().split(/\s+/).filter((token) => /[A-Za-z0-9]/.test(token)).length
}

export function BlogIndex() {
  return (
    <>
      <StructuredData data={collectionJsonLd(
        'Personal trainer Bali and Jakarta guides',
        '/resources',
        'Guides to in-villa personal training, Jakarta home sessions, private yoga, boxing fitness, guided meditation, prices and programmes.',
        [...blogPosts.map((post) => ({ name: post.title, url: '/resources/' + post.slug })), ...resources.map((item) => ({ name: item.title, url: '/resources/' + item.slug }))],
      )} />
      <PageIntro
        eyebrow="Blog"
        title="Practical guides for a villa or home session."
        description="Understand private session formats, prices and preparation, with practical guidance for a home or villa visit in Bali and Jakarta."
      />
      <section className="section">
        <div className="shell">
          <div className="section-title">
            <div>
              <Eyebrow>Start here</Eyebrow>
              <h2>Start with the essentials.</h2>
            </div>
          </div>
          <div className="resource-grid">
            {blogPosts.map((post) => (
              <Link to={`/resources/${post.slug}`} className="resource-card" key={post.slug}>
                <img className="blog-card-image" src={post.image} srcSet={responsiveSource(post.image)} sizes="(max-width: 700px) 90vw, 30vw" alt={post.imageAlt || post.title} loading="lazy" width="1200" height="800" />
                <p className="eyebrow">{post.city} · {post.service}</p>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <span className="text-link">Read the guide<ArrowUpRight size={15} /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-compact section-light">
        <div className="shell">
          <div className="section-title">
            <div>
              <Eyebrow>Shorter notes</Eyebrow>
              <h2>Useful session notes.</h2>
            </div>
          </div>
          <div className="resource-grid">
            {resources.map((item) => (
              <Link to={`/resources/${item.slug}`} className="resource-card" key={item.slug}>
                <img className="blog-card-image" src={pageImage('/resources/' + item.slug)?.src} srcSet={responsiveSource(pageImage('/resources/' + item.slug)?.src || '')} sizes="(max-width: 700px) 90vw, 30vw" alt={pageImage('/resources/' + item.slug)?.alt || item.title} loading="lazy" width="1200" height="800" />
                <p className="eyebrow">{item.eyebrow} · {item.minutes} min</p>
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export function BlogArticle() {
  const { slug } = useParams()
  const post = slug ? getBlogPost(slug) : undefined
  const note = slug && !post ? getResource(slug) : undefined
  if (!post && !note) return <NotFound />

  if (note && !post) {
    return (
      <>
        <PageIntro eyebrow={note.eyebrow} title={note.title} description={note.summary} />
        <section className="section-compact"><div className="shell"><EditorialPhoto path={'/resources/' + note.slug} eager /></div></section>
        <section className="section">
          <div className="content-shell privacy-prose">
            {note.body.map((p) => <p key={p}>{p}</p>)}
            <p>Open <Link to="/bali">Bali private fitness</Link>, <Link to="/jakarta">home training in Jakarta</Link> or <Link to="/pricing">published prices</Link> if you already know the city. The <Link to="/">homepage</Link> holds the full offer.</p>
            <Link to="/contact" className="button button-primary">Use this in an enquiry<ArrowUpRight size={16} /></Link>
          </div>
        </section>
      </>
    )
  }

  if (!post) return <NotFound />
  const related = relatedPosts(post.slug)
  const words = wordCount(post.body)

  return (
    <>
      <ArticleSchema post={post} words={words} />
      <PageIntro eyebrow={`${post.briefId} · ${post.date}`} title={post.title} description={post.description}>
        <p className="article-kicker">{Math.max(1, Math.round(words / 220))} minute read · PersonalFitness.id editorial</p>
      </PageIntro>
      <section className="section">
        <div className="shell article-cover"><EditorialPhoto path={'/resources/' + post.slug} eager /></div>
        <div className="article-layout">
          <article>
            <ArticleBody markdown={post.body} />
            <div className="article-cta">
              <p>If the next step is a session, open the <Link to={post.landingPage}>relevant session page</Link>, then send a WhatsApp to {WHATSAPP_DISPLAY} or email <a href={COMPANY_EMAIL_HREF}>{COMPANY_EMAIL}</a>.</p>
              <div className="cluster">
                <Link to={post.landingPage} className="button button-dark">Explore this service<ArrowUpRight size={16} /></Link>
                <Link to="/contact" className="button button-outline">Check availability</Link>
                <a className="button button-primary" href={whatsappDraftUrl(`Hello PersonalFitness.id. I read “${post.title}” and I would like to check a session.`)} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
              </div>
            </div>
          </article>
          <aside className="article-aside">
            <p className="eyebrow">Use this page</p>
            <h2>What to do after you read it.</h2>
            <ol>
              <li>Choose your location on the <Link to="/service-areas">service-area directory</Link>.</li>
              <li>Open the <Link to={post.landingPage}>{post.service.toLowerCase()} page</Link>.</li>
              <li>Price it on <Link to="/pricing">pricing</Link>.</li>
              <li>Message {WHATSAPP_DISPLAY} with city, area and window.</li>
            </ol>
            <p className="small muted">Office: {COMPANY_ADDRESS}. Email {COMPANY_EMAIL}. Sessions still run at your location.</p>
          </aside>
        </div>
      </section>
      {post.faqs.length > 0 && (
        <section className="section-compact section-light">
          <div className="content-shell">
            <div className="section-title"><div><Eyebrow>Quick answers</Eyebrow><h2>Your questions answered.</h2></div></div>
            <div className="faq-list">
              {post.faqs.map((item) => (
                <details className="faq-item" key={item.q}>
                  <summary><span>{item.q}</span></summary>
                  <div className="faq-body"><p>{item.a}</p></div>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="section-compact">
        <div className="shell">
          <div className="section-title"><div><Eyebrow>Keep reading</Eyebrow><h2>More guides for your next session.</h2></div></div>
          <div className="resource-grid">
            {related.map((item) => (
              <Link to={`/resources/${item.slug}`} className="resource-card" key={item.slug}>
                <img className="blog-card-image" src={item.image} alt={item.service + ' at a villa or home'} loading="lazy" width="1200" height="800" />
                <p className="eyebrow">{item.city}</p>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand dark title="The article is not the booking." copy="Send the area, the window and the headcount. We match, quote and confirm from there." to="/contact" />
    </>
  )
}

function ArticleSchema({ post, words }: { post: NonNullable<ReturnType<typeof getBlogPost>>; words: number }) {
  return (
    <StructuredData data={{
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          image: SITE_ORIGIN + (post.image || post.image),
          datePublished: post.date,
          dateModified: post.date,
          wordCount: words,
          inLanguage: 'en',
          mainEntityOfPage: `${SITE_ORIGIN}/resources/${post.slug}`,
          author: { '@type': 'Organization', name: 'PersonalFitness.id' },
          publisher: {
            '@type': 'Organization',
            name: 'PersonalFitness.id',
            logo: { '@type': 'ImageObject', url: SITE_ORIGIN + '/brand/personalfitness-mark.png' },
            address: COMPANY_ADDRESS,
          },
          isPartOf: { '@id': SITE_ORIGIN + '/#website' },
          about: { '@id': SITE_ORIGIN + '/#business' },
        },
        {
          '@type': 'FAQPage',
          mainEntity: post.faqs.map((item) => ({
            '@type': 'Question',
            name: item.q,
            acceptedAnswer: { '@type': 'Answer', text: item.a },
          })),
        },
      ],
    }} />
  )
}
