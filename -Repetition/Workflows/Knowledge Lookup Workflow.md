# Knowledge Lookup Workflow

Status: active workflow.

Use when the user asks where some information is located, cannot find a conspect, or wants to inventory knowledge.

## Goal

Find likely notes/materials by term, use case, vague description, or related context.

## Read order

```text
1. -Repetition/Lookup/Knowledge Locator Map.md
2. Repeat materials if listed in locator entries
3. Source/visual conspect links if needed
4. Inventory Notes when classifying unknown material
```

## Algorithm

```text
1. Parse what the user remembers:
   - exact term;
   - synonym;
   - use case;
   - bug/problem/symptom;
   - vague memory;
   - related technology.
2. Search Knowledge Locator Map first.
3. Match by terms and by use-case meaning.
4. Return likely locations and why.
5. If not found, search repeat materials/topic notes/source notes.
6. If still not found, say that it is not located yet and propose an Inventory Notes entry.
7. When location is confirmed, add/update locator entry if user wants.
```

## Output shape

```text
Likely location:
- note/file:
- section/block:
- why:

Alternative matches:
- ...

Not checked:
- ...

Suggested locator update:
- ...
```

## Do not

```text
- Do not invent a note location if not found.
- Do not treat use-case similarity as certainty.
- Do not modify source notes without explicit user permission.
```
