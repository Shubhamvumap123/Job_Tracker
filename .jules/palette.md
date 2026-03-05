## 2024-03-05 - Accessibility improvements for icon-only buttons
**Learning:** Icon-only buttons without `aria-label`s are not accessible to screen readers, and hiding interactive elements with `opacity-0` without providing a focus state makes them inaccessible via keyboard navigation.
**Action:** Always add `aria-label` to icon-only buttons and use `focus-within:opacity-100` or `focus-visible:opacity-100` when hiding interactive elements.
