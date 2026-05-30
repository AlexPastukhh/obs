# Create Repeat Material From Conspect Workflow

Status: active workflow.

Use when the user provides an old/new conspect export and wants questions or repeat material.

## Goal

Create repeat material that preserves the value of the visual/source conspect while adding active recall questions, use cases, lookup index, weak spots and further-study branches.

## Required Reads

```text
-Repetition/AI Work Areas Profile.md
-Repetition/Question Creation Principles.md
-Repetition/Workflows/Export Conspect For AI Processing Workflow.md
-Repetition/Templates/Repeat Material Template.md
-Repetition/Templates/Question Note Template.md
```

## Inputs

```text
- visual/source conspect: SVG/PDF/PNG/Excalidraw export or markdown note;
- user corrections about structure;
- optional target topic name;
- optional existing source note links;
- optional desired output: questions only / repeat material / locator entries / further-study branches.
```

## Algorithm

```text
1. Check source format.
   - If source is visual/Excalidraw/export material, use Export Conspect For AI Processing Workflow as needed.
   - Prefer SVG + optional PNG crops for dense/important areas when the user is preparing source.

2. Inspect source conspect.

3. Extract rough topic map:
   - main blocks;
   - visual anchors;
   - suspected flows;
   - important terms;
   - unclear zones.

4. State uncertainty clearly.

5. Create repeat material draft:
   - source links;
   - search terms;
   - visual map anchors;
   - warm-up map recall prompts;
   - core questions;
   - detail questions;
   - use-case questions;
   - lookup index;
   - weak spots;
   - further study branch candidates.

6. Apply Question Creation Principles:
   - questions should force recall;
   - questions should be answerable from source;
   - large topics should have section-specific questions;
   - weak parts should become weak-point questions or focused repeat candidates.

7. Ask user to correct structure if source is old/chaotic.

8. After user review, update repeat material and optionally locator map.
```

## Important Principles

```text
Questions do not replace the visual conspect.
The visual conspect remains the map/spatial-memory source.
Questions are an active recall layer.
Use cases connect the conspect to real work.
Lookup index makes the material useful when searching for forgotten information.
```

## Output Shape

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

## Do Not

```text
- Do not treat uncertain visual/source interpretation as confirmed truth.
- Do not replace visual conspect with questions.
- Do not create active repeat chain/schedule entries unless the user says this material was processed as a repeat unit.
```
