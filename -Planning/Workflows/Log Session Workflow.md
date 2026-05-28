# Log Session Workflow

Status: active workflow.

## Uses

- `Today State.md`
- `Current Plan State.md`
- `Work Rails Principles.md`
- `Templates/Session Log Entry Template.md`

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

2. Today progress:
   - sessions done / target;
   - high-focus sessions done / target;
   - points;
   - main flags if relevant.

3. Result progress:
   - closer / slightly closer / not closer / misleading progress;
   - one short reason.

4. Next action:
   - one concrete next physical action.

## Output

- session/event entry;
- updated counters;
- progress snapshot;
- next action.
