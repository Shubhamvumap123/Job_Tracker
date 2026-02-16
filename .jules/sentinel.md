## 2024-05-23 - [Critical Hardcoded Secret Fallback]
**Vulnerability:** A hardcoded MongoDB connection string with credentials was present in `Server/src/config/config.js` as a fallback value for `process.env.MONGO_URL`.
**Learning:** Even when `dotenv` is used, developers may include secrets as default values or fallbacks, negating the security benefit.
**Prevention:** Remove fallback values for sensitive configuration. Fail fast if required environment variables are missing. Ensure `.env` is gitignored.
