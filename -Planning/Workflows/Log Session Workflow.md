# Log Session Workflow

Status: active workflow.

## Uses

- `Today State.md`
- `Current Plan State.md`
- `Session Log.md`
- `Work Rails Principles.md`
- `Templates/Session Log Entry Template.md`
- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`
- `Workflows/Use Dashboard Workflow.md`
- `Examples/Midday Planning State Output Example.md`

## Steps

1. Extract duration.
2. Extract goal.
3. Extract done.
4. Check course alignment.
5. Assign D/F/K/P.
6. Add flags to `Session Log.md` only when needed.
7. Add Progress Signal to the session.
8. Add entry to `Session Log.md`.
9. Add/update row in `Finished Sessions` in `Today State.md`.
10. Refresh Active Promises if the session changed goals, progress, chemistry, or the short-distance action.
11. Render Mnemonic Emoji Table using `Templates/Default Dashboard Template.md`.
12. Render compact Planning State Output:
    - 🎯 Result Tracking;
    - 🧵📜>🧪 Active Promises;
    - 🧾 Finished Sessions.
13. Render full Dashboard Core only if the user explicitly asks for the full dashboard.

## Explicit score handling

If the user provides D/F/K/P directly:

1. preserve the user's score;
2. check for obvious contradictions;
3. ask for clarification only if K or CV is unclear;
4. avoid over-arguing about the exact score.

## Progress signal

After each session, briefly classify whether the session moved the Desired result closer.

Allowed values:

- closer
- slightly closer
- not closer
- misleading progress

This is not a new score criterion.

D/F/K/P tracks what happened.

Progress Signal tracks whether the desired situation moved closer.

Progress in default Planning State Output is represented through the Finished Sessions table.

## Required response after logging

After every session/event log, AI must return:

1. Logged score:
   - D/F/K/P;
   - points.

2. Result progress:
   - closer / slightly closer / not closer / misleading progress;
   - one short reason.

3. Mnemonic Emoji Table:
   - from `Templates/Default Dashboard Template.md`.

4. Updated compact Planning State Output:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.

Do not render full Dashboard Core by default.

Render full Dashboard Core only on explicit dashboard request.

Do not respond with only “logged” or “open file X”.

The user should immediately see the score, result progress, mnemonic, compact state, active promise if any, and finished sessions.

## Output

- session/event entry;
- updated Finished Sessions;
- logged score;
- result progress;
- Mnemonic Emoji Table;
- compact Planning State Output.
