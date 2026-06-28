# Regional transcript — R02: Transforms, cancellation, progress and interceptor boundaries

Conspect: `axios`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 14 / 14
image uses processed: 22 / 22
unique screenshots represented: 22
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

`transformRequest` and `transformResponse` change payload data at fixed points inside one request. Interceptors operate on the full request/response pipeline and are the better tool for cross-cutting behavior.

## Request transformation

- `transformRequest` runs before the body is sent.
- It receives outgoing data and headers and can return serialized data.
- It is primarily relevant to methods with a body: PUT, POST, PATCH and DELETE.
- Typical uses are body serialization, body normalization and body-related Content-Type selection.

## Response transformation

- `transformResponse` runs after bytes are received and before the caller's `then`/`await` receives `response.data`.
- It can parse or normalize the body and is commonly chained with Axios defaults.
- It should not be used as a global error-policy substitute.
- Runtime schema validation can be applied here, but many applications keep transport parsing and domain validation separate.

## Why interceptors differ

- Request interceptors see the full config and work for GET as well as body methods.
- They are better for bearer tokens, correlation IDs, locale headers, logging, retries and request-wide policy.
- Response interceptors see the full response or AxiosError and can centralize mapping and refresh-token flows.
- Transforms are payload hooks; interceptors are pipeline hooks.

## Cancellation and browser callbacks

- `signal` integrates with AbortController and supersedes the older CancelToken API.
- `onUploadProgress` reports bytes sent where the adapter/platform supports upload progress.
- `onDownloadProgress` reports bytes received where supported.
- Progress totals may be absent, so code must handle an unknown percentage.

## Status and XSRF options

- `validateStatus` decides whether an HTTP status resolves or rejects the Axios promise.
- `xsrfCookieName` and `xsrfHeaderName` configure browser XSRF cookie-to-header behavior.
- Changing `validateStatus` also changes which response-interceptor branch receives a response.

## Representative pattern

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

## Caveats

- Do not put an Authorization policy only in `transformRequest`; GET requests may bypass the intended body-transform path.
- Progress callbacks measure transport progress, not necessarily completion of server-side processing.

## Source labels

- `transformRequest`
- `signal`
- `validateStatus`
- `transformResponse`
- `cancelToken`
- `onUploadProgress`
- `onDownloadProgress`
- `xsrfheadername`
- `xsrfcookiename`
- `fullfiled`
- `rejected`
- `!!!`
- `transform request/response vs`
- `interseptors`

## Covered text elements

```text
T-024, T-025, T-026, T-029, T-031, T-032, T-033, T-034, T-035, T-036, T-037, T-038, T-039, T-040
```

## Covered screenshot uses

```text
IU-081, IU-082, IU-083, IU-084, IU-085, IU-086, IU-087, IU-088, IU-089, IU-094, IU-095, IU-096, IU-097
IU-098, IU-099, IU-100, IU-101, IU-102, IU-103, IU-104, IU-105, IU-106
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
