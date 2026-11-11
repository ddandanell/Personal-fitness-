import { ArrowUpRight } from 'lucide-react'
import { Link, useParams } from 'react-router'
import { useEffect } from 'react'
import { Eyebrow, PageIntro } from '@/components/Primitives'
import { CtaBand } from '@/components/SiteBlocks'
import { blogPosts, getBlogPost, relatedPosts } from '@/data/blog'
import { getResource, resources } from '@/data/content'
import { ArticleBody } from '@/lib/articleMarkup'
import { getService } from '@/data/catalog'
import { COMPANY_ADDRESS } from '@/data/company'
import { WHATSAPP_DISPLAY, whatsappDraftUrl } from '@/lib/whatsapp'
import NotFound from './NotFound'

function articleImage(path: string) { return getService(path.split('/').filter(Boolean).at(-1) || '')?.image || '/images/professionals/sari-melati.webp' }

function wordCount(markdown: string) {
  return markdown.trim().split(/\s+/).filter((token) => /[A-Za-z0-9]/.test(token)).length
}

export function BlogIndex() {
  return (
    <>
      <PageIntro
        eyebrow="Blog"
        title="Practical guides for wellness at your place."
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
                <img className="blog-card-image" src={articleImage(post.landingPage)} alt="Illustrative Indonesian instructor in a private wellness setting" loading="lazy" width="1200" height="800" />
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
              <h2>Useful planning notes.</h2>
            </div>
          </div>
          <div className="resource-grid">
            {resources.map((item) => (
              <Link to={`/resources/${item.slug}`} className="resource-card" key={item.slug}>
                <img className="blog-card-image" src="/images/professionals/eka-pranata.webp" alt="Illustrative Indonesian wellness coordinator" loading="lazy" width="1200" height="800" />
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
        <section className="section">
          <div className="content-shell privacy-prose">
            {note.body.map((p) => <p key={p}>{p}</p>)}
            <p><Link to="/">Private fitness at your location</Link> is the homepage. Use it if you already know the city and the session.</p>
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
        <p className="article-kicker">{Math.max(1, Math.ceil(words / 200))} minute read · A practical guide for your next private visit.</p>
      </PageIntro>
      <section className="section">
        <div className="shell article-cover"><img src={articleImage(post.landingPage)} alt="AI-generated illustrative Indonesian instructor at a private property" width="1200" height="800" /><p className="image-disclosure">AI-generated illustrative instructor imagery.</p></div>
        <div className="article-layout">
          <article>
            <ArticleBody markdown={post.body} />
            <div className="article-cta">
              <p>If the next step is a session, start on the <Link to="/">PersonalFitness.id homepage</Link>, then send a WhatsApp to {WHATSAPP_DISPLAY}.</p>
              <div className="cluster">
                <Link to="/" className="button button-dark">Go to the homepage<ArrowUpRight size={16} /></Link>
                <Link to={post.landingPage} className="button button-outline">Open the session page</Link>
                <a className="button button-primary" href={whatsappDraftUrl(`Hello PersonalFitness.id. I read “${post.title}” and I would like to check a session.`)} target="_blank" rel="noopener noreferrer">WhatsApp us</a>
              </div>
            </div>
          </article>
          <aside className="article-aside">
            <p className="eyebrow">Use this page</p>
            <h2>What to do after you read it.</h2>
            <ol>
              <li>Open the <Link to="/">homepage</Link> if you still need the whole offer.</li>
              <li>Open the <Link to={post.landingPage}>{post.service.toLowerCase()} page</Link>.</li>
              <li>Price it on <Link to="/pricing">pricing</Link>.</li>
              <li>Message {WHATSAPP_DISPLAY} with city, area and window.</li>
            </ol>
            <p className="small muted">Office: {COMPANY_ADDRESS}. Sessions still run at your location.</p>
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
          <div className="section-title"><div><Eyebrow>Keep reading</Eyebrow><h2>More guides for your plans.</h2></div></div>
          <div className="resource-grid">
            {related.map((item) => (
              <Link to={`/resources/${item.slug}`} className="resource-card" key={item.slug}>
                <img className="blog-card-image" src={articleImage(item.landingPage)} alt="Illustrative Indonesian private instructor" loading="lazy" width="1200" height="800" />
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
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.id = 'blog-schema'
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          wordCount: words,
          inLanguage: 'en',
          mainEntityOfPage: `https://personalfitness.id/resources/${post.slug}`,
          author: { '@type': 'Organization', name: 'PersonalFitness.id' },
          publisher: {
            '@type': 'Organization',
            name: 'PersonalFitness.id',
            address: COMPANY_ADDRESS,
          },
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://personalfitness.id/' },
            { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://personalfitness.id/resources' },
            { '@type': 'ListItem', position: 3, name: post.title, item: `https://personalfitness.id/resources/${post.slug}` },
          ],
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
    })
    document.getElementById('blog-schema')?.remove()
    document.head.appendChild(script)
    return () => script.remove()
  }, [post, words])
  return null
}
