import siteData from '../content/site.json';
import pricingData from '../content/pricing.json';
import reviewsData from '../content/reviews.json';
import specialsData from '../content/specials.json';

export const site = siteData;
export const pricing = pricingData;
export const reviews = reviewsData.reviews;

export type BookingKey = keyof typeof siteData.booking;

export function bookingUrl(key: BookingKey = 'all'): string {
  return siteData.booking[key];
}

export function reviewsFor(placement: string) {
  return reviews
    .filter((r) => r.placement === placement)
    .sort((a, b) => a.order - b.order);
}

// The four session types. `key` matches pricing.whichFits.byCategory; `cover`
// is the homepage tile photo (omit it and the tile renders as a plain panel).
export const sessionLinks = [
  { key: 'families', href: '/families', label: 'Families & Kids', cover: '/images/families/families-01-running-field.jpg' },
  { key: 'grads', href: '/grads', label: 'Grads', cover: '/images/grads/grads-11-plaid-shirt-golden-hour.jpg' },
  { key: 'maternity', href: '/maternity', label: 'Maternity', cover: '' },
  { key: 'couples', href: '/couples', label: 'Couples & Engagement', cover: '/images/couples/couples-02-laughing-golden-light.jpg' },
] as const;

// The Specials link only shows while specials.json has a special switched on.
export const navLinks = [
  ...(specialsData.active ? [{ href: '/specials', label: 'Specials' }] : []),
  ...sessionLinks.map(({ href, label }) => ({ href, label })),
  { href: '/locations', label: 'Locations' },
  { href: '/prepare', label: 'Prepare for Your Session' },
  { href: '/about', label: 'About' },
];
