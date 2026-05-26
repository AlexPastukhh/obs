# Create Further Study Branch Workflow

Status: active workflow.

Use when the user notices a part of a conspect that should be studied deeper, but it should not become an active task yet.

## Goal

Record a topic branch linked to a concrete conspect/section/visual anchor without scheduling it automatically.

## Inputs

```text
- source conspect / repeat material;
- source section or visual anchor;
- what is unclear or interesting;
- why it may matter;
- optional possible next action.
```

## Algorithm

```text
1. Identify source note and source section/visual anchor.
2. Create a Further Study Branch entry or file.
3. Link branch from Further Study Index.
4. If useful, link branch from repeat material/source topic.
5. Do not add it to repeat chain.
6. Do not schedule it unless user explicitly asks.
```

## Output shape

```text
Created / proposed branch:
- title:
- source:
- visual anchor/section:
- why it exists:
- not scheduled because:
- possible next action:
```

## Do not

```text
- Do not treat further study as a repeat.
- Do not turn it into today's active task unless user asks.
- Do not lose source linkage.
```
