# 🕊️ LingoBird Website

The official website for **LingoBird** — the local-first AI language learning and practicing application for Windows 10 & 11.

[![Next.js 16](https://img.shields.io/badge/Next.js-16.4.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-blue?style=flat&logo=react)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-Proprietary-amber)](#)

---

## 🌟 About LingoBird

LingoBird brings language immersion directly to Windows desktop without cloud subscriptions or latency:
- **FSRS-Powered Spaced Repetition**: Modern memory algorithm outperforming SM-2 with custom HTML/CSS flashcard styling.
- **Offline Piper Neural Voices**: 20 on-device neural voices across 10 major languages (Spanish, Japanese, French, German, and more).
- **Whisper Speech-to-Text**: On-device speech recognition for private pronunciation practice.
- **AI Conversation Tutor**: Real-time roleplays powered by Google Gemma 4 or 100% local Ollama LLMs.
- **Graded Reading & Character-Level Writing Atelier**: Instant word inspection, phonetic reading overlays, and targeted mistake workouts.

---

## 🚀 Quick Start (Local Development)

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v20+ recommended)
- `npm` (comes with Node)

### 2. Installation
```bash
git clone https://github.com/ASHUTOSH-SALUNKHE/lingobird.git
cd lingobird
npm install
```

### 3. Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the website in your browser.

### 4. Production Build & Static Export
```bash
npm run build
```
Generates a zero-dependency static production export in the `out/` directory ready for deployment on GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

---

## 🔍 SEO & Rich Snippets

The site is built with search engine optimization:
- **JSON-LD Schema.org Data**: SoftwareApplication, Organization, WebSite, VideoObject, and FAQPage rich snippets.
- **Dynamic XML Sitemap**: Auto-generated `sitemap.xml` with priority and change frequencies across all routes.
- **Robots Directives**: Auto-generated `robots.txt` optimized for Googlebot, Bingbot, and Applebot.
- **Semantic Metadata**: Full OpenGraph images, Twitter Card tags, and canonical links.

---

## 🌐 Deployment

### GitHub Pages (Automated)
This repository includes a GitHub Actions workflow (`.github/workflows/deploy.yml`) that automatically builds and publishes the website to GitHub Pages on every push to the `main` branch.

To enable GitHub Pages:
1. Go to repository **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, select **GitHub Actions**.

### Vercel / Netlify
Connect this GitHub repository directly to Vercel or Netlify for zero-configuration deployments.

---

## 📬 Contact & Links
- **Microsoft Store**: [Get LingoBird for Windows](https://apps.microsoft.com/detail/9P7N7S9N222J?hl=en-us&gl=IN&ocid=pdpshare)
- **YouTube**: [@lingobird_app](https://www.youtube.com/@lingobird_app)
- **Developer**: Ashutosh Salunkhe (`ashutoshsalunkhe2010@gmail.com`)
