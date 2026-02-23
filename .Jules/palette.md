## 2026-02-23 - Interactive Element Visibility
**Learning:** Elements hidden with `opacity-0` for hover effects become inaccessible to keyboard users as they remain invisible on focus.
**Action:** Always include `focus-within:opacity-100` (or `focus-visible`) alongside `group-hover:opacity-100` to ensure keyboard accessibility.
