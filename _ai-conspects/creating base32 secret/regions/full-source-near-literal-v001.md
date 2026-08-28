# Creating a Base32/TOTP secret — source-preserving near-literal transcript

## Source identity

```text
uploaded source snapshot: creating base32 secret(1).svg
SHA-256: 00b26f65fd54c455c8d09c1cad61b2023719537afad3c427ab3ddb80179fa2a6
Git blob verified in repository: d5aad6ee05f95c43d8650f1506140fa93deb8ab4
embedded image definitions: 34
image uses: 34
SVG text nodes: 63
```

## Transcription method and boundary

- One `S-XXX` block is retained for every embedded image use, in SVG use order.
- Text is transcribed at a near-literal level; spelling, whitespace, and punctuation are lightly normalized.
- Screenshot UI chrome, copy icons, language badges, and source-site footers are omitted.
- Prose blocks marked `high` were cleanly readable. Code/symbol-heavy blocks are marked `medium` and remain traceable to the exact embedded image hash.
- Interpretation is not substituted for visible source text.

## SVG canvas text nodes

- `T-001`: using System.Security.Cryptography;
- `T-002`: using OtpNet;
- `T-003`: [empty text node]
- `T-004`: public static class TotpSecret
- `T-005`: {
- `T-006`:     // 20 bytes = 160 bits (common standard; plenty for TOTP)
- `T-007`:     public static string CreateBase32Secret(int byteLength = 20)
- `T-008`:     {
- `T-009`:         byte[] secretBytes = RandomNumberGenerator.GetBytes(byteLength);
- `T-010`:         return Base32Encoding.ToString(secretBytes); // Base32 text for QR/manual entry
- `T-011`:     }
- `T-012`: }
- `T-013`: using System.Security.Cryptography;
- `T-014`: using System.Text;
- `T-015`: [empty text node]
- `T-016`: public static class TotpSecretCourseStyle
- `T-017`: {
- `T-018`:     // Base32 alphabet (classic): A-Z and 2-7
- `T-019`:     private static readonly char[] Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".ToCharArray();
- `T-020`: [empty text node]
- `T-021`:     public static string CreateSecret(int length = 16)
- `T-022`:     {
- `T-023`:         // Generate plenty of random bytes so every character pick is random
- `T-024`:         byte[] random = RandomNumberGenerator.GetBytes(length * 4);
- `T-025`: [empty text node]
- `T-026`:         var sb = new StringBuilder(length);
- `T-027`: [empty text node]
- `T-028`:         for (int i = 0; i < length; i++)
- `T-029`:         {
- `T-030`:             // Read 4 bytes as an unsigned int (0..2^32-1)
- `T-031`:             uint val = BitConverter.ToUInt32(random, i * 4);
- `T-032`: [empty text node]
- `T-033`:             // Convert to an index inside Alphabet
- `T-034`:             sb.Append(Alphabet[val % (uint)Alphabet.Length]);
- `T-035`:         }
- `T-036`: [empty text node]
- `T-037`:         return sb.ToString();
- `T-038`:     }
- `T-039`: }
- `T-040`: using System.Security.Cryptography;
- `T-041`: using OtpNet;
- `T-042`: [empty text node]
- `T-043`: public static class TotpSecretBytes
- `T-044`: {
- `T-045`:     public static byte[] CreateSecretBytes(int byteLength = 20)
- `T-046`:         => RandomNumberGenerator.GetBytes(byteLength);
- `T-047`: [empty text node]
- `T-048`:     public static string ToBase32(byte[] secretBytes)
- `T-049`:         => Base32Encoding.ToString(secretBytes);
- `T-050`: }
- `T-051`: entropy, bitconverter unsigned int
- `T-052`: using System.Net;
- `T-053`: [empty text node]
- `T-054`: public static string BuildOtpAuthUri(string issuer, string account, string base32Secret)
- `T-055`: {
- `T-056`:     var i = WebUtility.UrlEncode(issuer);
- `T-057`:     var a = WebUtility.UrlEncode(account);
- `T-058`: [empty text node]
- `T-059`:     return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
- `T-060`: }
- `T-061`: creating base32 secret
- `T-062`: explaining bits, bytes in base32
- `T-063`: why 5 bits for one base 32

## Source transcript

### S-001 — Option 2: "restricted character alphabet" (course style)

Source image SHA-256: `a8d5fbc463b0b4271bc5ad430df345200ec65760a84ac7a631d946c4656a4071`
Dimensions: `948 × 537`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Option 2: "restricted character alphabet" (course style)
This matches the approach you described: pick characters from an allowed set using randomness.
using System.Security.Cryptography;
using System.Text;
public static class TotpSecretCourseStyle
// Base32 alphabet(classic): A-Z and 2-7
private static readonly char[] Alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".ToCharArray();
public static string CreateSecret(int length = 16)
// Generate plenty of random bytes so every character pick is random
byte[] random = RandomNumberGenerator.GetBytes(length * 4);
var sb = new StringBuilder(length);
```

### S-002 — RandomNumberGenerator.GetBytes(byteLength)

Source image SHA-256: `6ec274a7ec27bb36859c8fb2fe8f27cc93bc3688e401453a8a637f478a75ba0b`
Dimensions: `1017 × 413`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
- RandomNumberGenerator.GetBytes(byteLength)
- produces cryptographically secure random bytes
- this is what gives you unpredictability
- Base32Encoding.ToString(secretBytes)
- converts bytes into Base32 text(safe for QR URIs and manual typing)
- Base32 avoids problematic Base64 chars like + / =
- 20 bytes
- 20 bytes = 160 bits of entropy
- brute forcing that is infeasible
This is the cleanest implementation and aligns with how most TOTP systems are built.
```

### S-003 — Option 1 (recommended): random bytes — Base32 string

Source image SHA-256: `dd4321dadcdbd52185eac11666c8817912a6fcebcd2f7bc9c421ae9dd62f03f8`
Dimensions: `981 × 485`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Option 1 (recommended): random bytes — Base32 string
using System.Security.Cryptography;
using OtpNet;
public static class TotpSecret
// 20 bytes = 160 bits(common standard; plenty for TOTP)
public static string CreateBase32Secret(int byteLength = 20)
byte[] secretBytes = RandomNumberGenerator.GetBytes(byteLength);
return Base32Encoding.ToString(secretBytes); // Base32 text for QR/manual entry
```

### S-004 — Helpers: secret generation + otpauth URI

Source image SHA-256: `d4c0e38ea40639eb40052cfd14e578be601bea71bc7e4ce0bef1c64ac81918fc`
Dimensions: `542 × 53`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
2) Helpers: secret generation + otpauth URI
```

### S-005 — Option 3: Store as bytes, display as Base32 only when needed

Source image SHA-256: `cd85c24c236b41e0a48c8b39c271803d0eec83100586eb5443a8c00371c38fb6`
Dimensions: `934 × 641`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Option 3: Store as bytes, display as Base32 only when needed
Best for security/clean design: internally treat secret as bytes, encode only for QR/manual.
using System.Security.Cryptography;
using OtpNet;
public static class TotpSecretBytes
public static byte[] CreateSecretBytes(int byteLength = 20)
=> RandomNumberGenerator.GetBytes(byteLength);
public static string ToBase32(byte[] secretBytes)
=> Base32Encoding.ToString(secretBytes);
- Verification libraries typically want bytes anyway
- DB can store protected bytes/string
- Encoding is only for user-facing QR/manual display
```

### S-006 — We want a secret composed of "safe characters".

Source image SHA-256: `aafd76d803309f840ed8910eb029750fbfced8bef3e15e642c9c2275e90b39c3`
Dimensions: `786 × 479`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
- We want a secret composed of "safe characters".
- RandomNumberGenerator.GetBytes(length * 4)
- gives enough randomness for each character
- BitConverter.ToUInt32(...)
- turns 4 bytes into a number
- val % Alphabet.Length
- converts the random number into a valid array index
- append characters — final secret string
Note: this produces a Base32-like key, but its entropy depends on length:
- 16 Base32 chars = 80 bits(since each char ~ 5 bits)
- 32 Base32 chars = 160 bits(stronger)
So if you use this pattern, prefer length = 32 for "standard strength".
```

### S-007 — uint val = BitConverter.ToUInt32(random, i * 4);

Source image SHA-256: `42af38170e20cc050c889ae400453d3c15ca0a49a5a191e250732f11caea7be0`
Dimensions: `894 × 341`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
for(int i = 0; i < length; i++)

// Read 4 bytes as an unsigned int(@..2*32-1)
uint val = BitConverter.ToUInt32(random, i * 4);
// Convert to an index inside Alphabet
sb.Append(Alphabet[val % (uint)Alphabet.Length]);

return sb.ToString();

——— EEE)
```

### S-008 — Approach 2: pick characters from an alphabet(course style)

Source image SHA-256: `f03ead5b57fb951c42f82840835387f8b3338db650888a37deab3dc54e5a16b4`
Dimensions: `933 × 546`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Approach 2: pick characters from an alphabet(course style)
- You create a text secret directly by picking characters like A-Z, 2-7 (Base32 alphabet).
Each character carries about log2(32)=5 bits of entropy if selection is uniform.
- So entropy depends on length:
- 16 chars = 80 bits
- 32 chars = 160 bits
- If you choose only 16 chars, it's half the strength of 20 random bytes Base32-encoded.
- Some implementations use value % alphabetLength, which can introduce tiny bias(usually negligible,
but still "less pure" than encoding bytes).
- Approach 1: generate a strong binary secret first, then encode it for humans.
- Approach 2: generate a human-readable secret directly; strength depends on how many chars you use
and how you select them.
```

### S-009 — Why approach 1 and 2 look the same, and what's actually different

Source image SHA-256: `54289840672d6dd599fb37c436a66f1f9899649bb83b9f1bfbb98236a1836030`
Dimensions: `898 × 497`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1) Why approach 1 and 2 look the same, and what's actually different
Both approaches end with a Base32-like string secret that goes into the otpauth:// URI, so they look
similar. The differences are in how the secret is produced, which affects entropy, standardness, and
sometimes uniformity.
Approach 1: random bytes — Base32 encode(recommended)
- The "true secret" is raw random bytes(e.g., 20 bytes = 160 bits).
- Base32 is only an encoding so the secret can be represented as text(QR/manual entry).
- This is the standard way most TOTP systems are designed.
Why it's good
- Entropy is clear and controllable(20 bytes = 160 bits).
- Interoperable and conventional.
- No "homemade' selection logic.
```

### S-010 — return $"otpauth://totp/{encIssuer}: {encAccount}?issuer={encIssuer}&secret={secret}";

Source image SHA-256: `38c7a011c16c64078705c796d39bc7d4ef0f6d55233acc0fea62b40eacc7fd76`
Dimensions: `912 × 323`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
public static string BuildOtpAuthUri(string issuer, string account, string secret)
// Important: URL encode issuer & label pieces
var encIssuer = WebUtility.UrlEncode(issuer);
var encAccount = WebUtility.UrlEncode(account);
return $"otpauth://totp/{encIssuer}: {encAccount}?issuer={encIssuer}&secret={secret}";
```

### S-011 — BitConverter is a .NET helper class that converts bytes to primitive types and back.

Source image SHA-256: `06d2fa916abe93c5f367c2bc8aa5489beae3ddb58a01037baa4ac35359f04d28`
Dimensions: `821 × 342`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
BitConverter is a .NET helper class that converts bytes to primitive types and back.
Example:
- BitConverter.ToUInt32(byte[] bytes, int startIndex)
- reads 4 bytes starting at startIndex
- interprets them as an unsigned 32-bit integer(0 to 4,294,967,295)
It doesn't "encrypt/decrypt" anything. It just interprets raw bytes as numbers.
```

### S-012 — Entropy, BitConverter, and what BitConverter does in the "alphabet-picking" secret

Source image SHA-256: `df11bd84db2943945c53556ffa76f396aece73f2f8b24c1cbd8d9fb98d185f08`
Dimensions: `930 × 481`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
1) Entropy, BitConverter, and what BitConverter does in the "alphabet-picking" secret
What "entropy" means(in this context)
Entropy = how unpredictable the secret is.
In security, we measure it in bits: more bits + harder to guess/brute force.
- ATOTP secret with 160 bits of entropy is astronomically hard to brute force.
- If your secret is made from Base32 characters(32 possible symbols), each character carries 5 bits of
entropy(because 2° = 32) if selection is uniform.
So:
- 16 Base32 chars = 16 x 5 = 80 bits(ok, but weaker)
- 32 Base32 chars = 32 x 5 = 160 bits(strong)
That's why "length" matters in the second approach.
```

### S-013 — What it does in the second secret creation implementation

Source image SHA-256: `9d77381e9038198731df2cf11087007b0b77127d6314f0de733979ed605d2d36`
Dimensions: `903 × 519`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
What it does in the second secret creation implementation
That generator does roughly:
1. RandomNumberGenerator.GetBytes(...) gives you random bytes.
2. For each output character:
- Take 4 bytes
- Convert them into a random UInt32 using BitConverter.ToUInt32(...)
- Map that number into your alphabet by doing modulo(% alphabetLength)
- Append that chosen character
So:
- Bytes — random integer — index — character
- Repeated length times to build the secret.
Why 4 bytes at a time?
- Because 4 bytes gives a large random number space, making each character selection effectively
random.
```

### S-014 — This is important because the label part of otpauth includes

Source image SHA-256: `f5127b498d810dc2c181471a987413c8fe3b4c14f8e69c7dadd509cb1212c355`
Dimensions: `891 × 452`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
This is important because the label part of otpauth includes:
- issuer:account
and account is often an email, which contains special characters.
So why do it here?
Because your otpauth string is essentially a URL.
If you don't encode, some values can break parsing in QR scanners / apps.
- WebUtility is the .NET class in System.Net.
- Some projects also use WebUtility indirectly or use WebUtilities(plural) from ASP.NET Core
packages.
- Conceptually, the job is the same: encode text for use in URLs.
```

### S-015 — BuildOtpAuthUri screenshot: what WebUtility / WebUtils is doing

Source image SHA-256: `14ef13e234d72e1b0b01a0511fa8bd4fa8c34fe7da76ac15491ae323332165fb`
Dimensions: `905 × 510`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
3) BuildOtpAuthUri screenshot: what WebUtility / WebUtils is doing
Your screenshot shows something like:
var i = WebUtility.UrlEncode(issuer);
var a = WebUtility.UrlEncode(account);
return $"otpauth://totp/{i}: {a}?secret={base32Secret }&issuer={i}"5
What WebUtility.UrlEncode does
It URL-encodes text so it is safe inside a URL.
Example:
- space "My App" becomes "My+App" (or %20 depending on encoder)
- @ in an email becomes %40
- = becomes %3A, etc.
```

### S-016 — Why this is "random enough"

Source image SHA-256: `102ff4f357d2c0ede4095d2f969e341d9d5f12f17e12e3d3fcb6ab7a81bd97a2`
Dimensions: `932 × 202`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Why this is "random enough"
- RandomNumberGenerator produces unpredictable bytes.
- Each 4-byte chunk is unpredictable.
- So each UInt32 is unpredictable.
- So each character choice is unpredictable.
```

### S-017 — Then how does that pick a character?

Source image SHA-256: `be14cb7d3c12f84ac721e4effbac40e2eb79071edccc19bab554662d377fcd09`
Dimensions: `949 × 604`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
4) Then how does that pick a character?
Say your alphabet is:
chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567".ToCharArray(); // length 32
You do:
var idx = rnd % chars.Length; // idx in @..31
result.Append(chars[idx]);
- % chars.Length shrinks the huge number into a valid index.
- If idx isO > 'A'
° if1-B
° if31-7
So each random UInt32 produces one random cha' ||, 2r.
```

### S-018 — On most machines.NET is little-endian, so the number is

Source image SHA-256: `11d6722eaac536e3fa844d6caee0254dae44146c786396c3bd96a05a8e46eb97`
Dimensions: `908 × 513`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
On most machines.NET is little-endian, so the number is:
rnd = 0x7C003FA1
Which in decimal is a big number(doesn't matter exactly).
Example for i = 1
Bytes used:
tokenData[4..7] = 19, E2, 5B, D0
rnd = 0xD05BE219
And so on.
Key point:
Those bytes are already random. Interpreting them as a number just groups them into a bigger random
value.
```

### S-019 — How do 4 bytes become a random number?

Source image SHA-256: `287c6a1527de04dc117a2035a2a4c68bba91ff157bb1e764b972c02b16ea50f5`
Dimensions: `997 × 384`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
3) How do 4 bytes become a random number?
BitConverter.ToUInt32(tokenData, startIndex) does:
- reads 4 bytes starting at startIndex
- interprets them as a 32-bit unsigned integer
Example for i = 0
Bytes used:
tokenData[0], tokenData[1], tokenData[2], tokenData[3] ia)
= A1, 3F, 00, 7C (hex)
```

### S-020 — Loop "one character at a time"

Source image SHA-256: `5259a1ffbeaaf1b93317e5213637726dd15dd98373c8ede7a5186d41198a9ea3`
Dimensions: `944 × 515`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
2) Loop "one character at a time"
for(int i = 0; i < 16; i++)
uint rnd = BitConverter.ToUInt32(tokenData, i * 4);
This means:
- i=0-startIndex = 0
- i=1-startIndex = 4
- i=2-—startIndex = 8
- i= 15 — startindex = 60
So yes: you take 4 bytes at a time, sequentially. v
```

### S-021 — Why 64 bytes?

Source image SHA-256: `4b4796dba5cb2b95f35c19a8969739f3d416ac5f08f829381f91bd708cba9e84`
Dimensions: `662 × 159`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Why 64 bytes?
- Because you want 16 characters
- and for each character you consume 4 bytes
- 16 × 4 = 64 bytes
```

### S-022 — Step-by-step: what happens exactly

Source image SHA-256: `763242834e5e0f8cacd264f611a93ca5d5a2ebcdf5bd88946069dba2e180d95d`
Dimensions: `924 × 436`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Step-by-step: what happens exactly
Assume you want a 16-character secret.
1) Generate random bytes(once)
byte[] tokenData = RandomNumberGenerator.GetBytes(64);
- That creates an array tokenData of length 64 bytes.
- Those bytes are cryptographically random.
Example(just illustrative):
tokenData = [ 0xA1, 0x3F, 0x00, 0x7C, 0x19, 0xE2, 0x5B, 0xD0, ... ]
```

### S-023 — How many Base32 chars is 160 bits?

Source image SHA-256: `087667b867d176ccce19c2e2d186f78a5129705c7382ac641c4280cab7c25117`
Dimensions: `863 × 371`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
How many Base32 chars is 160 bits?
Each Base32 char = 5 bits, so:
- 160 / 5 = 32 Base32 characters
So: 20 random bytes — Base32 — ~32 chars(often exactly 32 if you encode without padding).
& Pros:
- Entropy is exactly controlled by bytes.
- No bias(assuming cryptographic RNG).
- Easy to reason about strength.
```

### S-024 — First approach: generate random BYTES, then Base32 encode

Source image SHA-256: `cdcf1956ed1564f3187d89cab40f8abfbf18cd742accedcbfdb6a1fe61e80fb1`
Dimensions: `849 × 451`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
First approach: generate random BYTES, then Base32 encode
This is the "correct/standard" approach.
byteLength is how many random bytes you generate.
- 1 byte = 8 bits
- so byteLength × 8 = number of random bits
"How do we get 160 bits?"
If you generate 20 bytes:
- 20 bytes × 8 bits/byte = 160 bits
That means there are 2!© possible secrets(assuming a CSPRNG). That's extremely strong.
```

### S-025 — You're looking at two different ways to generate a Base32 secret(the shared key for TOTP). The k…

Source image SHA-256: `281597309c1bf59da4eee3d03045f648cc3ffff52b4ac4925fe15c2ba45fc862`
Dimensions: `937 × 378`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
You're looking at two different ways to generate a Base32 secret(the shared key for TOTP). The key idea is
always the same:
+ TOTP security comes from the entropy of the secret.
- Base32 is just an encoding to make the secret easy to type / QR.
Base32 uses an alphabet of 32 symbols ~ each Base32 character carries log2(32) = 5 bits of information.
So the correlation is:
entropy(bits) = 5 x number_of base32_chars
(minus a little if you do it wrong or add padding/bias)
```

### S-026 — why one base 32 char is 5 bits

Source image SHA-256: `59481af31e5e67c5b90a4b4211d0d3bcb948065d43b74a013956399fdc9f8876`
Dimensions: `1108 × 466`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
why one base 32 char is 5 bits
Because base 32 has 32 possible symbols, and 32 equals 2^5.
One bit can represent 2 values:
e Oorl> 21-2
Five bits can represent:
- 2^5 = 32 values
So one base32 character can encode exactly the amount of information contained in 5 bits.
```

### S-027 — 1bit > 2 values

Source image SHA-256: `ffbae28aaf96a1498998f9aefcfbe34f542f9d1c2ed7cbdbf67cabd5ed9a4955`
Dimensions: `989 × 284`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
- 1bit > 2 values
- 2bits > 4 values
- 3 bits > 8 values
- 4 bits > 16 values
- 5 bits > 32 values
Since base32 needs 32 different symbols, you need 5 bits to choose one symbol.
```

### S-028 — This does mean

Source image SHA-256: `027f1893820dcd7506ca4718cef069be85b7ec3b90e496d7b71d4da918a5d148`
Dimensions: `914 × 419`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
This does mean:
- every waiter performs one dictionary remove attempt
That is a tiny bit of extra contention/work, but usually not a correctness issue.
So:
- correctness: fine
- performance: usually acceptable
e safety: good, because of key+value matching
```

### S-029 — Yes, every waiter will reach the finally block and attempt the remove.

Source image SHA-256: `4dc2884af5cc6b3057453d1ba860d864d6ae56bdbafef37fca67282f31e707b6`
Dimensions: `1076 × 371`
Transcription confidence: **medium — rebuilt; code/symbol-sensitive**

```text
Yes, every waiter will reach the finally block and attempt the remove.
In this pattern:
var lazy = _inflight.GetOrAdd(key, _ => new Lazy<Task<object>>(...))5
var result0bj = await lazy.Value;
return(T)resultObj;
1 of
```

### S-030 — _inflight.TryRemove(new KeyValuePair<string, Lazy<Task<object>>>(key, lazy));

Source image SHA-256: `e8101c5abb961983348b7f0f619669f4642f440ae070dc0c037142c3f9b03150`
Dimensions: `1023 × 362`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
_inflight.TryRemove(new KeyValuePair<string, Lazy<Task<object>>>(key, lazy));
all callers that got the same lazy instance will later run:
_inflight.TryRemove(new KeyValuePair<string, Lazy<Task<object>>>(key, lazy));
```

### S-031 — Is that a problem?

Source image SHA-256: `91c8f5a471d7704788a14bb3095def95604923ed3232bc5c150716c82ba8423b`
Dimensions: `852 × 238`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Is that a problem?
Usually no. This is exactly why the code uses the key+value overload pattern.
It is not saying:

- remove whatever is currently under key
```

### S-032 — It is saying

Source image SHA-256: `96b8bc6ed24ac39ce1c2593d4f86803e034a87ca6a670af5a630990ea5e83670`
Dimensions: `977 × 371`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
It is saying:

- remove the entry only if the dictionary still contains this exact lazy instance for that key
So what happens is:

e the first caller that gets there after completion removes the entry

e later callers try the same remove

e it fails because the entry is already gone

That is normally safe.
```

### S-033 — Imagine this sequence

Source image SHA-256: `e40959840e722ee2ebd770bc5702617e723c0cb291bc51145cbb3d7324de6446`
Dimensions: `698 × 354`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
Imagine this sequence:
1. request A creates lazy1 and stores it under key
2. request B joins and also waits on lazy1
3. computation finishes
4. A removes key -> lazy1
5. a new request C arrives and creates lazy2 for the same key
6. B now runs its finally
```

### S-034 — If B did this

Source image SHA-256: `c1f69f109bb9a6c8199369ef19f06867ba0daf50120d0b6160c3be06b8ae2838`
Dimensions: `1116 × 246`
Transcription confidence: **medium — rebuilt; verify visually before treating as exact**

```text
If B did this:
_inflight.TryRemove(key, out _);
then B could accidentally remove lazy2, the new in-flight computation.
```

## Closure

```text
image uses transcribed: 34 / 34
SVG text nodes indexed: 63 / 63
semantic-only regional summary used as authoritative transcript: no
source reconstruction required: no
```
