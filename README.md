# Portfolio

A minimal, editorial personal-archive portfolio: one continuous scrolling
page, content sourced from Supabase, with three large cinematic video
layers that blend into the page as you scroll. React + Vite + Tailwind CSS
+ Framer Motion.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in your Supabase project's values
npm run dev
```

```bash
npm run build     # production build to dist/
npm run preview   # preview the production build
npm run lint       # eslint
```

## Editing content — Supabase, not code

All real content (name, tagline, email, about copy, education, projects,
skills, socials, résumé link) lives in Supabase, not in the React source.
To update the site:

1. Open your Supabase project's **Table Editor**.
2. Edit a row in `site_settings`, `about`, `education`, `projects`,
   `skills` or `social_links`.
3. Reload the site — no code change, no redeploy.

| Table | Controls | Notes |
| --- | --- | --- |
| `site_settings` | Name, role/tagline, intro, email, résumé link, copyright year | Single row, `id = 1` |
| `about` | Headline, description paragraphs, currently, interests | The row with `is_active = true` (most recently updated if several) |
| `education` | Timeline entries | Add/remove rows freely; ordered by `sort_order` |
| `projects` | Project index + detail pages | Add/remove rows freely; ordered by `sort_order`; `featured` is available for future use |
| `skills` | Grouped skill lists (no percentages) | One row per skill; grouped by `group_name` in the UI |
| `social_links` | Footer/contact links | Ordered by `sort_order` |

Every field beyond the essentials (`slug`/`title` for projects,
`institution`/`degree` for education) is optional — the layout adapts
gracefully when something is missing, and each section shows its own
"coming soon" message rather than breaking if a table is empty.

The schema, RLS policies (public read-only; writes happen through the
Supabase dashboard, never from the client) and seed data used for this
project are in `supabase/schema.sql`.

### Replacing the résumé PDF

Upload your PDF anywhere with a public URL (e.g. Supabase Storage, or keep
`public/resume/resume.pdf` and point `site_settings.resume_url` at it),
then set `resume_url` (and optionally `resume_file_name`) on the
`site_settings` row.

### If Supabase is unreachable or a table is empty

Every section fetches independently and fails independently — one broken
table never blanks the rest of the page. The hero, nav and footer fall
back to generic "YOUR NAME" placeholder text (never invented content) so
the page never renders visibly blank; other sections show a plain
"— will be added soon" message.

## Architecture

```
src/
  content/       # UI-only structural constants (nav labels/ids, the
                 # generic name fallback) — NOT content; see Supabase above
  lib/
    supabase.js  # Supabase client (env-configured)
    scrollTo.js  # anchor-nav smooth scroll, offset for the sticky navbar
  services/      # one thin fetch function per table — the only files
                 # that talk to Supabase
  hooks/
    usePortfolioData.jsx  # fetches everything once on load, in parallel;
                           # provides it via context to every section
    useActiveSection.js   # drives the navbar's active-link indicator
    useReducedMotion.js / useFinePointer.js / useScrollToTop.js
  pages/
    Home.jsx     # assembles all sections into the single scrolling page
    Project.jsx  # optional /work/:slug detail route, lazy-loaded
    NotFound.jsx # optional 404, lazy-loaded
  components/
    Sections/    # Hero, About, Education, Work, Currently, Resume, Contact
                 # — each id="..." for anchor scrolling
    Video/
      CinematicVideo.jsx   # large scroll-linked cinematic video layer
    Motion/
      ParametricGeometry.jsx  # code-generated deforming grid for About
                               # (no 4th video was provided)
    layout/      # Layout, Footer, Helmet
    navigation/  # Navbar, MobileMenu (anchor-scroll, not routed)
    ui/          # Line (signature motif), SectionLabel, RevealText,
                 # ArrowLink, Container, PlaceholderMedia
    animations/  # ScrollProgressLine, Cursor, PageTransition
    projects/    # ProjectListItem, ProjectFilter
    education/   # Timeline, TimelineItem
  assets/
    animations/  # building-construction / surveying-contours /
                  # data-analysis .mp4 + poster .jpg
```

The thin terracotta line is the site's one recurring visual motif —
`components/ui/Line.jsx` — reused as a divider, a timeline spine, a
scroll-progress indicator and a hover underline.

All motion respects `prefers-reduced-motion`; the site is fully usable and
legible with animation disabled.

## One continuous page

The primary route is `/`. There is no `/about`, `/education`, `/work`,
`/resume` or `/contact` route — those are sections on the same page,
reached by smooth-scrolling to `#about`, `#education`, etc. (see
`lib/scrollTo.js` and `hooks/useActiveSection.js`). The navbar and footer
both scroll to a section directly when already on `/`, or navigate to
`/#section-id` first when on another route (e.g. a project detail page).

`/work/:slug` remains available as an optional deeper read on a single
project, and a catch-all 404 route exists for anything else; both are
code-split and load lazily since the single-page experience is primary.

## Cinematic video layers

Three silent, looping visuals carry a quiet build → transform → map →
analyse narrative through the page:

| Section | Visual | Source |
| --- | --- | --- |
| Hero | Building construction | `building-construction.mp4` |
| About | Deforming parametric grid | code-generated SVG (`ParametricGeometry.jsx`) — no 4th video was provided |
| Education | Surveying / contour mesh | `surveying-contours.mp4` |
| Work | Data / network graph | `data-analysis.mp4` |
| Contact | The same contour mesh, extremely faint | `surveying-contours.mp4` |

`components/Video/CinematicVideo.jsx` renders every video layer
consistently:

- **Scroll-linked, not boxed.** Each layer is large and positioned to
  overlap into the text column rather than sitting beside it in a small
  rectangle. Opacity and scale are driven by how far the section has
  scrolled through the viewport (`framer-motion`'s `useScroll` +
  `useTransform` against a ref to the section), so adjacent sections
  naturally crossfade as one leaves and the next enters — there are no
  hard cuts. The hero additionally plays a one-time mount fade-in, since
  it's already fully visible at load with nothing to "scroll into".
- **Dissolves into the background.** `mix-blend-mode: screen` drops the
  video's near-black backdrop (the source files are pre-processed with a
  black-crush curve so this is seamless), and a separate vignette-overlay
  element — painted in the exact page background colour, not a CSS mask
  on the blended element itself — feathers the rectangular edges away.
  (Combining `mask-image` with `mix-blend-mode` on one element was tried
  first; it produces a visible dark halo in Chromium.)
- **Performance.** Only the hero video preloads eagerly
  (`preload="auto"`); the others use `preload="metadata"` and only start
  decoding once scrolled near-into view. An `IntersectionObserver`
  pauses every video once it's scrolled well out of view, independent of
  its (separate) scroll-linked opacity.
- **Reduced motion.** No `<video>` element is rendered at all — a static
  poster image takes its place at a fixed, lower opacity, and the layout
  is otherwise unchanged.

To swap a video, replace the `.mp4`/`-poster.jpg` pair in
`src/assets/animations/` (same filenames) — no component changes needed.

## Routes

```
/                  The single-page portfolio (Hero, About, Education,
                   Work, Currently, Resume, Contact — all one scroll)
/work/:slug        Optional project detail (lazy-loaded)
*                  404 (lazy-loaded)
```
