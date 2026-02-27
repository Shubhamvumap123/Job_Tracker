## 2024-05-24 - Hidden Actions Accessibility
**Learning:** Interactive elements that are visually hidden until hovered (using `opacity-0`) are inaccessible to keyboard users as they cannot see what they are focusing on.
**Action:** Always include `focus-within:opacity-100` (or `focus-visible`) alongside `hover:opacity-100` to ensure controls become visible when navigated to via keyboard.
