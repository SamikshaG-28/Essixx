const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://www.essixx.com').replace(
  /\/$/,
  '',
)

export const siteConfig = {
  name: 'Essixx',
  legalName: 'Essixx',
  tagline: 'Captions for every reel',
  title: 'Essy — AI Caption Generator for Reels | Hinglish Subtitles, Offline',
  description:
    'Essy is a desktop caption generator for Reels, Shorts and TikTok. Auto-transcribes Hindi, English and Hinglish on your own machine, 105 caption styles, face tracking and 4K export. Free download for macOS.',
  url: SITE_URL,
  locale: 'en_IN',
  language: 'en',
  email: 'support@essixx.com',
  // NAP data is a ranking signal for local search — a placeholder number is
  // worse than none, so telephone is omitted from schema until it is real.
  // Set VITE_SITE_PHONE (E.164, e.g. +919812345678) to publish it.
  phone: import.meta.env.VITE_SITE_PHONE || '',
  phoneDisplay: import.meta.env.VITE_SITE_PHONE_DISPLAY || '',
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
    'Essy',
    'caption generator',
    'auto captions for reels',
    'Hinglish subtitles',
    'Hindi transcription software',
    'subtitle generator app',
    'video caption editor',
    'offline captions',
    'shorts and reels captions',
    'caption styles',
    'Essixx',
  ],
  ogImage: `${SITE_URL}/og-image.png`,
  ogImageAlt:
    'Essy — a desktop caption editor: Hinglish transcript, styled captions on the video, and 105 caption styles.',
  themeColor: '#0B0E15',
  foundingDate: '2014',
  priceRange: '₹₹',
  services: [
    {
      name: 'Automatic captions',
      description:
        'Word-level transcription for Hindi, English and Hinglish, run on your own machine.',
    },
    {
      name: 'Caption styling',
      description:
        '105 caption styles with per-word colour, motion and placement, plus a style builder.',
    },
    {
      name: 'Auto-reframe',
      description:
        'Face tracking that keeps the speaker in frame when a clip is cut to vertical.',
    },
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

export function buildWebsiteOfferJsonLd() {
  const { url, name } = siteConfig
  // SoftwareApplication, not Service: the thing being offered is a desktop
  // app someone downloads, and describing it as a service would make it
  // ineligible for the app rich result it actually qualifies for.
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    '@id': `${url}/#essy`,
    name: 'Essy',
    applicationCategory: 'MultimediaApplication',
    applicationSubCategory: 'Video caption editor',
    operatingSystem: 'macOS 12+',
    softwareVersion: '0.1.0',
    downloadUrl: `${url}/downloads/Essy_0.1.0_aarch64.dmg`,
    screenshot: [absoluteUrl('/essy/editor.png'), absoluteUrl('/essy/styles-gallery.png')],
    description:
      'Desktop caption generator for Reels and Shorts. Transcribes Hindi, ' +
      'English and Hinglish locally, styles every word, tracks the speaker ' +
      'and exports without uploading the video anywhere.',
    publisher: { '@id': `${url}/#organization` },
    offers: [
      {
        '@type': 'Offer',
        name: 'Free',
        price: '0',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${url}/#screens`,
      },
      {
        '@type': 'Offer',
        name: `${name} Monthly`,
        price: '199',
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
        url: `${url}/checkout?plan=monthly`,
      },
    ],
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

  // Emitting an empty telephone is a structured-data error; omit the key instead.
  const tel = (value) => (value ? { telephone: value } : {})

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
        ...tel(phoneDisplay),
        foundingDate,
        sameAs: Object.values(social).filter(Boolean),
        address: addressBlock,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer support',
          email,
          ...tel(phone),
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
        ...tel(phone),
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
