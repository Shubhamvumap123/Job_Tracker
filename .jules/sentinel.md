## 2026-02-19 - Privilege Escalation in User Registration
**Vulnerability:** Public registration endpoint allowed setting 'role' field via req.body, enabling unauthorized admin creation.
**Learning:** Directly passing req.body to Mongoose create() bypasses default values if the malicious input is provided. This is a common Mass Assignment vulnerability.
**Prevention:** Always whitelist fields or explicitly set sensitive fields like 'role' in controller logic. Never trust client input blindly.
