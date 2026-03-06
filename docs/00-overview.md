# 00-overview.md

## Project summary

- **Project**: Bizprofile — frontend assets for a US business-entity directory and premium paywall experience.
- **Goal**: Present company profiles, search results, and a Premium landing; gate full contacts and filing details behind a paywall (Premium $99/year).
- **Workflow**: Users browse the site (landing, search, company pages); unauthenticated users see blurred/overlay paywall blocks; CTA leads to “Get Premium” (landing uses a Fancybox dialog for email capture).
- **Audience**: End users of bizprofile.net; developers/designers maintaining static HTML/CSS/JS and SCSS.

## Tech stack

| Layer | Technology |
|-------|------------|
| **Markup** | HTML5 (static files) |
| **Styles** | SCSS (source), CSS (compiled); design tokens and breakpoints in `scss/_parametrs_new.scss` |
| **Scripts** | Vanilla JS + jQuery 3.7.x (CDN); Fancybox 6.1 (CDN); Swiper (bundled); custom `link-more.js` for XHR “load more” |
| **Fonts** | Overused Grotesk (local), Inter (Google Fonts on landing), DMSans (local on company/search) |
| **Backend / build** | Not in this repository. HTML is served by an external application; SCSS compilation is not configured in-repo. |

## Runtime environments

- **Browser**: Production site runs at https://www.bizprofile.net/ (references in HTML/meta).
- **Local**: Static files can be opened via file or any static server; forms and “load more” target the same origin (assumed to be the same server in production).
- **TODO**: Clarify with tech lead where and how SCSS is compiled (e.g. CI, local sass CLI, or other build pipeline).

## Main entrypoints

- **`landing.html`** — Premium promo/landing: hero, “What You Get”, CTA “Get Premium — $99/year” opening Fancybox dialog (#dialog-content) for email; footer.
- **`company.html`** — Company profile: header with search form, breadcrumbs, company name, filing info table, paywalled “Company Contacts” and “Filing” sections (blur + overlay + popup), document history, “Other companies”; uses `link-more.min.js` for optional “load more” fragments.
- **`search.html`** — Search results: header, query title, paywalled results table (`.paywall-table`), inline script for sticky paywall on scroll; footer with nav/links.

No SPA router: each entrypoint is a full HTML page. No CLI, queues, or workers in this repo.

## High-level data flow

1. **Request**: User opens a URL → server (outside repo) serves the corresponding HTML (landing / company / search).
2. **Page load**: Browser loads linked CSS (from `css/`) and JS (from `js/` or CDN); layout and paywall styling apply.
3. **Interactions**:
   - **Search**: Form `action="/search"`, `name="userInput"` → GET/POST to backend (not in repo).
   - **Landing**: “Get Premium” → Fancybox opens inline form; submit `action="#"` — backend handling not in repo (TODO: clarify).
   - **Company “load more”**: `linkMore()` XHR to `window.location.href + '/' + childType + '?page=' + page`, appends HTML into `data-recipient` element; backend returns fragment HTML.
4. **Persistence / external services**: None implemented in this repo. PDFs linked from `https://static.bizprofile.net/`; main site links to bizprofile.net routes.

## Repository layout

- **Monolith**: Single frontend codebase; no monorepo, no `package.json` or workspace packages in the repo.
- **Folders**: `css/` (compiled CSS), `scss/` (sources), `js/`, `images/`, `new_img/`, `landing_img/`, `paywall_img/`, `fonts/`, `new_fonts/`, `favicon/`, `lib/`, `css_external/`, `img_for_new_footer/`.
