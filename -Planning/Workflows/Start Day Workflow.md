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
- `Examples/Midday Planning State Output Example.md`

## Steps

1. Read current plan.
2. Set compact Result Tracking:
   - 🎯 Цель дня;
   - 🌅 Desired;
   - 🌑 Undesired.
3. Set or refresh Active Promises if enough context exists.
   - If not enough context exists, create an empty/unclear Active Promises row or mark it as needs target.
   - Put the concrete next/short-distance move in `🏁 Отрезок`, not in Result Tracking.
4. Initialize Finished Sessions as empty.
5. Update `Today State.md` using `Templates/Today State Template.md`.
6. Render Default Dashboard Core using `Templates/Default Dashboard Template.md`.
7. Render Mnemonic Emoji Table attached to `Templates/Default Dashboard Template.md`.
8. Render compact Planning State Output using `Templates/Planning State Output Template.md`.

## Required response after starting/updating day

After starting or updating the day, AI must return:

1. Default Dashboard Core:
   - compact Rails table `🎯Рез -> 🧵📜>🧪Обещ -> 📊Скор -> 🧲ЗИ`.

2. Mnemonic Emoji Table:
   - emoji-only table attached to the dashboard.

3. Compact Planning State Output:
   - 🎯 Result Tracking;
   - 🧵📜>🧪 Active Promises;
   - 🧾 Finished Sessions.

Do not respond with only “Updated Today State.md”.

The user should immediately see the dashboard, current result tracking, active promises, and finished sessions.

## Output

- updated `Today State.md`;
- Default Dashboard Core;
- Mnemonic Emoji Table;
- compact Planning State Output.
