
## 2026-03-18 - Mongoose Read-Only Queries
**Learning:** Using .lean() on read-only queries drastically improves performance (e.g., ~40% faster on 1000 records) by returning plain JS objects. However, .lean() bypasses Mongoose schema transformations (like toJSON), meaning sensitive fields like passwords will leak if not explicitly excluded.
**Action:** Always append .lean() to read-only list queries for performance, but explicitly chain .select('-password') beforehand if the model contains sensitive data.

## 2026-03-20 - Derived State Memoization in Real-time Applications
**Learning:** When using real-time sync (like Socket.IO broadcasting updates to all clients), a single user action triggers global state updates (`fetchTickets()`) and subsequent re-renders across all active clients. Unoptimized derived state computations (like multiple `O(n)` array filters) in high-level components (like `Home.jsx` dashboards) cause unnecessary UI stutter during these frequent broadcasts.
**Action:** Always reduce `O(n)` array iterations for derived stats into a single loop, and wrap the calculation in `useMemo` so the component avoids re-computing expensive stats when unrelated state updates trigger a re-render.

## 2026-03-21 - O(n) Re-renders with Keystroke State and Inline Functions
**Learning:** The React application updates filter state on keystrokes (`filters.search`), triggering frequent re-renders of the parent `TicketDashboard`. Because `handleEdit` and `handleDelete` were passed as inline arrow functions `<TicketList onEdit={(ticket) => ...} onDelete={(id) => ...} />`, these props changed reference on *every* render. This completely defeated React's diffing algorithm and caused an unnecessary `O(n)` re-render of every single ticket component in the list for every keystroke.
**Action:** Wrap large child components (`TicketList`, `TicketRow`, `TicketCard`) with `React.memo()` and *always* pass them stable callback references (using `useCallback`) to preserve memoization and avoid massive re-renders when parent state updates.
