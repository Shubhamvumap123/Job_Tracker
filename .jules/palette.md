## 2024-05-20 - Ensure interactive elements are keyboard accessible
**Learning:** Icon-only buttons with `opacity-0` visually hide the element, which makes it invisible when navigating with keyboard if only `group-hover:opacity-100` is applied.
**Action:** Always add `focus-within:opacity-100` (or `focus-visible:opacity-100`) to containers of hidden interactive elements to ensure they appear on keyboard focus. Add `aria-label` to icon-only buttons.
