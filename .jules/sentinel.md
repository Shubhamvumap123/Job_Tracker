## 2026-02-25 - Hardcoded MongoDB Credentials
**Vulnerability:** Found a hardcoded MongoDB connection string with credentials in `Server/src/config/config.js` and a committed `.env` file containing the same secret.
**Learning:** Developers sometimes commit secrets for convenience or by mistake. The application had a fallback mechanism that defaulted to using the hardcoded secret if the environment variable was missing, making the vulnerability easier to exploit if the environment was not configured.
**Prevention:** Always use environment variables for sensitive data. Do not provide fallback values for secrets in code. Add `.env` to `.gitignore` immediately upon project creation. Use pre-commit hooks or CI checks to scan for secrets.
