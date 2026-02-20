# Palette's Journal

## 2026-02-20 - Invisible Form Labels Pattern
**Learning:** Found multiple form inputs (inputs, selects, textareas) in `CreateTicket` and `EditTicket` that were visually labeled but lacked programmatic association (`htmlFor` + `id`). This makes them inaccessible to screen readers despite looking correct. Also found `FilterBar` inputs relying solely on placeholders without accessible names.
**Action:** Always verify `htmlFor` matches `id` in React forms, and use `aria-label` for inputs where visual labels are hidden or implicit (like search bars and filter selects).
