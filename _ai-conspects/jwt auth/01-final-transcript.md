# Final transcript — jwt auth

Generated: 2026-06-22 00:00:00 UTC

## 0.1 Area understanding / reading quality

**Overall:** End-to-end JWT access/refresh-token authentication: symmetric/asymmetric signing and KID, token structure, React Query token cache, single-flight refresh, retry-on-401, refresh-token families, Redis rotation and reuse detection.

**Reading quality:** high for code/text; the exact TypeScript and token notes are retained in the source ledger.

```text
processed image uses: 0
processed text elements: 112
remaining unclosed image uses: 0
remaining unclosed text elements: 0
```

## Structured transcript

### JWT structure

Header, claims/payload and signature; symmetric vs asymmetric signing and key IDs.

### Frontend access-token cache

React Query singleton QueryClient stores the access token and drives UI updates.

### Single-flight refresh

One shared refresh promise prevents parallel refresh storms; 401 triggers refresh and a single retry.

### Refresh cookies

Refresh token sent as an HttpOnly credential cookie while access token is kept in memory.

### Rotation and families

Refresh-token rotation, family identifiers, old-token reuse detection and revoking the whole family after suspected theft.

### Redis patterns

SETNX/atomic storage ideas, token-family state and optional revoked-token tracking.

## Source-preserving element sample

The full source text is stored in `data/text-elements.json` and `data/text-elements.csv`.

- `T-001` symmetric/ assymetric keys
- `T-002` KID
- `T-003` END TO END JWT, REFRESH
- `T-004` REACT
- `T-005` react implementation
- `T-006` if there is an existing promise
- `T-007` we just return it
- `T-008` react query with singletone query client
- `T-010` // src/auth/tokenCache.ts
- `T-011` import { queryClient, TOKEN_KEY } from "../queryClient";
- `T-013` export function getAccessToken(): string | null {
- `T-014` return (queryClient.getQueryData(TOKEN_KEY) as string | null) ?? null;
- `T-015` }
- `T-017` export function setAccessToken(token: string | null) {
- `T-018` queryClient.setQueryData(TOKEN_KEY, token);
- `T-019` }
- `T-020` // src/auth/refresh.ts
- `T-021` import { setAccessToken } from "./tokenCache";
- `T-023` export async function refreshAccessToken(): Promise<string> {
- `T-024` const res = await fetch("/api/auth/refresh", {
- `T-025` method: "POST",
- `T-026` credentials: "include", // sends refresh cookie
- `T-027` });
- `T-029` if (!res.ok) throw new Error("Refresh failed");
- `T-031` const data = (await res.json()) as { accessToken: string };
- `T-032` setAccessToken(data.accessToken); // <-- update React Query cache
- `T-033` return data.accessToken;
- `T-034` }
- `T-035` // src/api/fetchWithAuth.ts
- `T-036` import { getAccessToken, setAccessToken } from "../auth/tokenCache";

## Practical conclusion

Use this conspect as a conceptual map, then return to the preserved SVG or embedded screenshots for exact code/API spellings before copying implementation details.
