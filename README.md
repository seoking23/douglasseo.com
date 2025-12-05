# Douglas Seo - Personal Website

A simple, fast static HTML website showcasing my work as a Software Engineer & Entrepreneur.

## Quick Start

### Running Locally

Start a local server:

```bash
npm run dev
# or
python3 -m http.server 8000
```

Visit `http://localhost:8000` to view the site.

### Building for Production

The site is already built as static HTML files. Simply upload the files to any web server or static hosting service.

```bash
npm run build  # Just confirms the build is complete
```

## Project Structure

```
├── index.html          # Main homepage
├── blog/               # Blog posts (HTML)
│   ├── index.html     # Blog listing page
│   └── *.html         # Individual blog posts
├── package.json       # Project metadata and scripts
└── README.md          # This file
```

## Features

- **Pure HTML/CSS/JS** - No build process required, fast loading
- **Responsive Design** - Works on all devices
- **Blog Integration** - Static HTML blog posts
- **Contact Form** - Simple contact form with JavaScript
- **SEO Optimized** - Meta tags and semantic HTML

## Deployment

This static site can be deployed to any hosting service:

- **Netlify**: Drag and drop the folder
- **Vercel**: Connect your Git repository
- **GitHub Pages**: Push to a GitHub repository
- **Any web server**: Upload the HTML files

## Development

The site uses vanilla HTML, CSS, and JavaScript for maximum compatibility and performance. No complex build tools or frameworks required.

### Adding Blog Posts

1. Create a new HTML file in the `blog/` directory
2. Follow the existing blog post structure
3. Update the blog index (`blog/index.html`) with the new post

## License

© 2024 Douglas Seo. All rights reserved.
