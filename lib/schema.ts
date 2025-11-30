export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'DevFolioPro',
    description: 'Premium Portfolio & Blog Builder for Developers',
    url: 'https://devfoliopro.vercel.app',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://devfoliopro.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'DevFolioPro',
    url: 'https://devfoliopro.vercel.app',
    logo: 'https://devfoliopro.vercel.app/og-image.png',
    description: 'Create stunning developer portfolios and blogs in minutes',
    sameAs: [
      'https://twitter.com/devfoliopro',
      'https://github.com/hasan912/devConnect',
    ],
  }
}

export function generateWebApplicationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'DevFolioPro',
    description: 'Premium Portfolio & Blog Builder for Developers',
    url: 'https://devfoliopro.vercel.app',
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Web Browser',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  }
}
