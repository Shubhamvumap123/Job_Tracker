## 2026-02-21 - Public Registration Privilege Escalation
**Vulnerability:** The public user registration endpoint (`POST /api/users`) accepted a `role` field in the request body, allowing any user to register as an 'admin' by simply including `role: "admin"` in the payload.
**Learning:** The application logic used `role: role || 'customer'` which blindly trusted the user input if provided. This is a common "Mass Assignment" or "Over-posting" vulnerability where internal fields are exposed to public APIs.
**Prevention:** Always whitelist allowed fields for public endpoints. Explicitly set sensitive fields like `role` or `permissions` on the server side for public registration, ignoring any client-provided values. Use separate, protected endpoints for administrative user creation.
