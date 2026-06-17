# Local Planning Dashboard Workflow

Status: active OBS area workflow
Doc version: v0.2.0
Scope: safe workflow for using local planning dashboard files and Tampermonkey viewer.

## 1. Core Rule

```text
Repo markdown files are source of truth.
Tampermonkey only reads and displays them.
AI output is not source of truth until written into repo files.
```

## 2. Safety Boundary

Tampermonkey MVP is read-only.

```text
Allowed:
  - fetch local markdown from localhost;
  - render dashboard sections;
  - copy prompts/file paths;
  - refresh view.

Not allowed:
  - write local files;
  - run git commands;
  - push/commit;
  - send planning files to external services.
```

## 3. Local Server

Run local server from repository root:

```powershell
cd C:\Users\alexa\obs
python -m http.server 8765
```

The viewer reads:

```text
http://127.0.0.1:8765/planning/dashboard/index.md
```

## 4. Editing Rule

Edit files manually in repo / Obsidian / VS Code.

After edit:

```text
refresh Tampermonkey viewer
review diff
commit manually only after review
```

## 5. Time Scope And Goal Map Rule

Use the same planning workspace core for both time scopes and goal maps.

```text
time-scope:
  use for year / period / week / day files.

goal-map:
  use for goal files under planning/dashboard/goals/.
```

## 6. Ambiguous Work Rule

Work should not disappear as vague effort.

If work was done, record at least one of:

```text
Done / Evidence
Still Needed
Open / Unclear
Sessions table in a day file
```

Do not silently treat unclear work as progress.

## 7. Conscious Experiment Rule

Experimental work is allowed.

But it must be visible as uncertain, experimental, delayed, or unclear in the relevant day/goal/time file.

## 8. Suggested First Use

```text
1. Open dashboard.
2. Read Year.
3. Read active Period.
4. Read active Week.
5. Read active Day.
6. Read active Goal Maps.
7. Update only the smallest relevant file.
```
