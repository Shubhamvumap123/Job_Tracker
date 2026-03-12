## 2024-05-18 - Mongoose Read Performance optimization with .lean()
**Learning:** Using `.lean()` on Mongoose read-only list queries significantly improves performance (approx. ~40% faster on large lists) by returning plain JavaScript objects instead of heavy Mongoose Documents, which reduces processing time and memory footprint.
**Action:** Always use `.lean()` for Mongoose queries in controllers where the response is simply serialized to JSON and no Mongoose document instance methods (like `.save()`) are required.
