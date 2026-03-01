## 2024-03-01 - [Mass Assignment in Public Registration]
**Vulnerability:** Public registration endpoint (`/api/users`) allowed users to self-assign their role, department, and skills via `req.body`, enabling privilege escalation (e.g., registering as an admin).
**Learning:** Defaulting sensitive fields using logical OR (`role: req.body.role || 'customer'`) on a public endpoint trusts user input implicitly, bypassing intended restrictions.
**Prevention:** Hardcode sensitive fields (e.g., `role: 'customer'`) on public resource creation endpoints and explicitly select only safe fields from `req.body` to prevent Mass Assignment vulnerabilities.
