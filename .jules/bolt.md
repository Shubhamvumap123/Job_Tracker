## 2025-03-02 - Mongoose Array Fetch Optimization
**Learning:** Returning arrays of tickets via Mongoose `find()` queries is very slow because Mongoose instantiates heavy document objects. Using `.lean()` on queries like `getTicketList` bypasses instantiation and returns plain JavaScript objects, yielding a ~40% performance improvement (e.g. reducing fetch times from ~2110ms to ~1270ms for ~1000 tickets).
**Action:** Always append `.lean()` to Mongoose read-only queries (like `.find()`) when returning arrays of data to clients or when document methods (like `.save()`) are not needed.
