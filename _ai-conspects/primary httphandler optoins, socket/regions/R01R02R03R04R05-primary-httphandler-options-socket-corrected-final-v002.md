# Final corrected semantic transcript — primary httphandler optoins, socket v002

Authoritative source: `source/primary httphandler optoins, socket.svg`  
Corrected coverage: **108 screenshot uses + 47 native canvas labels**

The original transcript was based on only two screenshots. This version incorporates the repaired SVG and covers the complete primary-handler configuration material.

---

# 1. Primary handler and practical patterns

`HttpClient` delegates network behavior to its primary handler. In modern .NET the default primary handler used by `HttpClientFactory` is normally `SocketsHttpHandler`, so the most important transport behavior is configured there.

Typical registration:

```csharp
builder.Services
    .AddHttpClient("api")
    .ConfigurePrimaryHttpMessageHandler(() =>
        new SocketsHttpHandler
        {
            AutomaticDecompression =
                DecompressionMethods.GZip |
                DecompressionMethods.Deflate,

            PooledConnectionLifetime = TimeSpan.FromMinutes(10),
            ConnectTimeout = TimeSpan.FromSeconds(5)
        });
```

A stateless service-to-service client commonly uses:

```csharp
new SocketsHttpHandler
{
    UseCookies = false,
    UseProxy = false,
    PooledConnectionLifetime = TimeSpan.FromMinutes(5)
};
```

An enterprise/intranet client may instead need:

```csharp
new SocketsHttpHandler
{
    UseProxy = true,
    Credentials = CredentialCache.DefaultCredentials,
    PreAuthenticate = true
};
```

The right settings depend on whether the client is stateless, cookie-bound, proxy-dependent, domain-authenticated or long lived.

---

# 2. Redirects and decompression

## `AllowAutoRedirect`

Controls whether the handler automatically follows redirect responses.

```csharp
new SocketsHttpHandler
{
    AllowAutoRedirect = false
};
```

Disable it when the application must inspect `301`, `302`, `307` or `308` itself, preserve a signed redirect flow, or apply custom validation before following the target.

## `MaxAutomaticRedirections`

Limits the number of automatically followed redirects:

```csharp
new SocketsHttpHandler
{
    AllowAutoRedirect = true,
    MaxAutomaticRedirections = 10
};
```

This prevents redirect loops and unbounded chains.

## `AutomaticDecompression`

Enables transparent response-body decompression:

```csharp
new SocketsHttpHandler
{
    AutomaticDecompression =
        DecompressionMethods.GZip |
        DecompressionMethods.Deflate
};
```

It is useful for APIs that return compressed responses. The option controls decompression methods, not request compression.

---

# 3. Cookies and `CookieContainer`

## `UseCookies`

When enabled, the handler automatically:

```text
looks in CookieContainer for cookies matching the request URI
adds the Cookie header
reads Set-Cookie response headers
stores resulting cookies back into the container
```

Example:

```csharp
var cookies = new CookieContainer();

var handler = new SocketsHttpHandler
{
    UseCookies = true,
    CookieContainer = cookies
};

using var client = new HttpClient(handler);

await client.PostAsync("https://site.example/login", content);
var response = await client.GetAsync("https://site.example/profile");
```

The login response may set a session cookie, and the later request receives it automatically.

## URI matching

A cookie is selected according to its domain, path, security and expiration attributes. A cookie added for:

```text
https://api.example.com/
```

can match requests under that host according to the cookie rules.

`CredentialCache.Add(uriPrefix, scheme, credentials)` uses a different mechanism: it associates credentials with a URI prefix and an authentication scheme. The longest matching URI prefix is selected.

## Manual cookie insertion

```csharp
var cookies = new CookieContainer();

cookies.Add(
    new Uri("https://api.example.com/"),
    new Cookie("sessionid", "abc123"));

var handler = new SocketsHttpHandler
{
    UseCookies = true,
    CookieContainer = cookies
};
```

## `HttpClientFactory` cookie-sharing risk

`IHttpClientFactory` pools handlers. If the pooled handler owns a `CookieContainer`, different clients created from the same named registration can share that container.

This can cause:

```text
unexpected cookie sharing
session leakage between users
cookie loss when the pooled handler is recycled
```

Safe patterns:

- set `UseCookies = false` for stateless APIs;
- manage cookies manually;
- create a dedicated handler/client for one logical user session;
- do not use a shared pooled cookie container for unrelated users.

One handler, one cookie jar and one logical session is the safest mental model.

---

# 4. Credentials and authentication schemes

`SocketsHttpHandler.Credentials` accepts `ICredentials`. Common choices include:

```text
new NetworkCredential(user, password)
new NetworkCredential(user, password, domain)
CredentialCache
CredentialCache.DefaultCredentials
CredentialCache.DefaultNetworkCredentials
```

These settings participate in HTTP authentication handled by the transport. They are not a replacement for application-managed bearer tokens.

## Basic authentication

Basic sends a Base64-encoded username/password value in the `Authorization` header after or before a challenge, depending on configuration.

```csharp
var handler = new SocketsHttpHandler
{
    Credentials = new NetworkCredential("alice", "secret")
};
```

Basic must be protected by HTTPS. Base64 is encoding, not encryption.

## NTLM, Kerberos and Negotiate

These are Windows/integrated authentication mechanisms.

```csharp
var handler = new SocketsHttpHandler
{
    Credentials = CredentialCache.DefaultCredentials
};
```

`DefaultCredentials` represents the current process or Windows security context. In an ASP.NET Core application this is usually the service/app-pool identity, not automatically the browser user.

Explicit domain credentials:

```csharp
new NetworkCredential("alice", "secret", "CORP")
```

may be used where the environment and policy permit.

`Negotiate` selects an integrated mechanism such as Kerberos or NTLM. Kerberos is ticket based and preferred in correctly configured domain environments; NTLM is an older challenge/response fallback.

## `CredentialCache`

Different credentials can be mapped to different URI prefixes and auth schemes:

```csharp
var cache = new CredentialCache();

cache.Add(
    new Uri("https://api.example.com/legacy/"),
    "Basic",
    new NetworkCredential("legacyUser", "legacyPass"));

cache.Add(
    new Uri("https://api.example.com/intranet/"),
    "Negotiate",
    CredentialCache.DefaultNetworkCredentials);

var handler = new SocketsHttpHandler
{
    Credentials = cache,
    PreAuthenticate = true
};
```

## `PreAuthenticate`

When enabled, the handler may send known authorization information on later matching requests without waiting for another `401` challenge.

```csharp
new SocketsHttpHandler
{
    Credentials = new NetworkCredential("user", "pass"),
    PreAuthenticate = true
};
```

It does not invent credentials or mint a JWT. The handler can preauthenticate only after it knows the relevant auth scheme and matching URI context.

---

# 5. JWT is application-managed

Bearer/JWT authentication is usually managed by application code rather than `SocketsHttpHandler.Credentials`.

```csharp
client.DefaultRequestHeaders.Authorization =
    new AuthenticationHeaderValue("Bearer", jwtToken);
```

The application:

```text
logs in or performs OAuth
stores the access token
adds the Bearer header
handles 401
refreshes or reauthenticates
retries according to its own policy
```

`PreAuthenticate` is not the JWT refresh mechanism.

Simple distinction:

```text
Basic / Digest / NTLM / Kerberos / Negotiate
    challenge-based HTTP authentication the handler can participate in

Bearer / JWT
    token acquired and attached by the application

Cookies
    server sets a cookie; the CookieContainer may send it later
```

Do not confuse the service process identity with the end user’s bearer identity.

---

# 6. Proxy behavior

## `UseProxy`

Controls whether the handler uses proxy resolution.

```csharp
new SocketsHttpHandler
{
    UseProxy = false
};
```

This is useful for direct internal service traffic where machine or environment proxy settings must not interfere.

## `Proxy`

Sets an explicit proxy:

```csharp
new SocketsHttpHandler
{
    UseProxy = true,
    Proxy = new WebProxy("http://proxy.example:8080")
};
```

When `UseProxy = true` and `Proxy` is null, the system/default proxy configuration may apply.

`DefaultProxyCredentials` matters when the default/system proxy requires authentication. This is separate from credentials used to authenticate to the destination server.

Proxy auto-detection can add latency. Disable proxy usage when the deployment is known to require direct connections.

---

# 7. Connection pool and DNS refresh

## `ConnectTimeout`

Maximum time allowed to establish a connection:

```csharp
new SocketsHttpHandler
{
    ConnectTimeout = TimeSpan.FromSeconds(5)
};
```

It helps fail quickly when a host or network path is unreachable. It is not the overall request timeout.

## `PooledConnectionLifetime`

Maximum age of a pooled connection before it is replaced:

```csharp
new SocketsHttpHandler
{
    PooledConnectionLifetime = TimeSpan.FromMinutes(5)
};
```

This is useful when DNS targets or service endpoints change and connections must be recreated periodically.

## `PooledConnectionIdleTimeout`

Maximum idle time before an unused pooled connection is removed:

```csharp
new SocketsHttpHandler
{
    PooledConnectionIdleTimeout = TimeSpan.FromMinutes(2)
};
```

Tune it according to traffic shape, connection setup cost and server idle policies.

## `MaxConnectionsPerServer`

Limits concurrent connections to one server endpoint:

```csharp
new SocketsHttpHandler
{
    MaxConnectionsPerServer = 20
};
```

For HTTP/1.1, one request usually occupies one connection, so this can resemble a concurrency cap.

For HTTP/2, many requests may be multiplexed over one connection. Therefore:

```text
MaxConnectionsPerServer
    network/connection-level limit

Polly concurrency limiter or other application gate
    request-execution/admission limit
```

They solve different problems and may both be needed.

---

# 8. `Expect: 100-continue`

Large uploads may send:

```http
Expect: 100-continue
```

The client first sends the headers and waits briefly.

Server responses:

```text
100 Continue
    send the request body

401 / 413 / other final response
    do not send the large body

no timely response
    after the configured timeout, send the body anyway
```

## `Expect100ContinueTimeout`

Controls how long the handler waits for `100 Continue` before sending the body:

```csharp
new SocketsHttpHandler
{
    Expect100ContinueTimeout = TimeSpan.FromSeconds(2)
};
```

This matters mainly for large, authenticated or rejectable uploads. Small JSON requests often do not benefit noticeably.

The setting prevents waiting indefinitely for a server that never responds to the expectation, but it does not determine the overall upload timeout.

---

# 9. TLS and `SslOptions`

`SslOptions` exposes TLS-level behavior such as client certificates, protocol choices and certificate-validation callbacks.

```csharp
new SocketsHttpHandler
{
    SslOptions = new SslClientAuthenticationOptions
    {
        RemoteCertificateValidationCallback =
            (sender, certificate, chain, errors) =>
                errors == SslPolicyErrors.None
    }
};
```

A callback that always returns `true` disables certificate validation and should be restricted to controlled development or diagnostic scenarios, not production.

TLS options belong to the transport handler and are separate from HTTP authentication credentials.

---

# 10. `HttpClientHandler` compatibility

Older examples may configure `HttpClientHandler`:

```csharp
new HttpClientHandler
{
    UseCookies = false,
    AllowAutoRedirect = false,
    UseDefaultCredentials = false
};
```

In modern factory-created clients, the effective primary handler may be `SocketsHttpHandler`. Prefer configuring the actual primary handler rather than relying on an older handler shape when a property is transport-specific.

---

# 11. Browser WebSocket limitation

Browser WebSocket clients are not configured through `SocketsHttpHandler`.

The browser `WebSocket` constructor accepts a URL and optional subprotocols. JavaScript cannot arbitrarily configure the underlying .NET transport handler, set client certificates or attach arbitrary handshake headers through `SocketsHttpHandler`.

Subprotocol negotiation uses the WebSocket constructor and `Sec-WebSocket-Protocol`, not .NET primary-handler options.

---

# 12. Practical configurations

## Stateless public API

```csharp
new SocketsHttpHandler
{
    UseCookies = false,
    UseProxy = false,
    AutomaticDecompression =
        DecompressionMethods.GZip |
        DecompressionMethods.Deflate,
    ConnectTimeout = TimeSpan.FromSeconds(5),
    PooledConnectionLifetime = TimeSpan.FromMinutes(5)
};
```

## One logical cookie session

```csharp
new SocketsHttpHandler
{
    UseCookies = true,
    CookieContainer = new CookieContainer()
};
```

Keep the handler/client lifetime bound to that logical session rather than sharing it across unrelated users.

## Windows integrated service client

```csharp
new SocketsHttpHandler
{
    UseProxy = true,
    Credentials = CredentialCache.DefaultCredentials,
    PreAuthenticate = true
};
```

## Large upload client

```csharp
new SocketsHttpHandler
{
    ConnectTimeout = TimeSpan.FromSeconds(5),
    Expect100ContinueTimeout = TimeSpan.FromSeconds(2)
};
```

---

# 13. Final checklist

```text
[ ] configure the actual primary handler
[ ] disable cookies for stateless clients
[ ] never share one cookie jar across unrelated user sessions
[ ] separate destination credentials from proxy credentials
[ ] treat DefaultCredentials as process identity, not browser-user identity
[ ] manage JWT acquisition and refresh in application code
[ ] disable proxy behavior when direct service traffic is required
[ ] use ConnectTimeout for connection establishment
[ ] use PooledConnectionLifetime for periodic connection/DNS refresh
[ ] use PooledConnectionIdleTimeout for idle pool cleanup
[ ] do not treat MaxConnectionsPerServer as a universal request limiter
[ ] use Expect: 100-continue primarily for large rejectable bodies
[ ] keep TLS certificate validation enabled in production
```

---

# 14. Corrected coverage

```text
previous image uses: 2
corrected image uses: 108
recovered missing image uses: 106
native canvas labels: 47

processed image uses: 108
processed text labels: 47
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```

Evidence:

```text
data/image-uses-final-v002.json
data/text-elements-final-v002.json
data/final-coverage-audit-v002.json
audit-assets/primary-httphandler-options-socket-corrected-full-preview-v002.png
```
