# R01 - Accept header negotiation result and supported types

## Core idea

This region defines the contract of a helper that chooses the best response representation from an HTTP `Accept` header.

The helper receives:

```text
Accept header values from the client
server-supported output media types
optional server preference order
optional rules for links/HATEOAS
```

It returns a selected media type / representation, or a clear failure/no-match result.

## Why this exists

A single `Accept` header may contain many values:

```text
application/json
application/xml
application/*;q=0.8
*/*;q=0.1
application/vnd.example+json;q=0.9
```

The server must decide what response format to produce.

The helper centralizes that decision instead of spreading negotiation logic across controllers.

## Supported types

The server should only return a representation it can actually produce.

So the helper needs a list like:

```text
application/json
application/xml
application/vnd.example+json
```

The client may request many things, but the server chooses only from supported representations.

## q values

`q` values express client preference.

Mental model:

```text
higher q = client prefers more
q=1 is default
q=0 means not acceptable
```

Examples:

```text
application/json;q=1
application/xml;q=0.5
text/plain;q=0
```

The helper should ignore candidates with `q=0`.

## Specificity

Specific media types should usually beat broad wildcards when q is equal.

Typical ordering:

```text
application/vnd.example+json
application/json
application/*
*/*
```

The source road is about multiple Accept values, so the result should consider both q-value and specificity.

## Server preference

If the client is equally happy with several supported types, the server can use its own preference order.

Example:

```text
client accepts application/json and application/xml equally
server prefers application/json
result = application/json
```

This prevents random output ordering.

## Result object

The helper should return enough information for the controller/output layer.

Useful result fields:

```text
selected media type
whether negotiation succeeded
reason for no match
selected representation family
whether links/HATEOAS should be included
```

A structured result is better than returning just a string because controller code can handle no-match and special representation flags clearly.

## Boundary note

R01 covers the negotiation contract and selection concepts.

R02 covers the actual `TrySelect` parsing/matching flow.
