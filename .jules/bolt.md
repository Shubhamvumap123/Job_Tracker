## 2025-05-15 - Synchronous State Updates in Effects
**Learning:** Found multiple instances (EditTicket, AuthContext) of calling `setState` synchronously inside `useEffect`. This causes immediate re-renders and is flagged by ESLint as a performance risk.
**Action:** Prefer initializing state from props/storage directly during render or use `key` prop to reset component state, rather than syncing via effects.
