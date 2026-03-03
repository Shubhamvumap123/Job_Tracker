## 2024-05-24 - Mongoose Read Performance Improvement
**Learning:** Using `.lean()` on Mongoose read-only queries (like `getTicketList` and `getAgents`) prevents unnecessary Mongoose document instantiation overhead, reducing response times by ~40% (e.g., from ~2110ms to ~1270ms when fetching ~1000 tickets).
**Action:** Always append `.lean({ virtuals: true })` to Mongoose `find()` queries in controllers when the fetched documents are only used for reading and being serialized to JSON.
