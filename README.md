# Portfolio

A minimal, editorial personal-archive portfolio. React + Vite + Tailwind CSS + Framer Motion.

## Getting started

```bash
npm install
npm run dev
```

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint       # eslint
```

## Editing content

Content is fully separated from presentation. To update the site, you should
only need to edit files inside `src/content/`:

| File | Controls |
| --- | --- |
| `site.js` | Name, tagline, intro, navigation labels, socials, email |
| `about.js` | About page copy, currently, interests |
| `skills.js` | Grouped skill lists shown on the About page |
| `education.js` | Education timeline entries — add/remove freely |
| `projects.js` | Project index and detail pages — add/remove freely |
| `contact.js` | Contact page copy |
| `resume.js` | Resume page copy and the PDF path |

Adding or removing entries from `education.js` or `projects.js` automatically
updates the Education and Work pages and the project detail template — no
component changes required. Every field beyond the required minimum (`slug`/
`title`/`category` for projects, `id`/`institution`/`degree` for education) is
optional and the layout adapts gracefully when it's missing.

### Replacing the résumé PDF

Replace `public/resume/resume.pdf` with your own file (same filename, or
update `pdfPath`/`fileName` in `src/content/resume.js`).

### Adding project images

Project and about-page images are optional. Add a file under `src/assets/`
or `public/`, then set the `image` field on the project (or `about.image`)
to its path. Projects with no image automatically render an abstract
placeholder pattern instead of a broken image.

## Architecture

```
src/
  content/      # all editable copy and data — the only place you should
                # normally need to touch
  pages/        # one file per route, composed from components + content
  components/
    layout/     # Navbar-less shell: Layout, Footer, Helmet
    navigation/ # Navbar, MobileMenu
    ui/         # Line (signature motif), SectionLabel, RevealText,
                # ArrowLink, Container, PlaceholderMedia
    animations/ # BackgroundGeometry, ScrollProgressLine, Cursor,
                # PageTransition
    projects/   # ProjectListItem, ProjectFilter
    education/  # Timeline, TimelineItem
  hooks/        # useReducedMotion, useFinePointer, useScrollToTop
```

The thin terracotta line is the site's one recurring visual motif —
`components/ui/Line.jsx` — reused as a divider, a timeline spine, a
scroll-progress indicator and a hover underline.

All motion respects `prefers-reduced-motion`; the site is fully usable and
legible with animation disabled.

## Routes

```
/                  Home
/about             About
/education         Education
/work              Work index (data-driven, filterable by category)
/work/:slug        Project detail (one reusable template)
/resume            Resume
/contact           Contact
*                  404
```
