# 03-reuse-catalog.md

Catalog of reusable building blocks present in the repo. Use these to stay DRY and consistent.

---

## Shared UI components (markup + styles)

| Item | Location | When to use |
|------|----------|-------------|
| **Header** | Same structure in all three HTML files; styles in `_header_new.scss`, `_header.scss` | Every top-level page. Logo, search form (company/search), or main nav (landing). |
| **Footer** | Repeated in landing, company, search; styles in `_footer_new.scss` | Every page. Logo block, short copy, foot nav (Home, About, Get in touch), terms (Privacy, Terms), email, social links. |
| **Paywall wrapper** | `.paywall-wrapper`, `.paywall-overlay`, `.paywall-popup` in `paywall.scss`; HTML pattern in company.html and search.html | Any block that should be blurred and covered by a “Get Premium” CTA. Add `.not_sticky` on company-style pages to avoid fixed overlay. |
| **Paywall content blocks** | `.paywall-contacts`, `.paywall-filing`, `.paywall-table` | Mark the gated content; match JSON-LD `cssSelector` if you add schema. |
| **Container** | `.container` (width constrained by `$container` / `$max-container` in SCSS) | Wrap main content in header, sections, footer. |
| **Section box** | `.section_box`, variants `.bg_light_blue`, `.bg_blue`, `.bg_grey_5` | Card-like content blocks (e.g. company description, filing info). |
| **Buttons** | `.btn`, `.btn_form`, `.green_btn` | Primary CTAs; green for secondary/download actions. |
| **Result list (table-like)** | `.result_list`, `.item_title`, `.result_item`, `.result_title`, `.result_address`, etc. in `_results_list.scss` / card.scss | Search results and filing tables. |
| **Contact list** | `.contact_list`, `.contact_item`, icons `.icon-point`, `.icon-mail`, `.icon-user` | Company contacts (principal/mailing/agent/officer). |
| **Breadcrumbs** | `ul.breadcrumbs` with `itemscope`/`itemtype` BreadcrumbList | Company (and any hierarchical) pages. |
| **Tags / flags** | `.flag.active`, `.date`, `.tags_list` | Status and date next to company name. |

---

## Layout components

| Item | Location | When to use |
|------|----------|-------------|
| **General layout** | `general_new.scss` (imports reset, header), `general.css` | Base layout and header for “new” pages (landing). |
| **Main layout** | `main.scss`, `main_new.scss` | Legacy vs new main content layout (promo sections, about block). |
| **Inner section** | `.inner_section`, `.container` | Standard page content wrapper. |

---

## Shared hooks / services / helpers

| Item | Location | When to use |
|------|----------|-------------|
| **linkMore** | `js/link-more.js`, `js/link-more.min.js` | “Load more” for server-rendered fragments. Element must have `page`, `child-type`, `data-recipient`; backend returns HTML fragment and optional `hasMore` on root node. |
| **initMobMenu** | `jquery.main.js` | Mobile menu toggle (`.open_nav`, `.close_menu`, `.list_nav > li > a`). Include when page has this markup. |
| **initScroll** | `jquery.main.js` | Scroll-related behavior. Use if page uses it. |
| **initSlider** | `jquery.init-slider.js` | Swiper for `.news_list` and `.list_team`. Use on pages with those containers. |
| **Sticky paywall** | Inline in search.html | Adds `.fixed-paywall` on scroll. Reuse the same pattern if another page needs a sticky paywall overlay (and do not add `.not_sticky`). |

---

## Shared validators

- **None in repo.** Form validation (e.g. email on landing) is not implemented in the provided JS; backend handling is outside the repo.

---

## API clients / SDK wrappers

- **None.** No REST client, Stripe SDK, or other API wrapper in the repo. Forms and link-more XHR target the same origin.

---

## Utility modules (SCSS/JS)

| Item | Location | When to use |
|------|----------|-------------|
| **Breakpoint mixin** | `_parametrs_new.scss`: `@mixin breakpoint($rule)` | All responsive rules; use with `$mobile`, `$tablet`, etc. |
| **rem mixin** | `_parametrs_new.scss`: `@mixin rem($rule)` | When min-width media is needed with +1 offset. |
| **Color variables** | `_parametrs_new.scss`: `$cl-*`, `$bg-*` | All colors to avoid magic values. |
| **Font family** | `$font-family` in `_parametrs_new.scss` | Typography. |
| **Reset** | `_reset.scss` (imported via general_new) | Base reset for “new” pages. |

---

## Third-party libs (in-repo or CDN)

| Item | How included | When to use |
|------|--------------|-------------|
| **jQuery** | CDN (landing, search), or local `jquery-3.7.0.min.js` (company) | DOM and events; required for Fancybox and inline paywall script on search. |
| **Fancybox** | CDN (landing) | Modal for “Get Premium” dialog and success popup. |
| **Swiper** | `js/swiper-bundle.min.js` | Carousels (news, team) where `.news_list` / `.list_team` exist. |

Use these instead of introducing new libraries for the same purpose.
