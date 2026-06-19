# OBS Tampermonkey Tools

Status: active reusable/project planning tool index
Doc version: v0.3.7
Scope: tracked Tampermonkey scripts used by the OBS planning system, including reusable command projection and project planning runtime tools.

## 1. Tracked scripts

```text
planning/documentation/tools/tampermonkey/chat-command-palette.user.js
  reusable command projection only; command meaning stays in owner documentation.

planning/documentation/tools/tampermonkey/local-planning-dashboard-viewer.user.js
  read-only local-first dashboard projection; reads repo Markdown through localhost,
  keeps a source-bound IndexedDB snapshot, displays pending local sessions and exports reviewed JSON.

planning/documentation/tools/tampermonkey/planning-pattern-capture.user.js
  local D/F pattern capture and one-click finished-session capture into the shared pending outbox.
```

Do not create competing tracked copies of the same script.

## 2. Authority boundary

```text
Repo Markdown files are durable source of truth.
Tampermonkey scripts are browser-side capture/projection tools.
They do not write repo files, run git, commit or push.
A pending-session JSON export becomes repo state only after a reviewed replacement archive is applied.
Tampermonkey command projection does not define command meaning.
```

Command semantics must come from:

```text
planning/planning-use-case-map.md
planning/documentation/command-creation-workflow.md
planning/documentation/tampermonkey-command-projection-workflow.md
other linked command owner workflows/examples
```

## 3. Storage boundary

```text
Pattern Capture private GM storage:
  planningPatternCapture:v2:settings
  planningPatternCapture:v2:active
  planningPatternCapture:v2:events

Shared page localStorage:
  obsPlanning:sessionContext:v1
  obsPlanning:sessionOutbox:v1

Dashboard IndexedDB:
  database: obsPlanningCache
  store: snapshots
  record: dashboard:v1
```

Rules:

```text
- Raw Capture events and UI state remain in GM storage.
- Only completed pending sessions are written to the shared outbox.
- Dashboard snapshot and pending outbox remain separate.
- Cached snapshots are accepted only for the current normalized Base URL and Index path.
- Exporting does not clear pending records.
- Pending records clear only after reviewed repository application plus reconciliation, or explicit user action.
- Conflict records block additional Finish actions until resolved.
- chatgpt.com and chat.openai.com are different storage origins; use chatgpt.com as the canonical V1 origin.
```

## 4. Local server

Run from repository root:

```powershell
python -m http.server 8765
```

The dashboard reads:

```text
http://127.0.0.1:8765/planning/dashboard/index.md
```

A successful live load remains usable even if snapshot writing fails. When the index request fails, the viewer uses only a compatible snapshot and labels it `Offline cache`.

## 5. V1 finished-session flow

```text
1. Open/refresh the Dashboard Viewer to publish the active operational-day context.
2. Work in Planning Pattern Capture.
3. Use Auto session numbering or enter a manual session label such as S4.
4. Press Finish.
5. Capture stores one pending session, preserves its session label and advances to the next session ID.
6. Dashboard displays repository sessions plus pending/conflict local sessions.
7. Pending totals include only status=pending records; conflicts are shown separately and block export/Finish.
8. At the end of the day, press Copy pending or Download pending.
9. Paste/upload the JSON for one reviewed replacement archive.
10. Apply the archive and refresh localhost.
11. Reconciliation requires the exact row count and complete ordered appended sequence.
```

`Copy End` remains as a manual fallback and does not write the shared outbox.

## 6. Installation/update

```text
1. Open the tracked .user.js file.
2. Copy the complete source into its matching Tampermonkey script.
3. Save in Tampermonkey.
4. Reload ChatGPT.
5. Use https://chatgpt.com for the shared V1 localStorage origin.
```


## 7. Keyboard controls

```text
Alt+F2  open/close Command Palette.
Alt+F3  open/close Planning Dashboard.
Escape  close an open Command Palette or Planning Dashboard without clearing state.
Ctrl+Alt+P  emergency show/reset for Pattern Capture.
```

Command Palette owns Alt+F2; Pattern Capture does not consume that shortcut.
Pattern Capture does not consume Escape or Alt+F2. Its close button hides the panel; Ctrl+Alt+P is the explicit emergency show/reset path.
Its Session field supports `S1`, `S2`, `S3` and later positive integer labels. Valid input is stored immediately without rebuilding the panel, so the first click on `Finish`, `Auto`, or a D/F action is not lost. `Enter` validates and refreshes the score view. `Auto` restores the next label derived from the repository row boundary plus pending records.

## 8. Command Palette reusable contract

The reusable Command Palette provides:

- an explicit projection-only boundary: the root UCM and linked owner files remain command authority;
- separate sibling controls for command insertion and copying, avoiding nested interactive elements;

```text
- draggable helper panel;
- command search/list;
- one-click insertion into the ChatGPT prompt editor;
- button labels rendered as <englishName> · <label>;
- complete command bodies with command, english_name, command_family,
  source_of_truth, route_read_rule, key_reminders and user_target;
- no repo writes, network calls, commits or pushes.
```

## 9. Command Palette adaptation rule

Before enabling or adapting the reusable helper for another project, verify:

```text
1. The project root UCM exists.
2. Each projected command exists in the project root UCM or is created in the same approved batch.
3. Commands that do not apply to the target project are removed.
4. source_of_truth points to the target project's real route/owner docs.
5. @name and @namespace change only for an intentional fork or rebrand.
6. The helper remains projection-only.
7. No second tracked project-local command-helper copy is created by default.
```

## 10. Safety checks

```text
- Dashboard remains read-only toward the repo.
- Pattern Capture requires a published operational path and SHA-256 before Finish.
- Manual session labels are separate from the expected sequential Markdown row number.
- A changed source hash blocks extending an existing pending batch.
- A conflict batch blocks additional Finish actions and batch export.
- Event IDs identify browser records only; Finished Sessions Markdown does not store them.
- Duplicate protection uses source SHA-256, source row boundary, exact resulting row count and ordered appended sequence.
- Reconciliation resolves contract columns by exact header names; fuzzy display matching cannot confuse `Session` with `Session #` or `#` with another column.
- Do not treat Command Palette as command authority.
- Do not add project-only command semantics without a UCM route.
- Do not use any helper to write to the repo or perform external network calls.
```
