# Muhammad Mahad Ahmad — Portfolio

A personal portfolio website showcasing software engineering, AI, and cybersecurity projects.

Built with **pure HTML, CSS, and JavaScript** — no heavy frameworks or libraries. The design features a modern dark mode, glassmorphism, scroll-reveal animations, and an interactive hero section with smooth parallax effects.

## Local Development

To view the portfolio locally, you can use any static file server. For example, using Python 3:

```bash
cd portfolio
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Customization

Before deploying, make sure to update the following placeholders in `index.html` and `script.js`:
- Email addresses (`your.email@example.com`)
- LinkedIn profile URL
- Live Demo button links for CodeSage and VulnHawk (once you deploy them)

## Deployment

This is a static site, so it can be hosted anywhere for free. The easiest options are:

1. **GitHub Pages (Recommended):**
   - Push this repository to GitHub
   - Go to Repo Settings > Pages
   - Select `main` branch as the source
   - Your site will be live at `https://your-username.github.io/portfolio`

2. **Vercel or Netlify:**
   - Connect your GitHub repo
   - Deploy with default settings (no build command needed)
