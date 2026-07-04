# R01 — Threat model, salt, pepper and password-storage fundamentals

Generated: 2026-07-04 UTC  
Source range: `S-001` through `S-018`

```text
sources: 18 / 18
remaining in region: 0
transcript mode: OCR-assisted near-literal normalized
```

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
