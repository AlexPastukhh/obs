# Regional transcript — R06: Request/response interceptors, validateStatus and token refresh

Conspect: `axios`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 6 / 6
image uses processed: 22 / 22
unique screenshots represented: 22
repeated placements retained: 4
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Interceptors create a pipeline around the adapter: request interceptors modify the outgoing config, and response interceptors process fulfilled responses or rejected Axios errors.

## Request interceptors

- Attach bearer tokens to every request.
- Generate correlation IDs and structured request logs.
- Apply locale or tenant headers.
- Always return the config or a promise of the config; rejecting stops the request.

## Response interceptors

- The fulfilled handler receives successful responses according to `validateStatus`.
- The rejected handler receives Axios errors and can map or retry them.
- Return the response to preserve the success chain.
- Use `return Promise.reject(error)` when the error remains unhandled.

## validateStatus coupling

- By default, 2xx statuses resolve and most non-2xx statuses reject.
- A custom policy such as `status < 500` makes 4xx responses flow through `onFulfilled`.
- Interceptors do not independently decide HTTP success; they follow the promise outcome produced by `validateStatus`.
- Central error code should therefore be reviewed whenever the status policy changes.

## Central error handling

- Map network errors separately from server responses.
- Read `error.response?.status` only when a response exists.
- Preserve the original error cause and request config for diagnostics.
- Avoid swallowing errors by returning undefined from a rejected handler.

## Refresh-token retry

- Handle only the intended authentication status, commonly 401.
- Mark the original config with a private retry flag to prevent infinite loops.
- Refresh through a separate client or endpoint that does not enter the same interceptor loop.
- Update the original Authorization header and resend the original config.

## Parallel 401 protection

- Use a shared refresh promise so concurrent failed requests wait for one refresh operation.
- Clear the shared promise in `finally`.
- Store the new token before retrying queued requests.
- If refresh fails, reject all waiting requests and perform the application's logout/session-expiry flow.

## Representative pattern

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

## Caveats

- Refresh logic must not retry non-idempotent operations blindly when server processing may already have occurred.
- Interceptor retries should preserve cancellation and avoid an interceptor loop on the refresh endpoint.

## Source labels

- `!!!`
- `interceptors`
- `validatestatus and`
- `response interseptors`
- `fullfiled`
- `rejected`

## Covered text elements

```text
T-010, T-011, T-041, T-042, T-043, T-044
```

## Covered screenshot uses

```text
IU-044, IU-045, IU-046, IU-047, IU-048, IU-049, IU-050, IU-051, IU-052, IU-053, IU-054, IU-055, IU-056
IU-057, IU-058, IU-059, IU-060, IU-061, IU-107, IU-108, IU-109, IU-110
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
