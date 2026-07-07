# Dynamic Preview Generator

> A white-label, multi-template website preview system built with **Next.js 16 (App Router)**. Designed for sales teams to cold-call local businesses and pitch personalized, live website demos — powered entirely by a spreadsheet.

---

## Table of Contents

1. [Overview](#1-overview)
2. [How It Works](#2-how-it-works)
3. [Architecture](#3-architecture)
4. [Project Structure](#4-project-structure)
5. [Technology Stack](#5-technology-stack)
6. [Data Pipeline](#6-data-pipeline)
7. [Dynamic Theming Engine](#7-dynamic-theming-engine)
8. [Template System](#8-template-system)
9. [Fallback & Default Asset System](#9-fallback--default-asset-system)
10. [Getting Started](#10-getting-started)
11. [Generating Pitch Links](#11-generating-pitch-links)
12. [Deploying to Vercel](#12-deploying-to-vercel)
13. [Adding New Templates](#13-adding-new-templates)
14. [Environment & Configuration](#14-environment--configuration)
15. [Roadmap](#15-roadmap)
16. [Contributing](#16-contributing)

---

## 1. Overview

**Dynamic Preview Generator** solves a real-world cold-sales problem:

> *"How do you show a prospect a live, personalized website demo — with their own logo, colors, and images — without building a custom site for each of 100+ leads?"*

The answer: **one codebase, one deployment, infinite personalizations via URL parameters.**

Each lead in your spreadsheet gets a unique pitch URL such as:

```
https://your-preview-site.vercel.app/?lead=mk-gym-branch
```

When this link is opened:
- The app reads the `?lead=` query parameter
- It looks up `mk-gym-branch` in the lead database (`leads.json`)
- It detects the business **category** (`Gym / Fitness`)
- It renders the **Gym template** — instantly skinned with that business's brand colors, logo, and images
- Every page the prospect navigates to preserves the branding seamlessly

All of this happens **client-side, in the browser** — no server, no database, no per-lead deployments. Hundreds of users can have their own preview open simultaneously with zero conflicts.

---

## 2. How It Works

```
                     ┌─────────────────────────────────────────┐
                     │         Excel Leads Sheet               │
                     │  (slug, name, phone, category, colors,  │
                     │   logo URL, image URLs)                  │
                     └────────────────┬────────────────────────┘
                                      │  python generate_links.py
                          ┌───────────▼────────────┐
                          │     leads.json          │  ←  served from /public
                          │  (100 leads, exported)  │
                          └───────────┬────────────┘
                                      │
                     Excel sheet gets new column:
                     "Pitch Link" = https://domain/?lead=slug
                                      │
                   Sales rep clicks link during cold call
                                      │
                          ┌───────────▼────────────┐
                          │     Next.js App         │
                          │  reads ?lead=slug       │
                          │  fetches leads.json     │
                          │  matches the slug       │
                          └───────────┬────────────┘
                                      │
                          Determines Category
                          ┌───────────▼────────────┐
                          │  Gym / Fitness?         │──► GymTemplate
                          │  Salon / Spa?           │──► SalonTemplate (Phase 2)
                          │  Café / Restaurant?     │──► CafeTemplate  (Phase 2)
                          └────────────────────────┘
                                      │
                          Injects brand assets:
                          - CSS vars (--primary-color, --secondary-color)
                          - Logo image or text fallback
                          - Dynamic hero/gallery images
                          - Business name & phone number
                                      │
                          ┌───────────▼────────────┐
                          │  Personalized Live Site │
                          │  visible to prospect    │
                          └────────────────────────┘
```

---

## 3. Architecture

### 3.1 Core Design Principles

| Principle | Implementation |
|---|---|
| **Zero per-lead work** | All customization is data-driven from `leads.json` |
| **Single deployment** | One Vercel URL, infinite personalizations via `?lead=` |
| **Client-side rendering** | No SSR needed; all logic runs in the browser |
| **Concurrent-safe** | No shared state between users; each browser is isolated |
| **Extensible templates** | New business categories = new template folder, zero routing changes |
| **Graceful fallbacks** | Missing assets never break the UI; smart defaults per category |

### 3.2 Request Lifecycle

```
Browser opens /?lead=mk-gym-branch
        │
        ▼
app/page.js  (Server Component)
  └── Renders <Suspense> boundary
        │
        ▼
app/HomePageClient.js  (Client Component)
  ├── useSearchParams() → reads "lead" param
  ├── fetch('/leads.json') → finds matching lead object
  ├── Determines template from lead.category
  └── Renders:
        <LeadProvider lead={lead}>        ← injects CSS vars into :root
          <GymTemplate page="home" />    ← renders full gym site
        </LeadProvider>
```

### 3.3 Navigation & State Preservation

One critical challenge: when a prospect clicks "About Us" in the nav, the `?lead=` param must not be lost. This is solved by `CustomLink.js`:

```js
// Every internal link automatically becomes:
// /about  →  /about?lead=mk-gym-branch
const resolvedHref = `${href}?lead=${leadSlug}`;
```

All subpages (`/about`, `/services`, `/contact`, etc.) use `SubPageClient.js`, which re-fetches the lead from `leads.json` using the slug in the URL — ensuring the full template renders correctly even on hard refresh or direct URL access.

---

## 4. Project Structure

```
preview-app/
│
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout: fonts, icons, metadata
│   ├── globals.css               # Global CSS with CSS custom properties
│   ├── page.js                   # Entry point → Suspense wrapper
│   ├── HomePageClient.js         # Main router: reads ?lead=, picks template
│   ├── SubPageClient.js          # Shared client for all subpages
│   ├── about/page.js             # /about route
│   ├── services/page.js          # /services route
│   ├── classes/page.js           # /classes route
│   ├── team/page.js              # /team route
│   ├── gallery/page.js           # /gallery route
│   ├── blog/page.js              # /blog route
│   ├── contact/page.js           # /contact route
│   ├── timetable/page.js         # /timetable route
│   └── bmi/page.js               # /bmi route (BMI Calculator)
│
├── components/
│   ├── CustomLink.js             # Link wrapper — preserves ?lead= param
│   │
│   ├── dashboard/
│   │   └── SalesDashboard.js     # Internal dashboard (shown when no ?lead=)
│   │
│   └── templates/
│       └── gym/                  # Gym / Fitness template
│           ├── GymTemplate.js    # Master layout — assembles all subpages
│           ├── GymHeader.js      # Sticky nav, logo, mobile offcanvas
│           ├── GymFooter.js      # Footer with contact bar + links
│           ├── GymHero.js        # Auto-playing hero image slider
│           ├── GymWhyUs.js       # "Why Choose Us" features section
│           ├── GymClasses.js     # Classes grid
│           ├── GymBanner.js      # CTA banner (2 variants)
│           ├── GymPricing.js     # 3-tier pricing cards
│           ├── GymGallery.js     # Masonry image gallery
│           ├── GymTeam.js        # Team member slider
│           ├── GymAbout.js       # About Us with progress bars
│           ├── GymTestimonials.js# Client testimonials slider
│           ├── GymServices.js    # Services alternating layout
│           ├── GymTimetable.js   # Weekly class schedule table
│           ├── GymBMICalculator.js # Interactive BMI calculator
│           ├── GymContact.js     # Contact form + Google Map
│           ├── GymBlog.js        # Blog listing (3 posts)
│           └── GymBreadcrumb.js  # Reusable page breadcrumb
│
├── contexts/
│   └── LeadContext.js            # React context + CSS var injection
│
├── lib/
│   └── defaults.js               # Fallback colors/images per category
│
└── public/
    ├── leads.json                # Exported lead data (auto-generated)
    └── gym/
        ├── img/                  # Gym template images
        ├── css/                  # Gym template CSS (flaticon, etc.)
        └── fonts/                # Gym template fonts
│
generate_links.py                 # Python automation script (project root)
Dynamic_Whitelabel_Pipeline_Leads.xlsx          # Source of truth spreadsheet
Dynamic_Whitelabel_Pipeline_Leads_With_Links.xlsx  # Output with pitch links
```

---

## 5. Technology Stack

| Layer | Technology | Reason |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | File-based routing, Suspense, fast client nav |
| **Language** | JavaScript (ES2022+) | No TypeScript overhead for rapid iteration |
| **Styling** | Vanilla CSS + CSS Custom Properties | Zero runtime overhead; dynamic theming via JS |
| **State Management** | React Context API | Lightweight; no external state library needed |
| **Data** | Static JSON (`/public/leads.json`) | No database; served as a static CDN asset |
| **Automation** | Python 3 + pandas + openpyxl | Excel read/write + JSON export |
| **Deployment** | Vercel | Zero-config, global CDN, free tier sufficient |
| **Icons** | Font Awesome 4.7 | Matches original template icon set |
| **Fonts** | Google Fonts (Muli + Oswald) | Premium typography matching source template |

---

## 6. Data Pipeline

The data pipeline is driven by `generate_links.py` which sits in the project root (one level above `preview-app/`).

### What it does

1. **Reads** `Dynamic_Whitelabel_Pipeline_Leads.xlsx`
2. **Cleans** each row (handles NaN, empty strings)
3. **Exports** all leads to `preview-app/public/leads.json`
4. **Generates** a personalized pitch URL for each lead:
   ```
   https://your-domain.vercel.app/?lead={slug}
   ```
5. **Writes** pitch links back into the Excel sheet as a new **"Pitch Link"** column
6. **Saves** the updated file as `Dynamic_Whitelabel_Pipeline_Leads_With_Links.xlsx`

### Expected spreadsheet columns

| Column | Key | Description |
|---|---|---|
| Firebase Slug (Document ID) | `slug` | URL-friendly unique identifier |
| Business Name | `businessName` | Display name on the site |
| Phone Number | `phoneNumber` | Shown in footer + contact page |
| Category | `category` | Determines which template to load |
| Primary Color (Hex) | `primaryColor` | Main brand color (buttons, accents) |
| Secondary Color (Hex) | `secondaryColor` | Dark/background brand color |
| Logo URL | `logoUrl` | Direct image URL (PNG/JPG/SVG) |
| Image URL 1 | `image1` | Hero / gallery image 1 |
| Image URL 2 | `image2` | Hero / gallery image 2 |
| Image URL 3 | `image3` | Gallery image 3 |

### Supported Category Values

```
Gym / Fitness
Salon / Spa
Café / Restaurant
Retail / E-commerce
Local Business
```

---

## 7. Dynamic Theming Engine

The theming engine consists of three layers working together:

### Layer 1 — `lib/defaults.js`

Defines fallback values for every category in case a lead row is missing data:

```js
export const CATEGORY_DEFAULTS = {
  'Gym / Fitness': {
    primaryColor: '#f36100',
    secondaryColor: '#151515',
    image1: '/gym/img/hero/hero-1.jpg',
    // ...
  },
  // ...
};
```

### Layer 2 — `contexts/LeadContext.js`

Merges the raw lead data with its category defaults, then injects CSS custom properties into `document.documentElement`:

```js
useEffect(() => {
  document.documentElement.style.setProperty('--primary-color', resolvedLead.primaryColor);
  document.documentElement.style.setProperty('--secondary-color', resolvedLead.secondaryColor);
}, [resolvedLead.primaryColor, resolvedLead.secondaryColor]);
```

### Layer 3 — `globals.css`

Every color reference in every component uses CSS custom properties:

```css
:root {
  --primary-color: #f36100;   /* overridden at runtime */
  --secondary-color: #151515; /* overridden at runtime */
}

.primary-btn { background: var(--primary-color); }
.section-title span { color: var(--primary-color); }
/* etc. */
```

**Result:** Changing a lead's hex code in the spreadsheet and re-running the script is all it takes to update the entire site's color scheme for that lead. Zero code changes required.

---

## 8. Template System

### Current Templates

| Category | Template | Status |
|---|---|---|
| `Gym / Fitness` | `GymTemplate` | ✅ Complete (16 components, 10 pages) |
| `Salon / Spa` | `SalonTemplate` | 🔜 Phase 2 |
| `Café / Restaurant` | `CafeTemplate` | 🔜 Phase 2 |
| `Retail / E-commerce` | `RetailTemplate` | 🔜 Phase 2 |
| `Local Business` | `LocalTemplate` | 🔜 Phase 2 |

### Template Routing

The category-to-template map lives in `HomePageClient.js` and `SubPageClient.js`:

```js
const TEMPLATE_MAP = {
  'Gym / Fitness': GymTemplate,
  // 'Salon / Spa': SalonTemplate,   ← add here as you build them
};

const TemplateComponent = TEMPLATE_MAP[lead.category] || GymTemplate;
```

### GymTemplate Pages

| URL | `page` prop | Sections Rendered |
|---|---|---|
| `/?lead=slug` | `home` | Hero, WhyUs, Classes, Banner, Pricing, Gallery, Team |
| `/about?lead=slug` | `about` | Breadcrumb, WhyUs, About, Team, Banner, Testimonials |
| `/services?lead=slug` | `services` | Breadcrumb, Services, Banner (variant), Pricing |
| `/classes?lead=slug` | `classes` | Breadcrumb, Classes, Banner, Timetable |
| `/timetable?lead=slug` | `timetable` | Breadcrumb, Timetable |
| `/bmi?lead=slug` | `bmi` | Breadcrumb, BMI Calculator |
| `/team?lead=slug` | `team` | Breadcrumb, Team, Banner |
| `/gallery?lead=slug` | `gallery` | Breadcrumb, Gallery |
| `/blog?lead=slug` | `blog` | Breadcrumb, Blog |
| `/contact?lead=slug` | `contact` | Breadcrumb, Contact Form, Map |

---

## 9. Fallback & Default Asset System

The system is designed to **always look complete**, even when a lead row has missing data.

| Missing Field | Fallback Behavior |
|---|---|
| `primaryColor` | Category default color (e.g., `#f36100` for Gym) |
| `secondaryColor` | Category default dark color |
| `logoUrl` | Renders business name as a styled text logo |
| `image1` | Category default hero image from `/public/gym/img/` |
| `image2` | Category default second image |
| `image3` | Category default third image |
| `phoneNumber` | Renders `000-000-0000` as placeholder |

No broken images, no unstyled sections, no JavaScript errors — guaranteed.

---

## 10. Getting Started

### Prerequisites

- Node.js >= 18.x
- Python 3.8+ with `pandas` and `openpyxl`
- npm or equivalent

### Install Python dependencies

```bash
pip install pandas openpyxl
```

### Install Node dependencies

```bash
cd preview-app
npm install
```

### Run the development server

```bash
cd preview-app
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the **Sales Dashboard**.

### Test a specific lead preview

```
http://localhost:3000/?lead=mk-gym-branch
http://localhost:3000/?lead=mk-gym-branch&page=about
http://localhost:3000/?lead=mk-gym-branch&page=bmi
```

> **Note:** The `?lead=` slug must exactly match a `slug` field in `public/leads.json`.

---

## 11. Generating Pitch Links

From the **project root** (not inside `preview-app/`):

```bash
python generate_links.py
```

This will:
1. Export `preview-app/public/leads.json` (used by the web app)
2. Generate `Dynamic_Whitelabel_Pipeline_Leads_With_Links.xlsx` (contains the new **Pitch Link** column)

### Changing the base URL

Open `generate_links.py` and update line:

```python
# Local testing
BASE_URL = "http://localhost:3000"

# After Vercel deployment — change to your actual domain:
BASE_URL = "https://your-project-name.vercel.app"
```

Re-run the script to regenerate all 100+ pitch links with the correct domain.

---

## 12. Deploying to Vercel

### Option A — Vercel CLI

```bash
npm install -g vercel
cd preview-app
vercel --prod
```

### Option B — GitHub Integration (Recommended)

1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project**
3. Import your repository
4. Set **Root Directory** to `preview-app`
5. Framework will be auto-detected as **Next.js**
6. Click **Deploy**

Vercel will give you a URL like `https://your-project.vercel.app`.

### Post-deployment

Update `generate_links.py`:
```python
BASE_URL = "https://your-project.vercel.app"
```

Re-run the script to regenerate all pitch links in the Excel sheet.

---

## 13. Adding New Templates

Adding a new template (e.g., `Salon / Spa`) follows a consistent pattern:

### Step 1 — Create the template directory

```
components/templates/salon/
├── SalonTemplate.js
├── SalonHeader.js
├── SalonHero.js
├── SalonServices.js
├── SalonGallery.js
├── SalonContact.js
└── SalonFooter.js
```

### Step 2 — Build components

Follow the same pattern as the Gym template. Each component:
- Imports `useLeadContext()` to access dynamic lead data
- Uses `CustomLink` for all internal navigation
- Uses `var(--primary-color)` / `var(--secondary-color)` in CSS classes

### Step 3 — Register in the template map

In both `app/HomePageClient.js` and `app/SubPageClient.js`:

```js
import SalonTemplate from '@/components/templates/salon/SalonTemplate';

const TEMPLATE_MAP = {
  'Gym / Fitness': GymTemplate,
  'Salon / Spa': SalonTemplate,   // ← add this line
};
```

That's it. All Salon leads will now automatically render the Salon template.

### Step 4 — Add defaults

In `lib/defaults.js`, ensure `CATEGORY_DEFAULTS['Salon / Spa']` has appropriate fallback colors and images.

---

## 14. Environment & Configuration

This project requires **no environment variables** for basic operation. Everything is statically served.

| File | Purpose |
|---|---|
| `preview-app/public/leads.json` | Lead database served as a static asset |
| `generate_links.py` → `BASE_URL` | The only config value that needs updating |
| `next.config.mjs` | Standard Next.js config (no modifications needed) |

### Image Domains

If lead images are hosted on third-party domains (e.g., Cloudinary, Imgbb, Firebase Storage), add them to `next.config.mjs`:

```js
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'i.ibb.co', 'firebasestorage.googleapis.com'],
  },
};
```

---

## 15. Roadmap

### Phase 2 — Additional Templates
- [ ] `Salon / Spa` template (assets pending)
- [ ] `Café / Restaurant` template (assets pending)
- [ ] `Retail / E-commerce` template (assets pending)
- [ ] `Local Business` template (assets pending)

### Phase 3 — Enhanced Features
- [ ] Firebase Firestore integration (real-time lead management)
- [ ] Admin panel to edit lead assets without touching the spreadsheet
- [ ] WhatsApp click-to-chat button with dynamic phone number
- [ ] Google Analytics per-preview tracking
- [ ] PDF proposal generator — exports a branded PDF for the prospect
- [ ] Password-protected preview links for confidentiality

### Phase 4 — Scale
- [ ] CRM integration (HubSpot / Zoho) to auto-sync lead status
- [ ] Automated email with pitch link sent after call is logged
- [ ] A/B testing between template variants per category

---

## 16. Contributing

This project follows a modular, component-driven architecture. When contributing:

1. **Never hardcode colors** — always use `var(--primary-color)` / `var(--secondary-color)`
2. **Always use `CustomLink`** instead of Next.js `Link` for internal navigation inside templates
3. **Always wrap `useSearchParams()`** in a `<Suspense>` boundary (see `app/page.js` pattern)
4. **Register fallbacks** in `lib/defaults.js` for any new category or asset type
5. **Keep templates self-contained** — a template folder should be fully deletable without breaking other templates

---

## License

This project is proprietary. All rights reserved.

---

*Built with precision. Designed for sales.*
#   D y n a m i c - P r e v i e w - G e n e r a t o r  
 