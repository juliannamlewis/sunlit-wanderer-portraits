# Requirements Changelog — v1.7 → v1.8

The Sunlit Wanderer Portrait Site. Append to your existing changelog.

Last updated: November 9, 2026

---

## §Privacy and safety — published phone number changed

**Decided by Julie, November 9, 2026.** The only published phone number
changes from the Google Voice number **(513) 318-7278** to
**(937) 719-8683**.

- Single source: `src/content/site.json > contact` (`phoneDisplay`,
  `phoneSms`, `phoneTel`). The header, homepage hero and closing section,
  mobile menu, footer and the LocalBusiness structured data all read from it.
- Both chatbots were regenerated from it: `functions/api/_system-prompt.js`
  (text chat) and `public/agent-knowledge/*.md` (voice, auto-refreshed by
  Retell every 24 hours).
- The rule itself is unchanged: one number only, Messenger stays the primary
  contact.
- Not updated: old test reports in `chatbot-testing/` keep the old number as
  a record of what was tested at the time.
