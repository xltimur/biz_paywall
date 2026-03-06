# 02-conventions.md

## File and folder naming

- **HTML**: Lowercase with hyphen for multi-word names where used (e.g. `landing.html`, `company.html`, `search.html`).
- **SCSS**: 
  - Partials prefixed with `_` (e.g. `_parametrs_new.scss`, `_header_new.scss`, `_footer_new.scss`, `_reset.scss`).
  - Entry or feature files without leading underscore: `main.scss`, `paywall.scss`, `landing_111225.scss`, `search.scss`, `card.scss`.
- **CSS**: Matches SCSS name without extension in `css/` (e.g. `paywall.css`, `general_new.css`). Some with `.min.css` (e.g. `contact.min.css`).
- **JS**: Lowercase with hyphen: `jquery.main.js`, `link-more.js`, `link-more.min.js`. Vendor: `jquery-3.7.0.min.js`, `swiper-bundle.min.js`.
- **Assets**: Themed folders: `landing_img/`, `paywall_img/`, `new_img/`, `images/`, `fonts/`, `new_fonts/`, `favicon/`.

## Naming patterns

- **CSS/SCSS classes**: 
  - BEM-like blocks: `.paywall-wrapper`, `.paywall-overlay`, `.paywall-popup`, `.result_list`, `.result_item`, `.contact_item`.
  - Modifiers: `.not_sticky`, `.fixed-paywall`, `.active`, `.title_mob`.
  - Section/block: `.section_box`, `.info_block`, `.company_contacts_block`, `.inner_section`.
- **IDs**: Used for targets and fragments: `#header`, `#main`, `#footer`, `#dialog-content`, `#officer_items`, `#annualReport_items`, `#succes`.
- **Scripts**: `initMobMenu`, `initScroll`, `initSlider`, `linkMore` — camelCase; globals used (e.g. `linkMore` called from server-rendered `onclick`).
- **No DTOs, repositories, or services** in this repo (frontend-only).

## HTML structure patterns

- **Document**: `<!DOCTYPE html>`, `lang="en"`, `<head>` (meta, title, favicon, preload, CSS), `<body>` with `class` for layout (e.g. `main new_promo`, or empty).
- **Header**: `<header id="header">` → `.container` → `.innert_head` → logo `<strong class="logo"><a href="/">`, search form (company/search) or nav (landing).
- **Main**: `<div id="main">` → `<section class="inner_section">` (or `.promo_section`, `.section`) → `.container` → content.
- **Footer**: `<footer id="footer" class="nw_footer">` → `.container` → `.logo_block`, `.copy_box`, nav and social links.
- **Paywall**: Wrapper `.paywall-wrapper` (optional `.not_sticky`), inner content block (e.g. `.paywall-contacts`, `.paywall-filing`, `.paywall-table`), then `.paywall-overlay` → `.paywall-popup` (heading, `.price_txt`, `.btn`).

## SCSS structure patterns

- **Imports**: Entry files import parametrs first, then fonts/reset, then components (e.g. `general_new.scss`: `_parametrs_new`, `_fonts_new`, `_reset`, `_header_new`; `paywall.scss`: `_parametrs`, `_fonts_new`).
- **Breakpoints**: Use the `breakpoint($rule)` mixin from `_parametrs_new` with variables: `$mobile-extra-small`, `$mobile-small`, `$mobile`, `$tablet-small`, `$tablet`, `$screen`, `$large-screen`, `$widescreen`.
- **Variables**: Colors (e.g. `$cl-white`, `$cl-blue`, `$cl-light_blue`), typography (`$font-family`), layout (`$container`, `$max-container`) in `_parametrs_new.scss`. Use these instead of magic numbers in new SCSS.
- **Nesting**: Block-level nesting for components (e.g. `.paywall-wrapper { .paywall-table { ... } }`); avoid deep nesting beyond 3–4 levels where possible.

## JavaScript patterns

- **jQuery**: `$(document).ready(...)` or `jQuery(function ($) { ... });` for init; event handlers use `.on('click touchstart', ...)` where needed for touch.
- **Globals**: `linkMore(item)` is global; invoked from HTML via `onclick="return linkMore(this)"` (or similar) on elements with `page`, `child-type`, `data-recipient` attributes. No module bundler in repo.
- **Inline scripts**: Used for page-specific behavior (e.g. search sticky paywall, landing Fancybox bind and form close). Keep short and in English.

## HTTP, forms, and “load more”

- **Forms**: Search uses `<form action="/search" class="search_form">` with `name="userInput"`. Landing popup form uses `action="#"`; submission target is not in repo.
- **XHR**: `link-more.js` uses `XMLHttpRequest`, GET to `window.location.href + '/' + childType + '?page=' + page`, expects HTML fragment; appends to `document.getElementById(dataRecipient)` and respects `hasMore` attribute on returned node.
- **No fetch/axios or API client layer** in repo; no centralized error or loading UI.

## Rule of thumb for new code

1. **New page**: Add HTML with same head/footer pattern; reuse `#header` and `#footer` structure and link the same CSS bundle pattern (general, then feature, then paywall if needed).
2. **New paywalled block**: Wrap in `.paywall-wrapper`, add content block with a class that matches JSON-LD `cssSelector` if used, then `.paywall-overlay` and `.paywall-popup`; reuse existing paywall SCSS.
3. **New SCSS**: Create partial `_*.scss` if shared, or feature file; import `_parametrs_new` (or `_parametrs` if aligned with older files); use variables and `breakpoint()` mixin.
4. **New JS**: Add to `js/` with lowercase-hyphen name; if “load more” pattern, ensure HTML has `page`, `child-type`, `data-recipient` and calls `linkMore(this)`.
5. **Assets**: Place in the appropriate folder (`paywall_img/`, `landing_img/`, etc.) and reference by relative path from HTML or SCSS.
