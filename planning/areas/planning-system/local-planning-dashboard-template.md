# Local Planning Dashboard Template

Status: active OBS area template
Doc version: v0.3.0
Scope: dashboard file shapes for time scopes, goal maps, backlog files and optional operational session-day files rendered by the local Tampermonkey viewer.

## 1. Model

```text
Time Overview = Scenario Planning Workspace anchored to time.
Goal Map = Scenario Planning Workspace anchored to a result.
Backlog = deferred work / deferred ideas list.
Operational Session Day = detailed date-based session ledger owned by -Planning/Days/.
```

Use the universal `Scenario Planning Workspace Template` for time overviews and goal maps.

Do not use Goal Map files to store D/F session scoring, support marks, penalty events or carryover debt.

## 2. Source-Of-Truth Split

```text
planning/dashboard/days/YYYY-MM-DD.md
  owns planning for the time scope:
  Current Target Scenario, Plan Core, Acceptance Criteria,
  Done / Evidence, Still Needed and Links.

-Planning/Days/YYYY/YYYY-MM-DD.md
  owns operational state for the date:
  Finished Sessions, D/F, Work Points, Penalty Events,
  support facts/marks, carryover/debt and final day review.

Tampermonkey viewer
  may combine both files into one read-only Day view.
  It does not merge or write source files.
```

Do not copy detailed session rows into `planning/dashboard/days/` merely to make the viewer display them.

## 3. Common Sections For Time And Goal Files

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

## 4. Index File Shape

````markdown
# Local Planning Dashboard Index

Status: active

```text
previous_year: planning/dashboard/years/2025.md
active_year: planning/dashboard/years/2026.md
active_period: planning/dashboard/periods/2026-05-06-diploma-return-to-rails.md
active_week: planning/dashboard/weeks/2026-W25.md
active_day: planning/dashboard/days/2026-06-17.md
active_session_day: not provided
active_goal_maps:
  - planning/dashboard/goals/planning-dashboard.md
deferred_work: planning/dashboard/backlog/deferred-work.md
deferred_ideas: planning/dashboard/backlog/deferred-ideas.md
```
````

`active_session_day` is optional.

Use a real repo path only when the operational day file exists and matches the active day. Otherwise use `not provided` or omit the field.

## 5. Day Composition

The formatted Day view may contain:

```text
Planning Summary
Plan Core
Acceptance Criteria
Done / Evidence
Still Needed
Links

Session Overview
Finished Sessions
Penalty Events
Support
Carryover / Debt
Final Day Summary
```

Compact session rows should prioritize:

```text
Session
Score / Points
D/F
Worked On / related goals
Short result
```

Detailed session fields may be shown inside an expandable row.

When a session references several goals, preserve all of them. Do not reduce a multi-goal session to one goal silently.

## 6. Time-Scope Rendering Levels

```text
day:
  full planning workspace plus optional operational session ledger.

week:
  week plan and day-level summaries when present.
  Do not force every session row into the week file.

period:
  period plan and week/day aggregate visibility when present.

year:
  year direction and period/goal progress.

goal-map:
  result-oriented planning only.
  No D/F, support, penalties or debt ledger by default.
```

A Goal Map may link to relevant time scopes or detailed day evidence, but does not own those session records.

## 7. Required Dashboard Folders

```text
planning/dashboard/years/
planning/dashboard/periods/
planning/dashboard/weeks/
planning/dashboard/days/
planning/dashboard/goals/
planning/dashboard/backlog/
```

Operational session days remain under their existing owner path:

```text
-Planning/Days/YYYY/
```

## 8. Rendering Contract

The viewer should:

```text
- render known Markdown headings as cards;
- render Markdown tables as HTML tables;
- render Plan Core scenarios as separate cards;
- render session rows compactly with expandable details;
- keep Formatted and Raw modes available;
- show per-file load errors without breaking other tabs;
- never infer missing session facts or goal links;
- remain read-only.
```
