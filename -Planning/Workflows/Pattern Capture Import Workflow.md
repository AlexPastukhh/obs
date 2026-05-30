# Pattern Capture Import Workflow

Status: active workflow.

Purpose: import Tampermonkey Pattern Capture exports into date-based day files.

## Uses

- `Tools/Pattern Capture/README.md`
- `Tools/Pattern Capture/Export Format.md`
- `Templates/Pattern Capture Export Template.md`
- `Workflows/Use Day File Workflow.md`
- `Days/YYYY/YYYY-MM-DD.md`
- `Templates/Support Facts Table Template.md`
- `Workflows/Real Reward Pattern Playbook.md`
- `Support Score Guide.md`

## Core rule

Pattern Capture exports are raw event data.

They do not calculate Work Score.

They do not calculate Support Score.

They should be imported into the relevant date-based day file.

## Steps

1. Identify date from the export header or user message.
2. Resolve day file using `Workflows/Use Day File Workflow.md`.
3. Parse `Work Pattern Events`.
4. Parse `Support Facts`.
5. Import support facts into `Between-session / Support Facts`.
6. Import work-pattern events into the day file as one of:
   - Notes;
   - session review hints;
   - pattern review section;
   - relevant session note if session id is clear.
7. Do not change D/F/K/P unless the user explicitly asks to revise session scoring.
8. Do not calculate Support Score during day import.
9. Preserve raw event meaning and time.
10. Summarize what was imported.

## Work-pattern event handling

Work-pattern events are usually context for later review.

Examples:

- Complexity → easy stimulation;
- Rails but Result forgotten;
- Result over process;
- Self-race;
- Target stimuli;
- Value left.

They may influence later interpretation of F/K/P, but they are not scores by themselves.

## Support fact handling

Support facts should map into the day file support table:

| # | Time / After | Type | Fact | Effect on next work |
|---|---|---|---|---|

Do not add a separate `Tags` column.

Emoji belongs in `Type`.

## Output

Return:

- date;
- day file path;
- imported work-pattern event count;
- imported support fact count;
- any ambiguous rows needing clarification;
- reminder that Support Score is calculated at close/next morning.

## Do not

Do not overwrite existing day facts without confirmation.

Do not clear Tampermonkey storage.

Do not invent facts missing from the export.

Do not treat captured events as completed work sessions.
