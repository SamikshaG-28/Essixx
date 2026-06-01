import { siteConfig, absoluteUrl, buildJsonLd } from '../seo/siteConfig.js'

export default function Seo({
  title = siteConfig.title,
  description = siteConfig.description,
  path = '/',
  keywords = siteConfig.keywords,
  ogImage = siteConfig.ogImage,
  ogImageAlt = siteConfig.ogImageAlt,
  ogType = 'website',
  locale = siteConfig.locale,
  themeColor = siteConfig.themeColor,
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  jsonLd = buildJsonLd(),
}) {
  const canonicalUrl = absoluteUrl(path)
  const jsonLdBlocks = Array.isArray(jsonLd) ? jsonLd : [jsonLd]
  const {
    name,
    email,
    phoneDisplay,
  } = siteConfig

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={name} />
      <meta name="robots" content={robots} />
      <meta name="googlebot" content={robots} />
      <meta name="theme-color" content={themeColor} />
      <meta name="format-detection" content="telephone=yes" />
      <meta name="geo.region" content="IN-MH" />
      <meta name="geo.placename" content="Pune" />

      <link rel="canonical" href={canonicalUrl} />
      <link rel="alternate" hrefLang="en-in" href={canonicalUrl} />
      <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={name} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={locale} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:secure_url" content={ogImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content="1024" />
      <meta property="og:image:height" content="576" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      <link rel="manifest" href="/site.webmanifest" />

      <meta name="contact" content={email} />
      <meta name="telephone" content={phoneDisplay} />

      {jsonLdBlocks.filter(Boolean).map((item, index) => (
        <script
          key={`jsonld-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  )
}
