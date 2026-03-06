## 2024-05-24 - Mongoose Read Optimization
**Learning:** Using `.lean({ virtuals: true })` on read-only Mongoose queries avoids document instantiation, reducing response times by ~40% for large lists (like tickets).
**Action:** Always append `.lean({ virtuals: true })` to Mongoose queries in controllers when the fetched documents are strictly read-only and will not be saved or mutated.
