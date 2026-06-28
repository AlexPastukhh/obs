# Regional transcript — R04: Typed clients, typed requests, files and params serialization

Conspect: `axios`  
Generated: 2026-06-27 17:30:00 UTC

## Coverage

```text
text elements represented: 7 / 7
image uses processed: 34 / 34
unique screenshots represented: 34
repeated placements retained: 0
remaining text elements: 0
remaining image uses: 0
```

## Semantic transcript

A dedicated typed Axios client centralizes the base URL and transport policy while TypeScript generics describe expected data at compile time.

## Setup and typed instance

- Install Axios and import `AxiosInstance`, `AxiosRequestConfig`, `AxiosResponse` and `AxiosError` as needed.
- Create an instance with `axios.create` instead of sharing mutable global defaults.
- Wrap instance methods in an API module to keep components unaware of transport details.
- Use domain-specific error conversion at the wrapper boundary.

## TypeScript generics

- `api.get<User[]>` types `response.data` as `User[]` at compile time.
- Request-body types and response-body types should be distinct when the server contracts differ.
- The generic does not validate runtime JSON.
- Use a schema validator when data crosses an untrusted runtime boundary.

## Request and response helpers

- Expose methods such as `getUsers(params)` or `createUser(input)` instead of returning raw config construction to every caller.
- Inspect `status`, `statusText`, `headers`, `data` and `config` on the AxiosResponse when needed.
- Use `axios.isAxiosError` to narrow unknown errors.
- Distinguish server responses, network/CORS errors and setup errors.

## Cancellation, timeout and retries

- Pass `AbortSignal` through wrapper methods.
- Axios timeout and AbortSignal solve related but distinct cancellation needs.
- Axios does not retry by default.
- Retries should be limited to safe/idempotent operations or explicitly designed request semantics.

## Files and binary data

- Upload files with FormData and let the browser generate the multipart boundary.
- Use `responseType: 'blob'` in browsers for downloaded files.
- Create and revoke object URLs when triggering a browser download.
- Use `arraybuffer` when raw binary manipulation is needed.

## Query serialization

- Axios serializes a plain `params` object into a query string.
- Arrays can be repeated keys, bracketed keys, comma-separated values or indexed values depending on the serializer.
- Nested-object formats vary across server frameworks.
- Configure `paramsSerializer` with a library such as `qs` when the backend expects a specific format.

## Representative pattern

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

## Caveats

- TypeScript types disappear at runtime and cannot prove that server JSON matches the declared interface.
- Never manually set a multipart boundary unless you are constructing the entire encoded body yourself.

## Source labels

- `import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";`
- `npm i axios`
- `# or`
- `pnpm add axios`
- `typed api`
- `typed request object`
- `params serialization`

## Covered text elements

```text
T-001, T-002, T-003, T-004, T-007, T-008, T-009
```

## Covered screenshot uses

```text
IU-001, IU-002, IU-003, IU-004, IU-005, IU-006, IU-007, IU-008, IU-009, IU-010, IU-011, IU-012, IU-013
IU-014, IU-015, IU-016, IU-017, IU-018, IU-019, IU-020, IU-021, IU-022, IU-023, IU-024, IU-025, IU-026
IU-027, IU-028, IU-029, IU-030, IU-063, IU-064, IU-065, IU-066
```

## Reading quality

- Complete regional contact sheets were reviewed.
- The semantic road and code examples were readable.
- Exact punctuation and library-version details remain verifiable in the preserved SVG and screenshots.
- Confidence: high for the concepts and flow represented in this region.
