# Create Repeat Material From Conspect Workflow

Status: active workflow.

Use when the user provides an old/new conspect export and wants questions or repeat material.

## Goal

Create repeat material that preserves the value of the visual conspect while adding active recall questions, use cases, lookup index, weak spots and further-study branches.

## Inputs

```text
- visual/source conspect: SVG/PDF/PNG/Excalidraw export or markdown note;
- user corrections about structure;
- optional target topic name;
- optional existing source note links.
```

## Algorithm

```text
1. Inspect source conspect.
2. Extract rough topic map:
   - main blocks;
   - visual anchors;
   - suspected flows;
   - important terms;
   - unclear zones.
3. State uncertainty clearly.
4. Create repeat material draft:
   - search terms;
   - visual map anchors;
   - warm-up map recall prompts;
   - core questions;
   - detail questions;
   - use-case questions;
   - lookup index;
   - weak spots;
   - further study branch candidates.
5. Ask user to correct structure if source is old/chaotic.
6. After user review, update repeat material and optionally locator map.
```

## Important principles

```text
Questions do not replace the visual conspect.
The visual conspect remains the map/spatial-memory source.
Questions are an active recall layer.
Use cases connect the conspect to real work.
Lookup index makes the material useful when searching for forgotten information.
```

## Output shape

```text
Topic:
- ...

What AI understood:
- ...

Uncertain parts:
- ...

Repeat material draft:
- visual anchors
- questions
- use cases
- lookup index
- weak spots
- further study candidates

Needs user review:
- ...
```
