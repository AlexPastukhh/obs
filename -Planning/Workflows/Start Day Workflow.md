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
9. Set or refresh Active Truth Promise if enough context exists.
   - If not enough context exists, mark Active Truth Promise as unclear / needs target.
10. Update `Today State.md`.
11. Render Default Dashboard Core using `Templates/Default Dashboard Template.md`.
12. Render Mnemonic Emoji Table attached to `Templates/Default Dashboard Template.md`.
13. Render Planning State Output using `Templates/Planning State Output Template.md`, including Active Truth Promises.

## Required response after starting/updating day

After starting or updating the day, AI must return:

1. Default Dashboard Core:
   - compact Rails table `🎯Рез -> 🧵📜>🧪Обещ -> 📊Скор -> 🧲ЗИ`.

2. Mnemonic Emoji Table:
   - emoji-only table attached to the dashboard.

3. Planning State Output:
   - Result Tracking;
   - Active Truth Promises;
   - Global;
   - Progress;
   - Recent sessions if relevant;
   - Current / Next.

4. One concrete next physical action.

Do not respond with only “Updated Today State.md”.

The user should immediately see the dashboard, current state, active promise, and what to do next.

## Output

- updated `Today State.md`;
- Default Dashboard Core;
- Mnemonic Emoji Table;
- Planning State Output with Active Truth Promises;
- next physical action.
