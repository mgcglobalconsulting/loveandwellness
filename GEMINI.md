# GEMINI.md — MASTER BUILD PROMPT
## Love & Wellness Coaching — Full-Stack Rebuild
### Orchestrated by: Claude (Antigravity CLI) | Front-End Agent: Gemini Pro 2/3 | Back-End Agent: Claude/Antigravity | QA Agent: Claude Verifier

---

## ORCHESTRATION STRUCTURE

```
CLAUDE (ANTIGRAVITY) — MASTER ORCHESTRATOR
├── AGENT 1: Gemini Pro 2/3          → Full Front-End (UI/UX, design system, all pages, animations)
├── AGENT 2: Claude Antigravity      → Full Back-End (Supabase, APIs, auth, payments, webhooks)
├── AGENT 3: Claude Verifier         → QA, security audit, integration testing, final sign-off
└── MASTER CLAUDE                    → Final review, deployment prep, delivers completed site to Mark
```

**Completion Protocol:** Each agent reports back to Master Claude when their domain is complete.
Master Claude cross-checks all integrations, runs final QA sweep, then delivers:
> "SITE COMPLETE — Love & Wellness Coaching is live-ready. All systems verified."

---

## PROJECT OVERVIEW

**Client:** Dr. Patricia George
**Brand:** Love & Wellness Coaching
**Current Site:** www.loveandwellnesscoaching.com (scrapped for reference — rebuilding from scratch)
**New Site Destination:** `/Users/markcartwright/Desktop/loveandwellnesscoaching/`
**Framework:** Next.js 14+ (App Router)
**Database/Auth/Storage:** Supabase
**Payments:** Stripe
**Styling:** Tailwind CSS + Framer Motion
**Image AI:** Canva Pro + Kling AI (https://kling.ai) for video/visual asset generation
**Deployment Target:** Vercel or Netlify

---

## BRAND ASSETS — USE THESE FILES

### Logo Files (PRIMARY — use `official-logo.jpeg` as default logo):
```
/Desktop/loveandwellnesscoaching/official-logo.jpeg                   ← PRIMARY LOGO
/Desktop/loveandwellnesscoaching/love-and-wellness-assets/loveandwellness-logo-shinny.jpeg
/Desktop/loveandwellnesscoaching/love-and-wellness-assets/love and wellness-low-shine.jpeg
/Desktop/loveandwellnesscoaching/love-and-wellness-assets/love-wellness-butterfly.jpeg
/Desktop/loveandwellnesscoaching/love-and-wellness-assets/loveandwellness-butterfly-climb.jpeg
```

### Test Logo Variants (use for comparison, select best):
```
/Desktop/loveandwellness-test-logos/love-and-wellness-option-1.png
/Desktop/loveandwellness-test-logos/love-and-wellness-quartz.jpeg
/Desktop/loveandwellness-test-logos/loveandwellness-clean.jpeg
/Desktop/loveandwellness-test-logos/loveandwellness-details.jpeg
/Desktop/loveandwellness-test-logos/loveandwellness-ring.jpeg
/Desktop/loveandwellness-test-logos/loveandwellness-rosegold-ring.jpeg
```

### Dr. Patricia George Photography (USE ACROSS SITE):
```
/Desktop/images-patricia/0002_patricia_lindon_jax_photography_ md 7 21 2022_.jpg
/Desktop/images-patricia/0003_patricia_lindon_jax_photography_ md 7 21 2022_.jpg
/Desktop/images-patricia/0007_patricia_lindon_jax_photography_ md 7 21 2022_.jpg
/Desktop/images-patricia/0012-lindonpatrica-jax-photography.jpg
/Desktop/images-patricia/0013patricia-2021.jpg
/Desktop/images-patricia/0021patricia-2021.jpg
/Desktop/images-patricia/0037patricia-2021.jpg
/Desktop/images-patricia/0043patricia-2021.jpg
/Desktop/images-patricia/0069-lindonpatrica-jax-photography.jpg
/Desktop/images-patricia/0085patricia-2021.jpg
/Desktop/images-patricia/0089patricia-2021.jpg
/Desktop/images-patricia/0106patricia-2021.jpg
/Desktop/images-patricia/0155-03 05 2023 lindon patricia wedding -jax-photography.jpg
/Desktop/images-patricia/0230-lindonpatrica-jax-photography.jpg
/Desktop/images-patricia/0243-lindonpatrica-jax-photography.jpg
/Desktop/images-patricia/0276-03 05 2023 lindon patricia wedding -jax-photography.jpg
/Desktop/images-patricia/0301-lindonpatrica-jax-photography.jpg
/Desktop/images-patricia/0371-03 05 2023 lindon patricia wedding -jax-photography.jpg
```

### Site CTA Images:
```
/Desktop/loveandwellnesscoaching/apply-for-coaching.jpeg
/Desktop/loveandwellnesscoaching/you-deserve-love-like.jpeg
/Desktop/loveandwellnesscoaching/you-too-can-have-love.jpeg
```

**Image Optimization Instructions:**
- Run all photos through `next/image` with `priority` on above-fold images
- Compress and convert to `.webp` format on build
- Use Canva Pro to color-grade Patricia's photos to match the new brand palette
- Use Kling AI (https://kling.ai — Kling 3.0) to generate cinematic hero video loop, animated love/wellness visual backgrounds, and promo clips for webinar landing pages

---

## DESIGN SYSTEM — GEMINI PRO 2/3 INSTRUCTIONS

### Aesthetic Direction
> **"Restoring. Romantic. Sacred. Elevated."**
> Think: soft candlelight warmth + luxury spa + modern love editorial. The site should feel like walking into a sanctuary — safe, beautiful, and transformative. Not generic wellness. This is premium love coaching for serious transformation.

### Color Palette (Elevated from Original)
```css
--primary:        #6B2D6B    /* Deep Plum — warmth + royalty */
--primary-light:  #9B4F9B    /* Lavender Plum */
--accent-gold:    #D4AF6A    /* Warm Champagne Gold */
--accent-rose:    #E8A0A0    /* Blush Rose */
--teal-deep:      #2C5F6A    /* Deep Teal — trust + calm */
--teal-light:     #4A8F9E    /* Sky Teal */
--bg-cream:       #FAF6F1    /* Warm Cream — main background */
--bg-dark:        #0D0A14    /* Deep Midnight — hero/dark sections */
--text-primary:   #1A1025    /* Near-black with purple tint */
--text-light:     #F5F0FF    /* Off-white for dark sections */
--glass:          rgba(255,255,255,0.08)  /* Glassmorphism panels */
```

### Typography
```
Headlines:    'Cormorant Garamond' — elegant, editorial serif (Google Fonts)
Subheadings:  'Playfair Display' — romantic serif
Body:         'Inter' — clean, readable
Accent/CTA:   'Montserrat' — strong, modern
Script:       'Great Vibes' — for romantic accent text/pull quotes
```

### Visual Design Principles
1. **Interactive Hero** — Animated particle background (rose petals or soft bokeh light orbs) using tsParticles or custom canvas. Slow cinematic parallax on scroll.
2. **Glassmorphism Cards** — All offer/service cards use frosted glass effect with soft rose/purple glow borders
3. **Gradient Overlays** — Deep plum-to-midnight gradients on dark sections; cream-to-blush on light sections
4. **Micro-animations** — Framer Motion: fade-in on scroll, staggered card reveals, hover lifts on CTA buttons
5. **Video Background** — Hero section uses a looping Kling AI-generated video (soft romantic visuals — rose petals, gentle light, couple silhouettes) muted autoplay
6. **Photography Treatment** — Patricia's photos displayed in elegant floating frames with subtle drop shadows and warm color overlays

---

## SITE ARCHITECTURE — ALL PAGES

### Public Pages
```
/                           → Home (Hero + About snippet + Services preview + Funnel CTA)
/about                      → Dr. Patricia George full story + credentials + mission
/services                   → All offerings overview
/webinar                    → Daily Webinar Registration Page (40–90 min)
/masterclass                → Friday Masterclass Party Page (7–10 PM weekly)
/apply                      → VIP Day Application Form (qualifying only)
/vip                        → VIP Day offer page (high-ticket, visible after application approval)
/group-coaching             → High-ticket group offer page
/shop                       → Wellness products + branded merch + stacked offer items
/testimonials               → Social proof full page
/blog                       → Content hub / thought leadership
/donate                     → Donation page (Stripe)
/privacy                    → Privacy policy
/terms                      → Terms of service
```

### Auth Pages
```
/login                      → Google Sign-In + Email/Password
/signup                     → Register + Google OAuth
/dashboard                  → Member portal (post-login)
/dashboard/webinars         → Registered webinars
/dashboard/purchases        → Order history
/dashboard/profile          → Profile management
```

### Admin Pages (Protected — Dr. Patricia only)
```
/admin                      → Admin dashboard overview
/admin/applications         → View/manage VIP applications + qualify/disqualify
/admin/clients              → Client management
/admin/webinars             → Webinar scheduling + management
/admin/orders               → Shop orders
/admin/donations            → Donation records
/admin/content              → Blog/content management
/admin/analytics            → Site analytics + funnel metrics
```

---

## THE FUNNEL ARCHITECTURE (Russell Brunson Framework)

```
STEP 1: OPT-IN PAGE
  → Headline: "Discover The Secret to Attracting Lasting Love — Free Training"
  → Email capture only (name + email)
  → Immediate redirect to: Thank You / Webinar Registration page
  → Lead goes into Supabase leads table + email automation triggers

STEP 2: DAILY WEBINAR (40–90 minutes — automated/evergreen)
  → Runs: Every day on-demand (evergreen replay) OR live scheduled
  → Platform: Embedded via Zoom Webinar embed OR custom video player
  → Structure (Perfect Webinar Framework — Russell Brunson):
      - Hook (0–5 min): "Before we start, let me tell you about [client result]..."
      - Story (5–20 min): Dr. Patricia's transformation story + client results
      - Content (20–50 min): The ONE big secret / 3 secrets framework
      - Stack + Close (50–80 min): Present the offer, stack the value
      - Q&A / Scarcity close (80–90 min)
  → NO free gifts during webinar — all value is inside paid offer
  → End CTA: "Apply now for our Friday Masterclass Party — limited spots"

STEP 3: FRIDAY MASTERCLASS PARTY PAGE
  → "The Love & Wellness Masterclass Experience — Every Friday 7–10 PM"
  → One-to-many: max 20 people per session
  → Positioned as: "This is NOT a free webinar. This is an exclusive experience."
  → Registration requires short pre-qualification (3 questions)
  → After registration: confirmation page with prep instructions
  → During masterclass: Dr. Patricia presents, builds rapport, addresses objections
  → Closes to: VIP Day Application OR High-Ticket Group Coaching Offer

STEP 4: APPLICATION PAGE (/apply)
  → Headline: "Apply to Work Directly with Dr. Patricia George"
  → Copy: "This is not for everyone. We only work with clients who are serious about transformation and ready to invest in themselves."
  → Form fields:
      - Full Name
      - Email + Phone
      - Current relationship status
      - "What is your biggest challenge in love and relationships right now?" (textarea)
      - "What have you already tried?" (textarea)
      - "On a scale of 1–10, how committed are you to changing this?" (dropdown)
      - "What is your investment comfort level?" (range: $500–$500+, $1,000–$2,500, $2,500–$5,000, $5,000+)
      - "How did you hear about Dr. Patricia?" (source tracking)
      - [SUBMIT APPLICATION] button
  → On submit: Goes to Supabase `applications` table with status: "pending"
  → Dr. Patricia reviews in admin dashboard, marks: approved / not_a_fit / follow_up
  → Approved: Automated email with calendar booking link (Calendly or Cal.com)
  → Not a fit: Graceful redirect email with resources

STEP 5: VIP / HIGH-TICKET OFFER PAGE (unlocked after approval OR direct link)
  → VIP Day: 1-on-1 intensive with Dr. Patricia (full day)
  → High-Ticket Group: Small group program (8–12 week)
  → Stacked Offer displayed visually (value stack):
      ✓ Core coaching program
      ✓ Private 1-on-1 session(s)
      ✓ Access to member portal + resources
      ✓ Wellness gift package (branded merch/products from shop — Alibaba sourced)
      ✓ Lifetime community access
      ✓ Bonus: Priority access to future masterclasses
  → "Buy Now" / "Enroll Now" → Stripe checkout
  → Countdown timer for urgency (if applicable)
```

---

## SUPABASE DATABASE SCHEMA

### Tables

```sql
-- USERS (extends Supabase auth.users)
profiles (
  id uuid references auth.users primary key,
  full_name text,
  phone text,
  avatar_url text,
  role text default 'member',  -- member | admin
  created_at timestamptz default now()
)

-- LEADS (opt-in captures)
leads (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  full_name text,
  source text,  -- webinar | masterclass | organic | referral
  utm_source text,
  utm_campaign text,
  created_at timestamptz default now(),
  converted boolean default false
)

-- APPLICATIONS (VIP / high-ticket qualification)
applications (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  relationship_status text,
  biggest_challenge text,
  already_tried text,
  commitment_level int,  -- 1-10
  investment_comfort text,
  referral_source text,
  status text default 'pending',  -- pending | approved | not_a_fit | follow_up
  admin_notes text,
  created_at timestamptz default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references profiles(id)
)

-- WEBINARS
webinars (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  webinar_type text,  -- daily | masterclass_friday
  scheduled_at timestamptz,
  duration_minutes int default 60,
  max_attendees int,
  registration_url text,
  replay_url text,
  is_active boolean default true,
  created_at timestamptz default now()
)

-- WEBINAR REGISTRATIONS
webinar_registrations (
  id uuid primary key default gen_random_uuid(),
  webinar_id uuid references webinars(id),
  user_id uuid references profiles(id),
  email text not null,
  full_name text,
  registered_at timestamptz default now(),
  attended boolean default false,
  source text
)

-- PRODUCTS (shop + stacked offer items)
products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  price decimal(10,2) not null,
  compare_price decimal(10,2),
  images text[],  -- array of image URLs
  category text,  -- merch | wellness | digital | gift
  source text,    -- alibaba | custom | digital
  alibaba_product_id text,  -- for Alibaba-sourced items
  stock_quantity int,
  is_active boolean default true,
  is_offer_stacked boolean default false,  -- included in VIP stacked offer
  created_at timestamptz default now()
)

-- ORDERS
orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id),
  email text not null,
  stripe_payment_intent_id text unique,
  stripe_session_id text,
  total_amount decimal(10,2) not null,
  status text default 'pending',  -- pending | paid | fulfilled | refunded
  order_type text,  -- shop | vip_day | group_coaching | webinar
  items jsonb,  -- snapshot of order items
  shipping_address jsonb,
  created_at timestamptz default now()
)

-- DONATIONS
donations (
  id uuid primary key default gen_random_uuid(),
  donor_email text,
  donor_name text,
  amount decimal(10,2) not null,
  stripe_payment_intent_id text,
  message text,
  is_anonymous boolean default false,
  created_at timestamptz default now()
)

-- BLOG POSTS
posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,  -- MDX/rich text
  cover_image text,
  author_id uuid references profiles(id),
  published boolean default false,
  published_at timestamptz,
  tags text[],
  created_at timestamptz default now()
)
```

### Row Level Security (RLS) Policies
- `profiles`: users read own, admins read all
- `applications`: insert by anyone, read/update by admin only
- `webinar_registrations`: users manage own, admins read all
- `orders`: users read own, admins read all
- `products`: public read if active, admin full access
- `posts`: public read if published, admin full access
- `leads`: insert only for public, admin read all
- `donations`: insert for public, admin read all

---

## AUTHENTICATION — SUPABASE AUTH

```typescript
// Providers to configure in Supabase Dashboard:
// 1. Google OAuth (Google Sign-In)
// 2. Email + Password (magic link optional)

// Auth flow:
// - /login page: Google button + email form
// - On success: redirect to /dashboard
// - New users: auto-create profile in profiles table via Supabase trigger
// - Admin role: set manually in profiles.role = 'admin' for Dr. Patricia
// - Protected routes: middleware checks session, redirects to /login if none
```

---

## PAYMENTS — STRIPE INTEGRATION

### Products / Price IDs to create in Stripe:
```
1. VIP Day (1-on-1 Intensive)     → price_vip_day         (suggest: $3,000–$5,000)
2. High-Ticket Group Coaching     → price_group_coaching   (suggest: $1,500–$2,500)
3. Masterclass Party Seat         → price_masterclass      (suggest: $197–$497)
4. Digital Products / Resources   → price_digital_*
5. Shop Products                  → dynamic from products table
6. Donation                       → Stripe Payment Element (custom amount)
```

### Stripe Features to Implement:
- Stripe Checkout (hosted) for main offers
- Stripe Payment Element (embedded) for shop
- Webhooks: `payment_intent.succeeded`, `checkout.session.completed`
- Webhook handler updates orders table status in Supabase
- Post-payment: redirect to success page + trigger confirmation email
- Stripe Customer Portal for managing subscriptions (if recurring added)

---

## SHOP — PRODUCT SOURCING & ALIBABA INTEGRATION

### Answering the Alibaba Question:
**YES — Alibaba/overstock products CAN be connected.** Here's how:

**Option A: Manual Curated Drop-Shipping (Recommended for VIP/Stacked Offers)**
- Source: Alibaba.com (wholesale) or 1688.com for custom branded items
- Products for stacked offers: custom branded T-shirts, hats, journals, candles, crystals, self-care gift sets
- Workflow: Order in bulk, store inventory, ship as part of VIP package
- In the shop: display as "Wellness Shop" products with markup
- Stacked into VIP Day offer as physical gift box (increases perceived value dramatically)

**Option B: Shopify/Printful Integration (for branded merch)**
- Printful or Printify API for on-demand custom printed items (shirts, mugs, hats with Love & Wellness branding)
- Zero inventory risk
- Integrate Printful orders via webhook after Stripe payment

**Option C: API Integration (advanced)**
- Alibaba Open Platform API for live product catalog
- Only recommended if volume justifies development cost

**Recommended Stack Gift Box for VIP Clients ($500+ perceived value addition):**
```
✓ Love & Wellness branded journal
✓ Custom candle (rose + lavender)
✓ Branded hat or T-shirt
✓ Crystal/wellness stone set
✓ Handwritten welcome card from Dr. Patricia
✓ 30-day devotional or affirmation cards (digital + print)
```

---

## EMAIL AUTOMATION (via Supabase Edge Functions + Resend or SendGrid)

### Email Sequences to Build:

**Sequence 1: Webinar Registrant**
- Immediately: "You're registered! Here's what to expect..."
- 1 hour before: Reminder with link
- After: Replay link + CTA to apply for masterclass

**Sequence 2: Masterclass Registrant**
- Immediately: Confirmation + what to prepare
- Day before: Reminder + hype email
- After: Application CTA + testimonials

**Sequence 3: Application Submitted**
- Immediately: "We received your application. Dr. Patricia reviews personally..."
- Approved: Calendar booking link
- Not a fit: Graceful decline + redirect to webinar/blog

**Sequence 4: Post-Purchase (VIP Day)**
- Immediately: Welcome + onboarding instructions
- 3 days before session: Prep worksheet
- After session: Follow-up + next steps

**Sequence 5: Newsletter (ongoing)**
- Weekly: Love & wellness tips, testimonials, upcoming events

---

## WEBINAR & MASTERCLASS SYSTEM

### Daily Webinar (Evergreen/Automated):
```
- Registration page at /webinar
- Webinar runs via: EverWebinar embed OR Zoom Webinar embed
- "Next session starts in: [countdown timer]" — sessions start every 2 hours 9AM–9PM
- On registration: save to webinar_registrations table, trigger email sequence
- Post-webinar CTA: Apply for Friday Masterclass Party
```

### Friday Masterclass Party (7–10 PM EST, Weekly):
```
- Registration page at /masterclass
- Limited to 20 seats per session — show "X seats remaining" live counter
- 3 pre-qualification questions gating registration
- Uses Zoom/Google Meet (live)
- Session agenda displayed: 7:00 Welcome | 7:15 Content | 9:00 Offer Presentation | 9:30 Q&A | 10:00 Close
- After close: redirect to /apply (application form)
```

### Language/Positioning for Webinar & Masterclass (Russell Brunson-Aligned):
```
Webinar:
  - "I'm not here to give you a free cheat sheet. I'm here to show you a transformation."
  - "Everything I'm going to share today is what I personally used and what my clients pay thousands to access."
  - "At the end of this training, I'm going to make you a very specific offer — and it's only for people who are serious."

Masterclass:
  - "You were selected for this experience. Not everyone who sees my webinar gets an invitation here."
  - "Tonight is not a presentation — it's a room of people who have decided they're ready."
  - "After tonight, I'm going to open ONE way to work with me directly. The application opens at 9 PM."
  - "I want to make sure we're a perfect fit before I accept anyone into this program."
```

---

## FULL PAGE SPECIFICATIONS

### HOME PAGE (/)
```
Section 1: HERO
  - Full-screen height
  - Background: Kling AI cinematic video loop (muted autoplay) OR animated particle/bokeh canvas
  - Overlay: Deep plum-to-midnight gradient (60% opacity)
  - Logo: centered or top-left
  - Headline: "The Universal Language is LOVE" (Cormorant Garamond, large, white)
  - Subheadline: "Dr. Patricia George guides you toward the love, wholeness, and relationship you were born to experience"
  - CTA Primary: [JOIN THE FREE TRAINING] → /webinar
  - CTA Secondary: [APPLY FOR COACHING] → /apply
  - Animated scroll indicator

Section 2: TRUST BAR
  - "As featured in..." logo strip (add when available)
  - OR: 3 stat counters: "200+ Lives Transformed" | "15+ Years Experience" | "4.9★ Average Rating"

Section 3: ABOUT SNIPPET
  - Split layout: Patricia photo (left, floating frame) | Text (right)
  - Dr. Patricia's story — brief (3 sentences) + Read Full Story link
  - Warm, cream background section

Section 4: SERVICES OVERVIEW (3 cards)
  - Card 1: FIND LOVE — for singles seeking their person
  - Card 2: STRENGTHEN YOUR RELATIONSHIP — for couples
  - Card 3: LOVE YOURSELF FIRST — wellness + self-love coaching
  - Each card: icon, headline, 2-line description, [LEARN MORE] button
  - Glassmorphism card design, plum/teal gradient border glow on hover

Section 5: FUNNEL CTA — WEBINAR
  - Dark section (midnight background)
  - Headline: "Join Our Free Daily Love Training"
  - Subhead: "40–90 minutes that could change the trajectory of your love life forever"
  - [REGISTER NOW — FREE] button → /webinar
  - Next session countdown timer

Section 6: FRIDAY MASTERCLASS CALLOUT
  - Elegant, intimate section
  - "Every Friday, 7–10 PM — The Love & Wellness Masterclass Experience"
  - "Only 20 seats. By qualification only."
  - [LEARN MORE] → /masterclass

Section 7: TESTIMONIALS CAROUSEL
  - Auto-playing carousel with pause on hover
  - Photo + name + result + star rating
  - Soft rose background

Section 8: SHOP PREVIEW
  - "The Love & Wellness Collection"
  - 4 featured products in grid
  - [VIEW ALL] → /shop

Section 9: NEWSLETTER CAPTURE
  - "Weekly Love Letters from Dr. Patricia"
  - Email input + [SUBSCRIBE] button
  - Saves to leads table in Supabase

Section 10: FOOTER
  - Logo + tagline
  - Navigation links
  - Social: Instagram | Facebook | LinkedIn
  - Donate button (Stripe)
  - Privacy Policy | Terms
```

### WEBINAR PAGE (/webinar)
```
  - Hero: Registration form above the fold
  - Headline: "FREE Training: The 3 Secrets to Attracting Lasting Love"
  - Subhead: "A 40–90 minute live experience with Dr. Patricia George"
  - Countdown to next session
  - What You'll Discover (3 bullets — tease, don't reveal)
  - About Dr. Patricia (photo + credentials)
  - Testimonials (2–3 short)
  - Registration form: Name + Email + [SAVE MY SEAT]
  - NOTE: NO free gift mentioned. The value IS the training.
  - After registration: thank you page with webinar link + add to calendar
```

### MASTERCLASS PAGE (/masterclass)
```
  - Positioned as exclusive, not free
  - Headline: "The Love & Wellness Masterclass Experience"
  - Subhead: "Every Friday, 7–10 PM EST — Limited to 20 Participants"
  - Description: "This is not a webinar. This is a curated evening experience for women ready to transform their love life with a room full of like-minded women and direct access to Dr. Patricia."
  - 3-question pre-qual before showing registration form:
    Q1: "Are you currently single, dating, or in a relationship?"
    Q2: "What is your primary goal for your love life right now?"
    Q3: "Are you open to investing in yourself if you find this is the right fit?"
  - If answers qualify: show full registration form
  - Seat counter: "14 of 20 seats remaining"
  - Schedule section: What happens each hour
  - Price: [Show price if paid, or position as invitation-only]
  - CTA: [REQUEST YOUR SEAT]
```

### APPLICATION PAGE (/apply)
```
  - No noise. Clean, serious, intimate.
  - Headline: "Apply to Work with Dr. Patricia George"
  - Intro copy:
    "This is not an open enrollment program. Dr. Patricia George personally reviews every application and only accepts clients she knows she can help transform. If you're accepted, you'll receive a personal call from our team to discuss next steps. If we're not the right fit, we'll point you toward the best resources for where you are right now. Either way — applying takes courage, and we honor that."
  - Full qualifying form (see Supabase schema above)
  - Submit → Supabase applications table + email automation
  - Thank you page: "Your application is in Dr. Patricia's hands. Expect to hear within 48–72 hours."
```

### SHOP PAGE (/shop)
```
  - "The Love & Wellness Collection"
  - Category filters: All | Wellness | Merch | Gifts | Digital
  - Product grid with:
    - Product image
    - Name
    - Price (+ compare price if on sale)
    - [ADD TO CART] or [BUY NOW]
  - Cart: Supabase session + Stripe checkout
  - "VIP Bundle" section: show stacked gift box (high-value bundle)
  - Alibaba-sourced items labeled as curated wellness products (no need to expose supplier)
```

### ADMIN DASHBOARD (/admin)
```
  - Protected by role = 'admin' check
  - Overview cards: New Applications | Registrations Today | Revenue This Month | Pending Orders
  - Applications table: view all, change status, add notes, send approval email
  - Clients list: all paying clients + session history
  - Webinar manager: create/edit webinar sessions, view registrants
  - Shop manager: add/edit products, view orders
  - Analytics: funnel conversion rates (opt-in → webinar → masterclass → apply → purchase)
  - Content editor: blog posts (WYSIWYG or MDX editor)
```

---

## TECHNOLOGY STACK — COMPLETE

```
Frontend:
  - Next.js 14+ (App Router, TypeScript)
  - Tailwind CSS v3
  - Framer Motion (animations)
  - tsParticles or custom canvas (hero interactive background)
  - Shadcn/ui (component primitives)
  - React Hook Form + Zod (form validation)
  - next/image (optimized images, webp conversion)
  - Lucide React (icons)

Backend:
  - Supabase (PostgreSQL database)
  - Supabase Auth (Google OAuth + email/password)
  - Supabase Storage (image/asset hosting)
  - Supabase Edge Functions (serverless — email triggers, webhook handlers)
  - Supabase Realtime (seat counter on masterclass page)
  - Row Level Security (RLS) on all tables

Payments:
  - Stripe (Checkout + Payment Element + Webhooks)
  - stripe npm package (server-side)
  - @stripe/stripe-js (client-side)

Email:
  - Resend (transactional email) OR SendGrid
  - React Email (email templates)

External Integrations:
  - Calendly or Cal.com embed (booking after application approval)
  - Zoom Webinar embed (or EverWebinar for evergreen)
  - Google Analytics 4 (funnel tracking)
  - Facebook Pixel (retargeting)
  - Printful API (on-demand merch fulfillment)

Dev Tools:
  - TypeScript
  - ESLint + Prettier
  - Husky (git hooks)
  - Vercel (deployment)

Image/Video Assets:
  - Canva Pro (photo editing + brand graphics)
  - Kling AI / Kling 3.0 at https://kling.ai (video generation for hero, webinar promos)
  - next/image with sharp (auto optimization to webp)
```

---

## ENVIRONMENT VARIABLES (.env.local)

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=

# Stripe Price IDs
STRIPE_PRICE_VIP_DAY=
STRIPE_PRICE_GROUP_COACHING=
STRIPE_PRICE_MASTERCLASS=

# Email (Resend)
RESEND_API_KEY=
FROM_EMAIL=patricia@loveandwellnesscoaching.com

# Google OAuth (configured in Supabase Dashboard)
# No env vars needed — handled by Supabase

# App
NEXT_PUBLIC_SITE_URL=https://www.loveandwellnesscoaching.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=

# Calendly
NEXT_PUBLIC_CALENDLY_URL=

# Printful (if using)
PRINTFUL_API_KEY=
```

---

## FILE STRUCTURE

```
/loveandwellnesscoaching/
├── app/
│   ├── (public)/
│   │   ├── page.tsx                    ← Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── webinar/page.tsx
│   │   ├── masterclass/page.tsx
│   │   ├── apply/page.tsx
│   │   ├── vip/page.tsx
│   │   ├── group-coaching/page.tsx
│   │   ├── shop/page.tsx
│   │   ├── shop/[id]/page.tsx
│   │   ├── blog/page.tsx
│   │   ├── blog/[slug]/page.tsx
│   │   ├── donate/page.tsx
│   │   ├── testimonials/page.tsx
│   │   └── (auth)/
│   │       ├── login/page.tsx
│   │       └── signup/page.tsx
│   ├── (protected)/
│   │   ├── dashboard/page.tsx
│   │   ├── dashboard/webinars/page.tsx
│   │   ├── dashboard/purchases/page.tsx
│   │   └── dashboard/profile/page.tsx
│   ├── (admin)/
│   │   ├── admin/page.tsx
│   │   ├── admin/applications/page.tsx
│   │   ├── admin/clients/page.tsx
│   │   ├── admin/webinars/page.tsx
│   │   ├── admin/orders/page.tsx
│   │   ├── admin/content/page.tsx
│   │   └── admin/analytics/page.tsx
│   ├── api/
│   │   ├── stripe/checkout/route.ts
│   │   ├── stripe/webhook/route.ts
│   │   ├── stripe/donate/route.ts
│   │   ├── applications/route.ts
│   │   ├── leads/route.ts
│   │   └── webinars/register/route.ts
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/                             ← shadcn/ui components
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── MobileMenu.tsx
│   ├── home/
│   │   ├── HeroSection.tsx             ← Video/particle background hero
│   │   ├── ServicesPreview.tsx
│   │   ├── WebinarCTA.tsx
│   │   ├── MasterclassCTA.tsx
│   │   ├── TestimonialsCarousel.tsx
│   │   └── NewsletterCapture.tsx
│   ├── webinar/
│   │   ├── WebinarRegisterForm.tsx
│   │   └── CountdownTimer.tsx
│   ├── masterclass/
│   │   ├── PreQualForm.tsx
│   │   ├── MasterclassRegisterForm.tsx
│   │   └── SeatCounter.tsx             ← Supabase Realtime
│   ├── apply/
│   │   └── ApplicationForm.tsx
│   ├── shop/
│   │   ├── ProductGrid.tsx
│   │   ├── ProductCard.tsx
│   │   └── Cart.tsx
│   ├── auth/
│   │   ├── GoogleSignInButton.tsx
│   │   └── AuthForm.tsx
│   └── admin/
│       ├── ApplicationsTable.tsx
│       ├── AdminSidebar.tsx
│       └── AnalyticsDashboard.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   ├── server.ts
│   │   └── middleware.ts
│   ├── stripe/
│   │   ├── client.ts
│   │   └── webhooks.ts
│   ├── email/
│   │   ├── resend.ts
│   │   └── templates/
│   └── utils.ts
├── public/
│   ├── images/
│   │   ├── patricia/                   ← All Patricia photos (optimized webp)
│   │   ├── logos/                      ← All logo variants
│   │   └── assets/                     ← Brand graphics, Kling AI exports
│   └── fonts/
├── styles/
│   └── globals.css
├── middleware.ts                        ← Supabase auth session + route protection
├── .env.local
├── next.config.js
├── tailwind.config.js
├── package.json
└── GEMINI.md                           ← This file
```

---

## AGENT TASK ASSIGNMENTS

### AGENT 1 — GEMINI PRO 2/3 (FRONT-END)
**Your scope:** Everything the user sees and interacts with.

Tasks:
1. Set up Next.js 14+ project with TypeScript, Tailwind CSS, Framer Motion
2. Implement the full design system (colors, typography, components) per specs above
3. Build all public pages with the specified sections
4. Create the interactive hero (tsParticles bokeh/rose petal effect + video background layer)
5. Build all forms (UI layer only — forms submit to API routes built by Agent 2)
6. Implement responsive design (mobile-first, breakpoints: sm/md/lg/xl)
7. Build the animated countdown timers for webinar sessions
8. Implement Supabase Realtime seat counter on /masterclass
9. Optimize all Patricia images: copy from `/Desktop/images-patricia/` and `/Desktop/loveandwellnesscoaching/` to `/public/images/`, convert to webp, use next/image
10. Build the shop product grid and cart UI
11. Build the admin dashboard UI (tables, charts, sidebar)
12. Build the member dashboard UI
13. Implement Google Sign-In button and auth UI pages

**Report to Master Claude when:** All pages render, all forms are wired to API routes, responsive design is confirmed on mobile/tablet/desktop, images are optimized and loading correctly.

---

### AGENT 2 — CLAUDE ANTIGRAVITY (BACK-END)
**Your scope:** Everything that runs on the server.

Tasks:
1. Initialize Supabase project, create all tables per schema above with RLS policies
2. Configure Supabase Auth: Google OAuth + email/password providers
3. Create Supabase trigger: auto-create profile row on new user signup
4. Build Next.js middleware for route protection (dashboard requires auth, admin requires role=admin)
5. Build all API routes: `/api/stripe/checkout`, `/api/stripe/webhook`, `/api/stripe/donate`, `/api/applications`, `/api/leads`, `/api/webinars/register`
6. Integrate Stripe: create products/prices, implement checkout sessions, handle webhooks
7. Implement post-payment webhook: update orders table status to 'paid', trigger confirmation email
8. Set up Resend email client, build all email sequences (5 sequences listed above) using React Email templates
9. Build Supabase Edge Function for email triggers (fires on new lead, new application, new order)
10. Build admin API routes for application status updates (approve/reject + trigger email)
11. Set up Supabase Storage bucket for images with proper public access policies
12. Implement shop: product CRUD endpoints, Printful webhook handler (if merch enabled)
13. Build analytics endpoint: aggregate funnel metrics (leads → webinar regs → masterclass regs → applications → orders)

**Report to Master Claude when:** All tables created with RLS, all API routes functional (tested with Postman or curl), Stripe payments complete end-to-end, emails sending correctly, auth flow works for Google + email, admin can approve/reject applications.

---

### AGENT 3 — CLAUDE VERIFIER (QA + SECURITY)
**Your scope:** Everything else fails without your sign-off.

Tasks:
1. Security audit: check for exposed API keys, unprotected routes, SQL injection risks
2. Verify all RLS policies are correctly restricting data access
3. Test auth flows: signup, login, logout, protected route access, admin route access
4. Test full funnel end-to-end: opt-in → webinar register → masterclass register → application submit → admin approval → Stripe checkout → post-purchase email
5. Test Stripe webhooks with Stripe CLI (`stripe listen --forward-to localhost:3000/api/stripe/webhook`)
6. Check mobile responsiveness on iPhone SE, iPhone 14, iPad, and desktop
7. Validate all forms: required fields, error states, success states
8. Verify image optimization: all above-fold images have `priority`, all images serve webp
9. Check page load performance: Lighthouse score target ≥ 90 on Performance, Accessibility, SEO
10. Verify email sequences trigger correctly for each automation
11. Check admin dashboard data loads correctly and is secured
12. Verify donation flow works (Stripe Payment Element custom amount)

**Report to Master Claude when:** All checks pass. Provide a QA report with: Pass/Fail per test, any outstanding issues, Lighthouse scores, and security findings.

---

### MASTER CLAUDE — FINAL ORCHESTRATION
**After all 3 agents report complete:**
1. Review QA report from Agent 3
2. Confirm integration between front-end (Agent 1) and back-end (Agent 2) is seamless
3. Run one final full-funnel test: fake lead → webinar → masterclass → application → checkout
4. Check that all Patricia images are being used correctly across the site
5. Verify the new logo (`official-logo.jpeg`) appears in header, favicon, and OG image
6. Confirm `.env.local` has all required variables documented (without exposing values)
7. Generate deployment checklist for Vercel
8. Deliver final message to Mark:

> "✅ LOVE & WELLNESS COACHING SITE — COMPLETE
> Full-stack rebuild is verified and live-ready.
> Funnel: Opt-in ✓ | Daily Webinar ✓ | Friday Masterclass ✓ | Application Form ✓ | VIP/High-Ticket Checkout ✓
> Shop + Stripe + Supabase + Google Auth: All systems verified.
> Ready to deploy to Vercel. All assets optimized. Admin dashboard operational.
> Awaiting your final review and Vercel deployment command."

---

## STRATEGIC ANSWERS TO MARK'S QUESTIONS

### Q: Can we connect Alibaba overstock products?
**YES.** Use the curated dropship model:
- Source branded wellness items from Alibaba in bulk (journals, candles, T-shirts, hats, crystals, gift sets)
- List them in the /shop as "Love & Wellness Collection" — no need to mention Alibaba
- Bundle selected items into the VIP Day stacked offer as a physical welcome/gift box
- For on-demand merch (shirts, hats): use Printful/Printify API — zero inventory, auto-fulfillment
- All items managed through the products table in Supabase
- Stacked gift box photo should be a key visual on the VIP Day offer page

### Q: How do we structure the funnel flow?
```
OPT-IN → WEBINAR (daily, 40–90 min) → MASTERCLASS PARTY (Friday 7–10 PM) → APPLICATION → VIP/HIGH-TICKET CLOSE

Key transitions:
- End of webinar: "Friday's Masterclass is the ONLY place I'm making this offer. Register now."
- End of masterclass: "Applications open NOW for 15 minutes. After that, this closes."
- Application approval: Booked discovery call → close to VIP Day or Group Program
- Post-close: Stacked offer page with buy now button → Stripe checkout
```

### Q: Can we structure language/positioning into the site?
**YES — built into every page:**
- Webinar page copy uses Perfect Webinar language (tease, story, close)
- Masterclass page positions it as "selected, not open" — exclusivity framing
- Application page uses "serious people only" language to pre-qualify psychologically
- VIP page uses full value stack + scarcity + urgency elements

---

## GETTING STARTED — BOOTSTRAP COMMAND

Run this from `/Users/markcartwright/Desktop/`:
```bash
npx create-next-app@latest loveandwellnesscoaching \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --src-dir=false \
  --import-alias="@/*"

cd loveandwellnesscoaching

npm install \
  @supabase/supabase-js \
  @supabase/ssr \
  stripe \
  @stripe/stripe-js \
  @stripe/react-stripe-js \
  framer-motion \
  react-hook-form \
  @hookform/resolvers \
  zod \
  resend \
  @react-email/components \
  react-email \
  lucide-react \
  @tsparticles/react \
  @tsparticles/slim \
  class-variance-authority \
  clsx \
  tailwind-merge \
  date-fns \
  sharp
```

Then initialize shadcn/ui:
```bash
npx shadcn-ui@latest init
```

---

*Last updated: 2026-03-26*
*Master Orchestrator: Claude (Antigravity CLI)*
*Build Target: /Users/markcartwright/Desktop/loveandwellnesscoaching/*
*Domain: www.loveandwellnesscoaching.com*
