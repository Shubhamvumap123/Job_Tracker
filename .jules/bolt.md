## 2024-05-22 - Missing indexes on Mongoose models
**Learning:** The `Ticket` model lacked indexes for `createdAt`, `status`, and `user`, causing potential full collection scans for default views.
**Action:** Always verify `find()` and `sort()` patterns in controllers and ensure corresponding indexes exist in Mongoose schemas.
