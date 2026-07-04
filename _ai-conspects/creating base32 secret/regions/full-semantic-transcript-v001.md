# Creating a Base32 and TOTP secret

## Purpose

This transcript preserves the complete meaning of the source: how to generate a TOTP secret, how entropy
relates to byte and Base32 lengths, why the byte-first approach is preferred, how to construct an `otpauth`
URI, and the separate in-flight dictionary cleanup note present on the canvas.

## Source coverage

```text
Source SVG SHA-256: 00b26f65fd54c455c8d09c1cad61b2023719537afad3c427ab3ddb80179fa2a6
Repository source Git blob: d5aad6ee05f95c43d8650f1506140fa93deb8ab4
Image uses covered: 34 / 34
SVG text nodes reviewed: 63 / 63
```

Coverage map:

```text
S-001..S-009   byte-first and alphabet-picking secret generation
S-010..S-015   otpauth URI and URL encoding
S-011..S-027   entropy, BitConverter, Base32 length, step-by-step generation
S-028..S-034   separate in-flight dictionary cleanup note
```

## 1. What the TOTP secret is

A TOTP secret is shared key material known to the server and the authenticator application. TOTP security
depends on the unpredictability of this secret.

Base32 is an encoding for representing the secret as text. Base32 does not create entropy and does not make
weak random input strong. It is useful because its alphabet is convenient for QR provisioning and manual
entry.

The classic Base32 alphabet is:

```text
ABCDEFGHIJKLMNOPQRSTUVWXYZ234567
```

## 2. Recommended approach: generate random bytes, then encode

The clean and conventional approach is:

1. generate cryptographically secure random bytes;
2. retain those bytes as the real secret;
3. encode them as Base32 only where text representation is required.

```csharp
using System.Security.Cryptography;
using OtpNet;

public static string CreateBase32Secret(int byteLength = 20)
{
    byte[] secretBytes =
        RandomNumberGenerator.GetBytes(byteLength);

    return Base32Encoding.ToString(secretBytes);
}
```

`RandomNumberGenerator.GetBytes` is a cryptographically secure source. `Random` is not a suitable
replacement for security-sensitive secret generation.

Twenty random bytes contain:

```text
20 bytes * 8 bits = 160 bits
```

Base32 carries five bits per character because it has 32 symbols and `2^5 = 32`. Therefore 160 bits require
32 Base32 characters when represented without padding:

```text
160 bits / 5 bits per character = 32 characters
```

The byte-first design has clear benefits:

- entropy is selected directly through byte length;
- the binary secret matches how verification libraries commonly consume key material;
- Base32 is only a presentation format;
- there is no custom character-selection algorithm to audit.

## 3. Store bytes internally when practical

A clean design can store or protect the secret as bytes and convert it to Base32 only for provisioning:

```csharp
public static byte[] CreateSecretBytes(int byteLength = 20) =>
    RandomNumberGenerator.GetBytes(byteLength);

public static string ToBase32(byte[] secretBytes) =>
    Base32Encoding.ToString(secretBytes);
```

Whether the database stores protected bytes or a protected Base32 string is an application storage decision.
In either form, the secret is a credential:

- protect it at rest;
- do not log it;
- limit how often it is displayed;
- treat a QR code containing it as sensitive;
- rotate and re-enroll when exposure is suspected.

## 4. Alternative approach: select Base32 characters directly

Another approach creates the textual key directly by selecting characters from the Base32 alphabet:

```csharp
using System.Security.Cryptography;
using System.Text;

public static string CreateSecret(int length = 32)
{
    const string alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

    byte[] random =
        RandomNumberGenerator.GetBytes(length * 4);

    var result = new StringBuilder(length);

    for (int i = 0; i < length; i++)
    {
        uint value =
            BitConverter.ToUInt32(random, i * 4);

        int index =
            (int)(value % alphabet.Length);

        result.Append(alphabet[index]);
    }

    return result.ToString();
}
```

The flow is:

```text
random bytes -> UInt32 -> alphabet index -> one Base32 character
```

Four bytes are consumed for each output character because `BitConverter.ToUInt32` reads four bytes.
For sixteen characters this implementation requests sixty-four bytes.

`BitConverter` does not encrypt or decode the secret. It simply interprets four bytes as an unsigned 32-bit
number. Machine endianness changes the numeric interpretation, but the result remains derived from uniform
random bytes; endianness does not make the selection predictable.

## 5. Entropy of direct character selection

If every character is selected uniformly from 32 symbols, each output character contributes five bits:

```text
16 characters = 80 bits
32 characters = 160 bits
```

A sixteen-character direct-selection key is therefore much weaker than a 20-byte, 160-bit secret, even though
both are printed as Base32-like text.

The source raises modulo bias as a general warning. The precise rule is:

- `value % alphabetLength` can be biased when the random integer range is not evenly divisible by the
  alphabet length;
- for a 32-symbol alphabet and a uniform 32-bit integer, 32 divides `2^32`, so modulo 32 itself is uniform;
- if a different alphabet length is used, apply rejection sampling or another unbiased mapping when exact
  uniformity matters.

The byte-first approach is still preferable because its entropy and interoperability are easier to reason about.

## 6. Comparison of the two approaches

Both approaches eventually produce Base32 text, so their outputs can look similar.

### Byte-first

```text
CSPRNG bytes -> Base32 encoding
```

- the binary bytes are the true secret;
- entropy is exactly controlled by byte count;
- conventional for TOTP libraries and provisioning;
- Base32 is only an encoding.

### Direct alphabet selection

```text
CSPRNG bytes or integers -> select Base32 characters
```

- the text itself is generated as the secret;
- entropy depends on output length and selection uniformity;
- custom selection logic must be checked;
- use 32 characters to target 160 bits with a 32-symbol alphabet.

## 7. Building an otpauth provisioning URI

Authenticator applications commonly receive a TOTP secret through an `otpauth` URI encoded in a QR code.

A basic shape is:

```text
otpauth://totp/{issuer}:{account}?secret={base32Secret}&issuer={issuer}
```

The label contains `issuer:account`. The `issuer` query parameter should agree with the issuer in the label.

Issuer and account text must be URL-encoded because they can contain spaces, `@`, `:`, and other characters
that have special meaning in a URI:

```csharp
using System.Net;

public static string BuildOtpAuthUri(
    string issuer,
    string account,
    string base32Secret)
{
    string encodedIssuer =
        WebUtility.UrlEncode(issuer);

    string encodedAccount =
        WebUtility.UrlEncode(account);

    return
        $"otpauth://totp/{encodedIssuer}:{encodedAccount}" +
        $"?secret={base32Secret}&issuer={encodedIssuer}";
}
```

The exact encoder can represent spaces as `+` or `%20` depending on the API. The essential requirement is
that label components are escaped as URI data rather than inserted as untrusted raw text.

The Base32 secret is the credential. Issuer and account are identification and display metadata.

## 8. Side topic: safe cleanup of an in-flight operation dictionary

The canvas also contains a separate concurrency note about deduplicating in-flight asynchronous work.

Several callers can obtain the same `Lazy<Task<object>>` from a concurrent dictionary:

```csharp
var lazy = _inflight.GetOrAdd(
    key,
    _ => new Lazy<Task<object>>(CreateAsync));
```

Every waiter eventually reaches `finally` and may try to remove the completed entry. The safe removal checks
both the key and the exact stored value:

```csharp
_inflight.TryRemove(
    new KeyValuePair<string, Lazy<Task<object>>>(
        key,
        lazy));
```

Only the first matching removal succeeds. Later waiters fail harmlessly because the old entry is already gone.

This value comparison prevents a race:

1. request A creates `lazy1`;
2. request B joins `lazy1`;
3. `lazy1` completes;
4. request A removes `lazy1`;
5. request C creates `lazy2` under the same key;
6. request B reaches `finally`.

If B used this overload:

```csharp
_inflight.TryRemove(key, out _);
```

it could remove the newer `lazy2`. The key-and-value removal means "remove this exact completed operation
only", not "remove whatever is currently stored under the key".

The additional removal attempts create minor contention but preserve correctness.

## Review summary

- Generate a TOTP secret with `RandomNumberGenerator`.
- Prefer random bytes followed by Base32 encoding.
- Twenty bytes provide 160 bits and normally encode to 32 Base32 characters without padding.
- Base32 is representation, not randomness.
- Direct alphabet selection is acceptable only when length and uniformity are understood.
- URL-encode issuer and account when constructing the `otpauth` URI.
- Protect the secret and provisioning QR as credentials.
- In the separate dictionary pattern, remove only the exact completed lazy value to avoid deleting a newer
  in-flight operation.
