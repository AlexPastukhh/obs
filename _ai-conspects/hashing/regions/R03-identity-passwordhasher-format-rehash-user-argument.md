# R03 — ASP.NET Core Identity PasswordHasher, format markers and rehash semantics

Generated: 2026-06-27 UTC

## Coverage

```text
Image uses: 25
SVG text nodes: 11
Status: visually and semantically verified
```

**Images:** S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010, S-011, S-012, S-013, S-014, S-015, S-016, S-017, S-092, S-093, S-094, S-095, S-096, S-097, S-105, S-106

**Text nodes:** T-001, T-067, T-068, T-071, T-072, T-075, T-076, T-077, T-078, T-079, T-080

## Verified transcript

### Prefer the built-in hasher when possible

For ASP.NET Core applications, `PasswordHasher<TUser>` / `IPasswordHasher<TUser>` is the safer default because it already handles random salts, parameter storage, versioned binary formats, verification outcomes and gradual upgrades.

The screenshots cover two integration styles:

- full ASP.NET Core Identity with `UserManager`, Identity stores and the standard user model;
- a custom user table that injects `IPasswordHasher<UserAccount>` without adopting the full Identity UI or schema.

In both cases, only the resulting password-hash string is stored.

### Registration and login

Registration hashes the password before persistence. Login loads the user and calls `VerifyHashedPassword(user, storedHash, providedPassword)`.

The result is not merely Boolean:

- `Failed`;
- `Success`;
- `SuccessRehashNeeded`.

When `SuccessRehashNeeded` is returned, the password is valid but the stored payload uses an older format or weaker current policy. The application should hash the submitted password using current options and update the database.

### `PasswordHasherOptions`

The screenshots show configuration through dependency injection, including `CompatibilityMode` and `IterationCount`. The cost must be tuned for the application rather than copied blindly. Higher cost improves resistance but directly affects registration/login latency and concurrent CPU load.

### Identity hash string is opaque and versioned

The built-in hasher returns a Base64 string representing a versioned binary payload. Conceptually it contains a format marker and, depending on the version, PRF/KDF information, iteration count, salt length and bytes, derived-key length and bytes.

Applications should treat this value as opaque. Identity does **not** prepend a literal `IDENTITY:` label. A prefix such as `IDENTITY:` is an application-owned migration discriminator, not part of the built-in payload.

### Why the `TUser` / user argument exists

`IPasswordHasher<TUser>` accepts a user object for extensibility and user-aware hashing policies. The current default implementation generally does not derive the result from user properties, so passing the real user and passing `null` may appear equivalent today. Code should nevertheless pass the actual user object because:

- the interface contract is user-aware;
- custom implementations may use user-specific material or policy;
- future implementations are not required to ignore it.

No special `PasswordHash` property is required by the generic type. The caller decides where to store the returned string.

### Operational protections

The screenshot set also places password hashing inside a broader authentication defense: rate limiting, lockout, MFA, strong password policy, breached-password checks, secure reset tokens, TLS, careful logging and protection of application secrets.

## Boundary conclusion

R03 closes the Identity implementation branch: integration styles, registration/login, configuration, opaque format semantics, `SuccessRehashNeeded`, and correct handling of the user argument.
