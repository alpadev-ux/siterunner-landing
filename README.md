# SiteRunner Landing Page

A responsive single-page landing page for SiteRunner — simple monthly website updates for local restaurants.

## Tech stack

- **React 18** + **Vite**
- **Tailwind CSS** for styling
- Semantic HTML, mobile-first layout

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
```

Output is in `dist/`.

## Customization

- **Copy**: Edit text directly in `src/App.jsx`.
- **Colors**: Accent color is set in `tailwind.config.js` under `theme.extend.colors` (`accent`, `accent-hover`, `accent-light`).
- **Lead form**: Form state and submit handler are in `App`. Wire `handleSubmit` to your backend or form service (e.g. Formspree, Netlify Forms, or your API).

## Structure

- **Hero** — Headline, subheadline, primary/secondary CTAs, mock browser visual
- **Problem** — Pain points for restaurant websites
- **Solution** — Example update requests
- **How it works** — 3-step flow
- **Pricing** — Starter / Growth / Pro cards
- **Free offer** — Lead form (restaurant name, URL, name, email, phone, message)
- **Final CTA** — Closing headline and CTA
- **Footer** — Brand, tagline, email, copyright
