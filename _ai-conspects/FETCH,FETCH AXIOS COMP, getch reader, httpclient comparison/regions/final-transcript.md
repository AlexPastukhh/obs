# Final semantic transcript — Fetch, Axios, getReader and HttpClient comparison

Authoritative source: `source/FETCH,FETCH AXIOS COMP, getch reader, httpclient comparison.svg`  
Coverage: **107 unique screenshots / 107 placements + 43 native SVG labels**

---

# R01 — Fetch versus Axios in browser applications

## Core distinction

Both APIs ultimately perform browser HTTP requests, but they expose different levels of abstraction.

```text
fetch
    browser-native primitive
    returns a Response
    JSON parsing is explicit
    4xx/5xx do not reject automatically
    no built-in base URL, interceptors or timeout option
    streaming response body is directly accessible

Axios
    library wrapper
    commonly parses JSON automatically
    rejects non-2xx responses by default
    supports baseURL, params, interceptors and timeout
    exposes upload/download progress APIs in supported environments
```

Basic comparison:

```ts
// Axios
const response = await api.get<User[]>("/users");
const users = response.data;

// Fetch
const response = await fetch("/users");

if (!response.ok) {
  throw new Error(
    `HTTP ${response.status}: ${await response.text()}`
  );
}

const users = await response.json() as User[];
```

Fetch rejects primarily for network-level failures, cancellation and some policy failures. An HTTP `404` or `500` still resolves to a `Response`; application code must inspect `response.ok` or `response.status`.

## Base URL

Axios:

```ts
const api = axios.create({
  baseURL: "https://api.example.com",
});
```

Fetch normally uses a wrapper:

```ts
const BASE_URL = "https://api.example.com";

function apiFetch(
  path: string,
  init: RequestInit = {},
) {
  return fetch(`${BASE_URL}${path}`, init);
}
```

A wrapper is the natural place for shared defaults and behavior.

## Query parameters

Axios serializes common parameter shapes:

```ts
api.get("/search", {
  params: {
    term: "router",
    page: 2,
  },
});
```

Fetch uses the URL API:

```ts
const params = new URLSearchParams({
  term: "router",
  page: "2",
});

const response = await fetch(
  `/search?${params}`,
);
```

Arrays and nested objects need an explicit convention. Both client and server must agree on repeated keys, bracket notation, comma-separated values or a custom serializer.

## Shared headers and authentication

Axios request interceptor:

```ts
api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});
```

Fetch wrapper:

```ts
async function apiFetch(
  path: string,
  init: RequestInit = {},
) {
  const headers = new Headers(init.headers);

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`,
    );
  }

  return fetch(`${BASE_URL}${path}`, {
    ...init,
    headers,
    credentials: "include",
  });
}
```

Axios gives the behavior a built-in interceptor location. Fetch can reproduce it in ordinary application code.

## Global response handling

Axios response interceptor:

```ts
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // log, normalize or refresh
    return Promise.reject(error);
  },
);
```

Fetch wrapper:

```ts
async function apiFetchJson<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const response = await apiFetch(path, init);

  if (!response.ok) {
    const message = await response.text();

    throw new Error(
      `HTTP ${response.status}: ${message}`
    );
  }

  return response.json() as Promise<T>;
}
```

A wrapper can normalize errors, parse a problem-details body and attach correlation metadata.

## 401 refresh and retry

A robust refresh flow needs:

```text
only one refresh request in flight
a retry guard to prevent an infinite loop
new Authorization headers on the retry
clear failure behavior when refresh fails
```

Sketch:

```ts
let refreshPromise: Promise<string> | null = null;

async function refreshAccessToken() {
  refreshPromise ??= fetch(
    `${BASE_URL}/auth/refresh`,
    {
      method: "POST",
      credentials: "include",
    },
  )
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Refresh failed");
      }

      const data = await response.json() as {
        accessToken: string;
      };

      return data.accessToken;
    })
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}
```

Axios often stores this pattern in interceptors. Fetch stores it in the wrapper. The underlying concurrency problem is identical.

## Cancellation and timeouts

Both modern Axios and Fetch can use `AbortController`:

```ts
const controller = new AbortController();

fetch("/slow", {
  signal: controller.signal,
});

controller.abort();
```

Fetch has no standalone `timeout` option. Compose cancellation with a timer:

```ts
async function fetchWithTimeout(
  input: RequestInfo | URL,
  timeoutMs: number,
  init: RequestInit = {},
) {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    timeoutMs,
  );

  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timer);
  }
}
```

When combining a caller-provided signal with an internal timeout, use signal composition supported by the target runtime or propagate both cancellation sources deliberately.

## Progress and files

Axios in browser environments provides convenient progress callbacks where supported.

Fetch response download progress can be calculated from the response `ReadableStream`:

```ts
const response = await fetch("/report");
const reader = response.body?.getReader();

let received = 0;

while (reader) {
  const { value, done } = await reader.read();

  if (done) break;

  received += value.byteLength;
}
```

Upload progress is less straightforward with classic Fetch and may need a streaming request body, XHR or another transport depending on compatibility requirements.

Blob download is simple in both:

```ts
const response = await fetch("/report");
const blob = await response.blob();
```

## Runtime validation

TypeScript annotations do not validate server data at runtime.

```ts
const user = await response.json() as User;
```

This is only a compile-time assertion. Use Zod, Valibot or another schema validator when untrusted response shapes must be guaranteed.

---

# R02 — streaming and `getReader()` versus C# `HttpClient`

## When Fetch resolves

Fetch resolves when response headers are available and the response has started. The body may still be downloading.

```ts
const response = await fetch("/large-file");
```

At this point:

```text
response.status and headers are available
response.body can be consumed progressively
response.json() buffers and parses the complete JSON value
response.text() buffers the complete text
response.blob() buffers the complete blob representation
```

To consume chunks directly:

```ts
const reader = response.body?.getReader();

while (reader) {
  const { value, done } = await reader.read();

  if (done) break;

  // value is Uint8Array
}
```

`getReader()` does not mean that the network has zero buffering anywhere. It means application code does not need to retain the entire response body before processing it.

## `ReadableStream` and `TextDecoder`

Network chunks are bytes. Text decoding must preserve partial multibyte characters across chunk boundaries:

```ts
const decoder = new TextDecoder();
let buffer = "";

while (reader) {
  const { value, done } = await reader.read();

  if (done) break;

  buffer += decoder.decode(value, {
    stream: true,
  });

  // process complete records from buffer
}

buffer += decoder.decode();
```

The `{ stream: true }` option lets the decoder retain an incomplete UTF-8 sequence for the next chunk.

For line-delimited JSON:

```ts
const reader = response.body!.getReader();
const decoder = new TextDecoder();

let buffer = "";

while (true) {
  const { value, done } = await reader.read();

  if (done) break;

  buffer += decoder.decode(value, {
    stream: true,
  });

  const lines = buffer.split("\n");
  buffer = lines.pop() ?? "";

  for (const line of lines) {
    if (line.trim()) {
      const item = JSON.parse(line);
      handle(item);
    }
  }
}
```

A normal single JSON object is not naturally stream-friendly because the complete syntax is generally needed before ordinary `JSON.parse`. Streaming formats such as NDJSON or SSE are better suited to incremental processing.

## C# `HttpClient` equivalent

C# can request completion after headers:

```csharp
using var response =
    await httpClient.GetAsync(
        url,
        HttpCompletionOption.ResponseHeadersRead,
        cancellationToken);

response.EnsureSuccessStatusCode();

await using Stream stream =
    await response.Content.ReadAsStreamAsync(
        cancellationToken);
```

Then process text incrementally:

```csharp
using var reader = new StreamReader(stream);

while (await reader.ReadLineAsync(
    cancellationToken) is { } line)
{
    Process(line);
}
```

Conceptual mapping:

```text
C# HttpCompletionOption.ResponseHeadersRead
    ~= Fetch promise resolves with Response headers

C# ReadAsStreamAsync()
    ~= response.body

C# StreamReader / ReadLineAsync
    ~= ReadableStream reader + TextDecoder + line splitting
```

C# provides a general `Stream` abstraction. Browser Fetch exposes a `ReadableStream`; application code controls chunk reading and decoding.

## Full-body JSON

C#:

```csharp
var model =
    await response.Content
        .ReadFromJsonAsync<Model>(
            cancellationToken);
```

Fetch:

```ts
const model = await response.json() as Model;
```

Both commonly buffer a normal single JSON document. For truly incremental data, select a streaming representation and parser.

---

# R03 — Fetch `RequestInit` options

## Most-used options

```ts
await fetch("/api/items", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  },
  body: JSON.stringify({
    name: "book",
  }),
  credentials: "include",
  signal: controller.signal,
});
```

### `method`

Common values:

```text
GET
POST
PUT
PATCH
DELETE
HEAD
OPTIONS
```

A request body is normally used with mutation methods. A GET or HEAD body is not supported as a normal browser Fetch pattern.

### `headers`

Use an object, array of pairs or `Headers` instance.

```ts
const headers = new Headers(init.headers);
headers.set("Accept", "application/json");
```

Some headers are controlled by the browser and cannot be set freely.

### `body`

Supported body types include:

```text
string
Blob
ArrayBuffer / typed arrays
FormData
URLSearchParams
ReadableStream in supported streaming-upload cases
```

When sending JSON, serialize explicitly and set an appropriate content type.

### `credentials`

```text
omit         never include credentials
same-origin  include them only for same-origin requests
include      include them for permitted cross-origin requests too
```

Cross-origin credentialed requests require compatible server CORS configuration. Browser cookie rules such as `SameSite` and `Secure` still apply.

## `mode`

Common values:

```text
cors
same-origin
no-cors
```

`cors` is the normal mode for a cross-origin API that participates in CORS.

`same-origin` rejects cross-origin use.

`no-cors` produces a restricted opaque response in cases where it is allowed. It is not a way to bypass CORS and normally prevents application code from reading useful status, headers or body data.

## Browser cache mode

The Fetch `cache` option is a browser request cache mode, not a direct `Cache-Control` request-header abstraction.

```text
default
no-store
reload
no-cache
force-cache
only-if-cached
```

Mental model:

```text
default
    use normal browser HTTP cache rules

no-store
    do not use a stored response and do not store this response

reload
    bypass the existing cached response, fetch from network,
    then allow the new response to update cache

no-cache
    revalidate before using a cached response

force-cache
    prefer a cached response, even when stale when permitted

only-if-cached
    require a cached response; restricted by browser rules
```

`no-cache` does not mean “never cache.” It means revalidate before reuse.

Browsers can automatically send validators such as:

```http
If-None-Match: "etag-value"
If-Modified-Since: ...
```

when the cached response supplied `ETag` or `Last-Modified`. Application code normally does not copy the ETag into every request manually. A `304 Not Modified` lets the browser reuse the stored body.

## `redirect`

Common values:

```text
follow
error
manual
```

`follow` is the normal default.

## `signal`

`AbortSignal` enables cancellation and timeout composition.

```ts
fetch("/api/items", {
  signal: controller.signal,
});
```

## `integrity`

Subresource Integrity verifies that the downloaded bytes match an expected cryptographic digest:

```ts
fetch("/script.js", {
  integrity: "sha256-...",
});
```

The browser must receive the payload to compute and compare its hash. A mismatch rejects the fetch. This is mainly useful for resources whose exact trusted content hash is known.

## `priority`

A request-priority hint may tell a supporting browser which resource is relatively important:

```ts
fetch("/hero.jpg", {
  priority: "high",
});
```

It is a hint, not a scheduling guarantee.

## `keepalive`

`keepalive: true` is for small requests that should be allowed to continue briefly while the initiating page is unloading:

```ts
fetch("/telemetry", {
  method: "POST",
  body: JSON.stringify(data),
  keepalive: true,
});
```

This is not equivalent to configuring persistent server HTTP connections. It addresses page-unload survivability and is subject to browser limits.

## `duplex`

Streaming request bodies may require:

```ts
fetch("/stream-upload", {
  method: "POST",
  body: readableStream,
  duplex: "half",
});
```

The setting describes request streaming constraints. It is not necessary for ordinary string, JSON, blob or form bodies.

---

# R04 — `Request`, `RequestInit`, referrer policy and wrapper design

## `RequestInit` versus `Request`

`RequestInit` is configuration data:

```ts
const init: RequestInit = {
  method: "GET",
  cache: "no-cache",
  credentials: "include",
};
```

`Request` is the constructed request object:

```ts
const request = new Request(
  "/api/items",
  init,
);
```

Both patterns are accepted:

```ts
await fetch("/api/items", init);
await fetch(request);
```

A useful model:

```text
RequestInit -> input/configuration
Request     -> actual request object created from that configuration
```

If `fetch(request, secondInit)` receives both, values from the second init can override corresponding request settings.

`Request` exposes properties such as:

```text
url
method
headers
credentials
mode
cache
redirect
referrer
referrerPolicy
signal
body/bodyUsed
```

## `referrer` and `referrerPolicy`

`referrer` controls the referrer value associated with the request where browser policy allows it.

`referrerPolicy` controls how much source URL information may be sent.

The common default policy is often:

```text
strict-origin-when-cross-origin
```

Typical behavior:

```text
same-origin request
    send origin + path + query

cross-origin request
    send origin only

HTTPS -> HTTP downgrade
    omit the Referer header
```

A downgrade is a navigation or request from a more secure URL to a less secure destination, most commonly HTTPS to HTTP. Omitting referrer data reduces leakage of paths and query strings to insecure destinations.

Explicit examples:

```ts
fetch("/api/data", {
  referrerPolicy: "no-referrer",
});
```

```ts
fetch("https://api.example.com/data", {
  referrerPolicy:
    "strict-origin-when-cross-origin",
});
```

Most applications leave `referrer` browser-managed and select a policy only when they have a concrete privacy or integration requirement.

## Production wrapper checklist

A small Fetch wrapper may provide:

```text
base URL
default headers
auth token injection
credentials policy
HTTP status checking
problem/error normalization
401 refresh with one-flight protection
retry guard
timeout/cancellation
JSON, text and blob helpers
runtime schema validation
```

Do not hide all Fetch capabilities behind a wrapper that only returns JSON. Preserve access to the original `Response` for streaming, downloads, headers, status-specific behavior and non-JSON content.

---

# Coverage

```text
unique embedded screenshots: 107
image uses: 107
native SVG labels: 43
duplicate extra placements: 0

processed image uses: 107
processed text labels: 43
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
