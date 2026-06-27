# R02 — Manual PBKDF2 hashing, versioned storage and fixed-time verification

Generated: 2026-06-27 UTC

## Coverage

```text
Image uses: 28
SVG text nodes: 56
Status: visually and semantically verified
```

**Images:** S-018, S-019, S-020, S-021, S-022, S-023, S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-098, S-099, S-100, S-101, S-102, S-103, S-104

**Text nodes:** T-002, T-003, T-004, T-005, T-006, T-007, T-008, T-009, T-010, T-011, T-012, T-013, T-014, T-015, T-016, T-017, T-018, T-019, T-020, T-021, T-022, T-023, T-024, T-025, T-026, T-027, T-028, T-029, T-030, T-031, T-032, T-033, T-034, T-035, T-036, T-037, T-038, T-039, T-040, T-041, T-042, T-043, T-044, T-045, T-046, T-047, T-048, T-049, T-050, T-051, T-052, T-053, T-054, T-055, T-073, T-074

## Verified transcript

### Manual password-hash value object

The screenshots begin with a custom `PasswordHash` value object and a manual PBKDF2 workflow. A stored password value is not plaintext and is not reversible encryption. It is a self-contained verification record built from:

- a format or version marker;
- the KDF/algorithm identifier;
- cost parameters such as iteration count;
- a random per-password salt;
- the derived key/hash bytes.

A delimiter-based string is acceptable when every field is encoded unambiguously, validated strictly, and the delimiter cannot appear inside the encoded fields. Base64 is preferred for binary salt and derived-key values. Separate database columns are also valid, but one encoded string keeps the parameters and payload together.

### Hash creation

The custom flow uses `RandomNumberGenerator.GetBytes(...)` for a fresh salt and `Rfc2898DeriveBytes.Pbkdf2(...)` with explicit password, salt, iteration count, PRF/hash algorithm and output length.

The physical SVG code records a representative format:

```text
version:algorithm:iterations:saltBase64:hashBase64
```

A version is not decorative. It lets verification dispatch between old and new formats and enables gradual upgrades without forcing every user to reset a password.

### Verification

Verification must:

1. split and validate the stored record;
2. parse the version and cost parameters;
3. decode the salt and expected derived key;
4. run the same KDF using the submitted password and stored parameters;
5. compare the actual and expected byte arrays with `CryptographicOperations.FixedTimeEquals`.

The derived output length should follow the stored expected length. Malformed or unsupported records must fail closed.

### Why `FixedTimeEquals` matters

Ordinary comparisons may stop at the first mismatch. Response-time differences can leak how many leading bytes matched. A timing-safe comparison avoids content-dependent early exit and should be used for password-verification bytes.

### PBKDF2 terminology and limits

`Rfc2898DeriveBytes` implements PBKDF2; PBKDF2 is a password-based key derivation function, not simply a fast hash such as SHA-256. It is salted, deterministic for the same full input and intentionally expensive through its iteration count.

The screenshots also note that modern greenfield systems may prefer Argon2id, scrypt or bcrypt depending on platform and policy. PBKDF2 remains legitimate, especially in .NET and regulated environments, but its work factor must be benchmarked on production-class hardware.

### Versioned custom upgrade

A custom verifier can support multiple versions, for example an older PBKDF2 configuration and a newer configuration with stronger parameters. After successful verification of an old record, the application creates a current-format hash and stores it. This is rehash-on-login.

## Boundary conclusion

R02 closes the complete manual-hashing branch: storage representation, PBKDF2 construction, parsing, validation, version dispatch, upgrade behavior and timing-safe equality.
