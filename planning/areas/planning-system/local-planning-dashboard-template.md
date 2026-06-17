# Local Planning Dashboard Template

Status: active OBS area template
Doc version: v0.2.1
Scope: dashboard file shapes for time scopes, goal maps and backlog files rendered by Tampermonkey.

## 1. Model

```text
Time Overview = planning workspace anchored to time.
Goal Map = planning workspace anchored to a result.
Backlog = deferred work / deferred ideas list.
```

Use the universal `Scenario Planning Workspace Template` for both time overviews and goal maps.

## 2. Common Sections For Time And Goal Files

```text
Scope Type
Scope Anchor
Current Target Scenario
Plan Core
Acceptance Criteria
Ideas Inbox
Idea Evaluation
Done / Evidence
Still Needed
Links
```

Do not add heavy protocol sections by default.

## 3. Index File Shape

````markdown
# Local Planning Dashboard Index

Status: active

```text
previous_year: planning/dashboard/years/2025.md
active_year: planning/dashboard/years/2026.md
active_period: planning/dashboard/periods/2026-05-06-diploma-return-to-rails.md
active_week: planning/dashboard/weeks/2026-W25.md
active_day: planning/dashboard/days/2026-06-17.md
active_goal_maps:
  - planning/dashboard/goals/planning-dashboard.md
deferred_work: planning/dashboard/backlog/deferred-work.md
deferred_ideas: planning/dashboard/backlog/deferred-ideas.md
```
````

## 4. Required Dashboard Folders

```text
planning/dashboard/years/
planning/dashboard/periods/
planning/dashboard/weeks/
planning/dashboard/days/
planning/dashboard/goals/
planning/dashboard/backlog/
```

## 5. Day Extra

Day files may include a short session table in addition to the common sections.

```text
Sessions
```

Session records are for visibility, not bureaucracy.
