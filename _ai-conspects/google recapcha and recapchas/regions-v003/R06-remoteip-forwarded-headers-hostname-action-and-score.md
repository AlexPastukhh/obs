# Remote IP, forwarded headers, hostname, action, and score

Generated: 2026-07-02

## Transcript policy

- Every unique embedded screenshot has one source block.
- Visible C#, Razor, JavaScript, JSX, JSON, routes, field names, actions, and thresholds are retained.
- Cropped screenshots are explicitly marked.
- Explanation is separated from the normalized source layer.
- Every source includes recall questions.

## S-054 — RemoteIpAddress after forwarded headers

**Known limits:** cropped continuation from the forwarded-header setup

### Near-literal normalized transcript

After correct forwarded-header processing:

```csharp
var ip =
    HttpContext.Connection.RemoteIpAddress?
        .ToString();
```

is much more likely to represent the real client.

### Study meaning

RemoteIpAddress is only trustworthy behind a proxy after ASP.NET Core has accepted forwarded information from known infrastructure.

### Recall questions

1. Which property reads the IP?
2. What middleware condition makes it more likely to be correct?


---

## S-055 — Forwarded headers configuration

**Known limits:** right side of the production trust example is cropped

### Near-literal normalized transcript

```csharp
using Microsoft.AspNetCore.HttpOverrides;

var builder =
    WebApplication.CreateBuilder(args);

builder.Services
    .Configure<ForwardedHeadersOptions>(
        options =>
        {
            options.ForwardedHeaders =
                ForwardedHeaders.XForwardedFor |
                ForwardedHeaders.XForwardedProto;

            // In production restrict KnownProxies/
            // KnownNetworks to trusted infrastructure.
        });

var app = builder.Build();

app.UseForwardedHeaders();
```

### Study meaning

The middleware restores original client IP and scheme from trusted reverse-proxy headers. Trust boundaries must be constrained in production.

### Recall questions

1. Which two forwarded-header types are enabled?
2. Which middleware activates processing?
3. Why restrict known proxies or networks?


---

## S-056 — Why reverse proxies can produce the wrong IP

**Known limits:** none

### Near-literal normalized transcript

Behind Nginx, IIS, Cloudflare, Azure Front Door, another reverse proxy, or a CDN:

```csharp
HttpContext.Connection.RemoteIpAddress
```

may contain the proxy IP instead of the real user's IP.

Sending that wrong IP to Google reduces the usefulness of `remoteip`.

Enable and correctly trust forwarded headers when the real client address is needed.

### Study meaning

Network topology changes the immediate peer. The backend must deliberately restore original client context.

### Recall questions

1. Which IP may RemoteIpAddress contain?
2. How does that affect Google risk analysis?
3. What ASP.NET Core feature is required?


---

## S-057 — Do you need to send remoteip?

**Known limits:** none

### Near-literal normalized transcript

Usually no:

- it is optional;
- proxies and CDNs can make it wrong unless forwarded headers are configured.

It can be useful when:

- bot abuse is occurring and maximum signal is desired;
- strict validation is needed on high-risk endpoints such as signup or password reset;
- stable infrastructure provides a reliable client IP.

### Study meaning

An omitted optional signal is safer than a confidently wrong signal. Include remoteip only when its provenance is reliable.

### Recall questions

1. Is remoteip mandatory?
2. Name two reasons to omit it.
3. Name three cases where it can help.


---

## S-058 — What remoteip means

**Known limits:** none

### Near-literal normalized transcript

`remoteip` is the end user's IP address — the client that solved reCAPTCHA.

Google's `siteverify` endpoint accepts:

- `secret` — required;
- `response` token — required;
- `remoteip` — optional.

It helps bind the token to network context and improve risk analysis, including some token-reuse and abuse signals.

### Study meaning

remoteip is contextual metadata, not the token itself and not the proxy's address.

### Recall questions

1. Whose IP should remoteip contain?
2. Which two fields are required by siteverify?
3. Why does Google accept this optional value?


---

## S-059 — Why hostname validation matters

**Known limits:** none

### Near-literal normalized transcript

Hostname validation protects against accepting a token generated somewhere else.

Example:

- the application should accept tokens from `example.com`;
- Google returns `hostname = evilsite.com`;
- even if `success = true`, the application should reject it.

When Google-side origin validation is disabled, server-side hostname checking becomes especially important.

### Study meaning

The token's origin context must match the application that is accepting it.

### Recall questions

1. What hostile hostname is shown?
2. Can success alone be enough?
3. When does server-side hostname checking become critical?


---

## S-060 — Which hostname values to compare

**Known limits:** none

### Near-literal normalized transcript

Compare Google's returned hostname against expected hosts such as:

- `example.com`;
- `www.example.com`;
- `localhost` for development.

The source notes that Google domain configuration may allow a domain and first-level subdomains, but the application should still implement its intended policy explicitly.

### Study meaning

Allowed hosts should be an explicit application list rather than a broad string suffix test.

### Recall questions

1. Which three hosts are listed?
2. Why is localhost special?
3. Why should the server keep its own allowlist?


---

## S-061 — Hostname is not a URL

**Known limits:** none

### Near-literal normalized transcript

`hostname` contains only a host, for example:

```text
example.com
www.example.com
localhost
```

It does not contain:

```text
https://example.com/register
example.com/register
```

### Study meaning

Comparisons must use host values, without scheme, path, or port assumptions.

### Recall questions

1. Does hostname include https?
2. Does it include a route path?
3. Give two valid hostname values.


---

## S-062 — ASP.NET Core allowed-host check

**Known limits:** none

### Near-literal normalized transcript

```csharp
var allowedHosts = new[]
{
    "example.com",
    "www.example.com",
    "localhost"
};

if (!verifyResponse.Success)
    return false;

if (string.IsNullOrWhiteSpace(
        verifyResponse.Hostname) ||
    !allowedHosts.Contains(
        verifyResponse.Hostname,
        StringComparer.OrdinalIgnoreCase))
{
    return false;
}
```

### Study meaning

The server first requires Google's success result and then performs a case-insensitive exact-host allowlist check.

### Recall questions

1. Which three hosts are allowed?
2. What happens for an empty hostname?
3. What comparison mode is used?


---

## S-063 — v3 requires action and score checks

**Known limits:** none

### Near-literal normalized transcript

For v3, hostname is only one part of validation. Check:

- `success`;
- `hostname`;
- `action`;
- `score`.

v3 tokens are action-based and score-based, and Google returns action and score in the verification response.

### Study meaning

v3 validation combines origin, operation identity, and risk level.

### Recall questions

1. Which four fields are checked?
2. Why is hostname alone insufficient?
3. Which fields are specific to the v3 decision?


---

## S-064 — Combined v3 verification example

**Known limits:** right side of the first hostname condition is cropped; normalized logic follows the visible code

### Near-literal normalized transcript

```csharp
if (!verifyResponse.Success)
    return false;

if (!string.Equals(
        verifyResponse.Hostname,
        "example.com",
        StringComparison.OrdinalIgnoreCase) &&
    !string.Equals(
        verifyResponse.Hostname,
        "www.example.com",
        StringComparison.OrdinalIgnoreCase))
{
    return false;
}

if (!string.Equals(
        verifyResponse.Action,
        "register",
        StringComparison.Ordinal))
{
    return false;
}

if (verifyResponse.Score < 0.5m)
    return false;
```

### Study meaning

The example applies exact host alternatives, exact action matching, and a numeric score threshold after success.

### Recall questions

1. Which two hostnames are accepted?
2. Which action is required?
3. What score threshold is shown?
4. Which comparison is case-sensitive?


---

## S-065 — Practical hostname-check rule

**Known limits:** none

### Near-literal normalized transcript

Do you always need a hostname check?

- Google-side domain validation already provides protection when enabled.
- A server-side hostname check adds defense in depth.
- It becomes especially important if Google-side origin validation is disabled.

Practical rule:

- v2: check `success`, preferably also `hostname`;
- v3: check `success`, `hostname`, `action`, and `score`.

### Study meaning

Server checks should mirror the assurance level of the reCAPTCHA version and deployment configuration.

### Recall questions

1. What is the v2 minimum?
2. What four checks are recommended for v3?
3. When is hostname checking especially important?
