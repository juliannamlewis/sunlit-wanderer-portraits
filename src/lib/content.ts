import siteData from '../content/site.json';
import pricingData from '../content/pricing.json';
import reviewsData from '../content/reviews.json';

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

export const navLinks = [
  { href: '/families', label: 'Families & Kids' },
  { href: '/seniors', label: 'High-School Seniors' },
  { href: '/maternity', label: 'Maternity' },
  { href: '/couples', label: 'Couples & Engagement' },
  { href: '/locations', label: 'Locations' },
  { href: '/prepare', label: 'Prepare for Your Session' },
  { href: '/about', label: 'About' },
];
