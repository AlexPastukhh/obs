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
