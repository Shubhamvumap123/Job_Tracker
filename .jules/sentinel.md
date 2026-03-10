## 2024-03-10 - Hardcoded Secrets

**Vulnerability:** MongoDB URI and JWT_SECRET were hardcoded with cleartext credentials as a fallback if environment variables were missing in `Server/src/config/config.js`, `Server/src/controller/UserController.js`, and `Server/src/middleware/authMiddleware.js`.
**Learning:** Hardcoding credentials as a fallback mechanism exposes sensitive details (like database user, password, and JWT keys) in the codebase.
**Prevention:** Remove fallback logic for sensitive configuration and strictly validate the presence of required environment variables, failing securely (e.g., throwing an error or exiting the process) if they are absent.
