## 2024-03-14 - Keyboard Visibility of Hidden Actions
**Learning:** Actions hidden via `opacity-0 group-hover:opacity-100` break keyboard navigation visibility unless paired with `focus-within:opacity-100` or `focus-visible` to ensure they are visible when navigated to via keyboard.
**Action:** Always pair hover-revealed element actions with `focus-within` styles to maintain accessibility for keyboard users.
