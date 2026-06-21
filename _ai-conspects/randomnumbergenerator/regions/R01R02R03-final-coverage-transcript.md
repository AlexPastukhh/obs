# randomnumbergenerator — final coverage transcript v001

Source SVG: `randomnumbergenerator.svg`  
Conspect folder: `randomnumbergenerator`  
Stage: combined final coverage transcript

## 0.1 Area overview / understanding / reading quality

This conspect covers cryptographically secure randomness in .NET: when to use `RandomNumberGenerator`, token and code generation, entropy sizing, unbiased integer generation, secure shuffling, and legacy APIs to avoid. The screenshots are readable and form one coherent road.

## R01 — Secure random overview, examples, and entropy sizing

`System.Security.Cryptography.RandomNumberGenerator` is the .NET API for cryptographically secure random values. Use it when unpredictability protects a security property, for example:

```text
session IDs
password-reset or account-activation tokens
API keys
salts and nonces
MFA/recovery codes
random secrets
```

Do not substitute `System.Random` for these cases. `System.Random` is suitable for simulations, games, sampling, and non-security behavior; its output is not intended to resist prediction.

Typical token generation:

```csharp
byte[] bytes = RandomNumberGenerator.GetBytes(32);
string token = Convert.ToBase64String(bytes);
```

For URL transport, encode the bytes with a Base64URL encoder rather than ordinary Base64 when `+`, `/`, and padding are undesirable.

A numeric one-time code can use a bounded integer:

```csharp
int code = RandomNumberGenerator.GetInt32(100_000, 1_000_000);
string text = code.ToString("D6");
```

A six-digit code has a small search space, so security also depends on short expiry, rate limiting, attempt limits, and one-time use.

### How many bytes?

Raw random bytes provide eight bits per byte. Therefore:

```text
16 random bytes = 128 bits
32 random bytes = 256 bits
```

When choosing characters from an alphabet, each character contributes approximately `log2(alphabet size)` bits only when selection is unbiased. For Base32, one character carries five bits, so 20 characters represent about 100 bits and 32 characters about 160 bits.

Choose entropy according to the threat model, not merely the visible string length. Encoding changes representation length, not the underlying entropy.

## R02 — Static APIs, unbiased ranges, and shuffling

The preferred modern style is usually the static API:

```csharp
byte[] bytes = RandomNumberGenerator.GetBytes(32);
```

To avoid an extra array when a buffer already exists:

```csharp
Span<byte> buffer = stackalloc byte[32];
RandomNumberGenerator.Fill(buffer);
```

For bounded integers:

```csharp
int value = RandomNumberGenerator.GetInt32(10, 100); // 10 inclusive, 100 exclusive
int index = RandomNumberGenerator.GetInt32(items.Count);
```

`GetInt32` avoids modulo bias by rejecting values from the top of the underlying range when necessary. A tempting expression such as:

```csharp
index = randomUInt % alphabet.Length;
```

is biased whenever the source range is not evenly divisible by the alphabet length. The bias can be tiny, but security-sensitive code should use the API that performs unbiased range reduction.

Secure Fisher–Yates shuffle:

```csharp
for (int i = items.Count - 1; i > 0; i--)
{
    int j = RandomNumberGenerator.GetInt32(i + 1);
    (items[i], items[j]) = (items[j], items[i]);
}
```

The upper bound is exclusive, so `i + 1` allows every index from `0` through `i`.

## R03 — Instances and obsolete APIs

An instance can still be created when an API requires a `RandomNumberGenerator` object or a longer-lived abstraction is useful:

```csharp
using RandomNumberGenerator rng = RandomNumberGenerator.Create();
rng.GetBytes(buffer);
```

For ordinary application code, static methods are simpler and avoid unnecessary lifecycle management.

`RNGCryptoServiceProvider` is a legacy implementation-specific type and is obsolete in modern .NET. New code should use `RandomNumberGenerator` static methods or `RandomNumberGenerator.Create()` when an instance is explicitly required.

## Practical checklist

```text
1. Use RandomNumberGenerator for every security-sensitive random value.
2. Prefer GetBytes/Fill for raw entropy.
3. Prefer GetInt32 for bounded integers; do not reduce with modulo.
4. Encode bytes after generation; encoding does not add entropy.
5. Add expiry and rate limits to short human-entered codes.
6. Avoid RNGCryptoServiceProvider in new code.
```

## Coverage

```text
R01: 4 image uses / 2 text labels
R02: 5 image uses / 2 text labels
R03: 2 image uses / 1 text label
Remaining unclosed image uses: 0
Remaining unclosed text labels: 0
```
