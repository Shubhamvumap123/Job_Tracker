## 2025-02-27 - [Modal Form Accessibility]
**Learning:** Modal components like `CreateTicket` were missing standard form accessibility features (proper labels, native form submission, aria-labels).
**Action:** When creating or refactoring modal forms, always wrap inputs in a `<form>` element to enable Enter-key submission, and explicitly associate labels with inputs using `htmlFor`/`id`. Use `type="submit"` for primary action buttons.
