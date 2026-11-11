export type BlogPost = {
  slug: string
  briefId: string
  title: string
  description: string
  date: string
  primaryQuery: string
  service: string
  city: string
  landingPage: string
  image: string
  faqs: { q: string; a: string }[]
  body: string
}
