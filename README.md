# Christian Keough — Portfolio

A personal engineering portfolio built with React, TypeScript, Vite, Tailwind CSS, and
lucide-react. Everything is open source and free to host.

---

## 1. Install

Requires [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install
```

## 2. Run the development server

```bash
npm run dev
```

Open the URL it prints (usually `http://localhost:5173`). The page reloads as you edit.

## 3. Where to edit your information

**Everything is in one file: `src/data/portfolio.ts`.** You should not need to touch any
component to change content.

| What you want to change | Where in `src/data/portfolio.ts` |
| --- | --- |
| Name, headline, university, graduation date | `profile` |
| Email, LinkedIn, GitHub, résumé path | `contact` |
| Page title and meta description | `seo` |
| About paragraph and the facts table | `about` |
| The three focus areas | `focusAreas` |
| The four project case studies | `projects` |
| Research lab, role, dates, bullets | `research` |
| GRP and Design Build Fly entries | `organizations` |
| "Where My Experience Connects" copy | `connections` |
| Skill lists | `skillGroups`, `developingInterests` |
| "Currently Exploring" topics | `exploring` |
| Nav tabs | `navLinks` |
| Nav logo (null = placeholder) | `profile.logo` |

### Placeholders

Any text wrapped in double square brackets renders on the page as a marked chip:

```ts
location: '[[ADD CITY, STATE]]',
```

That makes unfinished content impossible to miss. Delete the brackets once you've written the
real text. Before publishing, search the file for `[[` and make sure nothing is left.

## 4. How to add project images

1. Put your files in `public/images/` (create the folder). PNG, JPG, and WebP all work.
2. In `src/data/portfolio.ts`, find the project's `images` array and set `src`:

```ts
{
  src: '/images/brace-render.png',   // was: null
  placeholder: 'Add canine brace final SolidWorks render',
  alt: 'SolidWorks render of the canine orthopedic brace concept',
  caption: 'Final CAD render — isometric view',
}
```

While `src` is `null`, a labelled placeholder frame is shown instead. Once `src` is set, the
image becomes click-to-expand in a gallery viewer (arrow keys and Escape work).

Always write real `alt` text — it's what screen readers announce.

**Recommended:** resize images to roughly 1600 px wide before adding them, and use WebP where you
can. Large unoptimised photos are the main thing that will slow the site down.

## 5. How to add your résumé

Save your PDF as `public/resume.pdf`. Every "View Résumé" and "Download PDF" button points there.

To use a different filename, change `contact.resume` in `src/data/portfolio.ts`.

## 6. How to add or remove projects

`projects` is an array. Copy an existing entry, change the `slug` (it must be unique — it becomes
the anchor link), and fill in the fields. Delete an entry to remove it.

The layout automatically rotates through four different arrangements based on position in the
array, so projects don't all look the same. Reordering the array reshuffles which layout each one
gets.

## 7. How to edit organization entries

`organizations` is an array of the same shape. `details` is a list of `{ label, value }` rows
rendered as a table — add or remove rows freely. `notes` renders the publication reminders; delete
a note once it no longer applies.

## 8. Connecting GitHub, LinkedIn, and email

In `contact`:

```ts
email: 'you@example.com',
linkedin: 'https://www.linkedin.com/in/your-handle',
github: 'https://github.com/your-handle',
```

The email button opens a new draft via `mailto:`. Until a value is filled in, the site shows the
placeholder instead of a dead link.

## 9. Deploy to Vercel (free)

1. Push this folder to a GitHub repository.
2. Go to [vercel.com](https://vercel.com), sign in with GitHub, and import the repo.
3. Vercel detects Vite automatically — build command `npm run build`, output directory `dist`.
4. Deploy. Every push to your default branch redeploys.

No configuration needed. Leave `BASE_PATH` unset.

## 10. Deploy to GitHub Pages (free)

GitHub Pages serves a project site from `https://<user>.github.io/<repo>/`, so the asset paths
need a prefix. `vite.config.ts` reads it from the `BASE_PATH` environment variable.

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run build
        env:
          BASE_PATH: /YOUR-REPO-NAME/
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Replace `YOUR-REPO-NAME`, then in the repo go to **Settings → Pages** and set the source to
**GitHub Actions**.

If you use a custom domain or a `<user>.github.io` user site, leave `BASE_PATH` unset.

## 11. Check the production build locally

```bash
npm run build
```

```bash
npm run preview
```

`build` runs the TypeScript compiler first, so type errors fail the build. `preview` serves the
real `dist/` output on a local port — always check this before deploying.

## 12. Placeholders still to complete

Run this to list every remaining placeholder:

```bash
npm run todo
```

The main groups are:

- **Personal:** email, LinkedIn, GitHub, city/state, expected graduation, deployed site URL
- **Research:** lab name, university, official role, dates
- **Organizations:** membership dates, chapter/team names, subteams, responsibilities
- **Every project:** context, objective, requirements, constraints, your exact role, a specific
  iteration, tools, result/status, and lessons
- **All images:** every project and organization image is currently an empty placeholder frame
- **Résumé:** `public/resume.pdf` does not exist yet
- **Open Graph image:** `public/og-image.png` does not exist yet (1200×630 px)

---

## Pre-publication checklist

- [ ] Verify every technical claim.
- [ ] Confirm your official organization names and roles.
- [ ] Confirm the correct capitalization of Generational Relief in Prosthetics.
- [ ] Confirm your Design Build Fly team and competition information.
- [ ] Clearly identify concepts that were not manufactured or tested.
- [ ] Remove unused placeholders.
- [ ] Check spelling and grammar.
- [ ] Confirm that résumé and contact links work.
- [ ] Test the site on desktop and mobile.
- [ ] Use only your own images or properly licensed assets.
- [ ] Obtain permission before publishing organization or team images.
- [ ] Do not publish information identifying children or prosthetic recipients.
- [ ] Remove confidential or unpublished research information.
- [ ] Obtain approval before publishing research code, data, or screenshots.
- [ ] Do not imply clinical validation.
- [ ] Do not claim that you designed the entire Design Build Fly aircraft.

---

## Project structure

```
portfolio-website/
├── index.html                  Page shell, title, meta and Open Graph tags
├── vite.config.ts              Build config; BASE_PATH for GitHub Pages
├── public/
│   ├── favicon.svg             Placeholder favicon
│   ├── resume.pdf              ← add this
│   ├── og-image.png            ← add this (1200×630)
│   └── images/                 ← add your project images here
├── scripts/
│   ├── todo.mjs                Lists remaining [[placeholders]]
│   └── save-clipboard-image.ps1  Saves a clipboard image into public/images
└── src/
    ├── main.tsx
    ├── index.css               Colours, fonts, print and reduced-motion rules
    ├── App.tsx                 Route table
    ├── data/
    │   └── portfolio.ts        ★ ALL CONTENT LIVES HERE
    ├── lib/
    │   ├── router.ts           Tiny hash router (no dependency)
    │   └── placeholders.ts     Detects [[unfinished]] content
    ├── pages/
    │   ├── Home.tsx            Hero + project image grid
    │   ├── Projects.tsx        Project index
    │   ├── ProjectDetail.tsx   One project's full case study
    │   ├── AboutPage.tsx       About, focus areas, research, orgs, skills
    │   └── ContactPage.tsx     Contact + résumé
    └── components/
        ├── Nav.tsx             Logo slot + four tabs + résumé buttons
        ├── Hero.tsx
        ├── HeroDiagram.tsx     Decorative drafting illustration
        ├── ProjectGrid.tsx     Image tiles linking to project pages
        ├── ProjectCaseStudy.tsx  Four rotating layout variants
        ├── ResumeViewer.tsx    In-page résumé overlay
        ├── About.tsx
        ├── FocusAreas.tsx
        ├── Research.tsx
        ├── Organizations.tsx
        ├── Connections.tsx
        ├── Skills.tsx
        ├── Exploring.tsx
        ├── Resume.tsx
        ├── Contact.tsx
        ├── Footer.tsx
        └── ui/
            ├── Section.tsx     Section shell and headings
            ├── Txt.tsx         Renders [[placeholders]] as visible chips
            ├── Gallery.tsx     Image frames and the expand viewer
            ├── Note.tsx        Publication/confidentiality reminders
            ├── ContactLink.tsx Links that stay safe while unfilled
            ├── BrandIcons.tsx  GitHub and LinkedIn glyphs
            └── Reveal.tsx      Fade-in on scroll
```

## Routing

The site has five routes, using a small hash router (`src/lib/router.ts`):

| URL | Page |
| --- | --- |
| `#/` | Home — hero and project image grid |
| `#/projects` | All projects |
| `#/projects/<slug>` | One project's case study |
| `#/about` | About Me |
| `#/contact` | Contact and résumé |

Hash URLs were chosen deliberately: they work on Vercel, GitHub Pages, and any
static host with **no server configuration**. Clean paths like `/projects` would
need SPA fallback rules set up per host, and a missing rule means a 404 on refresh.

A project's `slug` in `src/data/portfolio.ts` becomes its URL, so changing a slug
changes that project's link.

## Adding a logo

Drop a file in `public/` (SVG is best) and set `profile.logo` to `'/logo.svg'` in
the data file. Until then the nav shows a dashed `LOGO` placeholder that already
works as a home button.

## Saving images from the clipboard

Snip an image (Win+Shift+S) or copy one, then:

```bash
powershell -File scripts/save-clipboard-image.ps1 canine-brace-assembly
```

It saves as PNG into `public/images/` with that name. Faster than fighting a
Save-As dialog for each file.

## Accessibility and SEO notes

- Semantic landmarks, one `h1`, ordered headings, and a skip-to-content link.
- Visible focus rings on every interactive element; the image viewer is keyboard-operable.
- `prefers-reduced-motion` disables the scroll fades and smooth scrolling.
- A print stylesheet hides navigation and buttons and expands link URLs, so any project page
  prints cleanly.
- Title, description, and Open Graph tags are in `index.html`. Update `seo.siteUrl` in the data
  file and the `og:image` path once deployed.
