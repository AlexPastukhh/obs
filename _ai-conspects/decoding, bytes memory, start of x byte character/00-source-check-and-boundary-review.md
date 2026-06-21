# Stage0 — source and boundary review

Source SVG: `decoding, bytes memory, start of x byte character.svg`

## Counts

```text
unique embedded images: 12
image uses on canvas: 12
text labels: 7
duplicate image uses: 0
```

## Candidate regions

### R01 — memory-and-variable-length-model

Memory/storage examples, mathematical value versus chosen storage width, and UTF-8 variable-length mental model.

```text
image uses: 5
text labels: 4
```

### R02 — utf8-leading-continuation-byte-patterns

UTF-8 self-description, leading/continuation bytes, prefix patterns, and why the first byte identifies sequence length.

```text
image uses: 5
text labels: 3
```

### R03 — ascii-and-multibyte-examples

Concrete ASCII and multi-byte decoding examples plus final decoding takeaway.

```text
image uses: 2
text labels: 0
```

