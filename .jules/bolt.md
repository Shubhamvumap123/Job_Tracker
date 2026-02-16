## 2026-02-16 - Missing Database Indexes on Core Models
**Learning:** The `Ticket` model was completely missing indexes despite being heavily queried and sorted by `createdAt`. Always double-check schema definitions against expected usage patterns, even if documentation/memory suggests otherwise.
**Action:** Audit all Mongoose schemas for missing indexes on foreign keys and sort fields.
