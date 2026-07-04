# Hashing and password storage — integrated study transcript

## 1. Hashing is not encryption

Password storage must not require recovering the original password. The server stores a derived
verifier and checks a submitted candidate by deriving a new value with the same stored parameters.

```text
registration:
password + random salt + cost parameters
→ password KDF
→ derived hash

login:
candidate password + stored salt + stored parameters
→ same KDF
→ fixed-time comparison with stored hash
```

Plaintext passwords and reversible password encryption are unacceptable storage models.

## 2. Salt

A salt is random, unique per password record and not secret. It is stored with the hash because
verification needs it.

Salt prevents one precomputed table from working for every account and ensures that equal passwords
normally produce different stored values.

Salt does not make a fast general-purpose hash suitable for password storage. A construction such as
`SHA256(salt || password)` remains too fast for offline guessing.

## 3. Cost parameters and key stretching

Password KDFs deliberately make each guess expensive.

- PBKDF2: iteration count and PRF/hash algorithm;
- bcrypt: logarithmic cost factor;
- scrypt/Argon2id: memory, time and parallelism parameters.

There is no timeless universal numeric value. Benchmark on production-class hardware, choose an
acceptable latency and store the chosen parameters with each hash so verification and later migration
remain possible.

## 4. Pepper

A pepper is an optional application-level secret stored outside the password database, for example in
a secret manager.

It may add protection when only the database is stolen, but it introduces operational concerns:
rotation, availability, backup and incident recovery. Pepper never replaces salt or a strong password KDF.

## 5. Self-describing storage

A custom format may store:

```text
version : algorithm : cost : saltBase64 : hashBase64
```

Frameworks commonly pack the same information into one encoded binary payload. The database needs the
algorithm/version marker, parameters, salt and derived hash. It never needs the plaintext password.

## 6. PBKDF2 in .NET

`Rfc2898DeriveBytes.Pbkdf2` derives a byte key from:

- password;
- salt;
- iteration count;
- PRF/hash algorithm;
- requested output length.

A custom implementation should generate the salt with `RandomNumberGenerator`, use a current PRF for
new hashes, validate the encoded format defensively and compare derived bytes using
`CryptographicOperations.FixedTimeEquals`.

## 7. ASP.NET Core Identity PasswordHasher

`PasswordHasher<TUser>` provides a versioned, self-contained hash payload. The returned string contains
a Base64-encoded format marker, algorithm parameters, salt and subkey.

`VerifyHashedPassword` can return:

```text
Failed
Success
SuccessRehashNeeded
```

When verification succeeds with `SuccessRehashNeeded`, generate a new hash with current settings and
persist it after successful login.

The `TUser user` parameter is part of the extensibility contract. A custom implementation may use
user-specific policy even when the built-in implementation does not currently need user data.

## 8. Fixed-time comparison

A byte comparison that exits at the first mismatch can expose small timing differences. Use:

```csharp
CryptographicOperations.FixedTimeEquals(actual, expected)
```

Hash collisions are not the relevant comparison here; password verification checks whether the
derived byte sequences are equal without leaking the mismatch position.

## 9. bcrypt and Argon2id

bcrypt embeds cost, salt and hash in its encoded string. Its logarithmic cost means increasing the
number by one approximately doubles the work.

Argon2id adds memory hardness. Its main controls are memory cost, time cost and parallelism. Choose
memory first according to deployment limits, then tune time to the latency target.

## 10. Versioning and migration

Version every custom format. Bump the version when changing:

- algorithm or PRF;
- cost parameters;
- salt/subkey sizes;
- encoded layout;
- pepper strategy.

A standard migration flow is rehash-on-login:

```text
verify legacy hash
→ authentication succeeds
→ produce current hash
→ update database
```

This upgrades active accounts without forcing an immediate password reset while still allowing old
records to be verified during the transition.

