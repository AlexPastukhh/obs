# Technical corrections and risk notes — Hashing

1. A salt is public metadata, not a secret. It must be unique and randomly generated per password.
2. A pepper is optional secret material stored outside the database. It adds operational complexity.
3. Raw SHA-256/SHA-512, even with salt, is too fast for password storage.
4. PBKDF2-HMAC-SHA1 is legacy for new password storage. Prefer a current framework configuration or a
   current password KDF profile.
5. Numeric work-factor recommendations are version- and hardware-sensitive. Benchmark and follow
   current security guidance instead of copying one permanent number.
6. `SequenceEqual` is not the intended password-verification comparison. Use
   `CryptographicOperations.FixedTimeEquals`.
7. Base64 is an encoding, not encryption.
8. Store format/version, algorithm parameters, salt and derived hash. Do not store plaintext.
9. ASP.NET Core Identity's hash string is already self-describing and versioned; do not prepend a
   custom label unless it serves a real migration boundary.
10. Handle malformed stored values without leaking details or throwing uncontrolled parsing errors.
11. `SuccessRehashNeeded` should trigger a database update only after successful verification.
12. A password hash should not be used as a general encryption key without a separately designed key
   derivation and key-management scheme.
13. Never log passwords, candidate passwords, salts plus candidates, or derived subkeys.
14. Rate limiting, MFA, breached-password checks and secure transport remain necessary around hashing.
15. Mutable password-hash settings require migration planning so old records remain verifiable.
