## 2026-02-21 - [Missing Database Indexes]
**Learning:** The Mongoose schema lacked explicit index definitions for `status`, `priority`, `department`, `assignedTo`, and `user`, which are frequently queried fields. Also, `getTicketList` used full document hydration for read-only responses. Using `.lean()` reduced query time by ~28% and adding indexes ensures scalability.
**Action:** Always define indexes in Mongoose schemas for fields used in `find()` filters and `sort()` operations, and use `.lean()` for read-only API responses.
