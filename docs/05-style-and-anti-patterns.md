# 05-style-and-anti-patterns.md

## Style rules inferred from the codebase

- **SCSS**: Prefer variables from `_parametrs_new.scss` for colors, spacing, and breakpoints; use `@include breakpoint($var)` for media queries; keep nesting shallow.
- **HTML**: Use semantic sections (`header`, `main`, `footer`, `section`), consistent class names (BEM-like), and stable IDs for fragments and JS targets.
- **JS**: Use jQuery for DOM/events where the page already depends on it; keep inline scripts minimal and in English.
- **Comments**: In-repo comments are mixed (some English, some Russian in JSON-LD). **Standard going forward: English only** (see prohibited patterns).
- **Naming**: Clear, descriptive names (e.g. `paywall-wrapper`, `result_item`, `initMobMenu`); avoid single-letter or cryptic identifiers except in minified vendor code.

---

## Prohibited patterns

These are rules for **new and modified code**; existing violations are legacy and should not be copied.

1. **Magic numbers**
   - Do not hardcode layout widths, breakpoints, or color hex values when a variable exists in `_parametrs_new.scss` (or `_parametrs.scss`). Use `$container`, `$mobile`, `$tablet`, `$cl-*`, etc.
   - Exception: one-off values in a single component with a short comment are acceptable if no shared variable is appropriate.

2. **Duplicate code where reuse exists**
   - Do not duplicate paywall markup/structure; use the existing `.paywall-wrapper` + overlay + popup pattern and existing SCSS.
   - Do not duplicate header/footer markup without reason; keep structure aligned with existing pages.
   - Use existing utilities (breakpoint mixin, color variables, `linkMore`) instead of reimplementing.

3. **Comments and inline docs**
   - All comments and inline documentation **must** be in English. New JSON-LD or script comments must not be in Russian or other languages unless explicitly required for localization.

4. **Misleading or cryptic names**
   - Avoid names that do not reflect purpose (e.g. `nf_icon-1` for assets is acceptable; avoid similar vagueness in class/function names). Prefer `paywall-overlay` over `overlay1`, and `initMobMenu` over `init1`.

5. **Ad-hoc structure bypassing existing patterns**
   - Do not introduce a new paywall layout (e.g. different wrapper/overlay structure) without aligning with existing `paywall.scss` and HTML pattern.
   - Do not add a new “load more” mechanism that ignores `linkMore` and the `page` / `child-type` / `data-recipient` contract unless there is a documented reason.
   - Do not add new global CSS that overrides shared components (header, footer, paywall) without updating the shared partials or documenting the exception.

6. **Inline styles for layout/theme**
   - Prefer classes and SCSS for layout and colors. Inline `style` is used in the repo for hidden popups (`display: none`) and occasional one-offs; do not use inline styles for typography, spacing, or colors that belong in the design system.

7. **Broken or inconsistent links**
   - Internal links should use the same path style as existing pages (e.g. `/search`, `/about-us`, `/contactus`). Avoid `href="#"` for primary actions except where JS handles the action (e.g. Fancybox); document any exception.

---

## Legacy exceptions (do not copy)

- **Russian in JSON-LD**: `company.html` and `search.html` contain Russian comments (e.g. "разметка paywall", "класс платного блока"). These are legacy; new or updated schema comments must be in English.
- **Mixed jQuery sources**: Company uses local jQuery; landing and search use CDN. Prefer one approach for new pages (TODO: clarify with tech lead).
- **Inconsistent footer copy**: "Bizprofile, Inc." vs "Outer Alignment Media Inc." in footer; unify when touching footer content.
- **Form `action="#"`** on landing popup: Backend not in repo; do not replicate for new forms without a defined endpoint.
