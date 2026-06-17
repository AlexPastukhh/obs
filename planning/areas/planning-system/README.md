# OBS Planning System Area

Status: active OBS area documentation
Doc version: v0.2.0
Scope: local OBS planning workspace templates, dashboard files, goal maps, command behavior and idea-evaluation workflow.

## 1. Purpose

This area applies the reusable documentation layer to personal/OBS planning work.

It owns local templates and command behavior for:

```text
- Scenario Planning Workspace
- time-scope planning: year / period / week / day
- goal-map planning: concrete goals/results across time scopes
- minimum / base / desired / max
- Acceptance Criteria as current working chunks
- Ideas Inbox
- Idea Evaluation
- session/outcome visibility through dashboard files
- explicit user input vs AI assumptions/suggestions
```

## 2. Core Rule

Do not fill planning fields from AI guesses by default.

```text
- Fill only what the user explicitly said.
- If a field cannot be filled from user input, write `not provided`.
- AI assumptions/suggestions must be separated from user input.
- Plan Core should not silently absorb raw ideas.
- Tampermonkey is read-only projection, not source of truth.
- Repo markdown files are source of truth.
```

## 3. Owner Files

| File | Role |
|---|---|
| `scenario-planning-workspace-template.md` | Universal workspace template for time scopes and goal maps. |
| `scenario-planning-workspace-workflow.md` | How to fill/update/evaluate the workspace. |
| `local-planning-dashboard-template.md` | Dashboard file shapes for time/goal/backlog files. |
| `local-planning-dashboard-workflow.md` | Safe workflow for dashboard viewer and local files. |
| `local-goal-map-template.md` | Minimal goal-map template using workspace semantics. |
| `local-planning-dashboard-goal-map.md` | Local goal map for building the dashboard system itself. |
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
