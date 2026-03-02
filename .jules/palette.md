## 2025-03-02 - Keyboard accessibility for hidden UI elements
**Learning:** Interactive elements hidden behind `opacity-0` for cleaner UI (like row action buttons) are completely invisible to keyboard-only users who tab to them, breaking the UX. The app's design system uses this pattern in tables/lists.
**Action:** Always pair `opacity-0` with `focus-within:opacity-100` (or `focus-visible:opacity-100`) on parent containers, and ensure icon-only buttons include `aria-label` and `focus-visible:ring-2` to guarantee they become visible and identifiable when receiving focus.
