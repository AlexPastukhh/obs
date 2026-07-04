# Hashing / password storage — semantic close-source transcript v002

Generated: 2026-07-04 UTC

## Purpose and transcription policy

This document replaces the OCR-heavy transcript as the authoritative source-aligned layer.

The goal is not character-perfect reproduction. The goal is to preserve the meaning, examples, code intent,
warnings and progression of the original SVG in coherent semantic blocks.

Policy:

- source screenshots remain the primary visual evidence;
- adjacent screenshots may be merged when they form one explanation or code example;
- literal wording is retained where it is clear and useful;
- OCR artifacts, UI labels, broken punctuation and accidental fragments are removed;
- code is reconstructed into valid, readable C# while preserving the demonstrated behavior;
- numeric work factors shown in the source are treated as examples, not permanent recommendations;
- technical corrections and current-guidance caveats remain in
  `11-technical-corrections-and-risk-notes-v001.md`.

## Source identity and coverage

```text
authoritative SVG: source/hashing.svg
SHA-256: b448bc181530f736edb053e72d146b1d9a8f09f14b5d33658d9d7a2eac2c8ecd
Git blob SHA: 06c1512a1fb13ee7a29070b2750d5f748d36eb5f
unique embedded screenshots: 104
image uses: 106
duplicate placements: S-057 and S-065
native SVG text lines: 70
logical regions: 6
semantic blocks in this transcript: 18
source coverage: S-001 through S-104
```

## Coverage map

| Block | Source IDs | Main subject |
|---|---|---|
| B01 | S-001..S-004 | Threat model, stored verifier and registration/login flow |
| B02 | S-005..S-010 | Manual PBKDF2 value object and fixed-time verification |
| B03 | S-011..S-015 | ASP.NET Core Identity option and surrounding protections |
| B04 | S-016..S-018 | Salt, cost parameters and the complete storage model |
| B05 | S-019..S-024 | Custom account table, Identity hasher and stored formats |
| B06 | S-025..S-030 | Work factors, verification and gradual upgrades |
| B07 | S-031..S-033 | Pepper, registration/login service and rehash-on-login |
| B08 | S-034..S-036 | Algorithm-specific costs, schema and custom KDF constants |
| B09 | S-037..S-043 | Fixed-time comparison, tuning and bcrypt logarithmic cost |
| B10 | S-044..S-050 | Identity payload, PBKDF2 meaning and Argon2id introduction |
| B11 | S-051..S-054 | Database representation, encoded format, versioned verifier |
| B12 | S-055..S-061 | Identity hash output, user parameter and encoded KDF formats |
| B13 | S-062..S-066 | Versioned custom PBKDF2 and rehash decisions |
| B14 | S-067..S-070 | Identity payload contents, determinism and rehash result |
| B15 | S-071..S-079 | PBKDF2 suitability, current policy and work-factor selection |
| B16 | S-080..S-088 | User-aware APIs, FixedTimeEquals and Argon2id tuning |
| B17 | S-089..S-096 | Migration policy, Argon2 profiles and Identity service |
| B18 | S-097..S-104 | Persistence, legacy migration and final version semantics |

---

## B01 — What the database stores and why hashing is not encryption

**Sources:** `S-001..S-004`

Password storage must be one-way. The application does not need to recover the original password; it only
needs enough information to derive a verifier from a login candidate and compare it with the stored verifier.

A useful conceptual record is:

```text
algorithm/version
cost parameters
random per-password salt
derived hash/subkey
```

The plaintext password is never stored. An optional pepper is also not stored in the password database.

A salt is public metadata. Its purpose is uniqueness, not secrecy:

- the same password used by two accounts should produce different stored values;
- precomputed lookup tables cannot be reused across all accounts;
- an attacker must perform work separately for each salt/hash pair.

The login and registration flow is:

```text
registration:
password + random salt + cost parameters [+ pepper]
→ password KDF
→ store format/parameters + salt + derived output

login:
candidate password + stored salt + stored parameters [+ pepper]
→ same KDF
→ fixed-time comparison with stored output
```

A fast construction such as `SHA256(salt || password)` is still unsuitable because offline guesses remain
cheap. Salt blocks mass reuse and precomputation; the password KDF supplies deliberate computational cost.

---

## B02 — Manual PBKDF2 value object

**Sources:** `S-005..S-010`

The source demonstrates a small value object that owns password hashing and verification. The important
constants are the salt size, derived-key size, iteration count and PRF/hash algorithm.

A cleaned version of the demonstrated structure is:

```csharp
using System.Security.Cryptography;

public sealed class PasswordHash
{
    private const int SaltSize = 16;
    private const int HashSize = 32;

    // Example only. Benchmark and version the real production value.
    private const int Iterations = 210_000;

    private static readonly HashAlgorithmName Prf =
        HashAlgorithmName.SHA256;

    public string Value { get; }

    private PasswordHash(string value)
    {
        Value = value;
    }

    public static PasswordHash Create(string password)
    {
        byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);

        byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
            password,
            salt,
            Iterations,
            Prf,
            HashSize);

        string value =
            $"{Convert.ToBase64String(salt)}:"
          + $"{Convert.ToBase64String(hash)}";

        return new PasswordHash(value);
    }
}
```

Verification must parse the stored format defensively, derive the candidate output with the same stored
parameters, and compare bytes with `CryptographicOperations.FixedTimeEquals`.

```csharp
public bool Verify(string candidate)
{
    string[] parts = Value.Split(':');

    if (parts.Length != 2)
        return false;

    byte[] salt;
    byte[] expected;

    try
    {
        salt = Convert.FromBase64String(parts[0]);
        expected = Convert.FromBase64String(parts[1]);
    }
    catch (FormatException)
    {
        return false;
    }

    byte[] actual = Rfc2898DeriveBytes.Pbkdf2(
        candidate,
        salt,
        Iterations,
        Prf,
        expected.Length);

    return CryptographicOperations.FixedTimeEquals(
        actual,
        expected);
}
```

This two-part example is educational, but a production format should also encode a version, algorithm and
work factor so old records remain verifiable after settings change.

---

## B03 — ASP.NET Core Identity as the standard framework path

**Sources:** `S-011..S-015`

For ASP.NET Core applications, the safer standard path is usually the built-in Identity password hasher
rather than a new custom format.

`PasswordHasher<TUser>`:

- generates and stores its own salt;
- encodes a format marker and PBKDF2 parameters into the returned string;
- verifies older supported formats;
- can return `SuccessRehashNeeded` when the password is correct but the stored hash should be upgraded.

Full Identity can configure account, password and lockout behavior:

```csharp
builder.Services
    .AddIdentity<AppUser, IdentityRole>(options =>
    {
        options.Password.RequiredLength = 12;
        options.Lockout.MaxFailedAccessAttempts = 10;
        options.Lockout.DefaultLockoutTimeSpan =
            TimeSpan.FromMinutes(10);
    })
    .AddEntityFrameworkStores<AppDbContext>()
    .AddDefaultTokenProviders();
```

Hashing is only one layer of authentication security. The source also emphasizes:

- rate limiting and throttling;
- careful lockout policy;
- MFA;
- breached-password checks;
- secure reset tokens;
- TLS;
- avoiding password logging;
- least-privilege access to the database and secret store.

---

## B04 — The complete storage model: salt, work factor and optional pepper

**Sources:** `S-016..S-018`

A correct password-storage model can be summarized as:

```text
stored verifier =
    KDF(password, salt, cost parameters [, pepper])
```

The pieces have different jobs:

### Salt

- random and unique for each password record;
- stored with the verifier;
- prevents equal passwords from producing equal stored outputs;
- defeats reusable precomputed tables.

### Work factor

The cost parameter makes every guess expensive.

- PBKDF2: iteration count;
- bcrypt: logarithmic cost;
- Argon2id: memory cost, time cost and parallelism.

The application must retain the cost parameters because login verification must reproduce the same
derivation. Parameters also enable gradual upgrades.

### Pepper

- optional;
- shared secret stored outside the password database;
- can help when the database alone is stolen;
- introduces rotation, backup, availability and incident-recovery complexity;
- never replaces salt or a strong password KDF.

---

## B05 — Identity hasher with a custom account table

**Sources:** `S-019..S-024`

The built-in Identity hasher can be used without adopting the entire default Identity database schema.

A minimal custom account model can contain one opaque password-hash string:

```csharp
public sealed class UserAccount
{
    public Guid Id { get; set; }
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
}
```

The database model should enforce the application invariants, for example a unique email and a sufficiently
large password-hash column:

```csharp
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<UserAccount>()
        .HasIndex(x => x.Email)
        .IsUnique();

    modelBuilder.Entity<UserAccount>()
        .Property(x => x.Email)
        .HasMaxLength(256)
        .IsRequired();

    modelBuilder.Entity<UserAccount>()
        .Property(x => x.PasswordHash)
        .HasMaxLength(1024)
        .IsRequired();
}
```

When `PasswordHasher<UserAccount>` is used, its returned string is already self-describing and should
normally be stored as one opaque value.

For a custom PBKDF2 implementation, a structured representation might instead contain:

```text
version : algorithm : iterations : saltBase64 : hashBase64
```

Separate database columns are also valid, provided all verification parameters are retained.

---

## B06 — Cost parameters, key stretching and gradual upgrades

**Sources:** `S-025..S-030`

Key stretching means turning one password guess into substantial work. With a stolen database, the attacker
repeats:

```text
choose candidate
→ derive using stored salt and parameters
→ compare with stored verifier
→ repeat
```

The work factor slows the derivation step for both the legitimate server and the attacker. The setting must
therefore balance security, latency, concurrency and denial-of-service risk.

There is no permanent magic number. The source gives example iteration counts and latency targets, but the
durable rule is:

1. benchmark on production-class hardware;
2. choose the highest acceptable cost for the expected login load;
3. store the selected parameters with every record;
4. review the policy over time.

Gradual upgrade flow:

```text
verify using the record's stored parameters
→ if verification succeeds and policy is outdated
→ create a new hash with current parameters
→ persist the replacement
```

Inactive accounts may retain older formats until they authenticate, unless the application chooses to expire
them and require a password reset.

---

## B07 — Pepper and a custom registration/login service

**Sources:** `S-031..S-033`

A pepper is an optional application secret. It must not be stored beside the password hashes. Losing it may
make all protected records unverifiable; compromising it requires a deliberate migration or reset strategy.

A custom account table can still use the framework hasher:

```csharp
public sealed class CustomAuthService
{
    private readonly AppDbContext _db;
    private readonly IPasswordHasher<UserAccount> _hasher;

    public CustomAuthService(
        AppDbContext db,
        IPasswordHasher<UserAccount> hasher)
    {
        _db = db;
        _hasher = hasher;
    }

    public async Task RegisterAsync(
        string email,
        string password)
    {
        if (await _db.Users.AnyAsync(x => x.Email == email))
            throw new InvalidOperationException("Email already used.");

        var user = new UserAccount
        {
            Id = Guid.NewGuid(),
            Email = email
        };

        user.PasswordHash =
            _hasher.HashPassword(user, password);

        _db.Users.Add(user);
        await _db.SaveChangesAsync();
    }
}
```

During login, `VerifyHashedPassword` may return:

```text
Failed
Success
SuccessRehashNeeded
```

`SuccessRehashNeeded` is still a successful password verification. The application should generate a new
hash with current settings and persist it before completing the normal login flow.

---

## B08 — Algorithm-specific costs and custom KDF metadata

**Sources:** `S-034..S-036`

Different password KDFs expose cost differently:

- PBKDF2 uses an iteration count and PRF;
- bcrypt uses a logarithmic cost where increasing the value by one approximately doubles the work;
- Argon2id uses memory, time and parallelism.

A custom PBKDF2 implementation should centralize its current creation policy while keeping each stored record
self-describing:

```csharp
public static class PasswordKdf
{
    private const int CurrentVersion = 1;

    // Example values only.
    private const int Iterations = 210_000;
    private const int SaltSize = 16;
    private const int KeySize = 32;

    private const string Algorithm = "PBKDF2-SHA256";
}
```

An illustrative database layout is:

```text
PasswordHash
PasswordSalt
KdfAlgorithm
Iterations
HashSize
SaltSize
PepperVersion (optional)
```

A single encoded value is equally valid when parsing is strict and every necessary parameter is included.

---

## B09 — Fixed-time comparison and bcrypt logarithmic cost

**Sources:** `S-037..S-043`

A normal byte comparison may stop at the first mismatch. That behavior can produce timing differences related
to the position of the first unequal byte.

Password verification should use:

```csharp
CryptographicOperations.FixedTimeEquals(actual, expected)
```

The comparison should reveal only “match” or “no match,” not how much of the value matched.

The source also explains bcrypt's “log rounds” terminology. If the cost is `c`, the work is proportional to
`2^c`; therefore increasing `c` by one approximately doubles the work.

The correct cost is deployment-specific. A baseline copied from a screenshot or article is not automatically
the right production setting. Benchmark the actual implementation under expected concurrency and retain room
for rate limiting.

---

## B10 — Identity payload, PBKDF2 semantics and Argon2id

**Sources:** `S-044..S-050`

`IPasswordHasher<TUser>` does not prepend a literal `IDENTITY:` label. A prefix like that is application-owned
metadata, useful mainly when distinguishing a legacy format during migration.

The Identity hash returned by `HashPassword` is already a Base64 representation of a versioned binary
payload. Treat it as opaque unless there is a specific framework-level reason to inspect it.

`Rfc2898DeriveBytes.Pbkdf2` is a password-based key derivation function, not a plain hash. Its inputs are:

```text
password
salt
iteration count
PRF / internal hash
requested output length
```

Given exactly the same inputs, the output is deterministic; otherwise login verification would be impossible.

Argon2id adds memory hardness. Its important parameters are:

```text
m — memory cost
t — time cost / number of passes
p — parallelism / lanes
```

Memory cost makes large-scale parallel guessing more expensive because every concurrent candidate needs
substantial memory capacity and bandwidth.

---

## B11 — Stored representation and a defensive versioned verifier

**Sources:** `S-051..S-054`

The source shows both table-based and single-string storage.

An encoded custom format can be:

```text
version:algorithm:iterations:saltBase64:hashBase64
```

Creation:

```csharp
public static string Hash(string password)
{
    byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);

    byte[] key = Rfc2898DeriveBytes.Pbkdf2(
        password,
        salt,
        Iterations,
        HashAlgorithmName.SHA256,
        KeySize);

    return $"{Version}:{Algorithm}:{Iterations}:"
         + $"{Convert.ToBase64String(salt)}:"
         + $"{Convert.ToBase64String(key)}";
}
```

Verification must reject malformed data without uncontrolled exceptions:

```csharp
public static bool Verify(string password, string stored)
{
    string[] parts = stored.Split(':');

    if (parts.Length != 5)
        return false;

    if (!int.TryParse(parts[0], out int version)
        || version != Version)
        return false;

    if (parts[1] != Algorithm)
        return false;

    if (!int.TryParse(parts[2], out int iterations)
        || iterations <= 0)
        return false;

    byte[] salt;
    byte[] expected;

    try
    {
        salt = Convert.FromBase64String(parts[3]);
        expected = Convert.FromBase64String(parts[4]);
    }
    catch (FormatException)
    {
        return false;
    }

    byte[] actual = Rfc2898DeriveBytes.Pbkdf2(
        password,
        salt,
        iterations,
        HashAlgorithmName.SHA256,
        expected.Length);

    return CryptographicOperations.FixedTimeEquals(
        actual,
        expected);
}
```

The parser should also enforce sensible length and parameter bounds so attacker-controlled stored data cannot
cause excessive allocation or work.

---

## B12 — Identity output, the `TUser` parameter and standard encoded formats

**Sources:** `S-055..S-061`

`HashPassword(user, password)` returns the framework hash payload itself, not an application migration label.

`IPasswordHasher<TUser>` receives a user object as part of an extensible contract. The built-in implementation
may not currently depend on user data, but a custom implementation can apply user-aware policy. The safest
habit is therefore to pass the actual account object rather than rely on `null`.

Common encoded shapes discussed in the source include:

```text
bcrypt:
$2b$<cost>$<salt-and-hash>

Argon2id:
$argon2id$v=<version>$m=<memory>,t=<time>,p=<parallelism>$<salt>$<hash>
```

These formats are self-describing: they carry the parameters needed to verify the password and decide whether
an upgrade is required.

---

## B13 — A versioned custom PBKDF2 hasher

**Sources:** `S-062..S-066`

The source demonstrates supporting an older PBKDF2 profile and a newer profile at the same time.

```csharp
public static class VersionedPasswordHasher
{
    private const int CurrentVersion = 2;

    private const int V1Iterations = 100_000;
    private const int V2Iterations = 210_000;

    private const int SaltSize = 16;
    private const int KeySize = 32;

    public static string Hash(string password)
        => HashV2(password);

    private static string HashV2(string password)
    {
        byte[] salt =
            RandomNumberGenerator.GetBytes(SaltSize);

        byte[] key = Rfc2898DeriveBytes.Pbkdf2(
            password,
            salt,
            V2Iterations,
            HashAlgorithmName.SHA256,
            KeySize);

        return $"2:PBKDF2-SHA256:"
             + $"{Convert.ToBase64String(salt)}:"
             + $"{Convert.ToBase64String(key)}";
    }
}
```

Verification selects the algorithm and parameters from the stored version. If an old version verifies
successfully, the method can return both success and a replacement hash.

```text
verified = true
upgradedHash = new current-format hash
```

The caller must persist the replacement. A version should change when the algorithm, PRF, cost policy, sizes,
layout or pepper strategy changes in a way that affects verification.

---

## B14 — Identity payload contents, deterministic KDFs and `SuccessRehashNeeded`

**Sources:** `S-067..S-070`

The Identity password-hash string conceptually includes:

- format marker;
- PRF identifier;
- iteration count;
- salt length and salt bytes;
- derived-subkey length and bytes.

The string should normally remain opaque.

Password KDFs are deterministic for fixed inputs:

```text
same password
same salt
same algorithm/version
same cost parameters
same pepper, when used
→ same derived output
```

Randomness comes primarily from generating a fresh salt for a newly created password record, not from making
the KDF produce a different answer during verification.

`PasswordVerificationResult.SuccessRehashNeeded` means both:

```text
the password is correct
and
the stored representation should be replaced with a current one
```

A database update must occur only after successful verification.

---

## B15 — Choosing algorithms and work factors

**Sources:** `S-071..S-079`

PBKDF2 is a legitimate password KDF and is widely used in .NET, especially where framework compatibility or
compliance requirements matter. It should be described as a password-based key derivation function rather
than as an ordinary fast hash.

The source compares:

- Argon2id: memory-hard and generally preferred for new designs where an appropriate implementation is
  available;
- scrypt: another memory-hard option;
- bcrypt: established, with logarithmic cost and important input-length considerations;
- PBKDF2: CPU-oriented, standardized and broadly supported.

The stable rule is not a single iteration count. The stable rule is to follow current guidance, benchmark the
actual implementation, store parameters and maintain an upgrade path.

Identity exposes `PasswordHasherOptions`, including its iteration-count policy. Defaults and recommendations
can change across versions, so the application should not assume that a framework default automatically
matches its security target.

---

## B16 — User-aware APIs, timing-safe verification and Argon2 tuning

**Sources:** `S-080..S-088`

Passing the real user object to `HashPassword` and `VerifyHashedPassword` preserves the interface contract and
supports future or custom user-aware policies.

A naive comparison such as:

```csharp
for (int i = 0; i < a.Length; i++)
{
    if (a[i] != b[i])
        return false;
}
```

exits early and is therefore not the intended cryptographic comparison. Use
`CryptographicOperations.FixedTimeEquals`.

For Argon2id, tune parameters together:

1. choose a memory cost compatible with the server's concurrency budget;
2. start with a measured time cost;
3. increase time until the latency target is reached;
4. choose parallelism according to the implementation and deployment;
5. test under realistic concurrent login load.

The source gives example baseline profiles. They are starting points, not universal constants. The exact
values must be revisited against current guidance and available hardware.

---

## B17 — Migration policy and framework-based upgrade service

**Sources:** `S-089..S-096`

Versioning enables gradual cryptographic migration without requiring every active user to reset a password
immediately.

Important migration rules:

- retain enough metadata to identify and verify each legacy format;
- distinguish old and new formats unambiguously;
- verify the old format first;
- create the new hash only after successful verification;
- persist the upgraded value;
- decide separately how to handle inactive accounts.

For Identity, the normal path is to let the framework's versioned payload and
`SuccessRehashNeeded` drive upgrades:

```csharp
public sealed class AuthService
{
    private readonly IPasswordHasher<UserAccount> _hasher;

    public AuthService(
        IPasswordHasher<UserAccount> hasher)
    {
        _hasher = hasher;
    }

    public bool VerifyAndUpgrade(
        UserAccount user,
        string candidate,
        out string? upgradedHash)
    {
        upgradedHash = null;

        PasswordVerificationResult result =
            _hasher.VerifyHashedPassword(
                user,
                user.PasswordHash,
                candidate);

        if (result == PasswordVerificationResult.Failed)
            return false;

        if (result == PasswordVerificationResult.SuccessRehashNeeded)
        {
            upgradedHash =
                _hasher.HashPassword(user, candidate);
        }

        return true;
    }
}
```

---

## B18 — Persistence and migration from a custom legacy format

**Sources:** `S-097..S-104`

The account record stores only the current opaque password representation:

```csharp
public sealed class UserAccount
{
    public Guid Id { get; set; }
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
}
```

After successful verification:

```csharp
bool ok = auth.VerifyAndUpgrade(
    user,
    inputPassword,
    out string? upgraded);

if (!ok)
    return Unauthorized();

if (upgraded is not null)
{
    user.PasswordHash = upgraded;
    await db.SaveChangesAsync();
}

return Ok();
```

When migrating from a genuinely different legacy format, an application-owned prefix may be used temporarily:

```text
LEGACY:<legacy-payload>
IDENTITY:<identity-hash>
```

That prefix is not produced by `PasswordHasher<TUser>`; it is only a routing marker for the migration layer.

The migration verifier should:

1. detect the stored format;
2. parse it defensively;
3. verify with the correct legacy or current algorithm;
4. use fixed-time comparison where the application performs comparison itself;
5. produce a current Identity hash after successful legacy verification;
6. persist the replacement;
7. reject unknown or malformed formats without exposing internal details.

Identity's own Base64 payload contains a format marker and parameters. The application normally does not need
to parse it; `VerifyHashedPassword` reads the marker and decides whether the stored hash is valid, current or
eligible for rehash.

---

## Final semantic model

```text
Create:
    validate password policy
    generate unique random salt
    derive with a password KDF and stored parameters
    store a versioned/self-describing verifier

Verify:
    load the stored representation
    parse and validate its format
    derive using its recorded parameters
    compare in fixed time
    authenticate only on success

Upgrade:
    after successful verification,
    detect old format or weak parameters
    derive a current replacement
    persist it atomically with the account update
```

## Closure

```text
source IDs represented: S-001 through S-104
unique source coverage: 104 / 104
image-use coverage represented by source IDs: 106 / 106
logical regions represented: 6 / 6
semantic blocks complete: 18 / 18
character-perfect claim: no
OCR transcript used as authoritative text: no
technical-correction layer retained: yes
question bank retained: yes
```
