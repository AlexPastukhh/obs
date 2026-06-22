# R03 - Winner ordering / BuildResult / HATEOAS primary type

Generated: 2026-06-13 09:03:25 UTC

## Core idea

After parsing and matching candidates, the helper must choose a single winner deterministically.

A useful selection pipeline is:

```text
candidate matches
sort by q
then by specificity
then by server preference
then by original Accept header order
build result
```

The result should be stable and easy to test.

## q value priority

The first major ranking key is client preference.

Example:

```text
application/xml;q=1
application/json;q=0.8
```

The selected type should be XML if both are supported.

A candidate with `q=0` should already be filtered out and must not win.

## Specificity priority

When q values are equal, more specific media ranges should beat less specific ones.

Typical specificity ordering:

```text
application/vnd.example+json
application/json
application/*
*/*
```

This matters because a client can send both exact and wildcard Accept values.

## Server preference

When the client has no strong preference difference, the server can use its supported-type order.

Example:

```text
Accept: application/json, application/xml
server preference: application/json before application/xml
winner: application/json
```

This makes output deterministic and aligned with server policy.

## Header index tie-break

If everything else is equal, original order in the Accept header can be used as the final tie-break.

This is not usually the main rule, but it is useful to avoid unstable selection.

## BuildResult

`BuildResult` should convert the winning candidate into a clear result object.

Useful fields:

```text
success / no match
selected media type
selected representation family
selected primary type
include links / HATEOAS flag
diagnostic reason
```

The key point is that the controller should not need to know all matching internals.

## Primary media type

For vendor or custom media types, the helper may derive a primary representation.

Example:

```text
application/vnd.myapi.product+json
primary family: json
```

This lets the application decide serialization or payload shape while still honoring the full selected media type.

## HATEOAS / links flag

Some media types may mean:

```text
same resource data
but include hypermedia links
```

The selected representation can carry a flag such as:

```text
includeLinks = true
```

This prevents scattering string checks throughout the controller.

## Practical checklist

A good winner selection implementation should be:

```text
deterministic
testable
free of controller-specific logic
aware of q=0 exclusions
aware of specificity
aware of server preference
explicit about no-match cases
```

## Boundary note

R03 covers winner selection and result construction.

R04 covers controller integration, examples, edge cases and tests.
