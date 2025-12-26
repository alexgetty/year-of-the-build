# Newsletter Platform Research - Working File

**Context:** YOTB needs automated newsletter sends triggered by git push. ~52 emails/year, scaling 100 → 1000 subscribers.

**Requirements:**
- API-first (GitHub Action triggered)
- MDX content as source
- Cost-sensitive indie project
- Good deliverability
- Low maintenance

---

## Research Progress

### Buttondown
- Free: 100 subscribers, $0
- Basic: 1,000 subscribers, $9/mo
- Standard: 5,000 subscribers, $29/mo
- Professional: 10,000 subscribers, $79/mo
- API access now available to everyone (2025 update)
- REST API - everything UI does, API can do
- Rate limit: 100 requests/hour on subscriber creation (grows with reputation)
- Strong deliverability claims - 62 pre-flight checks
- Plain-text forward templates help deliverability
- No API rate limit docs for email sending endpoint
- Source: buttondown.com/pricing, docs.buttondown.com

### Resend
- Free: 3,000 emails/month, 100/day limit
- Pro: $35/month for 100k emails
- Marketing emails: Based on contacts, not sends. Free: 1,000 contacts, unlimited sends
- Developer-first, excellent API
- Built for transactional, marketing is newer feature
- React Email integration
- Source: resend.com/pricing

### Loops
- Free: 1,000 contacts, 2,000 sends/month
- Paid: $49/month, 5,000 contacts, unlimited sends
- SaaS-focused
- Good automation (Loops = workflows)
- Node SDK, Supabase integration
- $1 per 2,000 emails for non-subscribed contacts
- Source: loops.so/pricing

### ConvertKit (Kit)
- Free: 10,000 subscribers but NO automation, 1 sequence only
- Creator: $39/month for 1,000 subscribers
- Creator Pro: $59/month for 1,000 subscribers
- API access on Creator plan
- RSS campaigns available
- Strong deliverability reputation
- Heavy for this use case
- Source: kit.com, landingi.com/convertkit/pricing

### Mailchimp
- Free: 500 contacts, 1,000 emails/month (with ads), NO automation (as of Dec 2023)
- Essentials: $13/month for 500 contacts, 5,000 sends
- Standard: $20/month for 500 contacts, 6,000 sends
- Transactional requires Standard+ plan
- Overage charges for exceeding limits
- Price increases noted 2023-2024
- Source: mailchimp.com/pricing

### Beehiiv
- Launch (Free): 2,500 subscribers, unlimited sends, API access included
- Scale: $43/month, up to 100k subscribers
- Max: $96/month
- Built for newsletter growth (referrals, ad network)
- API access on free tier
- Zapier/Make integrations
- April 2024 price increases
- Source: beehiiv.com/pricing

### Self-Hosted Options

#### Listmonk
- Cost: $0 software, only infrastructure costs
- Single binary, Go + Vue
- PostgreSQL required
- Can send millions of emails on minimal resources
- Requires: Docker, Nginx, domain, config management
- No vendor support - you manage everything
- Needs SMTP provider (AWS SES, etc)
- v3.0.0 released Feb 2024
- Not for non-technical users
- Source: listmonk.app, github.com/knadh/listmonk

#### Plunk
- Open source, built on AWS SES
- Self-host via Docker OR SaaS option
- Free: 3,000 emails/month
- SaaS: $0.001 per email
- Node.js/TypeScript
- Visual automation builder
- Source: useplunk.com, github.com/useplunk/plunk

### AWS SES Direct
- Cost: $0.10 per 1,000 emails
- Free tier: 3,000 emails/month for 12 months
- Virtual Deliverability Manager: +$0.07 per 1,000
- Dedicated IP: $24.95/month or $15/month + $0.08 per 1,000 (managed)
- "Not beginner-friendly"
- Significant setup complexity
- You manage deliverability, reputation
- Need to build everything else (templates, lists, tracking)
- Source: aws.amazon.com/ses/pricing

---

## Cost Modeling

### Scenario: 100 → 1,000 subscribers over 12 months, 52 weekly sends

#### Buttondown
- Months 1-X (under 100): $0
- After 100 subs: $9/month
- Estimated annual: ~$72-108 depending on when you hit 100
- Automations add-on if needed: +$9/month

#### Resend (Marketing)
- Free tier covers entire year easily
- 1,000 contacts = free
- Cost: $0

#### Loops
- Free tier: 1,000 contacts, 2,000 sends/month
- 52 sends/year to 1,000 = 52,000 total sends, but spread weekly
- Weekly send to 1,000 = 1,000 sends/week, 4,000/month max
- Exceeds free tier when list grows
- Would need $49/month plan eventually
- Estimated: $200-400/year

#### Beehiiv
- Free tier: 2,500 subscribers
- Covers entire first year
- Cost: $0

#### Listmonk + AWS SES
- Listmonk: $0
- Hosting (small VPS): $5-10/month
- AWS SES: ~$5/year for volume
- Total: $60-120/year + setup time

#### AWS SES alone
- Email cost: $5.20/year (52 weeks x 1,000 x $0.10/1000)
- But you build EVERYTHING else
- Time cost: significant

---

## Key Questions to Resolve

1. Does Buttondown API have email-sending rate limits? (docs unclear)
2. Is Resend's marketing email feature mature enough?
3. Beehiiv free tier - what's the catch for API automation?
4. How much time is Listmonk really?

---

## Synthesis Complete - Ready for Final Report
