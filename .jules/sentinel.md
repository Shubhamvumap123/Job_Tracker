## 2026-02-15 - Hardcoded MongoDB Credentials
**Vulnerability:** Hardcoded MongoDB connection string with credentials in `Server/src/config/config.js` and `.env` file committed to Git.
**Learning:** Developers often add hardcoded fallbacks for local development convenience, which inevitably exposes production secrets.
**Prevention:** Enforce environment variable validation on startup (fail fast if missing) and ensure `.env` is in `.gitignore` before the first commit.
