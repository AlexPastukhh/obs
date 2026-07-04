# R04 — Identity hash payload, bcrypt, versioning and rehash decisions

Generated: 2026-07-04 UTC  
Source range: `S-055` through `S-070`

```text
sources: 16 / 16
remaining in region: 0
transcript mode: OCR-assisted near-literal normalized
```

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
