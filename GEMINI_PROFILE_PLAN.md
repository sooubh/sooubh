# Gemini Ambassador Profile Plan

## Overview
The /gemini page is a dedicated profile experience focused on ambassador proof, showcase media, ongoing updates, and a clear call-to-action. It is visually distinct from the home page and uses its own Tailwind theme tokens.

## Current Status (as of 2026-04-29)
- Route is live at /gemini.
- Page layout and sections are implemented in components/pages/GeminiAmbassador.tsx.
- Content is driven by lib/geminiContent.ts for easy updates.
- Tailwind theme tokens for the Gemini look are defined in tailwind.config.js.
- Fonts are imported in index.css for the Gemini typography system.
- Navbar does not show Gemini; footer contains the Gemini quick link.
- Sitemap includes /gemini.
- Showcase video is in placeholder mode (embedUrl and fileUrl are empty).

## Full Plan for Gemini Profile
1. Hero and badge
   - Confirm official ambassador wording and badge text.
   - Update hero highlights to reflect latest workshops and focus areas.
2. Ambassador proof
   - Add concrete proof items (certificate, official email, or event flyers).
   - Attach links or references for each proof item.
3. Gemini showcase video
   - Add a YouTube/Vimeo embed URL or a local video file.
   - Verify poster image and caption accuracy.
4. Initiatives and activities
   - Keep the initiatives list aligned with the current quarter.
   - Add measurable outcomes (attendance, reach, or project count).
5. Updates feed
   - Keep status accurate (Published, Scheduled, Planned).
   - Add release notes for demos and workshops.
6. Brand assets
   - Confirm official logo usage and remove any outdated marks.
   - Add any press, campus, or partner logos when applicable.
7. CTA and contact
   - Ensure the primary CTA points to the correct form or booking flow.
   - Provide a direct email fallback.

## Upcoming Changes
- Add the real Gemini showcase video (embed or file).
- Replace placeholder proof text with documented proof assets.
- Update the updates list with real timelines and outcomes.
- Add a small metrics strip (sessions delivered, attendees, demos shipped).
- Add a press or community highlight section if available.
- Confirm the Gemini quick link placement in the footer matches the desired order.

## Where to Update
- Page layout: components/pages/GeminiAmbassador.tsx
- Content data: lib/geminiContent.ts
- Theme tokens: tailwind.config.js
- Fonts: index.css
- Footer link: components/ui/Footer.tsx
- Sitemap: public/sitemap.xml
