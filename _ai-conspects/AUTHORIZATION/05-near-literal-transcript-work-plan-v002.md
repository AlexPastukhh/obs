# Near-literal transcript work plan v002

## Required output

The next archive must create one source block for each `S-001` through `S-112`.

Each block must contain:

```text
source ID and image hash
region
readability/crop/confidence
near-literal normalized visible text
visible C# code in a fenced block
interpretation kept separate from source text
links to continuation screenshots
at least one recall or code-reconstruction question
```

## Acceptance criteria

```text
unique source blocks: 112 / 112
duplicate placement records: 7 / 7
image-use rows: 119 / 119
canvas text lines represented: 110 / 110
generic placeholder blocks: 0
code-heavy screenshots replaced by one-line summaries: 0
remaining source transcript work: 0
```

## Important constraint

The current `03-integrated-semantic-study-draft.md` may be used as a synthesis
layer, but it must not replace the source blocks.
