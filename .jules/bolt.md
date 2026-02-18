## 2024-05-22 - Missing Database Indexes
**Learning:** Found that `Ticket` model was missing critical compound indexes (`{ status: 1, createdAt: -1 }`, etc.) despite usage patterns requiring them for efficient sorting and filtering.
**Action:** Always verify schema definitions against query patterns.
