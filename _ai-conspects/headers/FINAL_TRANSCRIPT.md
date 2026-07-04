# HTTP headers — integrated final study transcript

This is the direct-repeat layer for the existing verified screenshot-backed region transcripts.  
The source-specific regional files and preserved PNGs remain authoritative for exact screenshot wording and code.

## 1. Header model

HTTP headers are metadata attached to a request or response.

```text
request headers:
client -> server

response headers:
server -> client

content headers:
describe a message body/content representation
```

In .NET, do not assume all headers live on the same object:

```text
HttpRequestMessage.Headers
HttpRequestMessage.Content.Headers
HttpResponseMessage.Headers
HttpResponseMessage.Content.Headers
```

In ASP.NET Core, request and response headers are exposed through `IHeaderDictionary`; typed wrappers are available through typed-header helpers.

## 2. `Expect: 100-continue`

`Expect` declares an expectation that the server should satisfy before the request proceeds. The standardized expectation normally used is:

```http
Expect: 100-continue
```

Mental model:

```text
client prepares a request with a potentially large body
-> sends headers
-> server may answer 100 Continue
-> client sends the body

or

-> server rejects early
-> client avoids sending a large body unnecessarily
```

Browsers do not let application JavaScript set `Expect`; it is a forbidden request header. In .NET/HttpClient it may be controlled by the client stack.

## 3. `Referer`

The HTTP field name is historically misspelled as `Referer`.

It may contain the absolute or partial address of the page/resource from which the request originated. Depending on referrer policy, it may include origin/path/query or may be omitted/reduced.

Do not treat it as trusted authorization data. It can be absent and is affected by browser policy.

## 4. Authorization and authentication challenges

### Request

```http
Authorization: Basic <credentials>
Authorization: Bearer <token>
```

`Authorization` carries credentials/proof used by the server to authenticate the request.

### Response

```http
HTTP/1.1 401 Unauthorized
WWW-Authenticate: Basic realm="admin"
```

`WWW-Authenticate` tells the client which authentication scheme/challenge applies. `realm` identifies a protection space or descriptive scope for the challenge.

Cookies and the `Authorization` header are different transport mechanisms:

```text
Authorization:
explicit credential header, often Bearer token

Cookie:
browser-managed state sent according to cookie scope/rules
```

## 5. Origin and cross-origin visibility

`Origin` identifies the request origin: scheme, host, and port. Browsers add it in relevant CORS/fetch scenarios.

Treat it as input that must be validated against an allow-list, not as proof of identity.

Cross-origin JavaScript cannot automatically read every response header. Only safelisted response headers and headers listed by:

```http
Access-Control-Expose-Headers: X-Correlation-ID, ETag
```

are exposed to browser scripts.

The set of request headers a browser may send is a different concern from the set of response headers JavaScript may read.

## 6. `Location`

Typical uses:

```http
HTTP/1.1 201 Created
Location: /orders/123
```

The header identifies the newly created resource.

It is also used with redirects:

```http
HTTP/1.1 302 Found
Location: https://example.com/new-path
```

The meaning depends on the status code. `Location` does not by itself mean redirect.

## 7. Caching headers

Modern caching normally centers on:

```http
Cache-Control: max-age=3600
```

Older compatibility fields include:

```http
Expires: Wed, 09 Apr 2026 12:00:00 GMT
Pragma: no-cache
```

When modern and legacy fields coexist, `Cache-Control` is the primary mechanism for modern clients/caches.

Conditional requests commonly use:

```http
If-None-Match: "etag-value"
If-Modified-Since: <http-date>
```

The response may contain:

```http
ETag: "etag-value"
```

## 8. Raw versus typed headers in .NET

Raw collections are flexible and string-based:

```csharp
request.Headers.TryAddWithoutValidation("X-Custom", "value");
response.Headers.TryGetValues("X-Custom", out var values);
```

Typed APIs represent structured header grammar:

```csharp
request.Headers.Accept
request.Headers.Authorization
response.Headers.ETag
response.Headers.Location
content.Headers.ContentType
content.Headers.ContentLength
content.Headers.ContentEncoding
```

Typed APIs help with parsing, validation, formatting, dates, quality factors, entity tags, and media types.

Not every header has a strongly typed property. For extension/custom fields use raw collections carefully.

## 9. ASP.NET Core `IHeaderDictionary` and `StringValues`

Common operations include:

```csharp
headers.ContainsKey(name);
headers.TryGetValue(name, out var values);
headers[name] = value;
headers.Remove(name);
headers.Append(name, value);
```

`StringValues` represents zero, one, or multiple values without forcing a new string array for every case.

Use append helpers when adding another field value. Do not use dictionary `Add` blindly when a key may already exist.

Comma-separated helper APIs are appropriate only for headers whose grammar allows comma-separated list values. `Set-Cookie` is the classic exception: separate `Set-Cookie` field values must remain separate.

## 10. Typed ASP.NET Core headers

Typed request/response helpers expose models such as:

```text
MediaTypeHeaderValue
EntityTagHeaderValue
AuthenticationHeaderValue
RangeHeaderValue
CookieHeaderValue
SetCookieHeaderValue
```

Comparers can compare media types or quality-value strings according to header semantics rather than plain string equality.

## 11. Cookies

Request:

```http
Cookie: theme=dark; session=abc
```

Response:

```http
Set-Cookie: session=abc; Path=/; HttpOnly; Secure; SameSite=Lax
```

Important distinction:

```text
Cookie:
one request header containing cookie pairs

Set-Cookie:
response header; multiple cookies are normally emitted as separate field values
```

For ASP.NET Core request cookies, prefer:

```csharp
Request.Cookies["name"]
```

For creating response cookies, prefer response-cookie APIs or `SetCookieHeaderValue` rather than hand-building raw strings.

## 12. Practical rule

```text
use typed API:
when the framework exposes the header grammar

use raw API:
for custom/extension headers or unsupported fields

validate:
Origin, Referer, forwarded/custom values are not identity proofs

keep request/response/content headers separate:
the owning object matters
```
