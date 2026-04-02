@AGENTS.md

# FutureScan - AI-Powered MRI Scanning Platform

## Stack
- Next.js 16.2.2, React 19, TypeScript, Tailwind v4
- Framer Motion for animations
- HubSpot CRM for lead capture

## Design System
- **Palette**: Deep Space Blue (#0a0e27), Neural Silver (#a8b5c8), Electric Cyan (#00e5ff)
- **Fonts**: Space Grotesk (headings), Inter (body)
- **Aesthetic**: Dark cinematic, glassmorphism, glow effects, scan-line animations
- **CSS classes**: `.glass`, `.glass-strong`, `.glow-cyan`, `.glow-cyan-strong`, `.text-glow`, `.bg-grid`

## Key Directories
- `src/components/sections/` — page sections (hero, problem, how-it-works, scan-experience, pricing, trust, book-cta, footer)
- `src/components/forms/` — multi-step intake form
- `src/components/ui/` — navigation, shared UI
- `src/app/api/hubspot/` — HubSpot CRM API route
- `public/assets/ai/` — placeholder for Nano Banana generated medical imagery
- `public/assets/video/` — placeholder for Higgsfield cinematic background loops
- `public/assets/icons/` — icon assets

## Environment Variables
- `HUBSPOT_ACCESS_TOKEN` — HubSpot Private App token (server-side)
- `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` — HubSpot portal ID for tracking script

## Domain
- futurescan.com.au
