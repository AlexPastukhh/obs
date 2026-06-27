# Final semantic transcript — options requ

Authoritative source: `source/options requ.svg`

# R01 — OPTIONS and CORS preflight

`OPTIONS` asks which communication options are available for a resource. It can be used explicitly by a client, and browsers also generate it automatically as a CORS preflight.

A browser sends a preflight before a cross-origin request when the actual request is not a CORS “simple request”. Typical triggers include:

```text
non-simple methods: PUT, PATCH, DELETE
non-safelisted request headers: Authorization, X-...
non-safelisted Content-Type values such as application/json
credentials and other CORS policy constraints
```

Example preflight:

```http
OPTIONS /api/orders/42 HTTP/1.1
Origin: https://app.example
Access-Control-Request-Method: PATCH
Access-Control-Request-Headers: content-type, if-match
```

Successful response:

```http
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: https://app.example
Access-Control-Allow-Methods: GET, PATCH, OPTIONS
Access-Control-Allow-Headers: content-type, if-match
Access-Control-Max-Age: 600
Vary: Origin
```

The browser evaluates that response before it sends the actual request.

A normal non-CORS `OPTIONS` response may advertise allowed methods:

```http
Allow: GET, HEAD, POST, OPTIONS
```

`Allow` and `Access-Control-Allow-Methods` solve related but different problems. `Allow` describes server method support; CORS headers authorize cross-origin browser access.

# R02 — ASP.NET Core handling

Prefer the ASP.NET Core CORS middleware instead of hand-writing preflight logic:

```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("spa", policy =>
    {
        policy
            .WithOrigins("https://app.example")
            .WithMethods("GET", "POST", "PATCH", "DELETE")
            .WithHeaders("Content-Type", "Authorization", "If-Match")
            .AllowCredentials()
            .SetPreflightMaxAge(TimeSpan.FromMinutes(10));
    });
});

app.UseRouting();
app.UseCors("spa");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
```

Middleware order matters. CORS must run early enough to process the request before endpoint authorization rejects the preflight.

In most controller applications, a dedicated `[HttpOptions]` action is unnecessary for browser preflight because CORS middleware short-circuits it. Add an explicit OPTIONS endpoint only when the API intentionally exposes resource capability metadata beyond CORS.

Manual handling must correctly process:

```text
Origin
Access-Control-Request-Method
Access-Control-Request-Headers
allowed origins, methods and headers
credentials policy
preflight cache duration
Vary
```

Missing one of these often creates policy or caching bugs.

# R03 — `Vary: Origin`

When the server reflects an allowed request origin:

```http
Access-Control-Allow-Origin: https://app.example
```

the response varies by `Origin`, so it should contain:

```http
Vary: Origin
```

Without `Vary`, a shared cache may reuse a response generated for one origin when serving another origin.

Conceptually:

```text
same URL
same controller/action
different Origin header
different CORS response variant
```

When credentials are allowed, wildcard origin is invalid:

```text
Access-Control-Allow-Credentials: true
Access-Control-Allow-Origin: *
```

is not a valid credentialed CORS response. Use an explicit allowed origin.

`Vary` is cumulative. Do not overwrite existing values such as:

```http
Vary: Accept-Encoding, Origin
```

# Checklist

```text
[ ] use CORS middleware for preflights
[ ] allow only required origins, methods and headers
[ ] place middleware in the correct order
[ ] emit Vary: Origin for reflected origins
[ ] never combine wildcard origin with credentials
[ ] use Access-Control-Max-Age deliberately
[ ] distinguish Allow from Access-Control-Allow-Methods
```


# Coverage

```text
unique embedded screenshots: 24
image uses: 24
native SVG labels: 5
duplicate extra placements: 0

processed image uses: 24
processed text labels: 5
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
