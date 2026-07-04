# Current Source of Truth - Encoding.UTF8 and chunk processing

Updated: 2026-07-04 UTC

## Policy

Embedded screenshots are the primary source.

The authoritative readable layer is a full semantic transcript rather than a character-by-character OCR dump.
Code is normalized into readable C# when the meaning is clear. The transcript preserves all important API
differences, buffer rules, state transitions, fallback behavior, and streaming constraints.

## Verified source

```text
repository source: SVG under source/ matched by Git blob
SHA-256: 64be648e24f24d7af5cda1b560cc1b64c28ad47d1c55e431bfac33f1fcc95253
Git blob: 5763263be84e2e28658314edf49351c6b07ec35e
unique embedded images: 54
image uses: 55
SVG text nodes: 48
Stage0 rebuild required: no
```

## Authoritative transcript

```text
regions/full-semantic-transcript-v001.md
image-use coverage: 55 / 55
SVG text-node review: 48 / 48
```

The transcript covers complete-value `Encoding` APIs, array and span overloads, buffer sizing, stateful
`Decoder` and `Encoder`, `GetChars` versus `Convert`, `bytesUsed`, `charsUsed`, `completed`, WebSocket
fragments, `flush`, fallback policies, truncated final input, and stream-decoding patterns.

Existing Stage1 and Stage2 regional transcripts remain secondary source-coverage records. Their older
semantic wording is superseded by the consolidated transcript above.

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
