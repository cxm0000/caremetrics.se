# CareMetrics.se Website

A modern, clean website for CareMetrics built with Astro and deployed on Cloudflare Pages.

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The site will be available at `http://localhost:4321` during development.

## 📁 Project Structure

```
├── public/          # Static assets (favicon, etc.)
├── src/
│   ├── components/  # Reusable Astro components
│   ├── layouts/    # Page layouts
│   ├── pages/      # Pages (routes)
│   └── styles/      # Global CSS
├── astro.config.mjs # Astro configuration
└── package.json
```

## 🎨 Features

- **Modern Design**: Clean, professional interface with gradient accents
- **Responsive**: Mobile-first design that works on all devices
- **Fast**: Optimized static site with minimal JavaScript
- **SEO Optimized**: Meta tags, Open Graph, and semantic HTML
- **Accessible**: WCAG compliant with proper focus states

## 🚢 Deployment

### Cloudflare Pages (Recommended - FREE)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to Pages → Create a project
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Node version**: 18 or higher

3. **Add Custom Domain**
   - In your Cloudflare Pages project, go to Custom domains
   - Add `caremetrics.se`
   - Update your domain's DNS records as instructed
   - SSL/TLS will be automatically configured

4. **Automatic Deployments**
   - Every push to `main` branch will trigger a new deployment
   - Preview deployments are created for pull requests

### Alternative: Manual Upload to UpCloud S3

If you prefer UpCloud S3:

1. Build the site:
   ```bash
   npm run build
   ```

2. Upload the `dist/` folder contents to your S3 bucket

3. Configure bucket for static website hosting

4. Set up CDN (optional but recommended)

## 🛠️ Development

### Adding a New Page

Create a new `.astro` file in `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
---

<Layout title="Page Title">
  <h1>My New Page</h1>
</Layout>
```

### Adding a Component

Create a new `.astro` file in `src/components/`:

```astro
---
// Component logic
---

<div class="my-component">
  <!-- Component markup -->
</div>

<style>
  .my-component {
    /* Component styles */
  }
</style>
```

## 📝 Customization

### Colors

Edit CSS variables in `src/styles/global.css`:

```css
:root {
  --color-primary: #6366f1;
  --color-secondary: #a855f7;
  /* ... */
}
```

### Content

- Homepage: `src/pages/index.astro`
- Header: `src/components/Header.astro`
- Footer: `src/components/Footer.astro`

## 📄 License

All rights reserved © 2024 CareMetrics

