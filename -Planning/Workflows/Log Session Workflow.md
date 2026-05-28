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

## Steps

1. Extract duration.
2. Extract goal.
3. Extract done.
4. Check course alignment.
5. Assign D/F/K/P.
6. Add flags.
7. Add progress signal.
8. Add entry to `Session Log.md`.
9. Update counters in `Today State.md`.
10. Refresh Active Truth Promise if the session changed goals, progress, chemistry, or next action.
11. Render Default Dashboard Core using `Templates/Default Dashboard Template.md`.
12. Render Mnemonic Emoji Table attached to `Templates/Default Dashboard Template.md`.
13. Render updated Planning State Output using `Templates/Planning State Output Template.md`, including Active Truth Promises.

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

Progress signal tracks whether the desired situation moved closer.

## Required response after logging

After every session/event log, AI must return:

1. Logged score:
   - D/F/K/P;
   - points;
   - flags.

2. Default Dashboard Core:
   - `🎯Рез -> 🧵📜>🧪Обещ -> 📊Скор -> 🧲ЗИ`.

3. Mnemonic Emoji Table:
   - emoji-only table attached to the dashboard.

4. Updated Planning State Output:
   - Result Tracking;
   - Active Truth Promises;
   - Global if relevant;
   - Progress counters;
   - Recent sessions;
   - Current / Next.

5. Result progress:
   - closer / slightly closer / not closer / misleading progress;
   - one short reason.

6. Next physical action:
   - one concrete next physical action.

Do not respond with only “logged” or “open file X”.

The user should immediately see the score, dashboard, state, active promise, and what to do next.

## Output

- session/event entry;
- updated counters;
- Default Dashboard Core;
- Mnemonic Emoji Table;
- Planning State Output with Active Truth Promises;
- result progress;
- next physical action.
