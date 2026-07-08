# PitchDeck: Dynamic White-Label Preview Generator

> An automated, dynamic pitch-generation platform designed to help digital agencies and freelancers close more deals by instantly generating personalized, production-ready website previews for local businesses.

![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![Node.js](https://img.shields.io/badge/Node.js-Scripts-339933?style=for-the-badge&logo=node.js)

## 📖 Overview

Pitching a web design service to a local business using generic templates rarely converts well. The **Dynamic Preview Generator (PitchDeck)** solves this by dynamically injecting a prospect's brand identity (Name, Colors, Logo, and Images) into a pre-built, high-quality template on the fly. 

Instead of saying, *"Here is what your site could look like,"* you simply send them a URL (e.g., `yourdomain.com/gym/mukhtiar-gold-gym`), and they see a fully functional, personalized website built around their brand.

## ✨ Key Features

- **Dynamic Theming Engine:** Automatically overrides CSS variables (colors, logos, text) based on the URL slug parameter.
- **Internal Admin CRM Dashboard (`/admin`):** A custom, sleek CRUD dashboard built to manage hundreds of business leads. Features include:
  - Real-time pipeline statistics.
  - Search, filter, and sort capabilities.
  - A lead creation form with integrated color pickers and auto-slug generation.
  - One-click "Get Link" to mark leads as published and copy the dynamic pitch URL to the clipboard.
- **Data Pipeline:** Includes robust Node.js automation scripts (`scripts/importLeads.mjs`) to parse, map, and batch-import hundreds of business leads from `.xlsx` files directly into the cloud database.
- **Supabase Integration:** Full PostgreSQL backend for storing business assets, statuses, and brand tokens.

## 🏗️ Technical Architecture

- **Frontend:** Next.js (App Router), React, Tailwind CSS v4.
- **Backend / API:** Next.js Route Handlers (`app/api/...`) connecting to Supabase via `@supabase/supabase-js`.
- **Database:** Supabase (PostgreSQL).
- **Data Processing:** `xlsx` library for Excel ingestion and sanitization.

### Folder Structure
```text
📦 Dynamic-Preview-Generator
 ┣ 📂 preview-app/
 ┃ ┣ 📂 app/
 ┃ ┃ ┣ 📂 admin/           # Admin Dashboard & CRM Routes
 ┃ ┃ ┣ 📂 api/             # REST API for Leads CRUD
 ┃ ┃ ┣ 📂 [category]/      # Dynamic Template Routing (e.g., /gym/[slug])
 ┃ ┣ 📂 components/        # Reusable UI components (Sidebar, Forms, Tables)
 ┃ ┣ 📂 scripts/           # Data migration and Excel import pipelines
 ┃ ┗ 📂 public/            # Static template assets (CSS, Fonts, Images)
```

## Getting Started

### Prerequisites
- Node.js 18+
- A Supabase Project

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdulBasitNawaz/Dynamic-Preview-Generator.git
   cd Dynamic-Preview-Generator/preview-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Setup:**
   Create a `.env.local` file inside the `preview-app` directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the Data Pipeline (Optional):**
   If you have a populated `Dynamic_Whitelabel_Pipeline_Leads.xlsx` file in the root directory, you can seed your database:
   ```bash
   node scripts/importLeads.mjs
   ```

5. **Start the Development Server:**
   ```bash
   npm run dev
   ```
   - Admin Panel: `http://localhost:3000/admin`
   - Client Preview (Example): `http://localhost:3000/gym/sample-slug`

## 🧠 Engineering Decisions

- **Why I Next.js App Router?** The project heavily relies on dynamic routing (`[category]/[slug]`). App Router handles parameter extraction and server-side data fetching from Supabase incredibly efficiently, reducing Time-to-Interactive (TTI) for clients receiving cold pitches.
- **Why I Supabase?** Provides a lightweight, instant Postgres backend with a superb JavaScript SDK, making rapid prototyping of the CRM layer seamless without needing to manage a heavy ORM or backend server.
- **Why I CSS Variables for Theming?** Rather than forcing Tailwind classes to compile dynamically at runtime (which is anti-pattern), the dynamic data from Supabase overrides native CSS custom properties (`--primary-color`, etc.) at the `<head>` level, ensuring instantaneous, flicker-free rendering of the client's brand.

## 👨‍💻 Author

**Abdul Basit Nawaz** 
- [GitHub](https://github.com/AbdulBasitNawaz)

---
*Built to redefine how agencies pitch web development services.*
