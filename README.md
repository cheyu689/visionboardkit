# New Year Vision Board

A static landing page website for creating New Year vision boards. Built with Next.js App Router and Tailwind CSS.

## Features

- **Home Page** with all required modules:
  - Hero section with Printable/Digital buttons
  - 30-minute checklist with progress tracking
  - Featured templates grid
  - Inspiration gallery
  - "What to Put" section with keywords and AI prompts
  - Themed templates (Career/Money/Health/Relationship/Study/Travel)
  - FAQ section with JSON-LD structured data
  - Resource signup with localStorage
  - Related links section

- **Templates Page** (`/templates`):
  - Filter by theme, style, and format
  - Downloadable templates (SVG/PNG/PDF)
  - Print functionality for printable templates
  - Placeholder images when files are missing

- **Ideas Page** (`/ideas`):
  - Browse inspiration gallery
  - Filter by theme and style
  - Links to find matching templates

- **6 Differentiators**:
  - 30-minute process with interactive checklist
  - Downloadable and printable templates
  - Advanced filtering system
  - Keyword collections and AI prompts
  - Dual paths: Printable vs Digital
  - Gentle signup conversion (no popups)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

The static files will be generated in the `out/` directory, which can be deployed to any static hosting service.

## Project Structure

```
new-year-vision-board/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout with metadata
│   ├── page.tsx             # Home page
│   ├── globals.css          # Global styles
│   ├── templates/           # Templates page
│   └── ideas/               # Ideas page
├── components/              # React components
│   ├── Navigation.tsx       # Site navigation
│   ├── Footer.tsx           # Site footer
│   ├── home/                # Home page components
│   ├── TemplateCard.tsx     # Template card component
│   ├── IdeaCard.tsx         # Idea card component
│   ├── FilterPanel.tsx      # Template filters
│   └── ImageWithPlaceholder.tsx  # Auto placeholder component
├── content/                 # Content data source
│   └── content.ts           # All content data
├── lib/                     # Utilities
│   └── utils.ts             # Helper functions
├── public/                  # Static assets
│   ├── images/              # Image assets
│   └── downloads/           # Downloadable files
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.mjs
```

## Adding Images

Place your images in the following directories:

- **Ideas**: `public/images/ideas/{theme}-{n}.jpg`
  - Example: `public/images/ideas/career-1.jpg`

- **Template previews**: `public/images/templates/{id}.png`
  - Example: `public/images/templates/career-printable-minimalist.png`

- **Template downloads**: `public/downloads/templates/{id}.svg`
  - Example: `public/downloads/templates/career-printable-minimalist.svg`

If images are missing, the site will automatically generate SVG placeholders.

## Customization

### Edit Content

All content is managed in `content/content.ts`:

```typescript
// Edit themes, styles, templates, ideas, FAQs, etc.
export const templates: Template[] = [
  // Add or modify templates
];
```

### Change Colors

Edit `tailwind.config.ts`:

```typescript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      }
    }
  }
}
```

## Deployment

This site exports as static HTML and can be deployed to:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## SEO Features

- Optimized metadata for each page
- Open Graph tags for social sharing
- JSON-LD structured data for FAQs
- Semantic HTML structure
- Responsive design

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Notes

- Images are unoptimized for static export (`images.unoptimized: true`)
- Form submissions use localStorage (no backend required)
- Print functionality uses browser's native print dialog
- All placeholder SVGs are generated inline

## License

MIT
