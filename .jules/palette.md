## 2026-03-07 - Hover-Only Actions and Keyboard Visibility
**Learning:** Elements using `opacity-0` with `group-hover:opacity-100` for visual decluttering completely disappear from keyboard users, hiding critical actions (like Edit/Delete) even when focused.
**Action:** Always include `focus-within:opacity-100` alongside hover-triggered opacity transitions on parent containers to ensure child elements become visible when keyboard users tab into them.
