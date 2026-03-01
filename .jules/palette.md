## 2024-03-01 - Icon Accessibility Pattern
**Learning:** Found multiple instances of icon-only buttons (like Edit/Delete) lacking `aria-label` attributes and keyboard focus visibility (`focus-within` or `focus-visible`), particularly when hidden behind `opacity-0` until hover.
**Action:** Ensure all icon-only buttons receive descriptive `aria-label` attributes and proper keyboard focus states. When hiding actions until hover, add `focus-within:opacity-100` to the parent container to support keyboard navigation.
