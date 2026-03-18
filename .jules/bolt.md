
## 2026-03-18 - Mongoose Read-Only Queries
**Learning:** Using .lean() on read-only queries drastically improves performance (e.g., ~40% faster on 1000 records) by returning plain JS objects. However, .lean() bypasses Mongoose schema transformations (like toJSON), meaning sensitive fields like passwords will leak if not explicitly excluded.
**Action:** Always append .lean() to read-only list queries for performance, but explicitly chain .select('-password') beforehand if the model contains sensitive data.
