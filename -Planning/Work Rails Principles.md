# Work Rails Principles

Status: active principles.

## Background

This system exists because the user can lose work direction through:

- idle inertia;
- thought loops;
- stimulation loops;
- YouTube / music / food stacking;
- productive procrastination;
- important-but-not-now work;
- sticky focus on the wrong branch;
- doing the right task but wasting time through self-talk, drag, or process drift.

The goal is not just task management.

The goal is to stay on rails:

current plan -> today -> session -> log -> adjust.

## Core unit

The core unit is a work session.

A normal session is usually 30 minutes.

Duration is logged separately.

The score should not merely say that time passed. It should estimate the value of what happened during the session.

## Session score

Session Score = D + F + K + P

Where:

- D = Done / Useful Work
- F = Focus / Self-management
- K = Kurs / relation to current course
- P = Польза / useful value left

Do not use old V/Q/C/L notation.

## D — Done / Useful Work

D answers:

How much useful work actually got done?

Useful work is not just being busy.

Useful work may include:

- writing a section;
- making code progress;
- solving a task;
- finding the cause of a bug;
- clarifying a blocker;
- making a useful draft;
- narrowing uncertainty;
- making a concrete next action clearer;
- doing practice that produces real learning or project movement.

D is not the same as completing the whole goal.

If a task was harder than expected but the session revealed the real blocker, that can still be useful work.

Scale:

D1.5 = strong useful work done.

D1 = normal useful work done.

D.5 = small but real useful progress.

D0 = almost no useful progress.

## F — Focus / Self-management

F answers:

How well did I manage myself so useful work could happen?

Focus is not just a pleasant feeling of concentration.

Useful focus includes:

- staying with the target;
- keeping tempo;
- not drifting into self-talk;
- not turning the process into a stimulation loop;
- not doing the right task in a useless way;
- noticing drag and correcting course;
- avoiding unnecessary stress or chaos.

Scale:

F1 = good self-management: focused, goal-driven, useful tempo.

F.5 = acceptable self-management: some drag, but workable.

F0 = poor self-management: sticky, distracted, low-drive, self-talk heavy, or wasted tempo.

## D and F are related but separate

D and F are connected because good focus usually increases useful work done.

But they must be scored separately.

Reasons:

- I can work on the right thing and still waste time because of self-talk, drag, or process drift.
- I can get some useful work done through chaotic self-management.
- I can focus well but hit a real blocker.
- I can do a lot, but not on the current course.
- I can be on the main course but still have low useful output.

D = useful progress as an outcome.

F = self-management quality as a process.

## K — Kurs / relation to current course

K answers:

Was this work aligned with the current plan?

K is a meaning category, not a numeric ladder.

Scale:

Kmain = current main course.

Ksupport = supports current plan.

Klater = important but not now.

Kside = generally useful, but not connected now.

Koff = off-course / harmful / stimulation.

Point mapping:

Kmain = 1.5

Ksupport = 1

Klater = 0.5

Kside = 0

Koff = 0

## P — Польза / useful value left

P answers:

What useful value remains after the session?

Value left may include:

- understanding;
- practical experience;
- useful artifact;
- lookup material;
- repeat material;
- project progress;
- clearer next action;
- removed blocker;
- reusable structure.

Documentation is optional.

Documentation increases value only when it is useful and appropriate.

Scale:

P1.5 = strong value left.

P1 = clear value left.

P.5 = small value left.

P0 = almost nothing left.

## Point mapping

D:

- D1.5 = 1.5
- D1 = 1
- D.5 = 0.5
- D0 = 0

F:

- F1 = 1
- F.5 = 0.5
- F0 = 0

K:

- Kmain = 1.5
- Ksupport = 1
- Klater = 0.5
- Kside = 0
- Koff = 0

P:

- P1.5 = 1.5
- P1 = 1
- P.5 = 0.5
- P0 = 0

## Explicit criterion scoring

If the user gives D/F/K/P explicitly, AI should:

1. preserve the user's score;
2. check for obvious contradictions;
3. avoid arguing without reason;
4. ask for justification only when K or CV is unclear or contradictory;
5. log the final score clearly.

Example:

`/s 30м диплом D1 F1 Kmain P1 сделал черновик`

AI should not re-litigate every score.

But if the user writes:

`/s 30м YouTube D1 F1 Kmain P1`

AI should flag the contradiction and ask how it relates to the current plan.

## Result Anchor and Progress Signal

Desired / Undesired Result are operational anchors, not scoring criteria.

D/F/K/P tracks what happened.

Progress Signal tracks whether the desired situation moved closer.

Desired result = realistic situation the user wants to reach now/today.

Undesired result = realistic situation the user refuses to accept as the outcome.

The point is not fantasy.

The point is to keep the result more real than process drift.

Progress Signal values:

- closer = the desired situation clearly moved closer;
- slightly closer = there was some real movement, but limited;
- not closer = the desired situation did not move closer;
- misleading progress = work happened, but it may not support the desired situation now.

Progress Signal is not a fifth score criterion.

It is a short operational check after a session.

## Planning State Output vs Default Dashboard

Planning State Output and Default Dashboard are different layers.

Planning State Output is AI-maintained compact state output. It owns only:

1. 🎯 Result Tracking;
2. 🧵📜>🧪 Active Promises;
3. 🧾 Finished Sessions.

Result Tracking contains only:

- 🎯 Цель дня;
- 🌅 Desired;
- 🌑 Undesired.

Desired = the current meaningful desired goal/result the user wants to get now.

Concrete short action belongs to Active Promises as `🏁 Отрезок`.

Progress is represented through Finished Sessions, not through a separate progress counters block.

Progress Signal is stored in Finished Sessions rows, not in Result Tracking.

Active promises are represented as rows in the Active Promises table.

Global/background context is not shown as a default block. Use it only when directly relevant.

Flags may exist in `Session Log.md`, but they are not shown in default Planning State Output.

Planning State Output should use `Templates/Planning State Output Template.md`.

Default Dashboard is the compact action/memory core. It owns:

- 🎯Рез;
- 🧵📜>🧪Обещ;
- 📊Скор;
- 🧲ЗИ.

Default Dashboard should use `Templates/Default Dashboard Template.md`.

Examples show rendered reference outputs. They do not replace templates, workflows, or principles.

The user does not need to memorize the Planning State Output template.

The user should be able to remember and use the compact dashboard core.

## Default Dashboard Mode

When AI is acting as the planning/session-control assistant, it should show useful state and action guidance by default.

The user should not have to ask for it.

AI should not tell the user to open state files when it can summarize the relevant state itself.

Default planning/session-control output should include:

1. Default Dashboard Core.
2. Mnemonic Emoji Table.
3. Compact Planning State Output when state/action guidance is needed.

Compact Planning State Output contains:

- 🎯 Result Tracking;
- 🧵📜>🧪 Active Promises;
- 🧾 Finished Sessions.

Use:

- `Templates/Default Dashboard Template.md` for Dashboard Core and Mnemonic Emoji Table;
- `Templates/Planning State Output Template.md` for compact maintained state output;
- `Workflows/Use Dashboard Workflow.md` for how to combine them;
- `Examples/Midday Planning State Output Example.md` as a rendered reference example only.

Dashboard Core and Mnemonic Emoji Table are shown together by default in planning mode.

The dashboard pack may be omitted only for narrow technical answers, diffs, file checks, or when the user explicitly asks for a short answer.

Use Compact Planning State Output when:

- starting or updating the day;
- logging a session or event;
- answering “what next?”;
- checking current state;
- showing or updating active promises.

Rule:

AI may tell the user to open or edit a file only when manual editing, manual review, or diff inspection is actually needed.

For normal planning guidance, AI should summarize the relevant state itself.

## Core Rails Algorithm

This algorithm describes how to act on rails.

D/F/K/P tracks what happened.

Core Rails Algorithm describes how to act so D/F/K/P and progress become better.

Groups are memory containers, not levels.

Groups do not replace low-level details.

All low-level checks still matter.

### Start Path

Use Start Path when starting a day, starting a session, or returning to work without an active drift event.

Start Path:

1. Result.
2. Clean Field.
3. Score Action.
4. Momentum / Inertia.

#### 1. Result

Purpose:

Keep real goals and desired results alive, not just the process.

Result is dynamic.

It should use real current values from `Current Plan State.md`, `Today State.md`, `Session Log.md`, and the user's current message.

Low-level checks:

1. Fill the current goals.

   Use the session goal, day goal, and nearest global goals when available.

2. Remember that process exists for the result.

   I am not just “doing something”.

   I am trying to move the desired situation closer.

3. Generate the desired state from current goals + good D/F/K/P.

   Desired is not a separate fantasy.

   Desired = current goals moved/completed with good D/F/K/P.

4. Generate the undesired state from missed goals + bad D/F/K/P / drift.

   Undesired = current goals not moved/completed, bad D/F/K/P, or drift/stimulation/process replacing useful work.

5. Check Progress Signal.

   Progress Signal belongs to Result because it checks whether the desired state moved closer.

6. Feel readiness to receive the desired state now.

   Not someday, not later, but as if I am actually ready to be in that situation now.

7. Feel non-readiness to accept the undesired state.

   Do not dramatize, but clearly refuse the outcome where I did not move forward again.

8. Keep nearest global goals in the background.

   The local target is connected to the larger trajectory:

   diploma, work, recovery, 4y 2m 15d, future state, and current nearest global goals.

#### 2. Clean Field

Purpose:

ЧП-СДВГ = clean the field from ADHD/stimulation drift.

Keep only goal, progress, and the next physical action in the active field.

Low-level checks:

1. Нет всего, только goal/progress/action.

   If it does not help the current goal or progress toward it, it is not the work field right now.

2. Fixed stimulation source.

   The allowed source of stimulation now is movement toward the goal and the feeling of progress.

3. No unrelated stimulation.

   YouTube, extra music, food, tabs, endless thoughts, random topics are not the source of acceleration.

4. Thought noise does not rule.

   Thoughts may jump, stimulate, and feel important, but I do not have to follow them.

5. Химикаты не ты.

   Pull toward bad things, lack of pull toward useful work, “I do not want to”, “later”, “I need to think more” are body/chemistry/noise events, not identity and not decisions.

6. Do not feed the wrong fire.

   Feeding stimulation, thoughts, self-talk, YouTube, or off-course branches makes them pull harder by inertia.

7. Wood is not infinite.

   Attention, energy, stimulation, and start impulse are limited.

   If they are spent on drift, they cannot be spent on the desired result.

   Then I get less than I realistically could have got.

8. Everything else is either later, goes to `Deferred and Ideas Notes.md`, or is not needed.

#### 3. Score Action

Purpose:

Act so the session becomes good by D/F/K/P.

Low-level checks:

1. Do what is needed for high D.

   Produce useful work, not just time spent.

2. Create useful progress.

   Write, make, solve, clarify, remove a blocker, create the next step.

3. Do what is needed for high F.

   Manage myself: keep attention, do not spread out, do not drift into self-talk, do not do the right task in a useless way.

4. Keep working tempo.

   Do not let the session become sticky, stretched, self-talk, endless preparation, or process without movement.

5. Remember: tempo is not rushing.

   Tempo does not mean panic, stress, or forcing.

   Tempo means that actions keep producing useful progress.

6. If tempo is lost, D usually drops.

   F keeps tempo.

   Tempo produces D.

   D moves progress.

7. Do what is needed for high K.

   Stay with the current course:

   Kmain or Ksupport, not Klater/Kside/Koff without a reason.

8. Do what is needed for high P.

   Leave value after the session:

   result, understanding, artifact, experience, removed blocker, lookup, repeat material, clear next action.

9. Do not confuse busyness with useful work.

   If time passed but D is low, it was not a good session.

10. Do not confuse the right task with good work.

    I can be on Kmain but still have D0/D.5 and F0.

11. Do not confuse interesting with needed.

    I can work well but drift into Klater/Kside: this is productive procrastination.

12. Do not drown in process.

    If the process does not move D/P and Progress Signal, it should be shortened or changed.

13. Act so the current session improves future actions.

    A good session feeds the inertia of useful work.

    A bad session feeds the inertia of drift, thoughts, or stimulation.

#### 4. Momentum / Inertia

Purpose:

Notice what the current action feeds in future behavior.

This group is about занос / инерция / habit, not about the next-action field.

The actual Next physical action remains a separate dashboard/workflow field.

Low-level checks:

1. Куда заносит магнит?

   Does this action start pulling me toward useful work or toward drift/stimulation/thought loops?

2. Что кормлю огнём?

   Which path gets stronger because I gave it attention, stimulation, or time?

3. Какая привычка крепнет?

   Am I training “do the needed thing” or training “soften, drift, self-talk, stimulate, or avoid”?

4. Do future actions become more likely to be correct?

   A good session feeds the inertia of useful work.

   A bad session feeds the inertia of drift, thoughts, or stimulation.

### Correction Path

Use Correction Path when I notice that I drifted, got sticky, followed the wrong branch, lost tempo, or need to correct myself.

Correction Path is not separate magic.

It mirrors Start Path.

Correction Path:

1. Notice.
2. Diagnose.
3. Stop.
4. Restart.
5. One Physical Action.

#### 1. Notice

Notice that I am not on rails.

#### 2. Diagnose

Diagnose what broke using the same groups as Start Path.

##### Result broke

- forgot current session/day goals;
- forgot the desired state;
- accepted the undesired state;
- drowned in process instead of result;
- did not check Progress Signal against desired;
- lost connection to nearest global goals.

##### Clean Field broke

- allowed stimulation unrelated to the goal;
- followed thought noise;
- treated chemicals/noise as identity or authority;
- started feeding an unnecessary impulse;
- spent limited wood on the wrong fire;
- left irrelevant things in the field.

##### Score Action broke

- did not try to get high D;
- did not try to get high F;
- lost working tempo;
- became sticky / overthinking / self-talking;
- process stopped producing useful progress;
- did not hold K;
- did not leave P;
- busyness replaced D;
- process replaced result;
- interesting replaced needed.

##### Momentum / Inertia broke

- did not notice where the magnet pulls next;
- kept feeding the wrong fire;
- strengthened a bad habit pattern;
- made future correct actions less likely;
- continued drift inertia.

#### 3. Stop

Stop feeding the broken path.

#### 4. Restart

Return to Start Path:

Result -> Clean Field -> Score Action -> Momentum / Inertia.

#### 5. One Physical Action

Choose one concrete physical action and do it.

## Dashboard Core / Mnemonic

Mnemonic is a memory handle.

It does not replace the full low-level Core Rails Algorithm.

Use the user's sticky phrases.

Do not over-normalize them.

Default Dashboard Core:

🎯Рез -> 🧵📜>🧪Обещ -> 📊Скор -> 🧲ЗИ

| 🎯Рез Algorithm | 🧵📜>🧪 Обещ > химия | 📊Скор | 🧲ЗИ |
|---|---|---|---|
| 🤑🎯🏁✅ готов получить сейчас | **Chem vs Promise** | **Core D/F/K/P:** ✅D🛠️📦 полезное реально сделано; ⚡F🎛️🧠 фокус / самоуправление; 🛤️K🎯 курс; 💎P📦📌 остаточная польза | 🧲➡️🎯/🌪️ куда заносит магнит |
| 🚫🕳️📉 не принимаю слив | 🧪🌪️🧠❌ химикаты не ты | **Tempo:** ⏱️T🚫🕸️🏃 не вязнуть, не превращать работу в липкий процесс | 🧱📈👤➡️👤✅ привычка крепнет / будущие действия улучшаются |
| 🎯📈≠🎭🔁 ради Result Tracking, не ради процесса | 📐📜👑 > 🧪🌪️ обещание > текущая химия | **Guard:** ⚠️🔁≠✅D занятость≠полезно сделано; 🎭≠🎯 процесс≠результат; 🎪≠🛤️ интересно≠нужно |  |
|  | 💊➡️⚙️➡️✨ эффект может появиться после действия | **Boost:** 🏁🥊👤↔️👤⏱️ короткая дистанция / соревнование с собой |  |
|  | 🧵📜❤️‍🔥👤 пришить обещание как источник истины |  |  |
|  | **Fire / Wood** |  |  |
|  | 🔥🚫🧯 не подкидывать лишнему |  |  |
|  | 🪵⏳🔋📉 дрова не бесконечные |  |  |

### Mnemonic Emoji Table

| 🎯Рез | 🧵📜>🧪Обещ | 📊Скор | 🧲ЗИ |
|---|---|---|---|
| 🤑🎯🏁✅ | **Chem vs Promise** | **Core ✅D ⚡F 🛤️K 💎P** | 🧲➡️🎯/🌪️ |
| 🚫🕳️📉 | 🧪🌪️🧠❌ | ⏱️T🚫🕸️🏃 | 🧱📈👤➡️👤✅ |
| 🎯📈≠🎭🔁 | 📐📜👑>🧪🌪️ | ⚠️🔁≠✅D / 🎭≠🎯 / 🎪≠🛤️ |  |
|  | 💊➡️⚙️➡️✨ | 🏁🥊👤↔️👤⏱️ |  |
|  | 🧵📜❤️‍🔥👤 |  |  |
|  | **Fire / Wood** |  |  |
|  | 🔥🚫🧯 |  |  |
|  | 🪵⏳🔋📉 |  |  |

Meaning:

- 🎯Рез = готов получить результат сейчас / не принимаю слив / действую ради Result Tracking, а не ради процесса.
- 🧵📜>🧪Обещ = Chem vs Promise + Fire / Wood.
- Chem vs Promise = химикаты не ты -> обещание сильнее химии -> эффект может появиться после действия -> пришить обещание как источник истины.
- Fire / Wood = не подкидывать лишнему -> дрова не бесконечные.
- 📊Скор = как сделать сессию хорошей по D/F/K/P, темпу, guard и boost.
- 🧲ЗИ = занос / инерция / habit / future actions.

### 📊Скор Details

| Code | Meaning | Question |
|---|---|---|
| ✅D🛠️📦 | D = Done / Useful Work | Что полезного реально сделано? |
| ⚡F🎛️🧠 | F = Focus / Self-management | Насколько я управлял вниманием, темпом и собой? |
| 🛤️K🎯 | K = Kurs / course alignment | Это было по текущему курсу? |
| 💎P📦📌 | P = Польза / value left | Что полезного осталось после сессии? |
| ⏱️T🚫🕸️🏃 | Tempo support | Не вязнуть, не превращать работу в липкий процесс. |
| ⚠️🔁≠✅D | Guard | Занятость ≠ полезно сделано. |
| 🎭≠🎯 | Guard | Процесс ≠ результат. |
| 🎪≠🛤️ | Guard | Интересно ≠ нужно / по курсу. |
| 🏁🥊👤↔️👤⏱️ | Boost | Короткая дистанция / соревнование с собой. |

The fire/wood ideas belong to 🧵📜>🧪Обещ:

- 🔥🚫🧯 = do not feed what pulls away from the goal;
- 🪵⏳🔋📉 = wood/resource is limited, and if it is spent on drift, desired gets less.

🧲ЗИ does not repeat the fire/wood idea. It only tracks where the magnet pulls and what happens to future actions.
## Truth Promise / Пришитое обещание

Пришитое обещание is an analytical promise stitched as a source of truth for actions and internal state.

Truth Promise has two forms:

1. Principles/workflow explanation — stored in `Work Rails Principles.md` and `Workflows/Build Truth Promise Workflow.md`.
2. Active Promises — stored/rendered as rows in compact Planning State Output and current state.

Do not confuse promise principles with active promises.

Active promises are concrete current promises attached to current goals and rendered as a table:

| # | 🧪 Сейчас чувствую / тянет | 📐 Аналитически выведено | 🧵📜 Пришить как истину | 🌑 Не покупать | 🏁 Отрезок |
|---|---|---|---|---|---|

It is not just a motivational phrase.

It answers:

- what will really make the user feel better;
- what will improve the user’s position;
- what gives control, relief, strength, real pleasure, or the sense that life/work moved forward;
- why current chemistry, stimulation pull, or lack of pull is not the authority.

The promise should contain the full target:

- result;
- good D/F/K/P;
- course;
- value left;
- correct inertia.

Operating principle:

1. Start by naming goals.
2. Identify the real source of pleasure / relief / control.
3. Build an analytical promise from goals, reality, experience, and D/F/K/P.
4. Stitch the promise to yourself: treat it as the source of truth for action and internal state.
5. Do not wait for the right feeling first.
6. Work through short distances.
7. If chemistry/noise/drift appears, name it, recall or rebuild the promise, and continue through the next short-distance action.

Short Russian form:

Цели -> источник настоящего удовольствия -> пришитое обещание -> источник истины -> короткая дистанция -> если химия ломает, вернуться к обещанию.

For the step-by-step process, see:

`Workflows/Build Truth Promise Workflow.md`.

## Workflow references

- Dashboard usage: `Workflows/Use Dashboard Workflow.md`.
- Truth Promise creation/refresh: `Workflows/Build Truth Promise Workflow.md`.
- State output: `Templates/Planning State Output Template.md`.
- Dashboard core: `Templates/Default Dashboard Template.md`.
- Rendered example: `Examples/Midday Planning State Output Example.md`.

## Future behavior algorithms are deferred

Some behavior algorithms are still not designed as standalone workflows.

Examples:

- silence / thought-stop algorithm;
- waiting-gap workflow;
- possible separate chemistry-drift recovery workflow;
- possible separate plus-session workflow.

Keep these in `Deferred and Ideas Notes.md` until they become stable enough to own a separate file.

## Flags

CV = Course Violation.

SD = Stimulation Drift.

EX = Exhaustion / bad cost.

IB = Important But Not Now.

WAIT = Waiting gap.

## Course Violation

Course Violation means:

I saw the correct course,
I could follow it,
but gave in / drifted / softened / violated the rails.

CV is not the same as:

- underestimated task size;
- hidden complexity;
- honest failure;
- exhaustion;
- unclear plan.

## Goal miss rule

Missing a goal is not automatically failure.

If work was strong and course was correct, then the issue may be planning or estimation.

A bad sign is not merely missing the goal.

A bad sign is seeing the course, being able to follow it, and giving in to drift.

## Assets and systems

Creating systems, templates, workflows, plans, AI context, or docs can be real work.

They should be scored like other work.

They do not receive magical future bonus.

If they help future sessions, future sessions should score better.

## Recovery / NDU model

The user has a background recovery goal:

recover / beat approximately 4 years, 2 months, 15 days of lost trajectory.

This is a motivational model, not a guilt counter.

1 NDU = one normal valuable work day.

Initial rough baseline:

- a normal useful day has multiple work sessions;
- not all sessions are equal;
- more useful work, better focus, better course alignment, and more value left can recover more trajectory;
- exact NDU math is provisional.

Recovery is gained through:

- more useful work done;
- better self-management;
- better course alignment;
- more value left;
- fewer stimulation losses;
- faster recovery after drift;
- better planning and estimation.

Recovery should not justify burnout or meaningless stress.

## Scoring examples

### Main-course useful session

`/s 30м диплом D1 F1 Kmain P1 сделал черновик подпункта`

Meaning:
- normal useful work;
- good self-management;
- main course;
- clear value left.

Points:
- 1 + 1 + 1.5 + 1 = 4.5

### Strong main-course session

`/s 30м диплом D1.5 F1 Kmain P1.5 снял блокер и сделал важную структуру`

Points:
- 1.5 + 1 + 1.5 + 1.5 = 5.5

### Right course, weak session

`/s 30м диплом D.5 F0 Kmain P.5 был по курсу, но залипал и много самоговорил`

Meaning:
- there was some useful progress;
- self-management was poor;
- the task was still on the main course.

### Productive procrastination

`/s 30м читал важную тему D1 F1 Klater P1 IB`

Meaning:
- useful and focused work;
- but important later, not now.

### Stimulation drift

`/event 40м YouTube D0 F0 Koff P0 CV SD`

Meaning:
- no useful work;
- off-course;
- course violation and stimulation drift if the correct course was visible and available.

## No over-accounting

Scores are practical approximations.

They should guide behavior, not become perfect math.

If uncertain, choose a reasonable score, add a note, and continue.
