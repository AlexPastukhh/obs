# OBS Planning System Area

Status: active OBS area documentation
Doc version: v0.1.0
Scope: local OBS planning workspace templates, scenario planning commands and idea-evaluation workflow.

## 1. Purpose

This area applies the reusable documentation layer to personal/OBS planning work.

It owns local templates and command behavior for:

```text
- Scenario Planning Workspace
- minimum / base / desired / max
- Acceptance Criteria as current working chunks
- Ideas Inbox
- Idea Evaluation
- explicit user input vs AI assumptions/suggestions
```

## 2. Core Rule

Do not fill planning fields from AI guesses by default.

```text
- Fill only what the user explicitly said.
- If a field cannot be filled from user input, write `not provided`.
- AI assumptions/suggestions must be separated from user input.
- Plan Core should not silently absorb raw ideas.
```

## 3. Owner Files

| File | Role |
|---|---|
| `scenario-planning-workspace-template.md` | Minimal workspace template. |
| `scenario-planning-workspace-workflow.md` | How to fill/update/evaluate the workspace. |
| `planning-commands.md` | Local command definitions and route details for planning-system commands. |

## 4. Related Root Route

Concrete command routing lives in:

```text
planning/planning-use-case-map.md
```

Reusable command creation rules live in:

```text
planning/documentation/command-creation-workflow.md
```
