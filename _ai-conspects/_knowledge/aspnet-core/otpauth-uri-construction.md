# otpauth URI construction for TOTP provisioning

Knowledge ID: `aspnet-core.otpauth-uri-construction`

Topic: `aspnet-core`

Authenticator applications receive a TOTP secret through an `otpauth://` URI, usually encoded as a QR code for enrollment. The URI carries the issuer name, account identifier, and the Base32-encoded secret.

## URI shape

```text
otpauth://totp/{issuer}:{account}?secret={base32Secret}&issuer={issuer}
```

The path label is `issuer:account`. The `issuer` query parameter should agree with the issuer in the label. The example inserts `base32Secret` directly into the `secret` query parameter.

## URL-encoding issuer and account

Issuer and account text can contain spaces, `@`, `:`, and other characters that have special meaning in a URI. They must be URL-encoded before insertion:

```csharp
using System.Net;

public static string BuildOtpAuthUri(
    string issuer,
    string account,
    string base32Secret)
{
    var i = WebUtility.UrlEncode(issuer);
    var a = WebUtility.UrlEncode(account);

    return $"otpauth://totp/{i}:{a}?secret={base32Secret}&issuer={i}";
}
```

`WebUtility.UrlEncode` may represent spaces as `+`. The essential requirement is that label components are escaped as URI data rather than inserted as untrusted raw text.

## What should be recallable

- What does the `otpauth://totp/` URI path label contain?
- Why must issuer and account be URL-encoded?
- Why is `base32Secret` inserted directly without URL-encoding in the example?

## Related knowledge

- `dotnet.totp-secret-generation-and-base32-encoding`
- `aspnet-core.totp-enrollment-and-verification`

## Sources

- Workspace: `_ai-conspects/creating base32 secret/`
- Authoritative processed source: `regions/full-semantic-transcript-v001.md`, section 7
- Region files: `regions/B32SEC-R02-totp-authenticator-qr-provisioning.md`, S-017..S-027
- Original SVG: SHA-256 `00b26f65fd54c455c8d09c1cad61b2023719537afad3c427ab3ddb80179fa2a6`, Git blob `d5aad6ee05f95c43d8650f1506140fa93deb8ab4`
