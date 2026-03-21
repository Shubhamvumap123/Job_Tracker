## 2025-03-18 - [Accessibility] Fix Icon-only Button Keyboard Navigation
**Learning:** For interactive icon-only elements contained in a row/card that are visually hidden via `opacity-0` until hovered, you must also use `focus-within:opacity-100` on the container so they become visible during keyboard navigation. In addition, they must always include explicit `aria-label` attributes and clear `focus-visible` ring indicators.
**Action:** Ensure that any element using hover-based opacity for visibility also includes focus-within rules for accessibility. Always add `aria-label`s to icon-only buttons.

## 2025-03-20 - [UX Feedback] Visual Feedback for Asynchronous Operations
**Learning:** In React applications, especially those managing forms (like Create/Edit Ticket modals), users need immediate visual feedback when submitting data to prevent confusion and multiple submissions. Relying solely on disabled states or changing text isn't as effective as pairing it with a visual indicator like a spinning loader icon.
**Action:** Always include a visual loading indicator (e.g., `Loader2` from `lucide-react` with `animate-spin`) within submit buttons alongside disabled states and text updates during asynchronous API calls.

## 2025-03-21 - [Accessibility] Improve Custom Modal Forms
**Learning:** Custom modals containing interactive inputs must be wrapped in a `<form>` element rather than a basic `<div>` to support native form submissions (e.g., submitting the form by pressing Enter) and to provide semantic meaning. Additionally, `id` and `htmlFor` bindings must be explicitly provided for all inputs and labels so screen readers can accurately interpret the content.
**Action:** When building custom form inputs within custom UI components (like modals or sidebars), ensure they are wrapped with `<form onSubmit={handler}>` and contain explicitly mapped `<label htmlFor="id">` and `<input id="id">` pairs. Use `e.preventDefault()` within the handler.
