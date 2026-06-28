# Final semantic transcript — JavaScript URL encoding

Authoritative source: `source/js url safe, encodeuri.svg`

## `encodeURI`

Use for a complete URI when separators must remain structural:

```ts
const url =
  encodeURI(
    "https://example.com/a b?q=x y"
  );
```

Characters such as `:`, `/`, `?`, `&` and `#` can remain meaningful.

## `encodeURIComponent`

Use for one path segment or query value:

```ts
const value =
  encodeURIComponent(
    "a&b = c"
  );
```

It escapes characters that would otherwise change query/path structure.

```ts
const url =
  `/search?q=${
    encodeURIComponent(query)
  }`;
```

Do not call `encodeURIComponent` on the entire URL unless encoding all structural separators is intended.

## Prefer `URL` and `URLSearchParams`

```ts
const url =
  new URL(
    "/search",
    location.origin
  );

url.searchParams.set(
  "q",
  query
);

url.searchParams.set(
  "page",
  String(page)
);
```

This avoids manual separator and escaping errors.

## URL-safe Base64

Ordinary Base64 can contain `+`, `/` and `=`. Base64url commonly maps:

```text
+ → -
/ → _
remove or normalize padding =
```

Do not confuse Base64url with URI percent-encoding. They solve different representation problems.

## Checklist

```text
complete URL
    URL or encodeURI

one component
    encodeURIComponent

query construction
    URLSearchParams

binary token
    protocol-defined Base64url
```


# Coverage

```text
unique embedded screenshots: 2
image uses: 2
native SVG labels: 0
duplicate extra placements: 0

processed image uses: 2
processed text labels: 0
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
