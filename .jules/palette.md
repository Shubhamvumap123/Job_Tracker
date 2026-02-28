## 2024-02-28 - [Accessible Hidden Actions]
**Learning:** Interactive elements that are visually hidden until hovered (using `opacity-0`) must include `focus-within:opacity-100` (or `focus-visible`) to ensure they are visible when navigated to via keyboard.
**Action:** Always test hover-only interactive patterns with keyboard navigation to ensure focusability and visibility.
