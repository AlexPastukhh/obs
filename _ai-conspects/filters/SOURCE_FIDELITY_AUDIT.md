# Filters SVG and transcript source-fidelity audit v002

## Uploaded/source SVG

```text
Git blob SHA: a5c62548788a9a338b53de87a1f6c04fb7e78e47
viewBox: 0 0 14193.90233006682 28048.724861153358
unique embedded images: 127
image uses: 131
physical non-empty text nodes: 188
grouped text blocks: 41
duplicate canvas placements: 4
broken embedded images: 0
external image references: 0
empty image references: 0
zero-size images: 0
dangling use references: 0
```

The repository source blob has the same SHA, so Stage0/source replacement is not required.

## Repository before correction

Coverage counters were correct:

```text
R01: 93 image uses
R02: 27 image uses
R03: 11 image uses
remaining: 0
```

However, the authoritative R01 file reduced 93 sources to five broad topic paragraphs. The R02/R03 file reduced 38 sources to seven broad topic paragraphs. Visible code, individual arguments, ordering examples, result/exception subtleties, content-negotiation examples, and antiforgery examples were mostly absent.

Quality before correction:

```text
technical coverage accounting: 10 / 10
source fidelity: 3.5 / 10
direct repetition readiness: 4 / 10
question-generation readiness: 5 / 10
```

## Correction

This archive replaces both authoritative region transcripts with 131 source-specific blocks, preserves the 188 physical SVG text nodes, adds an integrated final transcript, and adds 108 repetition questions.

Duplicate placements retained:

```text
S-001 / S-111
S-002 / S-010
S-006 / S-112
S-009 / S-131
```

## Verdict

```text
SVG completeness: COMPLETE
repo source match: EXACT
Stage0 update required: NO
source-specific transcript: 131 / 131
native canvas text: 188 / 188
remaining source work: 0
readiness: READY_NEAR_LITERAL
```
