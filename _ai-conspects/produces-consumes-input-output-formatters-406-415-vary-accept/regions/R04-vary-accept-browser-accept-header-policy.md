# R04 - Vary: Accept / browser Accept header policy

Generated: 2026-06-13 05:25:22 UTC

Image uses: 12

```text
S-033, S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044
```

## Core idea

`Vary: Accept` is cache metadata.

It tells caches:

```text
the response for this URL depends on the request Accept header
```

This matters when one endpoint can return different representations of the same resource.

Example:

```text
GET /api/marvin/1
Accept: application/json -> JSON response
Accept: application/xml  -> XML response
Accept: application/vnd.company.hateoas+json -> HATEOAS JSON response
```

If a cache stores one of these responses without considering `Accept`, it may serve the wrong representation to another client.

## Negotiation vs caching

Content negotiation and caching are different responsibilities.

```text
Accept negotiation:
chooses which response representation to send.

Vary: Accept:
tells caches that Accept must be part of the cache key.
```

So `Vary: Accept` does not choose JSON/XML. It protects correctness after the choice was made.

## When to add Vary: Accept

Add or expect `Vary: Accept` when:

```text
same URL can produce multiple response media types
response body differs depending on Accept
server has multiple output formatter / [Produces] possibilities
client caches or intermediaries may store the response
```

The canvas note says:

```text
when have endpoint distinction with produces, need to vary
```

That is the right intuition: when `[Produces]`/Accept can select a different representation, cache variation by Accept becomes relevant.

## Browser Accept headers

Browsers often send broad Accept headers, not narrow API-like headers.

For example, browser requests can include many acceptable types:

```text
text/html
application/xhtml+xml
application/xml
image/avif
image/webp
*/*
```

This can be too broad for API content negotiation. Framework defaults may ignore browser Accept headers in some cases to avoid surprising behavior.

## RespectBrowserAcceptHeader

`RespectBrowserAcceptHeader` changes this policy.

Conceptually:

```text
false/default:
browser Accept headers may be ignored or treated specially because they are broad.

true:
MVC respects browser Accept headers during content negotiation.
```

This setting is relevant when you want the browser's `Accept` header to participate fully in formatter selection.

But enabling it can make browser requests select representations differently than expected. So it should be used intentionally.

## Relationship to Produces

`[Produces]` and `Vary: Accept` are related but not identical.

```text
[Produces]:
endpoint metadata / response media-type contract.

Accept:
client preference.

output formatter:
serialization mechanism.

Vary: Accept:
cache correctness marker.
```

You can understand the chain as:

```text
[Produces] + Accept + output formatter -> chosen response representation
chosen representation depends on Accept -> include Vary: Accept for caches
```

## Practical checklist

Use this checklist when debugging:

```text
Does the same URL return different representations based on Accept?
If yes, is Vary: Accept present?
Is the client a browser with a broad Accept header?
Is RespectBrowserAcceptHeader enabled or disabled?
Could a cache reuse JSON for an XML client, or XML for a JSON client?
```

## Boundary note

R04 is not the basic explanation of `[Produces]`. That belongs to R01.

R04 is the tail topic:

```text
once response representation varies by Accept,
how browser Accept behavior and cache correctness should be handled.
```
