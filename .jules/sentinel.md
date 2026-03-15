## 2024-05-24 - Mass Assignment Vulnerability in Public Registration
**Vulnerability:** The public `/api/users` registration endpoint blindly accepted `role`, `department`, and `skills` properties from the request body in `User.create()`, allowing any user to register as an 'admin'.
**Learning:** Hardcoding default values in Mongoose using `role: req.body.role || 'customer'` does not prevent users from overriding the default by sending `{"role": "admin"}` in the request payload.
**Prevention:** Always hardcode sensitive fields during resource creation (e.g., `role: 'customer'`) and explicitly whitelist only allowed fields from user input. Never trust the `req.body` directly for permission-related data.
