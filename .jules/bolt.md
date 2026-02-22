# Bolt's Journal

## 2024-05-22 - Missing Database Indexes and Inefficient Queries
**Learning:** The `Ticket` model lacked indexes on frequently queried fields, and the controller fetched full Mongoose documents for read-only lists.
**Action:** Add compound indexes for dashboard filters and use `.lean()` on read-only queries to reduce memory overhead.
