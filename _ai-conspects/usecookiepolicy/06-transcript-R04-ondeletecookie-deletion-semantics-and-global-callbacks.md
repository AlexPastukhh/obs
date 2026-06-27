# Regional transcript — R04: OnDeleteCookie, deletion semantics and global callback issues

Conspect: `usecookiepolicy`  
Generated: 2026-06-27 08:00:00 UTC

## Coverage

```text
image uses processed: 8 / 8
unique screenshots represented: 8
repeated placements retained: 0
remaining image uses: 0
```

## Semantic transcript

Cookie deletion is implemented by sending an expired cookie with a matching identity. The delete callback can normalize those options, but global mutation is easy to misuse.

## What deletion means

- `Response.Cookies.Delete` emits a Set-Cookie header that expires the cookie.
- The browser identifies a cookie by name plus path and domain, so deletion must target compatible path/domain values.
- Deleting a cookie does not remove unrelated variants with the same name but different path/domain.

## OnDeleteCookie

- The callback receives mutable delete options before the expired cookie is written.
- It can enforce path, domain, secure and SameSite values needed to match the original cookie.
- It can suppress deletion, though that is rarely desirable unless another component owns the lifecycle.

## Global pitfalls

- A global delete callback can accidentally change path/domain so the browser keeps the original cookie.
- Name-based branching becomes difficult to maintain as framework and application cookies accumulate.
- Appending and deletion policies should be symmetrical for the cookies they govern.

## Better patterns

- Use a shared cookie-options factory for cookies owned by the application.
- Keep deletion close to creation so the same path/domain contract is reused.
- Reserve global callbacks for genuinely global invariants.

## Caveats

- Deleting a cookie is a client instruction and takes effect when the response reaches the browser.
- A server-side session or token may also need revocation.

## Nearby source labels

- for both onappend and ondelete
- or when we have simple same options
- mostly for defaults
- !!!
- callbacks vs better static pattern
- issues from global ondelete

## Covered screenshot uses

```text
IU-030, IU-031, IU-036, IU-037, IU-038, IU-039, IU-040, IU-041
```

## Audit note

Every listed placement is closed in `data/image-uses-v002-closed.*`.
The complete SVG and recovered screenshots remain authoritative for exact syntax.
