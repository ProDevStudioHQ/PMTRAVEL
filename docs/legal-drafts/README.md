# Legal drafts — NOT PUBLISHED

These are drafts for a lawyer. They are **not** wired into the site, have no
routes, and must not be published until reviewed.

The SOP is explicit: GDPR applies to European buyers, Moroccan Law 09-08 and
CNDP obligations apply locally, and **no compliance claim goes on the website
until a lawyer has checked it.** Publishing an unreviewed privacy policy is
itself a compliance claim.

What these drafts are for is narrower and more useful: they record, accurately,
**what the site actually does with data**, so the lawyer is reviewing facts
rather than inventing them. Every statement below was checked against the code.

## What the site does today

- **No analytics.** No Google Analytics, no Plausible, no pixel, no tag
  manager. The CSP blocks every third-party origin, so one could not be added
  without a code change.
- **No cookies set by us.** The site sets no cookie of any kind. There is no
  session, no login, no consent banner, because there is nothing to consent to.
- **No third-party embeds.** No maps, no video, no fonts loaded from a third
  party at runtime — fonts are self-hosted from our own origin.
- **`localStorage` is not used.**
- **The only personal data collected** is what a buyer types into the RFQ form
  and any file they attach.

## What the RFQ collects and where it goes

| Data | Where it is stored | Notes |
| --- | --- | --- |
| Company, country, contact name, role, email | `rfq_requests` in PostgreSQL | Required |
| Destinations, dates, traveller numbers, programme type, brief | `rfq_requests` | Required |
| Optional steps 2 and 3 | `rfq_requests.optional_detail` | Optional |
| Attachments | Private S3-compatible storage | Never public; signed URLs only |
| A salted hash of the sender's IP | `rfq_requests.source_ip_hash` | The raw IP is never stored |
| User agent string | `rfq_requests.user_agent` | Truncated to 500 characters |

Two emails are sent per submission: an internal notification to the B2B
address, and an acknowledgement to the sender.

## Points the lawyer will need to rule on

1. **Retention.** Nothing currently deletes RFQ data. A retention period needs
   setting and implementing — this is the largest open item.
2. **Lawful basis** for processing trade enquiry data, and whether legitimate
   interest or contract applies.
3. **The IP hash.** We hash with a secret salt and never store the raw address.
   Whether that is personal data under GDPR is a question for the lawyer.
4. **Third-country transfer.** Data is processed in Morocco; buyers are in the
   EU and UK. This needs an answer.
5. **Subject access and erasure.** There is no mechanism yet. One is needed.
6. **The attachments.** A buyer's itinerary may contain their own client's
   personal data, which makes us a processor of someone else's data.
7. **Whether a cookie notice is needed at all**, given that we set none.

## Files

- `privacy.md` — draft privacy notice
- `terms.md` — draft terms of use
- `cookies.md` — draft cookie statement
