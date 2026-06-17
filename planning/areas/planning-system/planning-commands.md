# OBS Planning-System Commands

Status: active OBS area command owner doc
Doc version: v0.2.0
Scope: local command behavior for Scenario Planning Workspace, local dashboard, goal maps and idea evaluation.

## 1. Command: план сценария / scenario plan / workspace plan / шаблон планирования

Purpose:

```text
Create or update a Scenario Planning Workspace from user-provided input.
```

Boundary:

```text
- Fill only explicit user input by default.
- Unknown fields are `not provided`.
- AI assumptions/suggestions must be separate.
- Can be used for both time-scope and goal-map planning.
- Do not create archive/edit/commit unless separately requested.
```

Owner files:

```text
planning/areas/planning-system/scenario-planning-workspace-template.md
planning/areas/planning-system/scenario-planning-workspace-workflow.md
```

## 2. Command: план дашборд / planning dashboard / обзор планирования

Purpose:

```text
Show or update the local planning dashboard model: year / period / week / day / goal maps / backlog.
```

Boundary:

```text
- Repo markdown files are source of truth.
- Tampermonkey is read-only projection.
- Do not write files unless user explicitly asks for archive/update package.
- Do not commit or push.
```

Owner files:

```text
planning/areas/planning-system/local-planning-dashboard-template.md
planning/areas/planning-system/local-planning-dashboard-workflow.md
planning/dashboard/index.md
planning/documentation/tools/tampermonkey/local-planning-dashboard-viewer.user.js
```

## 3. Command: гол мап / goal map

Purpose:

```text
Create, review or update a local goal map for one concrete goal/result.
```

Boundary:

```text
- Goal Map is local OBS planning-system owner content, not reusable global protocol.
- Goal Map uses the same workspace core with Scope Type = goal-map.
- A goal map may link to year / period / week / day files.
- Do not treat parked reusable examples as active owner docs.
```

Owner files:

```text
planning/areas/planning-system/local-goal-map-template.md
planning/areas/planning-system/scenario-planning-workspace-template.md
planning/dashboard/goals/
```

## 4. Command: оцени идею / idea eval / оценка идеи

Purpose:

```text
Evaluate one idea against benefit, relation to Minimum/Base/Desired/Max, risks and decision.
```

Boundary:

```text
- Do not promote idea to Plan Core automatically.
- Use `not provided` when evidence is missing.
- Separate user input and AI assumptions/suggestions.
```

## 5. Command: AC план / acceptance plan / критерии готовности

Purpose:

```text
Convert explicit user goals into Acceptance Criteria.
```

Boundary:

```text
- Do not invent criteria unless user asks for suggestions.
- AC must have a verifiable result or `not provided`.
```

## 6. Command: команды планирования / planning commands

Purpose:

```text
Review or propose commands for the OBS planning-system area.
```

Boundary:

```text
- Use `planning/documentation/command-creation-workflow.md` before treating a new command as accepted.
- Tampermonkey projection is optional and must use the reusable projection workflow if in scope.
```
