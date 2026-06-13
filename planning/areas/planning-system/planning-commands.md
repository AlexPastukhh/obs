# OBS Planning-System Commands

Status: active OBS area command owner doc
Doc version: v0.1.0
Scope: local command behavior for Scenario Planning Workspace and idea evaluation.

## 1. Command: план сценария / scenario plan / workspace plan

Purpose:

```text
Create or update a Scenario Planning Workspace from user-provided input.
```

Boundary:

```text
- Fill only explicit user input by default.
- Unknown fields are `not provided`.
- AI assumptions/suggestions must be separate.
- Do not create archive/edit/commit unless separately requested.
```

Owner files:

```text
planning/areas/planning-system/scenario-planning-workspace-template.md
planning/areas/planning-system/scenario-planning-workspace-workflow.md
```

## 2. Command: оцени идею / idea eval / оценка идеи

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

## 3. Command: AC план / acceptance plan / критерии готовности

Purpose:

```text
Convert explicit user goals into Acceptance Criteria.
```

Boundary:

```text
- Do not invent criteria unless user asks for suggestions.
- AC must have a verifiable result or `not provided`.
```

## 4. Command: команды планирования / planning commands

Purpose:

```text
Review or propose commands for the OBS planning-system area.
```

Boundary:

```text
- Use `planning/documentation/command-creation-workflow.md` before treating a new command as accepted.
- Tampermonkey projection is optional and must use the reusable projection workflow if in scope.
```
