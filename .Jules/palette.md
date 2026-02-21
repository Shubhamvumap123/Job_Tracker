## 2024-05-22 - Accessibility Enhancements
**Learning:** Found multiple instances of icon-only buttons (close, edit, delete) lacking `aria-label`s, which is a critical accessibility issue. Also found forms implemented with `div`s instead of `<form>` tags.
**Action:** Always check for `aria-label` on icon-only buttons and ensure input fields are wrapped in semantic `<form>` tags.
