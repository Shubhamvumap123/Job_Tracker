## 2025-02-17 - Mass Assignment / Privilege Escalation
**Vulnerability:** Public user registration endpoint allowed arbitrary assignment of `role` and `department` fields from the request body.
**Learning:** Using `req.body` directly or destructured values that include sensitive fields in database creation calls (`User.create({...})`) without explicit filtering or forcing defaults is a common source of Mass Assignment vulnerabilities.
**Prevention:** Always use a whitelist of allowed fields when creating or updating resources from user input. For sensitive fields like `role`, hardcode the default value in the controller logic or ensure the input is strictly validated and sanitized based on the user's authorization level.
