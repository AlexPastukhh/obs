# R05 — Determinism, tuning, FixedTimeEquals and Argon2id mechanics

Generated: 2026-07-04 UTC  
Source range: `S-071` through `S-088`

```text
sources: 18 / 18
remaining in region: 0
transcript mode: OCR-assisted near-literal normalized
```

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
