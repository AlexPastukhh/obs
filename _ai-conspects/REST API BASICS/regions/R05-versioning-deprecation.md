# R05 — API versioning and deprecation

## Coverage

```text
image uses reviewed: 13
physical SVG text nodes reviewed: 4
remaining image uses: 0
remaining text nodes: 0
```

## Area understanding

This region contrasts REST-oriented evolution with practical versioning mechanisms and then focuses on the operational policy required when breaking changes cannot be avoided.

## Verified transcript

### What may change

An API can change in three broad areas:

- functionality;
- business rules;
- resource representations.

The REST-oriented ideal is to evolve behavior through hypermedia controls and negotiate representation changes through media types rather than freezing duplicate endpoint sets indefinitely.

### Common mechanisms

Practical APIs commonly version through:

1. **URI path:** `/api/v1/authors`;
2. **query string:** `/api/authors?api-version=v1`;
3. **custom header:** `api-version: v1`;
4. **representation media type:** a versioned vendor media type.

URI versioning is explicit and cache-friendly but makes the version part of the resource address. Query versioning keeps the path stable but is less prominent. Header versioning preserves the URI but is less visible and can complicate debugging and caching. Media-type versioning aligns version changes with representation changes but requires more content-negotiation work.

Pick one strategy and apply it consistently.

### Breaking changes

The reviewed list includes:

- removing or renaming a field;
- changing a field type;
- changing the meaning of a field;
- changing default sorting or paging behavior;
- tightening validation so previously valid requests fail.

### Deprecation policy

The deprecation policy matters more than the transport mechanism. A practical policy should:

- announce deprecation;
- publish a sunset date;
- keep the old version available for a defined period;
- provide a migration guide.

Common response headers include `Deprecation` and `Sunset`.

### ASP.NET Core

The screenshots reference the ASP.NET API Versioning package for URI-segment, query-string and header versioning, including reporting available versions.

## Practical conclusion

Prefer compatible evolution. When a breaking change is unavoidable, document exactly what counts as breaking, choose one consistent versioning mechanism and operate a clear deprecation and migration policy.
