# R03 — Fixed-time verification, PBKDF2 implementation and encoded formats

Generated: 2026-07-04 UTC  
Source range: `S-037` through `S-054`

```text
sources: 18 / 18
remaining in region: 0
transcript mode: OCR-assisted near-literal normalized
```

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
