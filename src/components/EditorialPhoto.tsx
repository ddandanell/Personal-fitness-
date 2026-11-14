import images from '@/data/page-images.json'
export type PageImage = {src: string; alt: string; width: number; height: number; origin: string}
const registry = images as Record<string, PageImage>
export function pageImage(path: string) { return registry[path] }
export function responsiveSource(src: string) { return src.startsWith('/images/locations/') || src.startsWith('/images/editorial/') ? src.replace('.webp', '-640.webp') + ' 640w, ' + src + ' 1440w' : undefined }
export function EditorialPhoto({path, eager = false, className = ''}: {path: string; eager?: boolean; className?: string}) {
  const photo = pageImage(path)
  if (!photo) return null
  return <figure className={'editorial-photo ' + className}>
    <img src={photo.src} srcSet={responsiveSource(photo.src)} sizes="(max-width: 700px) 92vw, 1200px" alt={photo.alt} width={photo.width} height={photo.height} loading={eager ? 'eager' : 'lazy'} decoding="async" fetchPriority={eager ? 'high' : 'auto'} data-image-origin={photo.origin}/>
    <figcaption>Illustrative session image. Your professional is confirmed with your booking.</figcaption>
  </figure>
}
