# Scenario Planning Workspace Workflow

Status: active OBS area workflow
Doc version: v0.1.0
Scope: rules for filling and updating the Scenario Planning Workspace template.

## 1. Core Rule

Fill only what the user explicitly said unless the user asks for a workflow-based fill, suggestions, risks or evaluation.

```text
If user did not provide a field value:
  write `not provided`.

If assistant adds anything:
  place it under AI ASSUMPTIONS / SUGGESTIONS,
  never silently in USER INPUT or Plan Core.
```

## 2. Minimal Workspace Sections

```text
0. Current Target Scenario
1. Plan Core
   - Minimum
   - Base
   - Desired
   - Max / Very Wide
2. Acceptance Criteria
3. Ideas Inbox
   - Desired Ideas
   - Other Ideas
4. Idea Evaluation
```

## 3. Working With Acceptance Criteria

Acceptance Criteria are currently the practical working chunks. Do not force a separate Slice Map until the user asks for slices or a practical difference becomes clear.

Rules:

```text
- AC must be checkable.
- If verifiable result is unclear, write `not provided`.
- Do not invent AC from general context unless asked.
- Suggested AC goes under AI ASSUMPTIONS / SUGGESTIONS or clearly marked Source = ai suggestion.
```

## 4. Working With Ideas

Ideas do not become Plan Core automatically.

Use categories:

```text
Desired Ideas:
  what would be good, useful, motivating, moving the scenario forward;
  fantasy/desire stream is allowed.

Other Ideas:
  technical, organizational, commands, questions, doubts, possible improvements.
```

## 5. Idea Evaluation

When asked to evaluate an idea, check:

```text
- What benefit does it give?
- What does it relate to: Minimum/Base/Desired/Max/Other?
- What can it break?
- Risk for Base: low/medium/high.
- What must be checked?
- Decision: add to AC / keep as idea / reject / later.
```

Do not overfill beyond the available evidence. Use `not provided` when unknown.

## 6. Base Protection

The Base is a protective layer.

```text
Max / Very Wide ideas may be recorded freely,
but they must not break Base unless the user explicitly accepts that risk.
```

## 7. AI Assumption Boundary

AI may organize user input, but must not convert its own assumptions into plan facts.

Acceptable AI output by default:

```text
- move user input into the matching section;
- preserve uncertainty;
- mark missing fields as not provided;
- ask clarifying questions when blocking.
```

Not acceptable by default:

```text
- inventing acceptance criteria;
- inventing next action;
- inventing Base/Desired/Max;
- adding risk tables unless requested;
- treating suggestions as accepted plan.
```
