# 01-architecture.md

## Implemented architecture

This repository contains **frontend-only** static assets. There are no application layers (e.g. Domain, Application, Infrastructure) in the codebase; the “architecture” is the structure of pages, shared styles, and scripts.

### Layers (conceptual)

| Layer | Contents |
|-------|----------|
| **Presentation (HTML)** | `landing.html`, `company.html`, `search.html` — full-page markup, semantic sections, paywall wrappers. |
| **Styles (SCSS/CSS)** | `scss/` (partials and entry SCSS files), `css/` (compiled output). Variables and breakpoints in `_parametrs_new.scss` / `_parametrs.scss`. |
| **Scripts (JS)** | `js/jquery.main.js`, `js/jquery.init-slider.js`, `js/link-more.js` (and min), plus CDN: jQuery, Fancybox, Swiper. Inline script on `search.html` for sticky paywall. |
| **Assets** | Images, fonts, favicon in dedicated folders; referenced by URL in HTML and SCSS. |

Backend (routing, search, company data, paywall logic, email handling) is **not** in this repo.

### Modules / domains (by page and shared assets)

- **Landing** — Premium promo: hero, feature list, CTA, email popup, footer. Uses `general_new.css`, `landing_111225.css`, Fancybox.
- **Company** — Profile: header, breadcrumbs, filing info, paywalled contacts and filing blocks, document list, “other companies”, footer. Uses `general.css`, `states.css`, `card.css`, `paywall.css`, `link-more.min.js`.
- **Search** — Results list with paywalled table and sticky overlay. Uses `general.css`, `search.css`, `pagination_new.css`, `paywall.css`, `_fonts_new.css`, `_footer_new.css`; inline jQuery for fixed paywall.
- **Shared** — Header (`_header_new.scss` / `_header.scss`), footer (`_footer_new.scss` / `_footer.scss`), paywall component (`.paywall-wrapper`, `.paywall-overlay`, `.paywall-popup` in `paywall.scss`), design tokens (`_parametrs_new.scss`).

### Dependency rules

- SCSS partials depend on `_parametrs_new` or `_parametrs` for variables/mixins; `paywall.scss` also imports `_fonts_new`.
- HTML pages do not share a common template engine in-repo; header/footer are duplicated across pages (same structure, minor variants).
- Scripts: landing uses Fancybox + small inline script; company uses `link-more`; search uses inline scroll handler. No shared app bundle.

---

## Diagrams

### Modules and dependencies (high-level)

```mermaid
flowchart LR
  subgraph Pages
    L[landing.html]
    C[company.html]
    S[search.html]
  end

  subgraph Styles
    P[_parametrs_new]
    H[_header_new]
    F[_footer_new]
    PW[paywall.scss]
    GN[general_new]
    LN[landing_111225]
    G[general.css]
    ST[states.css]
    CR[card.css]
    SE[search.css]
    PG[paywall.css]
  end

  subgraph Scripts
    JQ[jQuery CDN]
    FB[Fancybox CDN]
    LM[link-more.js]
  end

  L --> GN
  L --> LN
  L --> JQ
  L --> FB

  C --> G
  C --> ST
  C --> CR
  C --> PG
  C --> LM

  S --> G
  S --> SE
  S --> PG
  S --> JQ

  PW --> P
  H --> P
  F --> P
```

### Request / response and paywall flow

```mermaid
sequenceDiagram
  participant U as User
  participant B as Browser
  participant S as Server (external)
  participant Static as static.bizprofile.net

  U->>B: Open URL (landing / company / search)
  B->>S: GET page
  S->>B: HTML + links to css/js
  B->>B: Load CSS, apply paywall blur/overlay
  U->>B: Scroll (search) / Click CTA (landing/company)
  alt Search page
    B->>B: Add .fixed-paywall class (sticky overlay)
  else Landing
    B->>B: Fancybox.open(#dialog-content), submit form
    Note over B,S: Form action="#" — backend not in repo
  else Company
    B->>B: Optional: linkMore() XHR
    B->>S: GET /{childType}?page=N
    S->>B: HTML fragment
    B->>B: Append to data-recipient
  end
  U->>B: Click PDF link
  B->>Static: GET PDF
  Static->>B: PDF file
```

Only flows that are implemented in the repo are shown; server and payment flows are outside the repo.
