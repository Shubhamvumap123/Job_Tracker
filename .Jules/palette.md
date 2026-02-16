## 2026-02-16 - Accessibility Gaps in Forms and Buttons
**Learning:** The application consistently uses icon-only buttons (Edit, Delete, Close, View Toggle) without accessible names, and form inputs are visually labeled but not programmatically associated.
**Action:** When creating new components, always include `aria-label` for icon-only buttons and ensure inputs have `id` attributes matching their label's `htmlFor`.
