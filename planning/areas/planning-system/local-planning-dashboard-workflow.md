# Local Planning Dashboard Workflow

Status: active OBS area workflow
Doc version: v0.3.2
Scope: safe workflow for local planning dashboard files, formatted viewer rendering and optional operational session-day composition.

## 1. Core Rule

```text
Repo markdown files are source of truth.
Tampermonkey only reads and displays them.
AI output is not source of truth until written into repo files.
```

## 2. Safety Boundary

Tampermonkey viewer is read-only.

```text
Allowed:
  - fetch local markdown from localhost;
  - render formatted dashboard sections;
  - combine linked planning-day and session-day files in memory;
  - copy prompts/file paths;
  - open local source URLs;
  - refresh view;
  - store viewer preferences in Tampermonkey storage.

Not allowed:
  - write local repo files;
  - run git commands;
  - commit or push;
  - send planning files to external services;
  - treat rendered HTML as source of truth.
```

## 3. Source Ownership For Day Work

```text
planning/dashboard/days/YYYY-MM-DD.md
  planning owner for the day time scope.

-Planning/Days/YYYY/YYYY-MM-DD.md
  operational owner for sessions, D/F, points, penalties,
  support, carryover/debt and day close.
```

The viewer may show both sources in one Day tab, but must retain their paths and ownership boundaries.

Do not duplicate session rows into the planning-day file merely for visualization.

## 4. Scope-Specific Display

### Day

Show the full planning workspace.

When `active_session_day` exists, also show:

```text
- Work Points / Net Work Score;
- incoming and remaining debt when provided;
- current-day score when provided;
- Finished Sessions;
- final D and final F;
- final Score / Points;
- Goal(s) exactly as recorded when present;
- optional Time, Session, Progress Signal and Result only when present;
- Penalty Events;
- support marks/average/penalty;
- Carryover;
- Final Day Summary.
```

Session rows should be compact by default and expandable only for source fields that actually exist. A minimal D/F/Score-only row must not render an empty disclosure control.

For Finished Sessions:

```text
- D, F and final Score / Points are the required score record;
- Goal(s) is optional and may contain several explicitly named goals;
- Time, Session, Goal(s), Progress Signal and Result remain blank when omitted;
- do not substitute `not provided`, `—`, inferred goals or Session text into blank cells;
- do not reconstruct or display Base, Adj, score deltas in parentheses or other calculation internals in formatted mode;
- for legacy D/F text, hide numeric parenthetical deltas in Formatted mode without rewriting Raw source;
- render Goal(s) once as goal content, not again as a generic detail field.
```

### Week

Show week planning and available day summaries. Session-level detail stays in day files unless explicitly linked or summarized.

### Period

Show the period plan and available week/day progress summaries. Do not copy the entire day ledger into the period file.

### Year

Show year direction, periods, goals, evidence and remaining work. Operational session detail remains below year level.

### Goal Map

Show result-oriented planning only:

```text
Current Target Scenario
Plan Core
Acceptance Criteria
Done / Evidence
Still Needed
Links
```

Do not show D/F, support, penalties or debt as Goal Map-owned fields.
A Goal Map may link to time-scope evidence where sessions occurred.

## 5. Formatted And Raw Modes

Formatted mode is the default.

It should render:

```text
- metadata as badges;
- text sections as readable cards;
- Markdown tables as HTML tables;
- Plan Core subsections as scenario cards;
- session rows as compact records with Score, D/F and optional Goal(s);
- empty optional session metadata omitted rather than replaced with placeholders;
- goal-map and time-scope content without raw Markdown fences.
```

Raw mode remains available for source inspection and debugging.

If a file does not match known sections, formatted mode may render generic Markdown blocks before falling back to Raw.

## 6. Missing File And Parsing Rule

The index is required. Linked files are optional per file.

```text
- failure to load the index blocks the dashboard;
- failure to load one linked file does not block other tabs;
- missing active_session_day does not break the Day view;
- malformed or unknown content must not be invented;
- show the source path and a local error message.
```

## 7. Local Server

Run local server from repository root:

```powershell
cd C:\Users\alexa\obs
python -m http.server 8765
```

The viewer reads:

```text
http://127.0.0.1:8765/planning/dashboard/index.md
```

## 8. Editing Rule

Edit source files manually in repo / Obsidian / VS Code, or apply an explicitly requested reviewed replacement package.

After edit:

```text
refresh Tampermonkey viewer
review diff
commit manually only after review
```

The viewer's `Copy AI prompt` action may prepare source content for an AI-assisted update, but the copied prompt does not write files.

## 9. Ambiguous Work Rule

Work should not disappear as vague effort.

If work was done, record at least one of:

```text
Done / Evidence
Still Needed
Open / Unclear
Finished Sessions result/evidence
```

Do not silently treat unclear work as progress.

## 10. Conscious Experiment Rule

Experimental work is allowed.

It must be visible as uncertain, experimental, delayed or unclear in the relevant day/goal/time file.

## 11. Suggested First Use

```text
1. Open dashboard.
2. Read Year.
3. Read active Period.
4. Read active Week.
5. Read active Day planning.
6. If linked, read active Session Day.
7. Read active Goal Maps.
8. Update only the smallest relevant source file.
```
