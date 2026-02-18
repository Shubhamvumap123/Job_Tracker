## 2024-05-22 - Privilege Escalation in User Registration
**Vulnerability:** Public registration endpoint allowed users to set their own role via `req.body.role`, enabling privilege escalation to Admin.
**Learning:** Default values in Mongoose schemas or controller logic are insufficient if the input object is passed directly to `Model.create()` without explicit filtering.
**Prevention:** Always sanitize input or explicitly set sensitive fields (like `role`) in the controller, ignoring user input for public endpoints. Use Data Transfer Objects (DTOs) or explicit field selection.
