
## 2025-03-15 - Missing ARIA Labels and Focus States on Icon Buttons
**Learning:** Found a common pattern where icon-only buttons rely on hover states (sometimes `opacity-0` with `group-hover:opacity-100`) to become visible but lack both `aria-label`s and focus indicators. This breaks screen reader accessibility and makes keyboard navigation difficult or impossible because elements are visually hidden during focus.
**Action:** Always add `aria-label` and `focus-visible:ring-2 focus-visible:outline-none` to icon-only buttons. When elements are hidden until hovered (`opacity-0`), also ensure they become visible when focused using `focus-within:opacity-100` or similar utilities.
