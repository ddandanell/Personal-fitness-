export type BlogPost = {
  slug: string
  briefId: string
  title: string
  description: string
  date: string
  lang?: 'en' | 'id'
  primaryQuery: string
  service: string
  city: string
  landingPage: string
  imageAlt?: string
  image: string
  faqs: { q: string; a: string }[]
  body: string
}

export type BlogPostRecord = Omit<BlogPost, 'body'> & { bodyFile: string }
