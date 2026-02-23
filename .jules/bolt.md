# Bolt's Journal

## 2024-05-22 - Missing Database Indexes
**Learning:** The `Ticket` model lacks indexes on frequently queried fields (`status`, `priority`, `user`, `createdAt`), leading to full collection scans during dashboard loading.
**Action:** Always verify schema indexes against query patterns in controllers.
