# Start Day Workflow

Status: active workflow.

## Uses

- `Current Plan State.md`
- `Today State.md`
- `Session Log.md`
- `Work Rails Principles.md`
- `Templates/Today State Template.md`
- `Templates/Default Dashboard Template.md`

## Steps

1. Read current plan.
2. Choose today’s main goal.
3. Set minimum / good / strong.
4. Set desired result.
5. Set undesired result.
6. Set session target.
7. Set current session goal.
8. Set next action.
9. Update `Today State.md`.
10. Render the Default Dashboard using `Templates/Default Dashboard Template.md`.

## Required response after starting/updating day

After starting or updating the day, AI must return the Default Dashboard using `Templates/Default Dashboard Template.md`:

- short Rails mnemonic/table;
- current focus / main course;
- day goal;
- desired result;
- undesired result;
- session target;
- counters;
- recent sessions if relevant;
- current session goal;
- one concrete next physical action.

AI must fill the 🎯Р column with real current values:

- day goal;
- session goal if known;
- desired/undesired result;
- progress signal if known;
- nearest global goals.

Do not leave placeholders if values can be inferred.

Do not respond with only “Updated Today State.md”.

The user should immediately see the current state and what to do next.

## Output

- updated `Today State.md`;
- Default Dashboard rendered from `Templates/Default Dashboard Template.md`;
- next physical action.
