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
  ogImage: `${SITE_URL}/og-image.png`,
  ogImageAlt:
    'Essixx — Professional website development for Pune businesses. Special offer from ₹19,999.',
  themeColor: '#82c341',
  foundingDate: '2014',
  priceRange: '₹₹',
  services: [
    {
      name: 'Web Design',
      description: 'Modern, responsive website design for startups and growing businesses.',
    },
    {
      name: 'Web Development',
      description: 'Custom website and web app development with modern stacks, from ₹19,999.',
    },
    {
      name: 'App Development',
      description: 'Android and iOS mobile app development, from concept to store launch.',
    },
    {
      name: 'Digital Marketing',
      description:
        'Social media management, content, reels and ad campaigns across Facebook, Instagram and YouTube.',
    },
    {
      name: 'Data & AI Consulting',
      description: 'AI automation, analytics and intelligence layers for business workflows.',
    },
    {
      name: 'IT Modernization',
      description: 'Migration of legacy systems to modern cloud-native infrastructure.',
    },
  ],
  marketingPlans: [
    { name: 'Starter Kit', price: '49999', description: '5-page website, 12 posts + 4 reels per month, laptop included' },
    { name: 'Growth Kit', price: '99999', description: '8–10 page website, 20 posts + 8 reels per month, laptop included' },
    { name: 'Premium Kit', price: '149999', description: '10–15 page website, 30 posts + 12 reels per month, laptop included' },
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

export function buildFaqJsonLd(faqs = []) {
  if (!faqs.length) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildJobPostingJsonLd(job) {
  const { url, name, address } = siteConfig
  const remote = /remote/i.test(job.location)
  const posting = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description:
      job.description ||
      `${job.title} role at ${name} (${job.department}). ${job.type}, ${job.location}.`,
    datePosted: job.datePosted || '2026-07-01',
    employmentType: job.type === 'Contract' ? 'CONTRACTOR' : job.type.toUpperCase().replace('-', '_'),
    hiringOrganization: {
      '@type': 'Organization',
      name,
      sameAs: url,
      logo: absoluteUrl('/essixx-logo.png'),
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: address.addressLocality,
        addressRegion: address.addressRegion,
        addressCountry: address.addressCountry,
      },
    },
    directApply: true,
  }
  if (remote) {
    posting.jobLocationType = 'TELECOMMUTE'
    posting.applicantLocationRequirements = {
      '@type': 'Country',
      name: 'India',
    }
  }
  return posting
}

export function buildMarketingOffersJsonLd() {
  const { url, name, marketingPlans } = siteConfig
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}/#digital-marketing`,
    name: `${name} Digital Marketing`,
    serviceType: 'Digital Marketing',
    provider: { '@id': `${url}/#organization` },
    areaServed: { '@type': 'Country', name: 'India' },
    description:
      'Complete business kits: website, social media content, reels, ad management and hardware — monthly plans.',
    offers: marketingPlans.map((plan) => ({
      '@type': 'Offer',
      name: plan.name,
      description: plan.description,
      price: plan.price,
      priceCurrency: 'INR',
      url: `${url}/#plans`,
      availability: 'https://schema.org/InStock',
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
    tagline,
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
        slogan: tagline,
        email,
        telephone: phoneDisplay,
        foundingDate,
        sameAs: Object.values(social).filter(Boolean),
        address: addressBlock,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email,
          telephone: phone,
          areaServed: 'IN',
          availableLanguage: ['en', 'hi', 'mr'],
        },
        knowsAbout: [
          'Web development',
          'Mobile app development',
          'UI/UX design',
          'Digital marketing',
          'AI automation',
          'E-commerce',
          'SEO',
        ],
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
        areaServed: [
          { '@type': 'City', name: 'Pune' },
          { '@type': 'Country', name: 'India' },
        ],
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            opens: '10:00',
            closes: '19:00',
          },
        ],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Digital services',
          itemListElement: services.map((service, index) => ({
            '@type': 'Offer',
            position: index + 1,
            itemOffered: {
              '@type': 'Service',
              name: service.name,
              description: service.description,
              provider: { '@id': `${url}/#organization` },
            },
          })),
        },
      },
    ],
  }
}
