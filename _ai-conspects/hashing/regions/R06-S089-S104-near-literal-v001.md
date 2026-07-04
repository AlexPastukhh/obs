# R06 — Migration, rehash-on-login and production parameter selection

Generated: 2026-07-04 UTC  
Source range: `S-089` through `S-104`

```text
sources: 16 / 16
remaining in region: 0
transcript mode: OCR-assisted near-literal normalized
```

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
