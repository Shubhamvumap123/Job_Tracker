## 2025-05-24 - Accessibility Gap in Icon Buttons
**Learning:** The application consistently uses icon-only buttons (like Edit/Delete/Close) without accessible names or tooltips. This makes navigation impossible for screen reader users and confusing for mouse users.
**Action:** Always include `aria-label` for icon buttons, and consider adding `title` for hover tooltips to benefit all users.
