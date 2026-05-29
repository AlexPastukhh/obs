# Log Session Workflow

Status: active workflow.

Purpose: log work sessions into date-based day files and update Work Score Summary.

## Uses

- `Workflows/Use Day File Workflow.md`
- `Days/YYYY/YYYY-MM-DD.md`
- `Current Plan State.md`
- `Work Rails Principles.md`
- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`

## Date rule

AI must not infer current day automatically.

Use the date provided by the user or the active conversation day date established by the user.

If no date is available, ask for the date.

## Steps

1. Identify date and day file.
2. Extract duration, goal, and done.
3. Check course alignment.
4. Assign or preserve D/F/K/P.
5. Add flags only when needed.
6. Add Progress Signal.
7. Append/update row in `Finished Sessions` inside the day file.
8. Update `Work Score Summary` inside the day file:
   - Work Points;
   - Old baseline: points / 35;
   - Full closure: points / 70;
   - Main course movement;
   - Progress.
9. Refresh Active Promises if the session changed goals, progress, chemistry, or short-distance action.
10. Do not calculate Support Score.
11. Render Mnemonic Emoji Table.
12. Render compact Planning State Output with Point 6 included.

## Explicit score handling

If the user provides D/F/K/P directly:

1. preserve the user's score;
2. check for obvious contradictions;
3. ask for clarification only if K or CV is unclear;
4. avoid over-arguing about the exact score.

## Work baselines

35 Work Points = close old 4y2m baseline.

70 Work Points = close old baseline + current day.

Only Work Score closes these baselines.

Support Score never closes 35 / 70.

## Support facts

If the user reports food, sleep, movement, recovery, stimulus drift, or between-session facts, do not log them as work sessions.

Add them to `Between-session / Support Facts` in the same day file using `Templates/Support Facts Table Template.md`.

Do not calculate Support Score during the day.

## Required response after logging

Return:

- logged D/F/K/P;
- points;
- Progress Signal;
- Work Score Summary;
- Mnemonic Emoji Table;
- updated compact Planning State Output.

Do not respond with only “logged”.
