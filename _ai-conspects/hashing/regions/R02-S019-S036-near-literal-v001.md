# R02 — ASP.NET Core Identity setup, custom entities and cost-parameter basics

Generated: 2026-07-04 UTC  
Source range: `S-019` through `S-036`

```text
sources: 18 / 18
remaining in region: 0
transcript mode: OCR-assisted near-literal normalized
```

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
