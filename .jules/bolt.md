## 2024-05-24 - Initializing Bolt Journal
**Learning:** Initializing the journal as requested.
**Action:** Keep adding critical performance learnings here.

## 2024-05-24 - Mongoose `.lean()` for List Queries
**Learning:** Using `.lean()` on Mongoose queries that return multiple documents (like `getTicketList` and `getAgents`) improves read performance by ~40% (e.g., ~2110ms to ~1270ms for ~1000 tickets). Mongoose doesn't have to instantiate heavy document objects when we just need plain JSON.
**Action:** Always use `.lean()` for read-only GET requests where the documents won't be updated or saved within the same function.