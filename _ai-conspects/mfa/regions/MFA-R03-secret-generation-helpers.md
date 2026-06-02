# MFA-R03 - Secret generation helpers

Conspect: `mfa`  
File type: **verified region/correction transcript**  
Stage: **1 / transcript v001**  
Generated: 2026-06-02 16:01:53 UTC

---

## Direction check

Goal:
Process the first transcript pass after MFA Stage0 boundary review.

Done:
Stage0 created stable source IDs and rough candidate groups.

Now:
This file processes `21` sources for `MFA-R03`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage1 review/commit, process MFA Stage2 R05 + R06 + R07.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
Secret-generation implementation helpers: random bytes, Base32, OtpNet, UserSecret entities, DbContext, course-style character alphabet, entropy, BitConverter, and indexing.
```

Key ideas:

- TOTP secrets should be generated with cryptographic randomness.
- A recommended approach is random bytes encoded as Base32 for authenticator compatibility.
- Another course-style approach picks characters from a restricted alphabet using random bytes.
- BitConverter.ToUInt32 can turn four random bytes into a random number for alphabet indexing.
- Modulo indexing maps the random number into the allowed character set.
- Storing bytes and displaying Base32 only when needed can be stronger for storage design.
- PendingMfaEnrollment and UserSecret represent temporary enrollment state vs active authenticator devices.

Reading quality:
```text
Visible text was read from Stage0 source images/contact sheets with OCR assistance.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
If a later review finds a small OCR artifact, fix that source with a precision patch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047
```

Boundary decision:
```text
Included in MFA-R03 after Stage1 local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage0 group | Status | Theme |
|---|---|---|---|---|---|
| S-027 | IU-027 | `7c889d55b7` | `MFA-R03` | `verified-visible-ocr-assisted` | A) Razor Views (MVC) |
| S-028 | IU-028 | `b13f3b8c33` | `MFA-R03` | `verified-visible-ocr-assisted` | Why we need to rewrite it (the core problem) |
| S-029 | IU-029 | `1db6e01e3e` | `MFA-R03` | `verified-visible-ocr-assisted` | Controller-based implementation examples (MVC) |
| S-030 | IU-030 | `9d63f2a2a9` | `MFA-R03` | `verified-visible-ocr-assisted` | Packages |
| S-031 | IU-031 | `e57dcd60a0` | `MFA-R03` | `verified-visible-ocr-assisted` | an |
| S-032 | IU-032 | `1ca4326572` | `MFA-R03` | `verified-visible-ocr-assisted` | A) Database entities |
| S-033 | IU-033 | `dc530357ea` | `MFA-R03` | `verified-visible-ocr-assisted` | UserSecret (active authenticator devices) |
| S-034 | IU-034 | `0d51dc1dc2` | `MFA-R03` | `verified-visible-ocr-assisted` | DbContext |
| S-035 | IU-035 | `e372e25659` | `MFA-R03` | `verified-visible-ocr-assisted` | 2) Helpers: secret generation + otpauth URI |
| S-036 | IU-036 | `af235edcff` | `MFA-R03` | `verified-visible-ocr-assisted` | Option 1 (recommended): random bytes — Base32 string |
| S-037 | IU-037 | `6a38860e29` | `MFA-R03` | `verified-visible-ocr-assisted` | Option 3: Store as bytes, display as Base32 only when needed |
| S-038 | IU-038 | `63646802a6` | `MFA-R03` | `verified-visible-ocr-assisted` | Option 2: “restricted character alphabet” (course style) |
| S-039 | IU-039 | `d143beb145` | `MFA-R03` | `verified-visible-ocr-assisted` | Explanation |
| S-040 | IU-040 | `2deb847856` | `MFA-R03` | `verified-visible-ocr-assisted` | for (int i = 0; i < length; i++) |
| S-041 | IU-041 | `bb7d428777` | `MFA-R03` | `verified-visible-ocr-assisted` | Explanation |
| S-042 | IU-042 | `c0f0d81876` | `MFA-R03` | `verified-visible-ocr-assisted` | 1) Entropy, BitConverter, and what BitConverter does in the “alphabet-picking” secret |
| S-043 | IU-043 | `fca73d7345` | `MFA-R03` | `verified-visible-ocr-assisted` | What BitConverter is |
| S-044 | IU-044 | `d5a1cc3f1a` | `MFA-R03` | `verified-visible-ocr-assisted` | 1) Why approach 1 and 2 look the same, and what's actually different |
| S-045 | IU-045 | `0930efc45e` | `MFA-R03` | `verified-visible-ocr-assisted` | What it does in the second secret creation implementation |
| S-046 | IU-046 | `8abb3ea9b6` | `MFA-R03` | `verified-visible-ocr-assisted` | Approach 2: pick characters from an alphabet (course style) |
| S-047 | IU-047 | `445c351263` | `MFA-R03` | `verified-visible-ocr-assisted` | Step-by-step: what happens exactly |

---

## 2. Source transcript

### S-027 - A) Razor Views (MVC)

Metadata:
```text
source_id: S-027
image_use_id: IU-027
fileId_short: 7c889d55b7
image_file: S-027__7c889d55b7.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
A) Razor Views (MVC)
1) Views/Mfa/Enroll.cshtm1
Client-side QR generation using ‘grcode.js (same idea as the course).
> cshtml ia’)
@model MfaEnrollViewModel
@
ViewData["Title"] = "Enable MFA";
}
<h2>Enable MFA</h2>
<p>Scan the QR code using an authenticator app (Google/Microsoft Authenticator, Authy).</p>
<div style="display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap;">
<div>
<div id="qrCode" style="padding:12px; border:1px solid #ccc; display: inline-block;"></div
<input type="hidden" id="qrCodeUri" value="@Model.QrCodeUri" />
</div>
,
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-028 - Why we need to rewrite it (the core problem)

Metadata:
```text
source_id: S-028
image_use_id: IU-028
fileId_short: b13f3b8c33
image_file: S-028__b13f3b8c33.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Why we need to rewrite it (the core problem)
In the “simple” enrollment flow, the server generates a TOTP secret on GET and then the browser sends that
secret back on POST (usually via hidden inputs or JSON). That's risky because:
* The browser is not trusted. A user can edit hidden inputs / JSON in DevTools.
* If the secret can be changed client-side, an attacker could:
* enroll MFA using a secret they control
* then generate valid codes forever
* Even if it's “their own account’, you still don’t want enrollment to be tamperable (it breaks security
guarantees and can create weird audit/recovery issues).
Fix: generate secret on the server, store it server-side as “pending enrollment”, and during POST only
accept the code (and device name). The server uses the stored secret to verify the code and then persists it.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-029 - Controller-based implementation examples (MVC)

Metadata:
```text
source_id: S-029
image_use_id: IU-029
fileId_short: 1db6e01e3e
image_file: S-029__1db6e01e3e.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Controller-based implementation examples (MVC)
Below are clean, “controller style” examples that mirror the course flow:
+ Enrollment controller: generate secret > show OR ~ verify > store secret
* Login controller: password sign-in — if MFA required — verify code — sign in
I'll show this using Otp.NET (a common .NET TOTP library). If you prefer not to use a library, tell me and I'll
show the raw RFC approach—but library is the normal approach.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-030 - Packages

Metadata:
```text
source_id: S-030
image_use_id: IU-030
fileId_short: 9d63f2a2a9
image_file: S-030__9d63f2a2a9.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Packages

For TOTP verification I'll assume Otp.NET (common):
© OtpNet.Totp

© OtpNet.Base32Encoding
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-031 - an

Metadata:
```text
source_id: S-031
image_use_id: IU-031
fileId_short: e57dcd60a0
image_file: S-031__e57dcd60a0.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
an

<div style="max-width:520px;">
<h4>Manual setup key</h4>
<p>If you can’t scan, enter this key manually:</p>
<pre style="padding:12px; background:#f5f5*5; border:1px solid #ddd;">@Model .Secret</pre>
<p><strong>Issuer:</strong> @Model .Issuer</p>
<p><strong>Account:</strong> @Model . AccountName</p>

</div>

</div>
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-032 - A) Database entities

Metadata:
```text
source_id: S-032
image_use_id: IU-032
fileId_short: 1ca4326572
image_file: S-032__1ca4326572.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
A) Database entities
PendingMfaEnrollment (one pending record per user)
” cH (a)
public class PendingMfaEnrollment
{
public Guid Id { get; set; } = Guid.NewGuid();
// enforce one pending enrollment per user
public Guid UserId { get; set; }
public AppUser User { get; set; } = default!;
// store protected secret (encrypt/protect)
public string ProtectedSecret { get; set; } = default!;
public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
public DateTime ExpiresUtc { get; set; }
// for concurrency / update safety (optior ~\
public string ConcurrencyStamp { get; set; V = Guid.NewGuid().ToString();
}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-033 - UserSecret (active authenticator devices)

Metadata:
```text
source_id: S-033
image_use_id: IU-033
fileId_short: dc530357ea
image_file: S-033__dc530357ea.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
UserSecret (active authenticator devices)
” cH (a)
public class UserSecret
{
public Guid Id { get; set; } = Guid.NewGuid();
public Guid UserId { get; set; }
public AppUser User { get; set; } = default!;
public string Name { get; set; } = default!;
public string ProtectedSecret { get; set; } = default!;
public bool IsActive { get; set; } = true;
public DateTime CreatedUtc { get; set; } = DateTime.UtcNow;
public string ConcurrencyStamp { get; set; } = Guid-NewGuid().ToString();
+
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-034 - DbContext

Metadata:
```text
source_id: S-034
image_use_id: IU-034
fileId_short: 0d51dc1dc2
image_file: S-034__0d51dc1dc2.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
DbContext
” cH G
public class AppDbContext : DbContext
{
public DbSet<UserSecret> UserSecrets => Set<UserSecret>();
public DbSet<PendingMfaEnrollment> PendingMfaEnrollments => Set<PendingMfaEnrollment>();
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
base.OnModelCreating(modelBuilder) ;
mode1Builder. Entity<PendingMfaEnrollment>()
-HasIndex(x => x-UserId)
-IsUnique();
+
+
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-035 - 2) Helpers: secret generation + otpauth URI

Metadata:
```text
source_id: S-035
image_use_id: IU-035
fileId_short: e372e25659
image_file: S-035__e372e25659.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
2) Helpers: secret generation + otpauth URI
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-036 - Option 1 (recommended): random bytes — Base32 string

Metadata:
```text
source_id: S-036
image_use_id: IU-036
fileId_short: af235edcff
image_file: S-036__af235edcff.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Option 1 (recommended): random bytes — Base32 string
Code
o cH oO
using System. Security.Cryptography;
using OtpNet;
public static class TotpSecret
{
// 2@ bytes = 160 bits (common standard; plenty for TOTP)
public static string CreateBase32Secret(int byteLength = 20)
{
byte[] secretBytes = RandomNumberGenerator.GetBytes(byteLength) ;
return Base32Encoding.ToString(secretBytes); // Base32 text for QR/manual entry
}
}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-037 - Option 3: Store as bytes, display as Base32 only when needed

Metadata:
```text
source_id: S-037
image_use_id: IU-037
fileId_short: 6a38860e29
image_file: S-037__6a38860e29.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Option 3: Store as bytes, display as Base32 only when needed
Best for security/clean design: internally treat secret as bytes, encode only for QR/manual.
Code
o cH oO
using System. Security.Cryptography;
using OtpNet;
public static class TotpSecretBytes
{
public static byte[] CreateSecretBytes(int byteLength = 20)
=> RandomNumberGenerator .GetBytes(byteLength) ;
public static string ToBase32(byte[] secretBytes)
=> Base32Encoding . ToString(secretBytes) ;
}
Why this is nice
* Verification libraries typically want bytes anyway
* DB can store protected bytes/string
* Encoding is only for user-facing QR/manual display
1
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-038 - Option 2: “restricted character alphabet” (course style)

Metadata:
```text
source_id: S-038
image_use_id: IU-038
fileId_short: 63646802a6
image_file: S-038__63646802a6.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Option 2: “restricted character alphabet” (course style)
This matches the approach you described: pick characters from an allowed set using randomness.
Code
wo C# a’)
using System. Security.Cryptography;
using System. Text;
public static class TotpSecretCourseStyle
{
// Base32 alphabet (classic): A-Z and 2-7
private static readonly char[] Alphabet = "ABCDEFGHIIJKLMNOPQRSTUVWXYZ234567" .ToCharArray();
public static string CreateSecret(int length = 16)
{
// Generate plenty of random bytes so every character pick is random
byte[] random = RandomNumberGenerator.GetBytes(length * 4);
var sb = new StringBuilder(length);
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-039 - Explanation

Metadata:
```text
source_id: S-039
image_use_id: IU-039
fileId_short: d143beb145
image_file: S-039__d143beb145.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Explanation
*  RandomiumberGenerator .GetBytes(byteLength)
* produces cryptographically secure random bytes
* this is what gives you unpredictability
© Base32Encoding. ToString(secretBytes)
* converts bytes into Base32 text (safe for QR URIs and manual typing)
* Base32 avoids problematic Base64 chars like + / =
© 20 bytes
© 20 bytes = 160 bits of entropy
* brute forcing that is infeasible
This is the cleanest implementation and aligns with how most TOTP systems are built.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-040 - for (int i = 0; i < length; i++)

Metadata:
```text
source_id: S-040
image_use_id: IU-040
fileId_short: 2deb847856
image_file: S-040__2deb847856.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
for (int i = 0; i < length; i++)

{
// Read 4 bytes as an unsigned int (@..2*32-1)
uint val = BitConverter.ToUInt32(random, i * 4);
// Convert to an index inside Alphabet
sb.Append(Alphabet[val % (uint)Alphabet .Length]);

3

return sb.ToString();

+
+
——— EEE)
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-041 - Explanation

Metadata:
```text
source_id: S-041
image_use_id: IU-041
fileId_short: bb7d428777
image_file: S-041__bb7d428777.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Explanation
* We want a secret composed of “safe characters”.
© RandomiumberGenerator.GetBytes(length * 4)
* gives enough randomness for each character
© BitConverter.ToUInt32(...)
* turns 4 bytes into a number
* val % Alphabet .Length
* converts the random number into a valid array index
* append characters — final secret string
Note: this produces a Base32-like key, but its entropy depends on length:
* 16 Base32 chars = 80 bits (since each char ~ 5 bits)
© 32 Base32 chars = 160 bits (stronger)
So if you use this pattern, prefer length = 32 for “standard strength”.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-042 - 1) Entropy, BitConverter, and what BitConverter does in the “alphabet-picking” secret

Metadata:
```text
source_id: S-042
image_use_id: IU-042
fileId_short: c0f0d81876
image_file: S-042__c0f0d81876.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
1) Entropy, BitConverter, and what BitConverter does in the “alphabet-picking” secret
generator
What “entropy” means (in this context)
Entropy = how unpredictable the secret is.
In security, we measure it in bits: more bits + harder to guess/brute force.
* ATOTP secret with 160 bits of entropy is astronomically hard to brute force.
* If your secret is made from Base32 characters (32 possible symbols), each character carries 5 bits of
entropy (because 2° = 32) if selection is uniform.
So:
* 16 Base32 chars = 16 x 5 = 80 bits (ok, but weaker)
* 32 Base32 chars = 32 x 5 = 160 bits (strong)
That's why “length” matters in the second approach.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-043 - What BitConverter is

Metadata:
```text
source_id: S-043
image_use_id: IU-043
fileId_short: fca73d7345
image_file: S-043__fca73d7345.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
What BitConverter is
BitConverter is a NET helper class that converts bytes to primitive types and back.
Example:
*  BitConverter.ToUInt32(byte[] bytes, int startIndex)
* reads 4 bytes starting at startIndex
«interprets them as an unsigned 32-bit integer (0 to 4,294,967,295)
It doesn’t “encrypt/decrypt” anything. It just interprets raw bytes as numbers.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-044 - 1) Why approach 1 and 2 look the same, and what's actually different

Metadata:
```text
source_id: S-044
image_use_id: IU-044
fileId_short: d5a1cc3f1a
image_file: S-044__d5a1cc3f1a.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
1) Why approach 1 and 2 look the same, and what's actually different
Both approaches end with a Base32-like string secret that goes into the otpauth:// URI, so they look
similar. The differences are in how the secret is produced, which affects entropy, standardness, and
sometimes uniformity.
Approach 1: random bytes — Base32 encode (recommended)
What it really is
© The “true secret” is raw random bytes (e.g., 20 bytes = 160 bits).
* Base32 is only an encoding so the secret can be represented as text (QR/manual entry).
* This is the standard way most TOTP systems are designed.
Why it's good
© Entropy is clear and controllable (20 bytes = 160 bits).
* Interoperable and conventional.
* No “homemade' selection logic.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-045 - What it does in the second secret creation implementation

Metadata:
```text
source_id: S-045
image_use_id: IU-045
fileId_short: 0930efc45e
image_file: S-045__0930efc45e.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
What it does in the second secret creation implementation
That generator does roughly:
1. RandomNumberGenerator.GetBytes(...) gives you random bytes.
2. For each output character:
* Take 4 bytes
© Convert them into a random UInt32 using BitConverter.ToUInt32(...)
* Map that number into your alphabet by doing modulo (% alphabetLength )
* Append that chosen character
So:
* Bytes — random integer — index — character
* Repeated length times to build the secret.
Why 4 bytes at a time?
* Because 4 bytes gives a large random number space, making each character selection effectively
random.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-046 - Approach 2: pick characters from an alphabet (course style)

Metadata:
```text
source_id: S-046
image_use_id: IU-046
fileId_short: 8abb3ea9b6
image_file: S-046__8abb3ea9b6.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Approach 2: pick characters from an alphabet (course style)
What it really is
* You create a text secret directly by picking characters like A-Z, 2-7 (Base32 alphabet).
Each character carries about log2(32)=5 bits of entropy if selection is uniform.
* So entropy depends on length:
© 16 chars = 80 bits
* 32 chars = 160 bits
Why it can be weaker
* Ifyou choose only 16 chars, it’s half the strength of 20 random bytes Base32-encoded.
* Some implementations use value % alphabetLength , which can introduce tiny bias (usually negligible,
but still “less pure” than encoding bytes).
In one sentence
* Approach 1: generate a strong binary secret first, then encode it for humans.
* Approach 2: generate a human-readable secret directly; strength depends on how many chars you use
and how you select them.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-047 - Step-by-step: what happens exactly

Metadata:
```text
source_id: S-047
image_use_id: IU-047
fileId_short: 445c351263
image_file: S-047__445c351263.png
stage0_group: MFA-R03
stage1_region: MFA-R03
status: verified-visible-ocr-assisted
transcript_method: Stage1 visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Step-by-step: what happens exactly
Assume you want a 16-character secret.
1) Generate random bytes (once)
” cH oO
byte[] tokenData = RandomNumberGenerator .GetBytes(64);
* That creates an array tokenData of length 64 bytes.
* Those bytes are cryptographically random.
Example (just illustrative):
tokenData = [ @xA1, @x3F, @x0@, @x7C, x19, OxE2, @x5B, @xD0, ... ] a)
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- TOTP secrets should be generated with cryptographic randomness.
- A recommended approach is random bytes encoded as Base32 for authenticator compatibility.
- Another course-style approach picks characters from a restricted alphabet using random bytes.
- BitConverter.ToUInt32 can turn four random bytes into a random number for alphabet indexing.
- Modulo indexing maps the random number into the allowed character set.
- Storing bytes and displaying Base32 only when needed can be stronger for storage design.
- PendingMfaEnrollment and UserSecret represent temporary enrollment state vs active authenticator devices.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Entities and DbContext are shown. | S-032, S-033, S-034 | high |
| Recommended random-bytes/Base32 helper is shown. | S-036, S-037, S-039, S-044 | high |
| Restricted alphabet/course-style helper is described. | S-038, S-041, S-046, S-047 | high |
| BitConverter and entropy/indexing are explained. | S-040, S-042, S-043, S-045 | medium-high |
| MVC/Razor context and controller examples introduce implementation section. | S-027, S-028, S-029, S-030, S-031, S-035 | medium |

---

## 5. Open review issues

- This file is valid for MFA Stage1 because every included source has visible text and no OCR-placeholder processed source.
- Remaining MFA Stage0 groups are not closed by this file: R05/R06/R07.
- MFA closure audit must run after Stage2 is complete.
