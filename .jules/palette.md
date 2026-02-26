## 2026-02-26 - Keyboard Accessibility for Hidden Actions
**Learning:** Actions hidden via `opacity-0` (e.g., on hover) are invisible to keyboard users even when focused.
**Action:** Always add `focus-within:opacity-100` (or `focus-visible:opacity-100`) to the container of such actions to ensure they become visible when a user tabs into them.
