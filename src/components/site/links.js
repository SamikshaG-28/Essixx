import { siteConfig } from '../../seo/siteConfig.js'

export const PROJECT_MAILTO = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
  'New project enquiry',
)}`
