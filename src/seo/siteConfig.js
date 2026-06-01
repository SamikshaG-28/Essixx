const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.essixx.com').replace(
  /\/$/,
  '',
)

export const siteConfig = {
  name: 'Essixx',
  legalName: 'Essixx',
  tagline: 'Building digital futures',
  title: 'Essixx — Web Development & Digital Transformation Studio | Pune',
  description:
    'Essixx helps startups and businesses in Pune build modern websites, mobile apps, and digital products. Web design, development, SEO-friendly sites from ₹19,999. Trusted technology partner.',
  url: SITE_URL,
  locale: 'en_IN',
  language: 'en',
  email: 'support@essixx.com',
  phone: '+919000000000',
  phoneDisplay: '+91 90000 00000',
  address: {
    streetAddress: 'Navale Bridge',
    addressLocality: 'Pune',
    addressRegion: 'Maharashtra',
    postalCode: '411041',
    addressCountry: 'IN',
  },
  geo: {
    latitude: 18.5204,
    longitude: 73.8567,
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/essixx',
    twitter: 'https://twitter.com/essixx',
    instagram: 'https://www.instagram.com/essixx',
    facebook: 'https://www.facebook.com/essixx',
    github: 'https://github.com/essixx',
  },
  keywords: [
    'Essixx',
    'web development Pune',
    'website design Pune',
    'digital transformation',
    'mobile app development',
    'SEO friendly websites',
    'business website India',
    'software development company Pune',
  ],
  ogImage: `${SITE_URL}/career-poster-1.png`,
  ogImageAlt:
    'Essixx — Professional website development for Pune businesses. Special offer from ₹19,999.',
  themeColor: '#0091bf',
  foundingDate: '2014',
  priceRange: '₹₹',
  services: [
    'Web Design',
    'Web Development',
    'App Development',
    'Data & AI Consulting',
    'Digital Workplace Solutions',
    'IT Modernization',
  ],
}

export function absoluteUrl(path = '/') {
  if (path.startsWith('http')) return path
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildPageJsonLd({
  path = '/',
  title = siteConfig.title,
  description = siteConfig.description,
  type = 'WebPage',
} = {}) {
  const url = absoluteUrl(path)

  return {
    '@context': 'https://schema.org',
    '@type': type,
    '@id': `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: 'en-IN',
    isPartOf: { '@id': `${siteConfig.url}/#website` },
    about: { '@id': `${siteConfig.url}/#organization` },
  }
}

export function buildBreadcrumbJsonLd(items = []) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function buildJsonLd() {
  const {
    name,
    legalName,
    description,
    url,
    email,
    phone,
    phoneDisplay,
    address,
    geo,
    social,
    ogImage,
    foundingDate,
    priceRange,
    services,
  } = siteConfig

  const addressBlock = {
    '@type': 'PostalAddress',
    streetAddress: address.streetAddress,
    addressLocality: address.addressLocality,
    addressRegion: address.addressRegion,
    postalCode: address.postalCode,
    addressCountry: address.addressCountry,
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${url}/#organization`,
        name: legalName,
        alternateName: name,
        url,
        logo: {
          '@type': 'ImageObject',
          url: absoluteUrl('/essixx-logo.png'),
          width: 512,
          height: 512,
        },
        image: ogImage,
        description,
        email,
        telephone: phoneDisplay,
        foundingDate,
        sameAs: Object.values(social).filter(Boolean),
        address: addressBlock,
      },
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name,
        description,
        publisher: { '@id': `${url}/#organization` },
        inLanguage: 'en-IN',
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${url}/#localbusiness`,
        name: `${name} — Digital Studio`,
        image: ogImage,
        url,
        telephone: phone,
        email,
        priceRange,
        address: addressBlock,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: geo.latitude,
          longitude: geo.longitude,
        },
        areaServed: {
          '@type': 'City',
          name: 'Pune',
        },
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital services',
          itemListElement: services.map((service, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: {
              '@type': 'Service',
              name: service,
              provider: { '@id': `${url}/#organization` },
            },
          })),
        },
      },
    ],
  }
}
