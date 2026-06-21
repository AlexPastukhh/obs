# Final transcript — hashing

Generated: 2026-06-22 00:00:00 UTC

## 0.1 Area understanding / reading quality

**Overall:** Password hashing and key derivation: PBKDF2 with random salts and cost parameters, versioned storage formats, fixed-time comparison, rehash-on-login, ASP.NET Core PasswordHasher behavior, and hashing versus encryption.

**Reading quality:** high for code and theory text extracted directly from SVG.

```text
processed image uses: 0
processed text elements: 70
remaining unclosed image uses: 0
remaining unclosed text elements: 0
```

## Structured transcript

### Password KDF basics

A deterministic KDF combined with a random salt and many iterations derives a password verifier that is intentionally expensive to compute.

### Stored representation

Version, algorithm identifier, iteration count, salt and derived key stored together so verification and future migration remain possible.

### Verification

Parse and validate the format, recompute with stored parameters and compare using CryptographicOperations.FixedTimeEquals.

### Salt and cost parameters

Per-password random salt prevents equal passwords from sharing hashes; iterations and algorithm parameters control work factor.

### Versioning and migration

Detect old parameters/versions and rehash after successful login; ASP.NET Core PasswordHasher reports SuccessRehashNeeded.

### Identity integration

Use PasswordHasher or an explicit wrapper service rather than ad hoc hashing, and understand why the user argument exists for implementations that may include user-specific context.

### Hashing versus encryption

Passwords normally require one-way verification; reversible data requires encryption/Data Protection instead.

## Source-preserving element sample

The complete source text is stored in `data/text-elements.json` and `data/text-elements.csv`.

- `T-001` implementing full identity
- `T-002` manual hashing
- `T-003` In ddd style
- `T-004` Doesnt depends on how long it takes
- `T-005` to actually verify password
- `T-006` using System.Security.Cryptography;
- `T-008` public static class PasswordKdf
- `T-009` {
- `T-010` // tune this based on perf tests
- `T-011` private const int Iterations = 210_000;
- `T-012` private const int SaltSize = 16; // 128-bit
- `T-013` private const int KeySize = 32; // 256-bit
- `T-014` private const string Algo = "PBKDF2-SHA256";
- `T-015` private const int Version = 1;
- `T-017` public static string Hash(string password)
- `T-018` {
- `T-019` byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
- `T-021` byte[] key = Rfc2898DeriveBytes.Pbkdf2(
- `T-022` password,
- `T-023` salt,
- `T-024` Iterations,
- `T-025` HashAlgorithmName.SHA256,
- `T-026` KeySize);
- `T-028` // Store: v:algo:iter:saltB64:hashB64
- `T-029` return $"{Version}:{Algo}:{Iterations}:{Convert.ToBase64String(salt)}:{Convert.ToBase64String(key)}";
- `T-030` }
- `T-032` public static bool Verify(string password, string stored)
- `T-033` {
- `T-034` var parts = stored.Split(':');
- `T-035` if (parts.Length != 5) return false;
- `T-037` if (!int.TryParse(parts[0], out var version) || version != Version) return false;
- `T-038` var algo = parts[1];
- `T-039` if (algo != Algo) return false;
- `T-041` if (!int.TryParse(parts[2], out var iterations)) return false;
- `T-043` byte[] salt = Convert.FromBase64String(parts[3]);
- `T-044` byte[] expected = Convert.FromBase64String(parts[4]);
- `T-046` byte[] actual = Rfc2898DeriveBytes.Pbkdf2(
- `T-047` password,
- `T-048` salt,
- `T-049` iterations,

## Practical conclusion

Use this transcript as the structured reading layer. Return to the original SVG or complete text ledger before copying exact code, identifiers or punctuation.
