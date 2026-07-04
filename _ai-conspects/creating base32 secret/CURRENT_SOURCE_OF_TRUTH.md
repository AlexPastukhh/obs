# Current Source of Truth - Creating a Base32 and TOTP secret

Updated: 2026-07-04 UTC

## Policy

Embedded screenshots and SVG text are the primary source.

The authoritative readable layer is a complete semantic transcript. It preserves every material detail about
secret generation, entropy, Base32 representation, provisioning URI construction, and the separate in-flight
dictionary cleanup note. It is not a character-by-character OCR transcript.

## Verified source

```text
repository source: SVG under source/ matched by Git blob
SHA-256: 00b26f65fd54c455c8d09c1cad61b2023719537afad3c427ab3ddb80179fa2a6
Git blob: d5aad6ee05f95c43d8650f1506140fa93deb8ab4
embedded images: 34
image uses: 34
SVG text nodes: 63
Stage0 rebuild required: no
```

## Authoritative transcript

```text
regions/full-semantic-transcript-v001.md
image-use coverage: 34 / 34
SVG text-node review: 63 / 63
```

The transcript covers byte-first secret generation, direct Base32 character selection, entropy calculations,
`BitConverter`, modulo mapping, storage, `otpauth` URI encoding, secret handling, and safe removal of exact
in-flight lazy values.

The existing Stage1 transcript remains a secondary historical overview and coverage record. It is superseded
as the authoritative study transcript.

## Repetition material

```text
QUESTIONS.md
```

## Closure

```text
source SVG verified
semantic content coverage complete
authoritative semantic transcript present
question bank present
known mojibake or OCR placeholders: none
```
