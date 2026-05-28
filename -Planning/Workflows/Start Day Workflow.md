# Start Day Workflow

Status: active workflow.

## Uses

- `Current Plan State.md`
- `Today State.md`
- `Session Log.md`
- `Work Rails Principles.md`
- `Templates/Today State Template.md`
- `Templates/Planning State Output Template.md`
- `Templates/Default Dashboard Template.md`
- `Workflows/Use Dashboard Workflow.md`

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
10. Render Planning State Output using `Templates/Planning State Output Template.md`.
11. Render Default Dashboard Core using `Templates/Default Dashboard Template.md` when action/memory guidance is useful.

## Required response after starting/updating day

After starting or updating the day, AI must return:

1. Planning State Output:
   - Result Tracking;
   - Global;
   - Progress;
   - Recent sessions if relevant;
   - Current / Next.

2. Default Dashboard Core:
   - compact Rails table `🎯Рез -> 🧵📜>🧪Обещ -> 📊Скор -> 🧲ЗИ` when useful.

3. One concrete next physical action.

Do not respond with only “Updated Today State.md”.

The user should immediately see the current state and what to do next.

## Output

- updated `Today State.md`;
- Planning State Output;
- optional Default Dashboard Core;
- next physical action.
