## 2024-05-22 - [Optimizing Mongoose Read Queries]
**Learning:** Returning full Mongoose documents for large datasets is significantly slower than using `.lean()`, especially when populated fields are involved. Missing indexes on frequently queried fields (status, priority, etc.) causes collection scans.
**Action:** Use `.lean()` for all read-only queries where Mongoose virtuals/methods are not strictly required. Ensure compound indexes are added for common filter+sort patterns.
