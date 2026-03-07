## 2025-02-23 - Performance improvement using .lean() in Mongoose Read Queries
**Learning:** For read-only queries fetching large arrays (like list of tickets or agents), Mongoose instantiation overhead heavily impacts performance. Using `.lean()` on `getTicketList` yielded an immediate ~40% response time improvement (decreasing response time from ~2110ms to ~1270ms for ~1000 tickets).
**Action:** Always append `.lean()` to list queries that do not require document updates, saves or virtuals. This avoids hydrating fully-featured Mongoose documents when plain JavaScript objects are sufficient.
