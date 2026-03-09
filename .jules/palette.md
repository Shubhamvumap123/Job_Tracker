## 2024-03-09 - Ensure visually hidden interactive elements are accessible
**Learning:** Hiding icon buttons visually until hover (e.g., `opacity-0 group-hover:opacity-100`) makes them completely inaccessible for keyboard users if they do not also appear on focus.
**Action:** Always pair `group-hover:opacity-100` with `focus-within:opacity-100` on their container (or `focus-visible` on the element itself) to ensure interactive elements are visible and usable when navigating via keyboard.
