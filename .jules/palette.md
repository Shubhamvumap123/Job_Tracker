## 2024-05-23 - Hidden Actions Accessibility
**Learning:** Hidden actions (like buttons that appear on hover) must be reachable and visible via keyboard navigation. Using `opacity-0` without `focus-within:opacity-100` makes these actions invisible to keyboard users even when they receive focus.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` (or `focus-visible`) for container elements that hide interactive children.
