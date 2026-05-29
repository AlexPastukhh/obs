# Update Current Plan Workflow

Status: active workflow.

Purpose: update the flexible current plan/focus/tasks, then return the default day template pack so the user sees how the update affects current planning.

## Uses

- `Current Plan State.md`
- `Today State.md`
- `Session Log.md`
- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`
- `Workflows/Use Dashboard Workflow.md`

## Steps

1. Read the user’s new plan/task/context.
2. Decide whether it changes:
   - current focus;
   - current plans/tasks;
   - rough schedule;
   - important-but-not-now;
   - notes.
3. Update only the relevant section of `Current Plan State.md`.
4. Keep the file flexible.
5. Do not over-structure.
6. Do not convert global goals / active directions into 🎯 Цель дня unless the user explicitly gives a day goal.
7. Do not create Active Promises from global-plan updates unless the user also provides the current feeling/pull and analytical prediction required by `Workflows/Build Truth Promise Workflow.md`.
8. After updating `Current Plan State.md`, return the normal update summary and then use `Workflows/Use Dashboard Workflow.md` to render the Default Day Template Pack:
   - Default Dashboard Core;
   - Mnemonic Emoji Table;
   - compact Planning State Output.

## Required response after updating current plan

After updating `Current Plan State.md`, AI must return:

1. Work/update summary:
   - what changed;
   - commit/hash if available;
   - what was intentionally not changed if relevant.

2. Default Dashboard Core:
   - rendered from `Templates/Default Dashboard Template.md`.

3. Mnemonic Emoji Table:
   - rendered from `Templates/Default Dashboard Template.md`.

4. Compact Planning State Output:
   - rendered from `Templates/Planning State Output Template.md`;
   - current missing fields should remain missing;
   - no Active Promise should be created unless enough promise material exists.

Do not respond with only:

- “Updated Current Plan State.md”;
- commit hash;
- a list of updated global goals;
- compact Planning State Output alone.

## Output

- updated `Current Plan State.md`;
- update summary;
- Default Dashboard Core;
- Mnemonic Emoji Table;
- compact Planning State Output.
