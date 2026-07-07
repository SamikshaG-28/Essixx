/** UrbanCart storefronts — Essixx resolves redirects without per-site code changes. */

export const URBAN_CART_ORIGINS = {
  fun: 'https://urbancart.fun',
  in: 'https://urbancarts.in',
}

const HOST_TO_ORIGIN = {
  'urbancart.fun': URBAN_CART_ORIGINS.fun,
  'www.urbancart.fun': URBAN_CART_ORIGINS.fun,
  'urbancarts.in': URBAN_CART_ORIGINS.in,
  'www.urbancarts.in': URBAN_CART_ORIGINS.in,
}

const VALID_SOURCE_SITES = new Set([
  'urbancart',
  'urbancarts',
  'urbancart.fun',
  'urbancarts.in',
  'www.urbancart.fun',
  'www.urbancarts.in',
])

export function isUrbanCartSource(sourceSite) {
  const value = String(sourceSite || '').toLowerCase().trim()
  if (!value) return false
  if (VALID_SOURCE_SITES.has(value)) return true
  return value.includes('urbancart')
}

function normalizeOrigin(value) {
  const raw = String(value || '').trim()
  if (!raw) return null

  try {
    const withProtocol = raw.startsWith('http') ? raw : `https://${raw}`
    const url = new URL(withProtocol)
    const mapped = HOST_TO_ORIGIN[url.hostname.toLowerCase()]
    return mapped || `${url.protocol}//${url.hostname}`
  } catch {
    const host = raw.replace(/^https?:\/\//, '').split('/')[0].toLowerCase()
    return HOST_TO_ORIGIN[host] || null
  }
}

function originFromReturnUrl(url) {
  if (!url) return null
  try {
    const host = new URL(url).hostname.toLowerCase()
    return HOST_TO_ORIGIN[host] || null
  } catch {
    if (String(url).includes('urbancarts.in')) return URBAN_CART_ORIGINS.in
    if (String(url).includes('urbancart.fun')) return URBAN_CART_ORIGINS.fun
    return null
  }
}

function originFromSourceSite(sourceSite) {
  const value = String(sourceSite || '').toLowerCase()
  if (value.includes('urbancarts.in') || value === 'urbancarts') return URBAN_CART_ORIGINS.in
  if (value.includes('urbancart.fun') || value === 'urbancart') return URBAN_CART_ORIGINS.fun
  return null
}

/** Pick urbancart.fun vs urbancarts.in for fallback URLs (order doc wins when set). */
export function resolveUrbanCartOrigin(order, hints = {}) {
  const fromReturn =
    originFromReturnUrl(order?.returnUrlSuccess) || originFromReturnUrl(order?.returnUrlFailure)
  if (fromReturn) return fromReturn

  const fromOrderField = normalizeOrigin(
    order?.storeOrigin || order?.storeDomain || order?.urbanCartHost || order?.origin,
  )
  if (fromOrderField) return fromOrderField

  const fromSource = originFromSourceSite(order?.sourceSite)
  if (fromSource) return fromSource

  const fromHint =
    normalizeOrigin(hints.origin) || normalizeOrigin(hints.referrer) || originFromReturnUrl(hints.referrer)
  if (fromHint) return fromHint

  return URBAN_CART_ORIGINS.fun
}

export function buildUrbanCartReturnPath(kind, orderId) {
  const path =
    kind === 'success' ? '/#/payment-success' : '/#/payment-failed'
  return `${path}?order=${encodeURIComponent(orderId)}`
}

export function checkoutHintsFromQuery(query) {
  return {
    origin: query?.origin || query?.store || '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
  }
}
