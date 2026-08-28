# Cryptographic randomness and unbiased ranges

Knowledge ID: `dotnet.cryptographic-randomness-and-unbiased-ranges`

Topic: `dotnet`

Use `RandomNumberGenerator` whenever unpredictability protects security: session/reset/activation tokens, API keys, salts, nonces, MFA/recovery codes, and secrets. `System.Random` is for simulation/games/sampling, not adversarial prediction.

`GetBytes` returns raw entropy; `Fill(Span<byte>)` uses existing storage. Sixteen bytes provide 128 bits and 32 bytes 256 bits. Encoding changes representation length, not entropy; use Base64URL for URL transport. Alphabet characters contribute about `log2(size)` bits only under unbiased selection: 20 Base32 characters represent about 100 bits and 32 represent about 160 bits.

```csharp
byte[] bytes = RandomNumberGenerator.GetBytes(32);
string token = Convert.ToBase64String(bytes);

int code = RandomNumberGenerator.GetInt32(100_000, 1_000_000);
string codeText = code.ToString("D6");
```

`GetInt32(min, max)` uses an exclusive upper bound and unbiased range reduction. A raw value modulo `alphabet.Length` is biased whenever the source range is not evenly divisible by the alphabet size: some remainders receive one more source value than others. `GetInt32` rejects the uneven top portion rather than favoring those outcomes. Short numeric codes still need expiry, rate/attempt limits, and one-time use. Secure Fisher–Yates chooses `j = GetInt32(i + 1)` for each descending position so every index `0…i` is reachable without biased `%` reduction.

Prefer static APIs. Use `RandomNumberGenerator.Create()` only when an instance/abstraction is required; legacy `RNGCryptoServiceProvider` is obsolete for new code.

## Sources
- Workspace: `_ai-conspects/randomnumbergenerator/`
- Processed source: `regions/R01R02R03-final-coverage-transcript.md`, complete transcript
