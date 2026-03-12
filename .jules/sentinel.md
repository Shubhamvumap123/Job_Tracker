
## 2024-03-12 - Critical Vulnerability: Fallback JWT Secret in Production
**Vulnerability:** A hardcoded default `'secret123'` was used in `jwt.verify` and `jwt.sign` if `process.env.JWT_SECRET` was missing. This allows anyone knowing the fallback secret to forge JWTs and gain unauthorized access/admin privileges if `JWT_SECRET` happens to be unconfigured.
**Learning:** Hardcoded fallback secrets in authentication logic completely undermine token-based security systems. Default fail-open patterns are highly dangerous.
**Prevention:** Never use hardcoded fallbacks for sensitive configuration. Explicitly fail and throw errors/exit when required environment variables are absent, enforcing secure configuration instead of silently failing open.
