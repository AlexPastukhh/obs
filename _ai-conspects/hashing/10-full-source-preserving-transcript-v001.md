# Full source-preserving transcript v001 — Hashing / password storage

Generated: 2026-07-04 UTC

```text
authoritative SVG: source/hashing.svg
SHA-256: b448bc181530f736edb053e72d146b1d9a8f09f14b5d33658d9d7a2eac2c8ecd
Git blob SHA: 06c1512a1fb13ee7a29070b2750d5f748d36eb5f
viewBox: 0 0 21374.025271065828 12113.344481710374
embedded symbol definitions: 105
unique embedded screenshots: 104 / 104
image uses: 106 / 106
duplicate extra placements: 2
native SVG text lines: 70 / 70
native SVG text groups: 23 / 23
logical regions: 6 / 6
source blocks: 104 / 104
```

## Quality boundary

The transcript is OCR-assisted and normalized. Visible explanations and code are represented
source-by-source; exact screenshot punctuation and formatting remain authoritative in the extracted
images and SVG.

---

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


---

# Source-by-source transcript

## S-001 — Yep — the DB ends up storing everything needed to verify a password except the password itself (and

```text
source_id: S-001
image_hash: 07584e3877ba
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-001__07584e3877ba.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Yep — the DB ends up storing everything needed to verify a password except the password itself (and
except the pepper, if you use one). That's intentional.

Why store the salt in the DB if the attacker can see it?

Because salt isn't meant to be secret. Its job isn't "hide the password'; its job is to force uniqueness.
Even if an attacker has the salt, salt still provides big benefits:
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-002 — 3) About your manual hashing implementation in the screenshot — is it valid?

```text
source_id: S-002
image_hash: 8de9c0f00f3c
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-002__8de9c0f00f3c.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
3) About your manual hashing implementation in the screenshot — is it valid?
It's close to a valid PBKDF2 scheme, but there are two common issues | can see in patterns like this:
- Good parts
- Uses a random per-password salt (good).
« Uses PBKDF2 (Rfc2898DeriveBytes) (good approach).
- Stores both salt + hash (necessary).
'A. Problems / improvements
1. PRF algorithm
Your screenshot shows HashAlgorithmName.SHA1 (or it looks like it).
PBKDF2-HMAC-SHA1 is not "broken" in the collision sense, but it's legacy and not recommended for
new password storage. Prefer SHA256 (or SHA512).
2. Constant-time comparison
If you verify with SequenceEqual, that is not guaranteed constant-time. Use:
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-003 — What each missing piece enables an attacker to do

```text
source_id: S-003
image_hash: bf838ec7d2ba
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-003__bf838ec7d2ba.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What each missing piece enables an attacker to do
If you store plaintext passwords (worst)
Attacker actions

- Steal DB = instantly knows everyone's password.

- Users reuse passwords — attacker logs into users' email/bank/other services.
If you store SHA-256(password) (fast hash, no salt)
Attacker actions

- Steal DB — GPU brute-force runs extremely fast.

- Precomputed tables work.

- Identical hashes reveal identical passwords across users.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-004 — Example flow (register + login)

```text
source_id: S-004
image_hash: 6586a0f7e747
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-004__6586a0f7e747.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Example flow (register + login)
A) Register (store password)
1. User chooses password: P
2. Server generates random salt: S = random(16 bytes or more)
3. Choose cost params (example):
- PBKDF2 iterations = 310,000 (example number)
- or bcrypt cost = 12-14
- or Argon2id memory/time settings
4. (Optional) read pepper secret: Pep
5. Compute: H = KDF(P, S, cost, Pep)
6. Store in DB:
- salt =$
- costParams
- hash = H
- (and algorithm/version so you can upgrade later)
DB contains: algo + cost + salt + hash
DB does NOT contain: plaintext password (ever)
Pepper is NOT in DB (if used) NV
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-005 — PasswordHash value-object implementation

```text
source_id: S-005
image_hash: 9bba87241953
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-005__9bba87241953.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public class PasswordHash
{
    public string Value { get; }

    private const int SaltSize = 16;
    private const int HashSize = 32;
    private const int Iterations = 100_000;

    private static readonly HashAlgorithmName AlgorithmName =
        HashAlgorithmName.SHA512;

    private PasswordHash(string value)
    {
        Value = value;
    }
}
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-006 — What password hashing is (and why it's not encryption)

```text
source_id: S-006
image_hash: 81614ff3a90d
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-006__81614ff3a90d.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What password hashing is (and why it's not encryption)
When you store passwords, you shouldn't be able to get the original password back. So you don't encrypt
passwords—you hash them with a one-way function.
But not any hash. Fast hashes (SHA-256, MD5) are bad for passwords because attackers can try billions of
guesses per second.
So we use a password hashing / KDF that is intentionally slow (and often memory-heavy):

- PBKDF2

- berypt

- scrypt

- =Argon2id (modern favorite)
~~~

### Recall

1. Какие cost parameters использует Argon2id?
2. Почему memory cost затрудняет GPU/ASIC guessing?
3. Как выбирать параметры для production hardware?

---

## S-007 — 9) ASP.NET Core (.NET) "valid" approach

```text
source_id: S-007
image_hash: 1dfca64550d5
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-007__1dfca64550d5.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
9) ASP.NET Core (.NET) "valid" approach
If you're in ASP.NET Core, the safest "standard" path is to use the built-in Identity hasher:
- PasswordHasher<TUser> (or ASP.NET Core Identity)
- It handles salts, iteration counts, and format
- It also supports rehash-on-login when you raise security settings (important for gradual upgrades)
Conceptually:
- You store the produced hash string
- On login, call VerifyHashedPassword
- Ifit returns "SuccessRehashNeeded", you re-hash with stronger settings and update DB
(That's a really good "conspect" point: automatic migration strategy.)
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-008 — What salt prevents (even when public)

```text
source_id: S-008
image_hash: 19e6c0f73f27
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-008__19e6c0f73f27.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What salt prevents (even when public)
1. Rainbow tables / precomputation
- Without salt, an attacker can precompute hash("password123"), hash("letmein"), etc. once and reuse
it against every stolen DB that uses the same hash scheme.
- With per-user random salt, the attacker would need to precompute tables for each distinct salt, which is
essentially useless.
2. Bulk cracking efficiency
- Without salt, if 10,000 users share "Password 123", they all share the same hash — crack it once, you get
10,000 accounts.
- With salt, those 10,000 users have 10,000 different hashes, so the attacker must do work per user.
So: salt doesn't stop cracking; it stops mass reuse and precomputation, and it hides "same password"
relationships.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-009 — Option B: Custom table + PasswordHasher<TUser> (no full Identity required)

```text
source_id: S-009
image_hash: 4d2f2d451b50
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-009__4d2f2d451b50.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Option B: custom table + PasswordHasher<TUser>
(no full ASP.NET Core Identity schema required)

If the application does not need the complete Identity schema,
it can still use Microsoft's password hasher safely.

1) User entity

public class UserAccount
{
    public Guid Id { get; set; }
    public string Email { get; set; } = "";
    public string PasswordHash { get; set; } = "";
}
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-010 — VerifyPassword implementation for a separated hash/salt value

```text
source_id: S-010
image_hash: def9b67bd7be
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-010__def9b67bd7be.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public Result VerifyPassword(string password)
{
    string[] valueParts = Value.Split('-');

    byte[] hash = Convert.FromHexString(valueParts[0]);
    byte[] salt = Convert.FromHexString(valueParts[1]);

    byte[] newHash = Rfc2898DeriveBytes.Pbkdf2(
        password,
        salt,
        Iterations,
        AlgorithmName,
        HashSize);

    if (!CryptographicOperations.FixedTimeEquals(hash, newHash))
        return Result.Failure("Passwords don't match");

    return Result.Success();
}
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-011 — Option A (Recommended): ASP.NET Core Identity built-in password hashing

```text
source_id: S-011
image_hash: a301c36f6937
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-011__a301c36f6937.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Option A (recommended): ASP.NET Core Identity built-in password hashing

1) Configure Identity in Program.cs

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(
        builder.Configuration.GetConnectionString("Default")));

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
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-012 — If you salt but still use a fast hash (SHA-256(salt+password))

```text
source_id: S-012
image_hash: 314f1cf2eb40
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-012__314f1cf2eb40.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
If you salt but still use a fast hash (SHA-256(salt+password))
Better than nothing, but still weak for passwords.
Attacker actions

- Can't use rainbow tables easily, but can still brute-force very fast per user.
If you use a strong KDF but no salt
Attacker actions

- Still finds identical hashes for identical passwords across users.

- - Some precomputation becomes useful again.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-013 — Fixed-time comparison and self-describing storage

```text
source_id: S-013
image_hash: 2f3261666c2b
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-013__2f3261666c2b.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
CryptographicOperations.FixedTimeEquals(a, b)
3. Store parameters, not just hash+salt
If you store only hash:salt, you lose the ability to change:
- iterations
- algorithm (SHA1 — SHA256)
- output length
A good stored format must include at least: algorithm + iterations + salt + hash (and ideally a version).
4. Iterations / cost
100k iterations might be okay depending on your servers, but you should benchmark and pick a value
that costs ~100-250ms per hash on your production hardware (or follow current platform guidance). In
general, iterations should be adjustable and stored with the hash.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-014 — B) Login (verify password)

```text
source_id: S-014
image_hash: e413a3ad084c
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-014__e413a3ad084c.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
B) Login (verify password)
1. User submits candidate password P*
2. Load user's stored (S, costParams, H)
3. Compute H" = KDF(P", S, costParams, Pep)
4. Constant-time compare H" vs H
- match — authenticated
- - no match = reject
~~~

### Recall

1. Почему обычное раннее сравнение может утекать через timing?
2. Какой .NET API выполняет fixed-time comparison?
3. Что нужно сравнивать после повторного derivation?

---

## S-015 — 10) Extra protections you should mention (not just hashing)

```text
source_id: S-015
image_hash: f464ba9edab9
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-015__f464ba9edab9.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
10) Extra protections you should mention (not just hashing)
Password hashing is necessary but not sufficient. Add these common protections:

- Rate limiting / throttling login attempts

- Account lockout (careful: avoid easy DoS)

- MFA (big real-world impact)

- Password policy (length > complexity; allow long passphrases)

- Breach password check (deny known-compromised passwords)

- Secure reset tokens (random, short-lived, single-use)

- TLS everywhere

- Don't log passwords (including failed login payloads)

- Protect DB + secrets (pepper in secret store; least privilege)
~~~

### Recall

1. Чем pepper отличается от salt?
2. Где должен храниться pepper?
3. Какой риск появляется при потере или ротации pepper?

---

## S-016 — The "right model"

```text
source_id: S-016
image_hash: 513129506457
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-016__513129506457.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
The "right model"
A correct password storage scheme looks like:
Stored value = KDF(password, salt, costParams [, pepper])
Where:
1) Salt (public, random, per-password)
A salt is random bytes generated for each user/password, stored next to the hash.
Why we need it
- Prevents rainbow tables (precomputed tables of hashes).
- Prevents reuse: same password across users will not have the same stored hash.
If you don't use a salt (weaker): attacker actions
- Attacker steals DB — sees many users with identical hashes — knows they share the same password.
- Attacker can use precomputed tables for common passwords once and apply to everyone.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-017 — HashPassword factory implementation

```text
source_id: S-017
image_hash: 2025cecfc3d1
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-017__2025cecfc3d1.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public static Result<PasswordHash, Error> HashPassword(string password)
{
    byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);

    byte[] hash = Rfc2898DeriveBytes.Pbkdf2(
        password,
        salt,
        Iterations,
        AlgorithmName,
        HashSize);

    var passwordHash = new PasswordHash(
        $"{Convert.ToHexString(hash)}-{Convert.ToHexString(salt)}");

    return passwordHash;
}
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-018 — Why store cost parameters?

```text
source_id: S-018
image_hash: 3d624d8c3316
placements: 1
region: R01
image_file: source/images-near-literal-v001/S-018__3d624d8c3316.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Why store cost parameters?
Because the server must know how the hash was produced to verify it.
Cost parameters are things like:

- PBKDF2: iteration count

- bcrypt: cost factor

- ArgonZ2id: time cost, memory cost, parallelism
~~~

### Recall

1. Что означает bcrypt log rounds?
2. Почему рост cost экспоненциально увеличивает работу?
3. Что хранится внутри bcrypt encoded string?

---

## S-019 — 2) Your DbContext

```text
source_id: S-019
image_hash: 9d82cd8d487e
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-019__9d82cd8d487e.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
2) Your DbContext
using Microsoft.EntityFrameworkCore;
public class AppDbContext: DbContext
{
public DbSet<UserAccount> Users => Set<UserAccount>();
public AppDbContext (DbContextOptions<AppDbContext> options): base(options) { }
protected override void OnModelCreating(ModelBuilder b)
{
b.Entity<UserAccount>()
-HasIndex(u => u.Email)
-IsUnique();
b.Entity<UserAccount>()
-Property(u => u.Email)
-HasMaxLength(256)
-IsRequired();
b.Entity<UserAccount>()
-Property(u => u.PasswordHash)
-HasMaxLength(1024)
-IsRequired();
+
} Vv
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-020 — Attacker capabilities with salt and a strong KDF

```text
source_id: S-020
image_hash: 45eefb6fd073
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-020__45eefb6fd073.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
If you use salt + strong KDF (good baseline)
Attacker actions
- Must crack each user individually.
- ach guess is expensive — slows attacks a lot.
- Still possible for weak passwords (like "Password123") eventually.
Add pepper (extra defense)
Attacker actions
- DB alone isn't enough to verify guesses.
- They now need your app secrets too.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-021 — // Tuning password hasher (PBKDF2)

```text
source_id: S-021
image_hash: 45ed50d4cde6
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-021__45ed50d4cde6.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
// Tuning password hasher (PBKDF2)
builder.Services.Configure<PasswordHasherOptions>(o =>
{
// Higher = slower. Pick based on perf tests.
0.IterationCount = 210 000;
0.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV3;
Ds
var app = builder.Build();
app-Run()5
Vv
2) User + DbContext
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-022 — => hash.Value;

```text
source_id: S-022
image_hash: 8ce9ffe3d0f5
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-022__8ce9ffe3d0f5.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public static implicit operator string(PasswordHash hash)
=> hash.Value;
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-023 — 11) Quick "rules to remember" (nice for a summary slide)

```text
source_id: S-023
image_hash: 4bed1873ca0d
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-023__4bed1873ca0d.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
11) Quick "rules to remember" (nice for a summary slide)
- Never store plaintext passwords.
- Never encrypt passwords (encryption is reversible) — store password hashes.
- Always use a dedicated password KDF: Argon2id / bcrypt / PBKDF2.
- Always use a unique random salt per password.
- Use work factors (time/memory) and upgrade over time.
- Use constant-time compare and add online protections (rate limit + MFA).
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-024 — 4) Is it valid to store the hash like "{hash}:{salt}" (single string)?

```text
source_id: S-024
image_hash: 23e6f6ed76e9
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-024__23e6f6ed76e9.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
4) Is it valid to store the hash like "{hash}:{salt}" (single string)?
Yes, it can be valid, if you do it safely:
Use Base64 (or Base64Url) for salt and hash.
- Include algorithm + iterations (+ version) in the string.
- Use a delimiter that won't appear in Base64 (colon is fine).
- Validate parsing robustly.
Even better: store them in separate DB columns (Salt, Hash, Iterations, AlgorithmVersion) or store one
structured string like Identity does.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-025 — Why keep them with the hash

```text
source_id: S-025
image_hash: 6c341ae6a7aa
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-025__6c341ae6a7aa.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Why keep them with the hash
1. Verification requires them
If you don't store them, you can't recompute the same hash on login.
2. Upgrades over time
You can increase cost later without breaking old accounts:
- User logs in
- You verify using their stored cost
- If cost is "too low" by today's standard, you re-hash with stronger settings and update the DB.
~~~

### Recall

1. Зачем хранить format/version marker?
2. Как выполнить rehash-on-login без принудительного password reset?
3. Что должно произойти после успешной проверки legacy hash?

---

## S-026 — 2) Cost parameters (work factor)

```text
source_id: S-026
image_hash: 6393779043fb
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-026__6393779043fb.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
2) Cost parameters (work factor)
This is what makes each guess expensive.
- PBKDF2: iterations
- bcrypt: cost factor (log rounds)
- Argon2id: time + memory + parallelism
Why we need it
- Makes brute-force/guessing slower by orders of magnitude.
If you use a fast hash (weaker): attacker actions
- Attacker steals DB — runs GPU cracking.
- With SHA-256/MD5, they can test huge numbers of guesses per second.
- with bcrypt/Argon2id, guesses per second drop dramatically.
~~~

### Recall

1. Какие cost parameters использует Argon2id?
2. Почему memory cost затрудняет GPU/ASIC guessing?
3. Как выбирать параметры для production hardware?

---

## S-027 — 2) User + DbContext

```text
source_id: S-027
image_hash: 5bccf92e96f8
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-027__5bccf92e96f8.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
2) User + DbContext

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

public class AppUser : IdentityUser
{
    // Add application-specific fields here.
}

public class AppDbContext : IdentityDbContext<AppUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }
}
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-028 — 3) Register + login service

```text
source_id: S-028
image_hash: 58d592701136
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-028__58d592701136.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
3) Register + login service

using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class CustomAuthService
{
    private readonly AppDbContext _db;
    private readonly PasswordHasher<UserAccount> _hasher = new();

    public CustomAuthService(AppDbContext db)
    {
        _db = db;
    }

    public async Task RegisterAsync(
        string email,
        string password)
    {
        if (await _db.Users.AnyAsync(u => u.Email == email))
            throw new InvalidOperationException("Email already used.");

        var user = new UserAccount
        {
            Id = Guid.NewGuid(),
            Email = email
        };

        user.PasswordHash = _hasher.HashPassword(user, password);

        _db.Users.Add(user);
        await _db.SaveChangesAsync();
    }
}
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-029 — how exactly cost params/key stretching works

```text
source_id: S-029
image_hash: 147ef1c2bf3e
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-029__147ef1c2bf3e.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
how exactly cost params/key stretching works

Key stretching (a.k.a. "work factor') is simply: turn one password guess into a lot of expensive work, so
attackers can't try many guesses per second.
The attacker's game
With a stolen DB, the attacker does this loop:

1. Pick a guess g ("Password123", etc.)

2. Compute KDF(g, salt, costParams [, pepper])

3. Compare to stored hash

4. Repeat millions/billions of times
Key stretching makes step #2 slow.

ne
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-030 — Are cost params related to key stretching?

```text
source_id: S-030
image_hash: 433992c7af9e
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-030__433992c7af9e.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Are cost params related to key stretching?
Yes. Key stretching = making password guessing slower by doing extra work.

- PBKDF2 iterations are literally stretching.

- bcrypt/Argon2id are also stretching (and Argon2 adds memory-hardness, which hurts GPU attackers).
What's the benefit of salt if it's stored in DB?
In one sentence:
Salt makes each user's hash unique and kills precomputed/rainbow-table attacks, even though the salt is
public.
Security comes from:

- the password being unknown, and

- the KDF being expensive per guess,

not from hiding the salt.

(If you also use pepper, then even with DB stolen, th: |, 'acker can't verify guesses unless they also steal the
pepper.)
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-031 — 3) Pepper (optional, secret, app-wide)

```text
source_id: S-031
image_hash: e1ad9c2d04cc
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-031__e1ad9c2d04cc.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
3) Pepper (optional, secret, app-wide)
A pepper is a secret string/key not stored in the DB (kept in env vars / secret vault).
Why it helps

- If attacker only steals the DB, they still can't verify guesses without the pepper.
Downside

- You must manage its availability and rotation carefully.

- If pepper is lost, nobody can log in (unless you have a rotation strategy).
If you don't use pepper

- Still fine if you do salt + strong KDF.

- Pepper is an extra layer for "DB stolen but app secrets not stolen".
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-032 — 3) Create user (hashing happens automatically)

```text
source_id: S-032
image_hash: 646598c0286c
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-032__646598c0286c.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
3) Create user — hashing happens automatically

using Microsoft.AspNetCore.Identity;

public class AuthService
{
    private readonly UserManager<AppUser> _users;

    public AuthService(UserManager<AppUser> users)
    {
        _users = users;
    }

    public async Task<IdentityResult> RegisterAsync(
        string email,
        string password)
    {
        var user = new AppUser
        {
            UserName = email,
            Email = email
        };

        return await _users.CreateAsync(user, password);
    }
}
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-033 — // upgrade hash parameters transparently

```text
source_id: S-033
image_hash: 58506d3458e5
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-033__58506d3458e5.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public async Task<bool> VerifyAsync(
    string email,
    string password)
{
    var user = await _db.Users
        .SingleOrDefaultAsync(u => u.Email == email);

    if (user is null)
        return false;

    var result = _hasher.VerifyHashedPassword(
        user,
        user.PasswordHash,
        password);

    if (result == PasswordVerificationResult.SuccessRehashNeeded)
    {
        user.PasswordHash = _hasher.HashPassword(user, password);
        await _db.SaveChangesAsync();
    }

    return result is PasswordVerificationResult.Success
        or PasswordVerificationResult.SuccessRehashNeeded;
}
~~~

### Recall

1. Зачем хранить format/version marker?
2. Как выполнить rehash-on-login без принудительного password reset?
3. Что должно произойти после успешной проверки legacy hash?

---

## S-034 — How cost params work (by algorithm)

```text
source_id: S-034
image_hash: f75545e64ec5
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-034__f75545e64ec5.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
How cost params work (by algorithm)

1) PBKDF2 (iterations = CPU work)

PBKDF2 is basically: run a cryptographic function repeatedly and mix results.
- Cost param: iterations (e.g., 100,000-600,000+ depending on policy)
- Effect: each guess requires ~iterations worth of HMAC computations.

Intuition
- Without stretching: 1 hash per guess
- - With PBKDF2(300,000): ~300,000 hash-like operations per guess

So if an attacker could do 1,000,000 guesses/sec with a fast hash, PBKDF2 might drop them to only a few

guesses/sec or a few dozen/sec (numbers vary by hardware).

Why it helps: brute force becomes far more expensive.
~~~

### Recall

1. Какие входы использует PBKDF2?
2. Какие параметры должны храниться для verification?
3. Почему iteration count должен быть benchmarked и versioned?

---

## S-035 — How it looks in the DB (examples)

```text
source_id: S-035
image_hash: 7796486e0b16
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-035__7796486e0b16.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
How it looks in the DB (examples)

Common "separate columns" layout (easy to understand)

A Users table might store:

Column Example
PasswordHash (base64 bytes)
PasswordSalt (base64 bytes)
KdfAlgorithm PBKDF2-SHA256
Iterations 310000
HashSize 32

SaltSize 16
PepperVersion (optional) 1
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-036 — PasswordKdf configuration constants

```text
source_id: S-036
image_hash: fa810abb9dbe
placements: 1
region: R02
image_file: source/images-near-literal-v001/S-036__fa810abb9dbe.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public static class PasswordKdf
{
    // Tune this based on performance tests.
    private const int Iterations = 210_000;
    private const int SaltSize = 16; // 128-bit
    private const int KeySize = 32;  // 256-bit
    private const string Algo = "PBKDF2-SHA256";
    private const int Version = 1;
}
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-037 — 4) Constant-time comparison

```text
source_id: S-037
image_hash: 4566818bee0e
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-037__4566818bee0e.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
4) Constant-time comparison
When checking a password, compare derived bytes in a way that doesn't leak timing differences.
Why we need it
- Prevents attackers from inferring how many leading bytes matched via timing.
If you don't do it (weaker): attacker actions
- In some situations (especially internal APIs / same network), an attacker can use timing differences to
slowly learn correct values.
~~~

### Recall

1. Почему обычное раннее сравнение может утекать через timing?
2. Какой .NET API выполняет fixed-time comparison?
3. Что нужно сравнивать после повторного derivation?

---

## S-038 — 4) Verify password (also supports rehash-on-login)

```text
source_id: S-038
image_hash: 336be7294256
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-038__336be7294256.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
4) Verify password (also supports rehash-on-login)
public async Task<bool> LoginAsync(string email, string password)
{
var user = await _users.FindByEmailAsync(email);
if (user is null) return false;
// Checks password hash and will rehash transparently if configured to do so
var ok = await _users.CheckPasswordAsync(user, password);
return ok;
+
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-039 — 4) (Optional) Tune iteration count for your app

```text
source_id: S-039
image_hash: aacd40bfd070
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-039__aacd40bfd070.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
4) (Optional) Tune iteration count for your app
If you use DI:
builder.Services.Configure<PasswordHasherOptions>(o =>
{
0.IterationCount = 210 00;
0.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV3;
Ds
builder Services. AddScoped<IPasswordHasher<UserAccount>, PasswordHasher<UserAccount>>();
Then inject IpasswordHasher<UserAccount> instead of new PasswordHasher<UserAccount>() -
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-040 — 2) bcrypt (cost factor = exponential CPU work)

```text
source_id: S-040
image_hash: 9359fcb76c57
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-040__9359fcb76c57.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
2) bcrypt (cost factor = exponential CPU work)
bcrypt has a "log rounds" cost.

- Cost param: cost like 10, 12, 14...

- Effect: each +1 roughly doubles the work.
So cost 12 is ~2x cost 11, and cost 13 is ~2x cost 12.
Why it helps: easy to tune upward over time.
~~~

### Recall

1. Что означает bcrypt log rounds?
2. Почему рост cost экспоненциально увеличивает работу?
3. Что хранится внутри bcrypt encoded string?

---

## S-041 — PasswordKdf.Hash implementation

```text
source_id: S-041
image_hash: 39d31d7b342e
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-041__39d31d7b342e.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public static string Hash(string password)
{
    byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);

    byte[] key = Rfc2898DeriveBytes.Pbkdf2(
        password,
        salt,
        Iterations,
        HashAlgorithmName.SHA256,
        KeySize);

    // The next source shows the encoded storage string.
}
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-042 — "Version" is just a small identifier you store alongside the password hash so your app knows how the stored

```text
source_id: S-042
image_hash: deddffd20d90
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-042__deddffd20d90.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
"Version" is just a small identifier you store alongside the password hash so your app knows how the stored
string was produced (algorithm + parameters + format). You change it when you change anything that
affects how you hash/verify passwords.
What the version is for
It lets you support multiple password-hash formats at the same time:

- Old users still have old hashes — you can still verify them.

- When they log in successfully, you can rehash using the new format and update the DB ("rehash-on-

login" migration).
~~~

### Recall

1. Зачем хранить format/version marker?
2. Как выполнить rehash-on-login без принудительного password reset?
3. Что должно произойти после успешной проверки legacy hash?

---

## S-043 — What is "log rounds"?

```text
source_id: S-043
image_hash: 824b1decd1f4
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-043__824b1decd1f4.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What is "log rounds"?
That term is mainly used with bcrypt (and related schemes). It means:
the cost parameter is the log base 2 of the number of rounds of work.

So if bcrypt cost is -, the work factor is proportional to 2"c.
Examples:

- cost 10 — ~2" = 1024 units of work

- cost 12 + ~2'? = 4096 units of work (= 4x cost 10)

- cost 13 + ~2'3 = 8192 units of work (= 2x cost 12)
That's why people say: "increase bcrypt cost by 1 doubles the work."
It's called "log rounds" because you're setting the exponent (the log), not the raw number of rounds.
~~~

### Recall

1. Что означает bcrypt log rounds?
2. Почему рост cost экспоненциально увеличивает работу?
3. Что хранится внутри bcrypt encoded string?

---

## S-044 — IPasswordHasher<TUser> in ASP.NET Core Identity does not prepend "IDENTITY:" to the hash.

```text
source_id: S-044
image_hash: 0fe32a1f13a4
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-044__0fe32a1f13a4.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
No.
IPasswordHasher<TUser> in ASP.NET Core Identity does not prepend "IDENTITY:" to the hash.
That prefix in your screenshot is a custom wrapper format you add yourself, for example:
wo CH a')
upgradedStoredValue = "IDENTITY:" + newHash;
So the actual stored value becomes something like:
«> Plain text ia')
IDENTITY: AQAAAATAAYagAAAAE...
where:
- "IDENTETY:" is your app's marker
- the rest is the real hash produced by PasswordHasher
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-045 — What Rfc2898DeriveBytes is

```text
source_id: S-045
image_hash: 76929856e6af
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-045__76929856e6af.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What Rfc2898DeriveBytes is

Rfc2898DeriveBytes is a.NET class that implements PBKDF2.

PBKDF2 is defined in PKCS #5 / RFC 2898, which is why the class name starts with Rfc2898... .
Itis not a hash function like SHA-256 by itself.

Itis a password-based key derivation function.
~~~

### Recall

1. Какие входы использует PBKDF2?
2. Какие параметры должны храниться для verification?
3. Почему iteration count должен быть benchmarked и versioned?

---

## S-046 — Example row (illustrative values):

```text
source_id: S-046
image_hash: 45ee1109069b
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-046__45ee1109069b.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Example database row with illustrative values:

- PasswordSalt: `<saltBase64>`
- PasswordHash: `<hashBase64>`
- Iterations: `310000`

Pepper is not stored in the password database.
A `PepperVersion` identifier may be stored to support controlled rotation.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-047 — 3) Argon2id (time + memory + parallelism)

```text
source_id: S-047
image_hash: c1556763f90d
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-047__c1556763f90d.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
3) Argon2id (time + memory + parallelism)
Argon2id is designed to be hard for GPUs/ASICs by forcing memory usage, not just CPU.
- Cost params:
- =m =memory (e.g., 64 MB, 256 MB, more)
- + = time cost (passes/iterations)
- p = parallelism (lanes/threads)
Why memory matters
GPUs are great at doing lots of simple computations in parallel. But they're constrained by:
- memory per core,
- - memory bandwidth.
If each guess needs, say, 256MB of memory traffic, you can't run millions of guesses in parallel on a GPU
cheaply. That's the big win.
~~~

### Recall

1. Какие cost parameters использует Argon2id?
2. Почему memory cost затрудняет GPU/ASIC guessing?
3. Как выбирать параметры для production hardware?

---

## S-048 — PBKDF2 encoded storage string

```text
source_id: S-048
image_hash: 19305f5bbec5
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-048__19305f5bbec5.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
// Store: version:algorithm:iterations:saltBase64:hashBase64
return $"{Version}:{Algo}:{Iterations}:"
     + $"{Convert.ToBase64String(salt)}:"
     + $"{Convert.ToBase64String(key)}";
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-049 — If you can choose: prefer Argon2id / scrypt / bcrypt

```text
source_id: S-049
image_hash: fcb512ebf972
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-049__fcb512ebf972.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
If you can choose: prefer Argon2id / scrypt / bcrypt

OWASP's top recommendation is Argon2id (memory-hard), then scrypt, and bcrypt is listed for legacy
SYSTEMS.

In those algorithms, you don't talk about "iterations" in the same way (bcrypt uses log rounds, Argon2 has
time + memory).
~~~

### Recall

1. Какие cost parameters использует Argon2id?
2. Почему memory cost затрудняет GPU/ASIC guessing?
3. Как выбирать параметры для production hardware?

---

## S-050 — What PBKDF2 does

```text
source_id: S-050
image_hash: 7895e2798dc2
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-050__7895e2798dc2.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What PBKDF2 does

PBKDF2 takes:
password — what the user typed
- salt — random bytes stored with the hash
«iterations — how many times to repeat internal work
- PRF/hash algorithm — here SHA256
- output length — how many bytes to generate

and produces a derived byte array.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-051 — DB schema example (custom table)

```text
source_id: S-051
image_hash: 60b59ad66f79
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-051__60b59ad66f79.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
DB schema example (custom table)
"" sql (a)
CREATE TABLE dbo.UserAccounts (
Id UNIQUEIDENTIFIER NOT NULL PRIMARY KEY,
Email NVARCHAR(256) NOT NULL UNIQUE,
PasswordHash NVARCHAR(1024) NOT NULL,
CreatedAt DATETIME2 NOT NULL CONSTRAINT DF_UserAccounts_CreatedAt DEFAULT SYSUTCDATETIME()
ds
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-052 — Single "encoded string" layout (what many frameworks do)

```text
source_id: S-052
image_hash: 24a9d592c65c
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-052__24a9d592c65c.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Single "encoded string" layout (what many frameworks do)
Many systems store one string that packs algorithm + parameters + salt + hash.
PBKDF2-style format (illustrative)
PBKDF2$HMACSHA256$310000$<base64 (salt)>$<base64(hash)> oO
Example:
PBKDF2$HMACSHA256$310000$p8v226] tQm9Yz2uGh8dG5w==$2w7Kqv708+1mShB7rQq@RSy3g1c9m...== oO
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-053 — When you change the version

```text
source_id: S-053
image_hash: 8a90b9983576
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-053__8a90b9983576.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
When you change the version
Bump the version when you change any of these:

- Algorithm / PRF (e.g., PBKDF2-SHA1 — PBKDF2-SHA256, or — Argon2id)

- Parameters (iterations, memory cost, output length)

- Encoding / storage format (how you serialize salt/hash)

- You add a "pepper" or change pepper strategy
If you only tweak recommended parameters but keep the same parsing scheme, you can still bump version
(simpler) or store parameters inside the string and keep version the same. In practice, bumping version when
you make meaningful security changes is clean and safe.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-054 — PasswordKdf.Verify implementation

```text
source_id: S-054
image_hash: 361fc26e5177
placements: 1
region: R03
image_file: source/images-near-literal-v001/S-054__361fc26e5177.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public static bool Verify(
    string password,
    string stored)
{
    var parts = stored.Split(':');

    if (parts.Length != 5)
        return false;

    if (!int.TryParse(parts[0], out var version)
        || version != Version)
        return false;

    var algorithm = parts[1];
    if (algorithm != Algo)
        return false;

    if (!int.TryParse(parts[2], out var iterations))
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
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-055 — What HashPassword actually returns

```text
source_id: S-055
image_hash: 7e2ddd1a8f51
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-055__7e2ddd1a8f51.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What HashPassword actually returns

HashPassword(user, password) returns just the Identity hash payload, not your label.

Example conceptually:
o cH (a)
var hash = _hasher.HashPassword(user, "secret");

hash is something like:
«> Plain text ia')
AQAAAATAAYagAAAA. .

not:
«> Plain text a')
IDENTITY: AQAAAATAAYagAAAA..-
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-056 — Example in your code:

```text
source_id: S-056
image_hash: 45b612e08765
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-056__45b612e08765.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Example in your code:
byte[] actual = Rfc2898DeriveBytes.Pbkdf2(
password,
salt,
iterations,
HashAlgorithmivame.SHA256,
expected. Length);
This means:
- use the entered password
- combine it with the stored salt
- run PBKDF2 for iterations rounds
- use HMAC-SHA256 internally
generate the same number of bytes as the stored hash
Then compare actual with expected .
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-057 — There isn't a single magic "good" bcrypt log rounds value, because it depends on your server CPU and how

```text
source_id: S-057
image_hash: f27e4f53b216
placements: 2
region: R04
image_file: source/images-near-literal-v001/S-057__f27e4f53b216.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
There isn't a single magic "good" bcrypt log rounds value, because it depends on your server CPU and how
many logins you must handle. The right answer is:
Pick the highest cost you can tolerate so that hashing takes ~100-500ms on your production hardware
(and definitely < 1s).
What OWASP says
OWASP''s Password Storage Cheat Sheet says:
- For legacy systems using bcrypt: use a work factor of 10 or more. .
That's a minimum baseline, not necessarily "best".
~~~

### Recall

1. Что означает bcrypt log rounds?
2. Почему рост cost экспоненциально увеличивает работу?
3. Что хранится внутри bcrypt encoded string?

---

## S-058 — A concrete "flow" example (PBKDF2)

```text
source_id: S-058
image_hash: 8dd525c56457
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-058__8dd525c56457.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
A concrete "flow" example (PBKDF2)
During login verification:
1. Read from DB:
- salt s
- iterations N
- stored hash H
2. Compute:
- H" = PBKDF2(passwordInput, S, N)
3. Compare H" to H
If you later raise N, you can upgrade at next login:
- verify with old N
- ifsuccess and N is below policy — recompute with new N — update stored hash
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-059 — Notes you can add to your conspect

```text
source_id: S-059
image_hash: c7ab107397d0
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-059__c7ab107397d0.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Notes you can add to your conspect
- Store only PasswordHash (never plaintext).
- Hash string contains salt + params (don't store salt separately for Identity hasher).
- Support rehash on login to upgrade security gradually.
- Add online protections: rate limiting + lockout + MFA.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-060 — 1) Does PasswordHasher<TUser> expect a "user structure" with a PasswordHash property?

```text
source_id: S-060
image_hash: 8763341629e9
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-060__8763341629e9.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
1) Does PasswordHasher<TUser> expect a "user structure" with a PasswordHash property?
No.

PasswordHasher<TUser> / IPasswordHasher<TUser> takes a TUser instance, but it doesn't require any
specific properties like [PasswordHash.The method signatures are:

wo CH ia')

string HashPassword(TUser user, string password);

PasswordVerificationResult VerifyHashedPassword(TUser user, string hashedPassword, string provide
'(~~ »
So the "user" is mostly there for extensibility / compatibility. In most real apps, you just store the returned
string into whatever column you want (often called PasswordHash by convention, but it could be any name).
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-061 — bcrypt format (real-world recognizable)

```text
source_id: S-061
image_hash: b48ac837c8ae
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-061__b48ac837c8ae.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
bcrypt format (real-world recognizable)
bcrypt stores cost + salt + hash in one string:

$2b$12$<22charSalt><31charHash> oO
Example shape:

$2b$12$e9N7Z1h3z91B7Q8mbcEoUUOQggHFVgkg8rlv9h8CwYQ6p2m1aXkSa a')
Argon2id format (real-world recognizable)
Argon2 strings include version + memory/time/parallelism + salt + hash:

$argon2id$v=19$m=65536, t=3, p=1$<b64salt>$<b64hash> a')
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-062 — Example: versioned PBKDF2 with automatic upgrade

```text
source_id: S-062
image_hash: c8a9f4d30844
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-062__c8a9f4d30844.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Example: versioned PBKDF2 with automatic upgrade
This example supports:
- V1: PBKDF2-HMAC-SHA1, 100k iters (legacy)
- V2: PBKDF2-HMAC-SHA256, 210k iters (current)
When a V1 hash verifies, it rehashes to V2 and returns the upgraded hash so you can store it.
~~~

### Recall

1. Зачем хранить format/version marker?
2. Как выполнить rehash-on-login без принудительного password reset?
3. Что должно произойти после успешной проверки legacy hash?

---

## S-063 — Valid PBKDF2 storage in one self-contained string

```text
source_id: S-063
image_hash: 20be8ed39051
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-063__20be8ed39051.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
This is valid password storage (PBKDF2 + salt + cost + fixed-time compare), and the DB stores just one
string.
What I'd recommend in ASP.NET Core
- Ifyou can: use Identity's hasher (best: proven, versioned, rehash support).
- If you must do manual: use the improved pattern above (SHA256, versioned format, fixed-time compare,
store cost params).
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-064 — Versioned PasswordHasher implementation

```text
source_id: S-064
image_hash: 87f3611fb3ad
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-064__87f3611fb3ad.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public static class PasswordHasherV
{
    // Current settings used for new password hashes.
    private const int CurrentVersion = 2;

    // V1 — legacy.
    private const int V1Iterations = 100_000;
    private const int V1SaltSize = 16;
    private const int V1KeySize = 32;

    // V2 — current.
    private const int V2Iterations = 210_000;
    private const int V2SaltSize = 16;
    private const int V2KeySize = 32;

    public static string Hash(string password)
        => HashV2(password);
}
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-065 — Practical ranges people actually use

```text
source_id: S-065
image_hash: 99dc93390c81
placements: 2
region: R04
image_file: source/images-near-literal-v001/S-065__99dc93390c81.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Practical ranges people actually use
On modern servers, typical starting points are:
- 10: minimum baseline (often ~100ms-ish depending on CPU)
- 12: common "good default" for many web apps (often ~200-300ms-ish)
- 14: higher security, but may be ~1s-ish (depends a lot on hardware)
(Exact times vary wildly; you must measure.)
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-066 — Why PBKDF2 is used for passwords

```text
source_id: S-066
image_hash: b8d038ad2756
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-066__b8d038ad2756.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Why PBKDF2 is used for passwords
Passwords are usually weak compared to random keys.
So you should not store:
«plain password
encrypted password
«simple fast hash like plain SHA-256(password)
Because fast hashes are cheap for attackers to brute-force.
PBKDF2 helps because it is:
« salted — same password does not always produce same output
«iterated + makes guessing slower
deterministic — same inputs produce same output, so verification works
So if two users both use 123456, their stored values differ because the salt differs.
And if an attacker steals the database, each password guess is expensive because PBKDF2 is intentionally
slower than plain hashing.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-067 — 2) What does the Identity password hash string look like?

```text
source_id: S-067
image_hash: de9865e33d8b
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-067__de9865e33d8b.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
2) What does the Identity password hash string look like?
It's a single string (Base64) that encodes a versioned binary blob containing:
- format/version marker (so it can evolve)
- PRF (hash function used inside PBKDF2)
- iteration count
- salt length + salt bytes
+ subkey length + derived subkey bytes
So you'll see something like:
« Plain text ia')
AQAAAATAAYagAAAAE... (long Base64)
You should treat it as an opaque string. Don't parse it unless you have a very specific reason.
1
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-068 — so hash with iterations always gives you the same result for specific

```text
source_id: S-068
image_hash: 9986bb0d15ac
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-068__9986bb0d15ac.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
so hash with iterations always gives you the same result for specific
iterations count, but why? and what is log rounds
Why does "hash with iterations" always give the same result (for same inputs)?
Because PBKDF2/bcrypt/Argon2 are deterministic functions.
For a given set of inputs:
- - password P
- salt Ss
- cost params (e.g., iterations N)
- algorithm/version
- (pepper, if used)
..the KDF must always output the same derived key/hash. If it didn't, you could never verify a login: you'd
compute it again and get a different result every time.
So the "randomness" in password hashing comes from the salt (and sometimes internal random salt
generation), not from the KDF output being random.
1
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-069 — VerifyAndUpgrade return contract

```text
source_id: S-069
image_hash: 73a5ad219521
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-069__73a5ad219521.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
// Returns: (verified, upgradedHashOrNull)
// If Verified is true and UpgradedHash is not null,
// store the upgraded hash in the database.
public static (bool Verified, string? UpgradedHash)
    VerifyAndUpgrade(
        string password,
        string stored)
{
    if (string.IsNullOrWhiteSpace(stored))
        return (false, null);

    var parts = stored.Split(':', StringSplitOptions.None);
    if (parts.Length != 4)
        return (false, null);

    if (!int.TryParse(parts[0], out var version))
        return (false, null);

    byte[] salt;
    byte[] expected;

    try
    {
        salt = Convert.FromBase64String(parts[2]);
        expected = Convert.FromBase64String(parts[3]);
    }
    catch (FormatException)
    {
        return (false, null);
    }

    // The version-specific verification continues
    // in the next source blocks.
}
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-070 — PasswordVerificationResult.SuccessRehashNeeded is a built-in result from ASP.NET Core Identity's

```text
source_id: S-070
image_hash: 7dd5ade2999f
placements: 1
region: R04
image_file: source/images-near-literal-v001/S-070__7dd5ade2999f.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Yes.
PasswordVerificationResult.SuccessRehashNeeded is a built-in result from ASP.NET Core Identity's
PasswordHasher.
It means:
- the password is correct
- but the stored hash should be upgraded and saved again
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-071 — Is PBKDF2 "a good hash function"?

```text
source_id: S-071
image_hash: a033f472afb1
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-071__a033f472afb1.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Is PBKDF2 "a good hash function"?
Better wording:
PBKDF2 is a good password hashing / key derivation scheme
- it is not just a normal hash function
For password storage, PBKDF2 is acceptable and widely used.
But modem recommendations often prefer:
- Argon2
- scrypt
sometimes berypt
because they can be more resistant to GPU/ASIC cracking.
Still, PBKDF2 is absolutely legitimate and common in.NET systems.
~~~

### Recall

1. Какие cost parameters использует Argon2id?
2. Почему memory cost затрудняет GPU/ASIC guessing?
3. Как выбирать параметры для production hardware?

---

## S-072 — PBKDF2 example idea (conceptual):

```text
source_id: S-072
image_hash: b1f0e6d05075
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-072__b1f0e6d05075.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
PBKDF2 example idea (conceptual):
- It repeatedly applies HMAC and mixes results.
- But HMAC is deterministic.
- Repeating deterministic steps N times is still deterministic.
So PBKDF2(P, S, N) will always produce the same bytes.
~~~

### Recall

1. Какие входы использует PBKDF2?
2. Какие параметры должны храниться для verification?
3. Почему iteration count должен быть benchmarked и versioned?

---

## S-073 — When that happens

```text
source_id: S-073
image_hash: f7ffe66e8739
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-073__f7ffe66e8739.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
When that happens
Usually when the stored hash was created with older or weaker settings than the hasher currently uses.
Typical reasons:

- the hash uses an older format version

- iteration count / work factor is now higher

- compatibility mode changed
~~~

### Recall

1. Зачем хранить format/version marker?
2. Как выполнить rehash-on-login без принудительного password reset?
3. Что должно произойти после успешной проверки legacy hash?

---

## S-074 — Set the work factor as high as your server can tolerate (for login/registration), typically targeting ~100—

```text
source_id: S-074
image_hash: a6e8d6d0f0c5
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-074__a6e8d6d0f0c5.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Set the work factor as high as your server can tolerate (for login/registration), typically targeting ~100—
500ms per hash. NIST phrases it as "as large as verification server performance will allow." _
If you're using PBKDF2 (ASP.NET Core Identity default)
OWASP's current guidance (when PBKDF2 is needed, e.g., FIPS) is:

- =PBKDF2-HMAC-SHA256: 600,000 iterations or more _ creatsheetseries..
That's a good security target, but you still must benchmark—600k might be fine on one server and too slow
on another.
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-075 — Version switch during password verification

```text
source_id: S-075
image_hash: f76ee4803102
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-075__f76ee4803102.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
bool ok = version switch
{
    1 => VerifyPbkdf2(
        password,
        salt,
        expected,
        V1Iterations,
        HashAlgorithmName.SHA1),

    2 => VerifyPbkdf2(
        password,
        salt,
        expected,
        V2Iterations,
        HashAlgorithmName.SHA256),

    _ => false
};

if (!ok)
    return (false, null);

// Upgrade an old version after a successful login.
if (version != CurrentVersion)
{
    var upgraded = HashV2(password);
    return (true, upgraded);
}

return (true, null);
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-076 — Then how is this different from encryption with a random IV/nonce?

```text
source_id: S-076
image_hash: 58e649044dc4
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-076__58e649044dc4.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Then how is this different from encryption with a random IV/nonce?
Encryption typically uses a fresh random IV/nonce so encrypting the same plaintext twice gives different
ciphertexts.
Password hashing/KDF is not trying to be "different every time'; it's trying to be:
- slow to guess
- unique per user (via salt)
- verifiable (deterministic)
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-077 — So after:

```text
source_id: S-077
image_hash: 0e10a26e9d00
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-077__0e10a26e9d00.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
So after:
" CH (a)
var result = _hasher.VerifyHashedPassword(user, storedHash, providedPassword);

you can get:

- - (Failed

- - Success

- SuccessRehashNeeded
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-078 — Practical takeaway

```text
source_id: S-078
image_hash: 371d82338409
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-078__371d82338409.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Practical takeaway
- Why is user there? Extensibility and user-aware hashing policies.
- Does the built-in hasher use it today? No, not in the current implementation.
- - Can you pass null ? Usually works with the built-in hasher, but avoid relying on that.
- Best practice? Pass the real user object.
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-079 — What ASP.NET Core Identity uses by default

```text
source_id: S-079
image_hash: db184d9e6604
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-079__db184d9e6604.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What ASP.NET Core Identity uses by default
Microsoft's Identity docs show the configurable PasswordHasherOptions.IterationCount and note it defaults
to 100,000 (for IdentityV3), though the page also shows an older/default value example elsewhere.
eam microsoft.
So: don't assume defaults match OWASP—decide based on your policy + benchmarks.
How to set PBKDF2 iterations in Identity
o CH ia)
using Microsoft.AspNetCore. Identity;
builder. Services.Configure<PasswordHasherOptions>(options =>
{
options. IterationCount = 600_000; // example: align with OWASP guidance if performance allows
v3
'(EEE }
(That configuration knob is documented by Microsoft} _ teammicrosoftc...
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-080 — So for the default hasher

```text
source_id: S-080
image_hash: 96e0dc1ddfd7
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-080__96e0dc1ddfd7.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
So for the default hasher-
- passing the real user or null usually produces the same result
- because the current implementation ignores user internally — cittup -:
Should you pass nu11?
You can get away with it with the default PasswordHasher<TUser>, but it is not a good habit.
Why:
- the interface contract is user-aware
- acustom IPasswordHasher<TUser> may rely on user
- future implementations may use it
So the safer rule is:
wo CH ia)
var hash = hasher.HashPassword(user, password);
var result = hasher.VerifyHashedPassword(user, user.PasswordHash, password);
Pass the actual user whenever you have it. L
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-081 — What FixedTimeEquals is

```text
source_id: S-081
image_hash: 60633929cf88
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-081__60633929cf88.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What FixedTimeEquals is
CryptographicOperations.FixedTimeEquals(a, b) compares two byte arrays in a way designed to take
about the same amount of time, regardless of where the first difference occurs.
Normal comparison often stops at the first mismatch.
Example naive comparison:
CH a
for (int i - @; i < a.Length; i++)
{
if (a[i] != b[i]) return false;
+
return trues
If first byte differs, it exits immediately.
If first 20 bytes match and byte 21 differs, it runs longer.
That timing difference can leak information.
~~~

### Recall

1. Почему обычное раннее сравнение может утекать через timing?
2. Какой .NET API выполняет fixed-time comparison?
3. Что нужно сравнивать после повторного derivation?

---

## S-082 — Handling SuccessRehashNeeded

```text
source_id: S-082
image_hash: ce9e15f0acc8
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-082__ce9e15f0acc8.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
if (result == PasswordVerificationResult.SuccessRehashNeeded)
{
    user.PasswordHash =
        _hasher.HashPassword(user, providedPassword);

    // Persist the updated user/hash.
}

Why it exists:

Users do not need to reset passwords merely because hashing settings improved.
On the next successful login:

- verify the old hash;
- recognize that it is outdated;
- hash with current settings;
- store the new hash.
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-083 — HashV2 implementation

```text
source_id: S-083
image_hash: 853594661f95
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-083__853594661f95.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
// Format: version:algorithm:saltBase64:hashBase64
private static string HashV2(string password)
{
    byte[] salt = RandomNumberGenerator.GetBytes(V2SaltSize);

    byte[] key = Rfc2898DeriveBytes.Pbkdf2(
        password,
        salt,
        V2Iterations,
        HashAlgorithmName.SHA256,
        V2KeySize);

    return $"2:PBKDF2-SHA256:"
         + $"{Convert.ToBase64String(salt)}:"
         + $"{Convert.ToBase64String(key)}";
}
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-084 — Why timing-safe comparison matters

```text
source_id: S-084
image_hash: 946881632e35
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-084__946881632e35.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Why timing-safe comparison matters
Suppose an attacker can measure response times very precisely.
If your compare exits early, attacker may learn:
«first byte correct?
«first two bytes correct?
«first three bytes correct?
'Over many attempts, they may infer the correct value byte by byte.
This is called a timing attack.
For password verification, you want comparison to reveal only:
- match
- no match
and nothing about how close it was.
FixedTimeEquals helps prevent that by avoiding early exit based on content.
~~~

### Recall

1. Почему обычное раннее сравнение может утекать через timing?
2. Какой .NET API выполняет fixed-time comparison?
3. Что нужно сравнивать после повторного derivation?

---

## S-085 — VerifyPbkdf2 helper

```text
source_id: S-085
image_hash: 521c2aa0ff6a
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-085__521c2aa0ff6a.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
private static bool VerifyPbkdf2(
    string password,
    byte[] salt,
    byte[] expected,
    int iterations,
    HashAlgorithmName prf)
{
    byte[] actual = Rfc2898DeriveBytes.Pbkdf2(
        password,
        salt,
        iterations,
        prf,
        expected.Length);

    return CryptographicOperations.FixedTimeEquals(
        actual,
        expected);
}
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-086 — Argon2id has three main knobs:

```text
source_id: S-086
image_hash: 6691ff1609b6
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-086__6691ff1609b6.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Argon2id has three main knobs:
- - m (memory_cost): how much RAM per hash (KB in many APIs)
- t (time_cost): how many passes over that memory
- p (parallelism): lanes/threads used per hash
The best practical method
1. Decide how much RAM you can afford per concurrent login.
2. Start with t=1, measure time.
3. Increase t until you hit your target time (often ~100—-500ms).
4. Keep p modest (often 1-4). p increases CPU usage and throughput; it's not always a pure "more
secure" knob.
~~~

### Recall

1. Какие cost parameters использует Argon2id?
2. Почему memory cost затрудняет GPU/ASIC guessing?
3. Как выбирать параметры для production hardware?

---

## S-087 — How you use it with a DB record

```text
source_id: S-087
image_hash: 4bc92fa6aed4
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-087__4bc92fa6aed4.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
How to use the versioned hasher with a database record:

var (ok, upgraded) =
    PasswordHasherV.VerifyAndUpgrade(
        inputPassword,
        user.PasswordHash);

if (!ok)
    return Unauthorized();

if (upgraded is not null)
{
    user.PasswordHash = upgraded;
    await db.SaveChangesAsync();
}

return Ok();
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-088 — Measure and tune Argon2 parameters

```text
source_id: S-088
image_hash: 5b8aa37929ba
placements: 1
region: R05
image_file: source/images-near-literal-v001/S-088__5b8aa37929ba.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
This "measure and tune" approach is also recommended by Argon2 libraries (e.g., argon2-cffi docs: start with
time_cost=1, measure, raise time_cost; if too slow, lower memory).
Baseline recommendations you can start from
There are two commonly cited baselines:

OWASP minimum baseline (very conservative "minimum")
OWASP Password Storage Cheat Sheet says Argon2id minimum:

- memory 19 MiB

- iterations (time_cost) 2

- parallelism 1
This is a floor, not "ideal for everyone".
~~~

### Recall

1. Какие cost parameters использует Argon2id?
2. Почему memory cost затрудняет GPU/ASIC guessing?
3. Как выбирать параметры для production hardware?

---

## S-089 — Notes (worth adding to your conspect)

```text
source_id: S-089
image_hash: 6742380a802b
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-089__6742380a802b.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Notes (worth adding to your conspect)
- Versioning enables safe crypto migrations without forcing password resets.
- "Rehash-on-login" is the standard way to upgrade password hashing parameters over time.
- Always use constant-time compare (CryptographicOperations.FixedTimeEquals).
- Store enough metadata to reproduce verification (version or parameters, salt, hash).
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-090 — RFC 9106 Argon2 parameter profiles

```text
source_id: S-090
image_hash: 47ecbe5071ca
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-090__47ecbe5071ca.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
RFC 9106 "recommended options" (stronger defaults, but can be heavy)
RFC 9106 suggests two "uniform" options:
- Option 1 (high memory): t=1, p=4, m=2*21 KiB (= 2 GiB)
- Option 2 (memory-constrained): t=3, p=4, m=2%16 KiB (= 64 MiB) datatrackeriett.
In many web apps, 2 GiB per login is unrealistic, but the 64 MiB / t=3 / p=4 option is a common starting
point.
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-091 — How to pick values (rules of thumb)

```text
source_id: S-091
image_hash: 9e13c8250670
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-091__9e13c8250670.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
How to pick values (rules of thumb)
Memory (m): pick this first
Memory is Argon2's superpower vs GPUs.

- For typical web login systems, common practical ranges are 64 MiB to 256 MiB per hash.

- Think about concurrency:

if you allow 50 concurrent password verifications and choose 128 MiB each = that's ~6.4 GiB worst case.

So you might choose:

- 64 MiB if you're memory constrained (also aligns with RFC's "memory-constrained" option)

atatrackeriett..
- 128-256 MiB if you can afford it
~~~

### Recall

1. Какие cost parameters использует Argon2id?
2. Почему memory cost затрудняет GPU/ASIC guessing?
3. Как выбирать параметры для production hardware?

---

## S-092 — Here are two clean ways to do "versioning" with ASP.NET Core PasswordHasher<TUser> .

```text
source_id: S-092
image_hash: 549c1c6f2510
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-092__549c1c6f2510.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Here are two clean ways to do "versioning" with ASP.NET Core PasswordHasher<TUser> .
The key idea: Identity already versioned the hash format for you. You don't need to add your own vi/v2
prefix unless you're migrating from a non-Identity legacy format.
A) Best: Let Identity's hasher handle versioning + upgrade (rehash-on-login)
Configure current policy (iterations)
" CH oO
using Microsoft.AspNetCore. Identity;
builder.Services.Configure<PasswordHasherOptions>(o =>
{
0.CompatibilityMode = PasswordHasherCompatibilityMode.IdentityV3; // modern format
o.IterationCount = 210 000; // tune for your servers
ys
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-093 — So what does t change?

```text
source_id: S-093
image_hash: f5fc992392d7
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-093__f5fc992392d7.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
So what does t change?
+ = number of iterations/passes (often called "iterations" in docs).
- - t=1:one full pass over the memory
- t= 2: two passes (roughly ~2x the work)
- t= 3: three passes (roughly ~3x the work)
It's not perfectly linear in real life (CPU cache effects, memory bandwidth, parallelism), but it's close.
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-094 — Tune Argon2 time cost to the latency target

```text
source_id: S-094
image_hash: 59294985efea
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-094__59294985efea.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Time cost (t): tune to your latency target
Once memory is set, adjust t until hashing time is where you want it.
- Start t=1, measure.
- Increase to t=2 or t=3 if you want more cost.
RFC's memory-constrained recommendation uses t=3. datatrackeriett..
Parallelism (p): usually 1-4
- p is how many lanes/threads Argon2 uses for one hash.
- Higher p can make a single hash faster on multi-core CPUs, but also increases CPU usage.
- RFC examples use p=4. datatrackeriett_..
Many web backends choose p=1 or p=2 to avoid one login eating too many cores, especially under
load.
~~~

### Recall

1. Какие cost parameters использует Argon2id?
2. Почему memory cost затрудняет GPU/ASIC guessing?
3. Как выбирать параметры для production hardware?

---

## S-095 — Identity hash, verify and upgrade service

```text
source_id: S-095
image_hash: fa126f07ea5d
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-095__fa126f07ea5d.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Hash + verify + upgrade

using Microsoft.AspNetCore.Identity;

public class AuthService
{
    private readonly IPasswordHasher<UserAccount> _hasher;

    public AuthService(
        IPasswordHasher<UserAccount> hasher)
    {
        _hasher = hasher;
    }

    public void SetPassword(
        UserAccount user,
        string password)
    {
        user.PasswordHash =
            _hasher.HashPassword(user, password);
    }
}
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-096 — VerifyAndUpgrade implementation

```text
source_id: S-096
image_hash: 867a96609785
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-096__867a96609785.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
// Returns true if the password is correct.
// Produces an upgraded hash when needed.
public bool VerifyAndUpgrade(
    UserAccount user,
    string providedPassword,
    out string? upgradedHash)
{
    upgradedHash = null;

    var result = _hasher.VerifyHashedPassword(
        user,
        user.PasswordHash,
        providedPassword);

    if (result == PasswordVerificationResult.Failed)
        return false;

    if (result == PasswordVerificationResult.SuccessRehashNeeded)
    {
        upgradedHash =
            _hasher.HashPassword(user, providedPassword);
    }

    return true;
}
~~~

### Recall

1. Зачем хранить format/version marker?
2. Как выполнить rehash-on-login без принудительного password reset?
3. Что должно произойти после успешной проверки legacy hash?

---

## S-097 — UserAccount persistence model

```text
source_id: S-097
image_hash: e07c7851ab62
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-097__e07c7851ab62.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public class UserAccount
{
public Guid Id { get; set; }
public string Email { get; set; } = "";
public string PasswordHash { get; set; } = "";
}
~~~

### Recall

1. Какой password-hashing принцип показывает этот source?
2. Какие данные хранятся в DB, а какие не должны храниться?
3. Как воспроизвести показанный flow или код без screenshot?

---

## S-098 — Example login flow with DB update

```text
source_id: S-098
image_hash: 04826915ab46
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-098__04826915ab46.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Example login flow with database update:

var ok = auth.VerifyAndUpgrade(
    user,
    inputPassword,
    out var upgraded);

if (!ok)
    return Unauthorized();

if (upgraded is not null)
{
    user.PasswordHash = upgraded;
    await db.SaveChangesAsync();
}

return Ok();

This is versioning in practice: the stored hash includes a format marker,
and VerifyHashedPassword can request a rehash when it detects an older
format or weaker parameters.
~~~

### Recall

1. Зачем хранить format/version marker?
2. Как выполнить rehash-on-login без принудительного password reset?
3. Что должно произойти после успешной проверки legacy hash?

---

## S-099 — B) Migrating from a legacy (manual) format into PasswordHasher<TUser>

```text
source_id: S-099
image_hash: db60dabfa9ca
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-099__db60dabfa9ca.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Migrating from a legacy manual format into PasswordHasher<TUser>

If old hashes are stored as `hash:salt` or another custom format,
temporarily distinguish the formats during migration.

Example:

Legacy:
LEGACY:<old-format-payload>

New Identity format:
IDENTITY:<identity-hash-string>

The custom prefix is a migration boundary, not something produced
by PasswordHasher<TUser> itself.
~~~

### Recall

1. Какую задачу решает salt и почему его можно хранить рядом с hash?
2. Какие поля нужны серверу для повторной проверки пароля?
3. Что изменится для двух пользователей с одинаковым паролем?

---

## S-100 — MigrationAuthService

```text
source_id: S-100
image_hash: 990799e34c43
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-100__990799e34c43.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public class MigrationAuthService
{
    private readonly IPasswordHasher<UserAccount> _hasher;

    public MigrationAuthService(
        IPasswordHasher<UserAccount> hasher)
    {
        _hasher = hasher;
    }

    public bool VerifyAndUpgrade(
        UserAccount user,
        string providedPassword,
        out string? upgradedStoredValue)
    {
        upgradedStoredValue = null;

        if (user.PasswordHash.StartsWith(
            "IDENTITY:",
            StringComparison.Ordinal))
        {
            var identityHash =
                user.PasswordHash["IDENTITY:".Length..];

            var result = _hasher.VerifyHashedPassword(
                user,
                identityHash,
                providedPassword);

            if (result == PasswordVerificationResult.Failed)
                return false;

            if (result == PasswordVerificationResult.SuccessRehashNeeded)
            {
                var newHash =
                    _hasher.HashPassword(user, providedPassword);

                upgradedStoredValue = "IDENTITY:" + newHash;
            }

            return true;
        }

        // Legacy handling continues in the next source.
    }
}
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-101 — Legacy-prefix migration branch

```text
source_id: S-101
image_hash: f264a9c18681
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-101__f264a9c18681.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
if (user.PasswordHash.StartsWith(
    "LEGACY:",
    StringComparison.Ordinal))
{
    var legacyPayload =
        user.PasswordHash["LEGACY:".Length..];

    // 1) Verify using the legacy verifier.
    if (!LegacyVerifier.Verify(
        legacyPayload,
        providedPassword))
    {
        return false;
    }

    // 2) Upgrade immediately to the Identity format.
    var newHash =
        _hasher.HashPassword(user, providedPassword);

    upgradedStoredValue = "IDENTITY:" + newHash;
    return true;
}

return false;
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?

---

## S-102 — LegacyVerifier

```text
source_id: S-102
image_hash: 032852b467e2
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-102__032852b467e2.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
public static class LegacyVerifier
{
    // Implement parsing and fixed-time comparison
    // for the actual legacy format.
    public static bool Verify(
        string legacyStored,
        string password)
    {
        // Example only:
        // return PasswordKdf.Verify(password, legacyStored);

        throw new NotImplementedException();
    }
}
~~~

### Recall

1. Почему обычное раннее сравнение может утекать через timing?
2. Какой .NET API выполняет fixed-time comparison?
3. Что нужно сравнивать после повторного derivation?

---

## S-103 — Persisting an upgraded hash after login

```text
source_id: S-103
image_hash: a914b8ec4326
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-103__a914b8ec4326.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
Database update after login:

var ok = migrationAuth.VerifyAndUpgrade(
    user,
    inputPassword,
    out var upgraded);

if (!ok)
    return Unauthorized();

if (upgraded is not null)
{
    user.PasswordHash = upgraded;
    await db.SaveChangesAsync();
}

return Ok();
~~~

### Recall

1. Зачем хранить format/version marker?
2. Как выполнить rehash-on-login без принудительного password reset?
3. Что должно произойти после успешной проверки legacy hash?

---

## S-104 — What "version" is in PasswordHasher

```text
source_id: S-104
image_hash: f27cd2ca9496
placements: 1
region: R06
image_file: source/images-near-literal-v001/S-104__f27cd2ca9496.png
transcript_mode: OCR-assisted near-literal normalized
```

### Near-literal normalized visible content

~~~text
What "version" is in PasswordHasher
- You won't see v=1/v=2 as plain text.
- Identity's hash string is Base64 of a binary payload that includes a format marker (Identity V2 vs V3) and
parameters.
- VerifyHashedPassword reads that marker and can decide "this is old > SuccessRehashNeeded ".
~~~

### Recall

1. Что уже кодирует строка ASP.NET Core Identity hash?
2. Когда возвращается SuccessRehashNeeded?
3. Почему user parameter присутствует в IPasswordHasher<TUser>?
