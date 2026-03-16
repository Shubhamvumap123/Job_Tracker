## 2024-03-16 - Hardcoded Credentials & Secrets in Config and Auth
**Vulnerability:** Hardcoded MongoDB connection string in `config.js` and fallback `secret123` string for JWT verification/signing.
**Learning:** Hardcoded fallback values can easily be overlooked in production, leading to compromised databases and forged JWTs, bypassing authentication.
**Prevention:** Remove fallback values for critical secrets and fail securely (e.g., `process.exit(1)` or return `500 Internal Server Error`) when environment variables are missing.
