## 2024-05-22 - [Critical] Hardcoded JWT Secret
**Vulnerability:** The application uses a hardcoded fallback secret ('secret123') for JWT signing and verification. This fallback is explicitly defined in `Server/src/controller/UserController.js` and `Server/src/middleware/authMiddleware.js`.
**Learning:** If the environment variable `JWT_SECRET` is missing, the application will default to this easily guessable secret. This means anyone who knows this secret can forge JWTs and gain full, unauthorized access to any user account, including administrators. This constitutes a severe authentication bypass.
**Prevention:** Never provide a hardcoded fallback string for sensitive secrets. If a required secret is missing from the environment configuration, the application should fail to start or explicitly throw an error rather than silently defaulting to an insecure state.

## 2024-05-22 - [Critical] Hardcoded MongoDB Credentials
**Vulnerability:** The application uses a hardcoded fallback connection URI for MongoDB (`mongodb+srv://shubhamvumap_db_user:Password123@cluster0.xxktdey.mongodb.net/`) in `Server/src/config/config.js`. This URI contains valid database credentials.
**Learning:** Hardcoding database credentials in source code exposes the database to unauthorized access. If the source code is compromised or inadvertently shared, attackers can gain complete access to the database.
**Prevention:** Never hardcode credentials in source code. Always use environment variables for sensitive configuration details. If the environment variable is missing, fail fast and log an error rather than falling back to default credentials.
