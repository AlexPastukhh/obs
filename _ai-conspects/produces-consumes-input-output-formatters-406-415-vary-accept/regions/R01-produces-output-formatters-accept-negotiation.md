# R01 - Produces / output formatters / Accept negotiation

Generated: 2026-06-13 05:14:03 UTC

Image uses: 10

```text
S-001, S-002, S-003, S-004, S-005, S-006, S-007, S-008, S-009, S-010
```

## Core idea

`[Produces]` is response-side metadata and constraint.

It tells ASP.NET Core which response media type an endpoint is meant to produce, and it helps the formatter/content-negotiation pipeline select the output representation.

A useful mental model:

```text
return object -> output formatter -> response body
Accept header + endpoint metadata -> preferred/allowed response Content-Type
```

## Output formatters

Output formatters are responsible for serializing the response object.

Common examples:

```text
application/json -> JSON output formatter
application/xml  -> XML output formatter, if XML formatters were registered
custom media type -> custom or explicitly configured formatter mapping
```

The runtime can only return a media type that it knows how to write. `[Produces]` does not magically create a formatter. It constrains/describes the response media type; a compatible output formatter still must exist.

## Accept negotiation

The `Accept` request header is client preference for response media type.

Typical flow:

```text
client sends Accept
endpoint metadata says what it can produce
registered output formatters say what can be written
runtime picks compatible formatter/media type
```

If a client requests a media type the server cannot produce, ASP.NET Core may still fall back to JSON by default. If strict negotiation is enabled through MVC options, the runtime can return `406 Not Acceptable`.

## Splitting actions by produced media type

The source screenshots show an endpoint split into several variants such as app JSON / hateoas JSON / friendly JSON / friendly hateoas.

That pattern is useful when each representation is a distinct contract:

```text
same resource
different output representation
different Produces metadata
possibly different action selection / endpoint metadata
```

This makes generated client metadata and API documentation clearer.

## Relationship to Vary: Accept

When different response bodies can be returned for the same URL depending on `Accept`, cache behavior matters.

The R01 rule is:

```text
Produces/Accept decides response representation.
Vary: Accept tells caches that Accept is part of the cache key.
```

The detailed `Vary: Accept` and browser Accept-header behavior is reserved for R04/P02.

## Practical checklist

Use `[Produces]` when:

```text
an endpoint has a precise response media type contract
you want OpenAPI/Swagger metadata to show response media types
you have XML/custom formatters and need explicit response type constraints
you split actions by representation
```

Do not treat `[Produces]` as:

```text
request Content-Type validation
input body parsing
the 415 mechanism
a replacement for registering formatters
```

Those request-side concerns belong to `[Consumes]` and input formatters.
