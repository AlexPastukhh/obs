# HTTP cache freshness and validation headers

Knowledge ID: `http.cache-validation-headers`

Topic: `http`

## Core model

`Cache-Control` is the primary modern mechanism for expressing cache behavior and freshness:

```http
Cache-Control: max-age=3600
```

Older compatibility fields include `Expires` and `Pragma: no-cache`. When modern and legacy fields coexist, modern clients and caches primarily follow `Cache-Control`.

Conditional requests validate a stored representation instead of always transferring it again:

```http
If-None-Match: "etag-value"
If-Modified-Since: <http-date>
```

A response can supply the validator:

```http
ETag: "etag-value"
```

## What should be recallable

- Which header is the primary modern cache-control mechanism?
- What role do `Expires` and `Pragma` play?
- How do `If-None-Match`, `If-Modified-Since`, and `ETag` participate in validation?
- Which fields in this unit control freshness, and which participate in conditional validation?

## Sources

- Workspace: `_ai-conspects/headers/`
- Integrated source: `FINAL_TRANSCRIPT.md`, section 7
- Regional evidence: `regions/R03-asp-net-core-header-abstractions-stringvalues-operations-and-common-typed-proper.md`
- Original SVG: `source/headers.svg`
