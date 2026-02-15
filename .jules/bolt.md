## 2025-02-14 - Default Sort Optimization
**Learning:** Default sort by `createdAt` in `getTicketList` was unindexed, causing O(N log N) scan.
**Action:** Always index default sort fields, especially on time-series data like tickets.
