# Goal Map - Planning Dashboard

Status: active
Scope Type: goal-map
Scope Anchor: planning-dashboard

## Current Target Scenario

```text
A local repo-backed dashboard shows time-scope overviews, active goal maps, deferred work and deferred ideas from markdown files.
```

## Plan Core

### Minimum

```text
Dashboard index and active time files are readable from Tampermonkey.
```

### Base

```text
Dashboard also shows goal maps and backlog without depending on AI to render the overview.
```

### Desired

```text
Planning state can be inspected quickly: current goals, done work, still needed, and unclear places.
```

### Max / Very Wide

```text
Later, edit buttons may be added if manual editing becomes too slow.
```

## Acceptance Criteria

| AC | Criterion | Source | Verifiable Result | Status |
|---|---|---|---|---|
| AC1 | Dashboard files exist | user / ai suggestion | index, year, period, week, day, goal and backlog files exist | done |
| AC2 | Viewer is read-only | user / ai suggestion | userscript only fetches local files and does not write or run git | todo |
| AC3 | Missing linked files do not break the whole dashboard | ai suggestion | viewer displays per-file load errors instead of failing all tabs | todo |

## Ideas Inbox

### Desired Ideas

```text
Use one universal workspace semantics for both time scopes and goal maps.
```

### Other Ideas

```text
Maybe add direct browser-side editing later, but not now.
```

## Idea Evaluation

```text
not provided
```

## Done / Evidence

```text
Dashboard PUT package was applied locally. Follow-up fix package adds missing goal/backlog files and safer viewer error handling.
```

## Still Needed

```text
Apply fix archive, review diff, run local server, test Tampermonkey viewer, then decide whether to commit.
```

## Links

```text
Parent Time Scope: planning/dashboard/years/2026.md
Related Time Scopes:
  - planning/dashboard/periods/2026-05-06-diploma-return-to-rails.md
  - planning/dashboard/weeks/2026-W25.md
  - planning/dashboard/days/2026-06-17.md
Deferred Work: planning/dashboard/backlog/deferred-work.md
Deferred Ideas: planning/dashboard/backlog/deferred-ideas.md
```
