## 2026-02-20 - Hardcoded MongoDB URI
**Vulnerability:** A MongoDB URI with credentials was hardcoded in `Server/src/config/config.js` and present in a committed `.env` file.
**Learning:** Developers sometimes commit local `.env` files or include hardcoded fallbacks containing real credentials for convenience, exposing production databases.
**Prevention:** Always add `.env` to `.gitignore` during project initialization. Use environment variable templates (e.g., `.env.example`) and enforce secrets scanning in CI/CD pipelines. Never use real credentials as default values in code.
