/**
 * Essy plans.
 *
 * Two paid tiers and a free one, and deliberately no credits, no seats and no
 * metering. Everything heavy in Essy — transcription, face tracking,
 * rendering — runs on the user's own machine, so usage costs us nothing and
 * charging by the minute would be inventing a meter to bill against.
 *
 * The free tier's numbers are the ones the app actually enforces, in
 * `src/lib/entitlements.ts` of the Essy repo. If they change there, they have
 * to change here — a plan table that promises more than the app allows is the
 * one bug in this file a user will definitely find.
 *
 * Prices are in paise-free rupees; Cashfree is handed the same numbers.
 */
export const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    period: '',
    tagline: 'The whole editor, on a short clip.',
    description:
      'Everything works — the limits are on how much, not on which features.',
    features: [
      { text: 'Clips up to 2 minutes, one project at a time', included: true },
      { text: '10 transcriptions and 10 face detections', included: true },
      { text: '10 caption styles, plus the style builder', included: true },
      { text: 'All 105 caption styles', included: false },
      { text: 'Export without the Essy mark', included: false },
      { text: '4K export', included: false },
    ],
  },
  {
    id: 'monthly',
    name: 'Monthly',
    price: 99,
    period: '/month',
    tagline: 'Everything, renewed each month.',
    description: 'No credits, no export caps, no per-minute billing. Cancel whenever.',
    features: [
      { text: 'Any length, as many projects as you like', included: true },
      { text: 'Unlimited transcription and face detection', included: true },
      { text: 'All 105 caption styles', included: true },
      { text: 'Clean exports, no watermark', included: true },
      { text: '4K export at source frame rate', included: true },
    ],
  },
  {
    id: 'yearly',
    name: 'Yearly',
    price: 999,
    period: '/year',
    tagline: 'The same, for ten months of the price.',
    description: 'Identical to Monthly. Two months free for paying up front.',
    features: [
      { text: 'Everything in Monthly', included: true },
      { text: 'Two months free against the monthly price', included: true },
      { text: 'Price locked for the year', included: true },
      { text: 'Every upcoming feature as it lands', included: true },
      { text: 'Renews yearly', included: true },
    ],
    featured: true,
    badge: 'Best value',
  },
]

/** What a paid plan will also unlock, stated as unbuilt. */
export const UPCOMING = [
  ['B-roll AI', 'Cutaways placed on the words that need them'],
  ['Hooks', 'Openers and titles pulled from your own strongest lines'],
  ['Tighten', 'Silence, filler words and repeated takes removed'],
  ['Dub', 'The same take in another language, timing preserved'],
  ['Music', 'A backing bed that ducks to the transcript'],
  ['Multi-cam', 'Camera switching that follows who is talking'],
  ['Thumbnail', 'The best frame, with your caption style already on it'],
  ['Premiere & After Effects', 'Captions as editable layers in your NLE'],
]

export function planById(id) {
  return PLANS.find((p) => p.id === id) ?? PLANS[0]
}

/** Rupees, grouped the Indian way. */
export function formatPrice(value) {
  return new Intl.NumberFormat('en-IN').format(value)
}
