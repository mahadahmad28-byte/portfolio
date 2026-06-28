# Muhammad Mahad Ahmad — Portfolio

Personal portfolio website for [Muhammad Mahad Ahmad](https://github.com/mahadahmad28-byte) — CS student building AI tools, security scanners, and full-stack web apps.

Built with **pure HTML, CSS, and JavaScript** — no frameworks, no build step. Features a dark mode design with glassmorphism, scroll-reveal animations, mouse-parallax orbs, a typewriter hero, animated skill bars, and a vertical timeline.

## 🌐 Live Site

Hosted on GitHub Pages: **https://mahadahmad28-byte.github.io/portfolio**

## 📋 Sections

- **Hero** — name, animated role typewriter, call-to-action
- **About** — background, focus areas (AI · Security · Full-Stack)
- **Projects** — CodeSage and VulnHawk with interactive UI mocks
- **Skills** — animated progress bars across 6 categories
- **Experience** — vertical timeline of education and projects
- **Contact** — email, GitHub, LinkedIn + contact form (mailto)

## 🚀 Local Development

No build step needed. Just serve with any static file server:

```bash
cd portfolio
python -m http.server 8000
# Open http://localhost:8000
```

## ✏️ Customization

Update these placeholders in [index.html](index.html) and [script.js](script.js) before publishing:

| Placeholder | Replace with |
|-------------|-------------|
| `your.email@example.com` | Your real email address |
| `Add your LinkedIn URL` | `https://linkedin.com/in/your-profile` |
| `#` on Live Demo buttons | Live URLs from Render/Vercel once deployed |

## 🚢 Deployment

### GitHub Pages (Recommended — Free & Instant)
1. Push this repo to GitHub as `portfolio`
2. Go to **Settings → Pages**
3. Set Source: `main` branch, `/ (root)`
4. Your site is live at `https://mahadahmad28-byte.github.io/portfolio`

### Vercel or Netlify
- Connect GitHub repo → deploy with default settings (no build command needed)

## 🛠️ Tech Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Structure | HTML5 semantic | Clean, accessible, SEO-friendly |
| Styling | Vanilla CSS with custom properties | Full control, no build step |
| Behaviour | Vanilla JS (ES2022) | IntersectionObserver, no jQuery |
| Fonts | Inter + Fira Code (Google Fonts) | Premium, readable typography |
| Hosting | GitHub Pages | Free, CDN-backed, custom domain support |
