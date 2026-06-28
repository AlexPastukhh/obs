# Full combined final transcript — axios

Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
meaningful text elements: 44 / 44
unique embedded screenshots: 106 / 106
screenshot uses: 110 / 110
repeated placements retained: 4
regions: 6 / 6
remaining text elements: 0
remaining screenshot uses: 0
```

## Integrated transcript

## R01 — Axios request configuration options

Axios builds every request from a configuration object. Instance defaults, method helpers and per-request options are merged into the final config sent to the selected adapter.

### Address and method

- `url` identifies the resource and is required unless a wrapper supplies it.
- `method` defaults to GET; helpers such as `axios.get` and `axios.post` are convenience wrappers.
- `baseURL` is prepended to relative URLs and is best configured on a dedicated Axios instance.
- `allowAbsoluteUrls` controls whether an absolute request URL can replace the configured base URL.

### Headers and authentication

- `headers` adds request headers such as Accept, Content-Type, correlation IDs or Authorization.
- The `auth` option is specifically HTTP Basic authentication and sets the Authorization header.
- Using `auth` can overwrite a custom Authorization header; bearer tokens should normally be placed in `headers` or a request interceptor.
- `withCredentials` enables cross-site cookies/credentials in browser requests when server CORS policy also allows them.

### Query and body

- `params` contains URL query values and is not the request body.
- `paramsSerializer` controls arrays, nested objects and backend-specific query formats.
- `data` is the request body for methods such as POST, PUT, PATCH and DELETE.
- Axios serializes ordinary JavaScript objects as JSON unless the body type or headers require another representation.

### Timing and response shape

- `timeout` aborts the Axios request after the configured duration; zero means no Axios timeout.
- `responseType` selects representations such as json, text, blob or arraybuffer.
- `signal` is the modern AbortController-based cancellation mechanism.
- The config should describe transport concerns; domain validation still belongs at an application boundary.

### Representative pattern

```ts
const api = axios.create({
  baseURL: "https://api.example.com",
  timeout: 5_000,
  headers: { Accept: "application/json" }
});

const response = await api.get<User[]>("/users", {
  params: { page: 2, limit: 20 },
  signal: controller.signal
});
```

### Caveats

- CORS failures are browser security failures, not ordinary Axios response errors from the server.
- Instance defaults reduce duplication and are safer than mutating global `axios.defaults` across unrelated APIs.

## R02 — Transforms, cancellation, progress and interceptor boundaries

`transformRequest` and `transformResponse` change payload data at fixed points inside one request. Interceptors operate on the full request/response pipeline and are the better tool for cross-cutting behavior.

### Request transformation

- `transformRequest` runs before the body is sent.
- It receives outgoing data and headers and can return serialized data.
- It is primarily relevant to methods with a body: PUT, POST, PATCH and DELETE.
- Typical uses are body serialization, body normalization and body-related Content-Type selection.

### Response transformation

- `transformResponse` runs after bytes are received and before the caller's `then`/`await` receives `response.data`.
- It can parse or normalize the body and is commonly chained with Axios defaults.
- It should not be used as a global error-policy substitute.
- Runtime schema validation can be applied here, but many applications keep transport parsing and domain validation separate.

### Why interceptors differ

- Request interceptors see the full config and work for GET as well as body methods.
- They are better for bearer tokens, correlation IDs, locale headers, logging, retries and request-wide policy.
- Response interceptors see the full response or AxiosError and can centralize mapping and refresh-token flows.
- Transforms are payload hooks; interceptors are pipeline hooks.

### Cancellation and browser callbacks

- `signal` integrates with AbortController and supersedes the older CancelToken API.
- `onUploadProgress` reports bytes sent where the adapter/platform supports upload progress.
- `onDownloadProgress` reports bytes received where supported.
- Progress totals may be absent, so code must handle an unknown percentage.

### Status and XSRF options

- `validateStatus` decides whether an HTTP status resolves or rejects the Axios promise.
- `xsrfCookieName` and `xsrfHeaderName` configure browser XSRF cookie-to-header behavior.
- Changing `validateStatus` also changes which response-interceptor branch receives a response.

### Representative pattern

```ts
const api = axios.create({
  transformRequest: [
    ...axios.defaults.transformRequest as AxiosRequestTransformer[],
    (data, headers) => {
      headers.set("Content-Type", "application/json");
      return data;
    }
  ],
  transformResponse: [
    ...axios.defaults.transformResponse as AxiosResponseTransformer[],
    data => data
  ]
});
```

### Caveats

- Do not put an Authorization policy only in `transformRequest`; GET requests may bypass the intended body-transform path.
- Progress callbacks measure transport progress, not necessarily completion of server-side processing.

## R03 — Fetch adapter, NDJSON streaming and progress

Streaming and progress depend on the active Axios adapter. XHR exposes progress events; the fetch adapter can expose a ReadableStream in environments that support streaming.

### XHR progress model

- Browser XHR raises upload and download progress events.
- Axios maps those events to `onUploadProgress` and `onDownloadProgress`.
- `loaded` is the number of bytes transferred so far.
- `total` may be undefined when Content-Length is unavailable or the transfer is chunked.

### NDJSON with progress callbacks

- One approach reads the growing XHR response text and tracks the already-consumed offset.
- Only complete newline-delimited JSON records should be parsed.
- An incomplete trailing line must remain buffered for the next progress callback.
- This is progressive parsing over a growing response buffer rather than a true stream-reader API.

### Fetch adapter streaming

- The fetch adapter can expose a platform ReadableStream when supported.
- Read chunks with a reader and incrementally decode text.
- Keep incomplete NDJSON text in a buffer between chunks.
- This is the cleaner model when the runtime and Axios version expose the response stream.

### Upload and download UI

- Upload progress is most useful for FormData or large request bodies.
- Download progress counts bytes received from the server.
- A React progress bar should update only when a usable total is known.
- Cancellation should abort the transfer and stop further UI updates.

### Interaction with validateStatus

- The adapter produces a response, then `validateStatus` decides fulfilled versus rejected handling.
- A custom status policy can route 4xx responses through the fulfilled branch.
- Response interceptors follow that decision rather than applying an independent status classification.

### Representative pattern

```ts
const response = await axios.get("/events", {
  adapter: "fetch",
  responseType: "stream",
  signal
});

const reader = response.data.getReader();
const decoder = new TextDecoder();
let buffer = "";

for (;;) {
  const { value, done } = await reader.read();
  if (done) break;
  buffer += decoder.decode(value, { stream: true });
  // split complete NDJSON lines; preserve incomplete tail
}
```

### Caveats

- Adapter capabilities differ by browser, Node version and Axios version.
- Do not assume `event.total` always exists or that 100% uploaded means the server finished processing.

## R04 — Typed clients, typed requests, files and params serialization

A dedicated typed Axios client centralizes the base URL and transport policy while TypeScript generics describe expected data at compile time.

### Setup and typed instance

- Install Axios and import `AxiosInstance`, `AxiosRequestConfig`, `AxiosResponse` and `AxiosError` as needed.
- Create an instance with `axios.create` instead of sharing mutable global defaults.
- Wrap instance methods in an API module to keep components unaware of transport details.
- Use domain-specific error conversion at the wrapper boundary.

### TypeScript generics

- `api.get<User[]>` types `response.data` as `User[]` at compile time.
- Request-body types and response-body types should be distinct when the server contracts differ.
- The generic does not validate runtime JSON.
- Use a schema validator when data crosses an untrusted runtime boundary.

### Request and response helpers

- Expose methods such as `getUsers(params)` or `createUser(input)` instead of returning raw config construction to every caller.
- Inspect `status`, `statusText`, `headers`, `data` and `config` on the AxiosResponse when needed.
- Use `axios.isAxiosError` to narrow unknown errors.
- Distinguish server responses, network/CORS errors and setup errors.

### Cancellation, timeout and retries

- Pass `AbortSignal` through wrapper methods.
- Axios timeout and AbortSignal solve related but distinct cancellation needs.
- Axios does not retry by default.
- Retries should be limited to safe/idempotent operations or explicitly designed request semantics.

### Files and binary data

- Upload files with FormData and let the browser generate the multipart boundary.
- Use `responseType: 'blob'` in browsers for downloaded files.
- Create and revoke object URLs when triggering a browser download.
- Use `arraybuffer` when raw binary manipulation is needed.

### Query serialization

- Axios serializes a plain `params` object into a query string.
- Arrays can be repeated keys, bracketed keys, comma-separated values or indexed values depending on the serializer.
- Nested-object formats vary across server frameworks.
- Configure `paramsSerializer` with a library such as `qs` when the backend expects a specific format.

### Representative pattern

```ts
type ApiError = { message: string; code: string };

export const api: AxiosInstance = axios.create({
  baseURL: "https://api.example.com",
  timeout: 10_000,
  headers: { "Content-Type": "application/json" }
});

export async function getUsers(params: UsersQuery, signal?: AbortSignal) {
  const response = await api.get<User[]>("/users", { params, signal });
  return response.data;
}
```

### Caveats

- TypeScript types disappear at runtime and cannot prove that server JSON matches the declared interface.
- Never manually set a multipart boundary unless you are constructing the entire encoded body yourself.

## R05 — Interceptor lifecycle and ejection

`interceptors.request.use` and `interceptors.response.use` return numeric IDs. Those IDs must be retained when registration can happen more than once.

### Registration and removal

- `use(handler)` installs an interceptor and returns its ID.
- `eject(id)` removes the matching interceptor.
- Repeated registration without ejection causes duplicate auth headers, logs, retries or transformations.
- This is common in tests, hot reload and React StrictMode development behavior.

### React pattern

- Register the interceptor inside an effect when it depends on component-provided state.
- Return a cleanup function that ejects the captured ID.
- Include relevant dependencies such as the current token.
- Prefer a stable application-level registration when component lifecycle is unnecessary.

### Test pattern

- Register in setup and eject in teardown.
- Do not share interceptor state across unrelated test cases.
- Assert the effective request config rather than relying only on handler invocation counts.

### Representative pattern

```ts
useEffect(() => {
  const id = api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return () => api.interceptors.request.eject(id);
}, [token]);
```

### Caveats

- Ejecting prevents future executions; it does not cancel an interceptor already participating in an in-flight request.
- A single application-owned interceptor plus a token getter is often simpler than repeated component registration.

## R06 — Request/response interceptors, validateStatus and token refresh

Interceptors create a pipeline around the adapter: request interceptors modify the outgoing config, and response interceptors process fulfilled responses or rejected Axios errors.

### Request interceptors

- Attach bearer tokens to every request.
- Generate correlation IDs and structured request logs.
- Apply locale or tenant headers.
- Always return the config or a promise of the config; rejecting stops the request.

### Response interceptors

- The fulfilled handler receives successful responses according to `validateStatus`.
- The rejected handler receives Axios errors and can map or retry them.
- Return the response to preserve the success chain.
- Use `return Promise.reject(error)` when the error remains unhandled.

### validateStatus coupling

- By default, 2xx statuses resolve and most non-2xx statuses reject.
- A custom policy such as `status < 500` makes 4xx responses flow through `onFulfilled`.
- Interceptors do not independently decide HTTP success; they follow the promise outcome produced by `validateStatus`.
- Central error code should therefore be reviewed whenever the status policy changes.

### Central error handling

- Map network errors separately from server responses.
- Read `error.response?.status` only when a response exists.
- Preserve the original error cause and request config for diagnostics.
- Avoid swallowing errors by returning undefined from a rejected handler.

### Refresh-token retry

- Handle only the intended authentication status, commonly 401.
- Mark the original config with a private retry flag to prevent infinite loops.
- Refresh through a separate client or endpoint that does not enter the same interceptor loop.
- Update the original Authorization header and resend the original config.

### Parallel 401 protection

- Use a shared refresh promise so concurrent failed requests wait for one refresh operation.
- Clear the shared promise in `finally`.
- Store the new token before retrying queued requests.
- If refresh fails, reject all waiting requests and perform the application's logout/session-expiry flow.

### Representative pattern

```ts
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
  response => response,
  async (error: AxiosError) => {
    const original = error.config as
      (InternalAxiosRequestConfig & { _retry?: boolean }) | undefined;

    if (error.response?.status !== 401 || !original || original._retry) {
      return Promise.reject(error);
    }

    original._retry = true;
    refreshPromise ??= refreshAccessToken().finally(() => {
      refreshPromise = null;
    });

    const token = await refreshPromise;
    original.headers.Authorization = `Bearer ${token}`;
    return api.request(original);
  }
);
```

### Caveats

- Refresh logic must not retry non-idempotent operations blindly when server processing may already have occurred.
- Interceptor retries should preserve cancellation and avoid an interceptor loop on the refresh endpoint.

## Regional source map

### R01

- transcript: `01-transcript-R01-axios-request-configuration-options.md`
- text elements: `11`
- screenshot uses: `12`
- unique screenshots: `12`
- repeated placements: `0`
- remaining: `0`

### R02

- transcript: `02-transcript-R02-transforms-cancellation-progress-and-interceptor-boundaries.md`
- text elements: `14`
- screenshot uses: `22`
- unique screenshots: `22`
- repeated placements: `0`
- remaining: `0`

### R03

- transcript: `03-transcript-R03-fetch-adapter-ndjson-streaming-and-progress.md`
- text elements: `5`
- screenshot uses: `14`
- unique screenshots: `14`
- repeated placements: `0`
- remaining: `0`

### R04

- transcript: `04-transcript-R04-typed-clients-typed-requests-files-and-params-serialization.md`
- text elements: `7`
- screenshot uses: `34`
- unique screenshots: `34`
- repeated placements: `0`
- remaining: `0`

### R05

- transcript: `05-transcript-R05-interceptor-lifecycle-and-ejection.md`
- text elements: `1`
- screenshot uses: `6`
- unique screenshots: `6`
- repeated placements: `0`
- remaining: `0`

### R06

- transcript: `06-transcript-R06-requestresponse-interceptors-validatestatus-and-token-refresh.md`
- text elements: `6`
- screenshot uses: `22`
- unique screenshots: `22`
- repeated placements: `4`
- remaining: `0`

## Exactness note

This is the authoritative semantic transcript. The preserved SVG and
extracted screenshots remain authoritative for exact code punctuation,
version-specific APIs and original examples.
