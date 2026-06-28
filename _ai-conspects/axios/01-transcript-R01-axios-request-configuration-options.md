# Regional transcript — R01: Axios request configuration options

Conspect: `axios`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 11 / 11
image uses processed: 12 / 12
unique screenshots represented: 12
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

Axios builds every request from a configuration object. Instance defaults, method helpers and per-request options are merged into the final config sent to the selected adapter.

## Address and method

- `url` identifies the resource and is required unless a wrapper supplies it.
- `method` defaults to GET; helpers such as `axios.get` and `axios.post` are convenience wrappers.
- `baseURL` is prepended to relative URLs and is best configured on a dedicated Axios instance.
- `allowAbsoluteUrls` controls whether an absolute request URL can replace the configured base URL.

## Headers and authentication

- `headers` adds request headers such as Accept, Content-Type, correlation IDs or Authorization.
- The `auth` option is specifically HTTP Basic authentication and sets the Authorization header.
- Using `auth` can overwrite a custom Authorization header; bearer tokens should normally be placed in `headers` or a request interceptor.
- `withCredentials` enables cross-site cookies/credentials in browser requests when server CORS policy also allows them.

## Query and body

- `params` contains URL query values and is not the request body.
- `paramsSerializer` controls arrays, nested objects and backend-specific query formats.
- `data` is the request body for methods such as POST, PUT, PATCH and DELETE.
- Axios serializes ordinary JavaScript objects as JSON unless the body type or headers require another representation.

## Timing and response shape

- `timeout` aborts the Axios request after the configured duration; zero means no Axios timeout.
- `responseType` selects representations such as json, text, blob or arraybuffer.
- `signal` is the modern AbortController-based cancellation mechanism.
- The config should describe transport concerns; domain validation still belongs at an application boundary.

## Representative pattern

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

## Caveats

- CORS failures are browser security failures, not ordinary Axios response errors from the server.
- Instance defaults reduce duplication and are safer than mutating global `axios.defaults` across unrelated APIs.

## Source labels

- `axios options`
- `url,method,baseurl`
- `allowabsoluteurls`
- `headers`
- `paramsSerializer`
- `params`
- `data`
- `timeout`
- `withCredentials`
- `auth`
- `responseType`

## Covered text elements

```text
T-014, T-015, T-016, T-017, T-018, T-019, T-020, T-021, T-022, T-023, T-030
```

## Covered screenshot uses

```text
IU-069, IU-070, IU-071, IU-072, IU-073, IU-074, IU-075, IU-076, IU-077, IU-078, IU-079, IU-080
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
