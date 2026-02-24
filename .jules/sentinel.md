## 2026-02-24 - Hardcoded Secrets in Config
**Vulnerability:** Found hardcoded MongoDB connection string with credentials in `Server/src/config/config.js` acting as a fallback for missing environment variables.
**Learning:** Hardcoded fallbacks for critical secrets (like DB URLs) are dangerous because they are easily committed to version control.
**Prevention:** Always fail fast if critical environment variables are missing. Enforce `.env` files and `.gitignore` rules from day one.
