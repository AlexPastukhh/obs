# Current Source of Truth - EF Core retries and savepoints

Updated: 2026-07-04 UTC

## Policy

Screenshots in the corrected SVG are the primary source.

The authoritative readable layer is a complete semantic transcript. It is not intended to reproduce every
character or line break from the screenshots. It must preserve every material definition, distinction,
condition, limitation, risk, example, and code pattern without introducing OCR corruption.

## Verified source

```text
repository source: source/source-complete-v002.svg
SHA-256: c73ba05e069382d682f21b3ea949bf2cc13dbbadf253776a945df611590ebdad
Git blob: 9b3d6771d614e3cd43757833206cda7da50fdab7
embedded images: 76
image uses: 76
SVG text nodes: 56
Stage0 rebuild required: no
```

## Authoritative transcript

```text
regions/full-semantic-transcript-v001.md
image-use coverage: 76 / 76
SVG text-node review: 56 / 56
```

The transcript covers execution strategies, explicit transactions, savepoints, `SaveChanges(false)`,
`ExecuteInTransactionAsync`, unknown commit outcomes, retry buffering, pooled contexts, multiple contexts,
diagnostics, isolation levels, RCSI, optimistic concurrency, and failure classification.

The older `regions/full-svg-reconciliation-v002.md` remains a secondary regional overview. It no longer
serves as the authoritative study transcript.

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
