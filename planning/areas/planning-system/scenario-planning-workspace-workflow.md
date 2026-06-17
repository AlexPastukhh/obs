# Scenario Planning Workspace Workflow

Status: active OBS area workflow
Doc version: v0.2.0
Scope: rules for filling and updating the universal planning workspace template.

## 1. Core Rule

Fill only what the user explicitly said unless the user asks for a workflow-based fill, suggestions, risks or evaluation.

```text
If user did not provide a field value:
  write `not provided`.

If assistant adds anything:
  place it under AI ASSUMPTIONS / SUGGESTIONS,
  never silently in USER INPUT or Plan Core.
```

## 2. Scope Types

```text
time-scope:
  year / period / week / day overview.
  Use when the anchor is a time segment.

goal-map:
  concrete result or goal that may span multiple time segments.
  Use when the anchor is a goal/result.

project:
  larger working area with several goals.

experiment:
  deliberately uncertain attempt that may not produce payoff.
```

## 3. Minimal Workspace Sections

```text
0. Scope
1. Current Target Scenario
2. Plan Core
   - Minimum
   - Base
   - Desired
   - Max / Very Wide
3. Acceptance Criteria
4. Ideas Inbox
   - Desired Ideas
   - Other Ideas
5. Idea Evaluation
6. Done / Evidence
7. Still Needed
8. Links
```

Do not force a separate Slice Map, Risk Table or Decision Log unless the user asks for it or the planning situation truly needs it.

## 4. Working With Acceptance Criteria

Acceptance Criteria are practical checkable chunks.

Rules:

```text
- AC must be checkable.
- If verifiable result is unclear, write `not provided`.
- Do not invent AC from general context unless asked.
- Suggested AC goes under AI ASSUMPTIONS / SUGGESTIONS or clearly marked Source = ai suggestion.
```

## 5. Time Scope vs Goal Map

The same workspace template can be used for both.

```text
Time scope:
  Current Target Scenario = what this year/period/week/day should become.
  Done / Evidence = what happened inside this time scope.
  Links = parent/child time scopes and related goal maps.

Goal map:
  Current Target Scenario = what result should exist when the goal is successful.
  Done / Evidence = evidence of progress toward this goal.
  Links = related time scopes where the goal is active.
```

## 6. Dashboard Use

The local dashboard can render workspace files from:

```text
planning/dashboard/years/
planning/dashboard/periods/
planning/dashboard/weeks/
planning/dashboard/days/
planning/dashboard/goals/
planning/dashboard/backlog/
```

Repo markdown files are source of truth.
Tampermonkey is a read-only viewer.
AI output is not source of truth until manually written into repo files.

## 7. Ambiguous Work Rule

If work was done and its result is unclear, do not silently count it as useful progress.

Write it under:

```text
Done / Evidence
Still Needed
or Open / Unclear if the dashboard file has that section.
```

Experimental work is allowed if it is explicitly marked as uncertain or experimental.
