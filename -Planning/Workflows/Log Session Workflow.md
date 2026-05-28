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
10. Render updated Planning State Output using `Templates/Planning State Output Template.md`.
11. Render Default Dashboard Core using `Templates/Default Dashboard Template.md` when useful.

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

2. Updated Planning State Output:
   - Result Tracking;
   - Global if relevant;
   - Progress counters;
   - Recent sessions;
   - Current / Next.

3. Default Dashboard Core when useful:
   - `🎯Рез -> 🧵📜Обещ -> 📊Скор -> 🧲ЗИ`.

4. Result progress:
   - closer / slightly closer / not closer / misleading progress;
   - one short reason.

5. Next physical action:
   - one concrete next physical action.

Do not respond with only “logged” or “open file X”.

The user should immediately see the current state and what to do next.

## Output

- session/event entry;
- updated counters;
- Planning State Output;
- optional Default Dashboard Core;
- result progress;
- next physical action.
