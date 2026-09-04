# Backlog

Things that matter but are not the current priority. Deliberately parked, not
forgotten. Nothing here blocks the portrait site or fall sessions.

Last updated: August 31, 2026

---

## Shopify store configuration — GDPR / CSRF

**Status:** parked until products exist and the store is actively selling.

An unsolicited email claims deficiencies in the store's GDPR and CSRF
configuration, affecting customer data handling, conversions, SEO and security.

⚠️ **Treat this email as spam or phishing until proven otherwise.** The pattern
— an unrequested security audit naming impressive-sounding acronyms, arriving at
a store with no products and no traffic — is a standard cold-marketing and
credential-harvesting template. Whoever sent it has no way to audit your store's
CSRF configuration from outside.

- Do not click links in it, and do not install any app it recommends
- Do not enter Shopify credentials on any page reached from it
- Delete it; if you want it checked later, start from your own Shopify admin

**The underlying concern is still legitimate and worth doing properly** — just on
your own initiative, when the store matters:

- Shopify handles CSRF protection natively on its own checkout and admin. This
  is not something a store owner configures.
- GDPR obligations are real if you sell to EU or UK customers. Shopify provides
  built-in customer privacy and cookie-consent settings.
- Review at the point you list your first products, not before.

**Trigger to unpark:** first Amish Country / landscape products created and
listed.

---

## Split Extended session

$275 for the first hour, $200 due before the second. See Changelog v1.3 for the
two candidate structures and the margin caution — price it above the
single-session Extended if it launches.

---

## Reschedule limit

If two or more clients request short-notice reschedules more than once each,
consider a stated one-reschedule policy. Not written into public copy now.

---

## Design & order service

Gallery wall design at a 25% design fee is roughly $100/hour, more than double
the session rate. Currently a footnote. Should become a named, priced service.
The two reserved Pinterest boards are its seed.

---

## Sales tax — decided

**Determination: no sales tax collected.** Sessions deliver digital files through
ShootProof only. No physical product is sold or shipped.

Recorded in `site.json` under `policies.salesTax`.

⚠️ One caution, stated once and then left alone: Ohio does tax certain
electronically delivered products, and I can't verify how the state treats
digitally delivered photographs. The reasoning above is sound and may well be
right. It's worth fifteen minutes with an accountant to confirm rather than
assume — and it becomes relevant the moment you sell anything physical, which
the print side of the business already does.

**Revisit if:** you ever bundle prints, albums or products with a session.
