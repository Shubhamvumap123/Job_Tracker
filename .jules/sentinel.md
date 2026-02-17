## 2026-02-17 - Privilege Escalation in User Registration
**Vulnerability:** The public user registration endpoint (`/api/users`) accepted a `role` field in the request body without validation, allowing any user to register as an 'admin' simply by including `"role": "admin"` in the JSON payload.
**Learning:** Defaulting to user input (`role: role || 'customer'`) for sensitive fields like permissions is dangerous. Even if the frontend doesn't send the field, an attacker can manually craft the request.
**Prevention:** Always explicitly define and sanitize sensitive fields on the server side. For public registration, hardcode the role to the lowest privilege level (e.g., `role: 'customer'`) and do not accept role input from the client.
