# Real Reward Pattern Playbook

Status: active workflow companion.

Purpose: store score-relevant behavioral patterns for applying the Real Reward Work Loop.

This is not a log, not today's documentation, and not rendered output.

Owner workflow: `Workflows/Real Reward Work Loop Workflow.md`

Emoji notation owner: `Emoji Notation Map.md`

## Source of truth rule

This playbook owns pattern IDs, pattern names, emoji labels, pattern meanings, active Point-6 status, and Fundamental / Frequent / Situational / Penalty classification.

Other files may duplicate compact labels for rendering or UI, but must link back to this playbook and must not redefine pattern meaning independently.

Templates may render compact Point-6 labels.

Tampermonkey / Pattern Capture may duplicate UI button labels, but each button must map to a Pattern ID owned here.

## Pattern categories

### Fundamental score patterns

Always used in point 6. They are score-check criteria for D/F/K/P in every short-distance race.

### Fundamental penalty patterns

Always checked in point 6, but they are not normal D/F/K/P criteria. They create negative Work Score adjustment when the user knowingly normalizes a wrong action without resistance.

Minimum confirmed penalty: `-10`. Additional penalty is proportional to lost session-equivalent time.

Apply only when all are true:

1. The user understood the action was wrong / off-scope / damaging.
2. The user did not fight, stop, mark, recover, or create a promise.
3. The user normalized it as okay.
4. Damage or time loss happened.

### Situational patterns

Used only when the user says the pattern happened, asks to evaluate it, or the situation clearly matches it. They do not go into point 6 by default.

### Frequent situational patterns

Situational patterns marked `Frequency: frequent` are included in point 6 while frequent.

## Active point-6 pattern labels

| Pattern ID | Emoji | Pattern | Type |
|---|---|---|---|
| short_distance_self_competition | 🏁🥊👤↔️👤⏱️ | Short-distance self-competition | Fundamental |
| useful_result_min_losses | 🎯💎📉 | Useful result with minimal losses | Fundamental |
| session_frame_visible_target | ⏱️🚂🛤️➡️🎯 | Session frame / visible target | Fundamental |
| targeted_stimuli_chemistry_only | 🧲⚡🧪➡️🎯 | Targeted stimuli / chemistry only | Fundamental |
| course_desired_connection | 🛤️🌅➡️🎯 | Course / Desired connection | Fundamental |
| value_left_after_attention | 👁️⏳➡️💎 | Value left after attention ends | Fundamental |
| no_resistance_known_drift | 👁️🚫🥊🎭➡️🕳️ | No-resistance known drift | Fundamental penalty |
| complex_problem_easy_stimulation | 🧩🪜⚠️➡️🧲⚡ | Complex multi-level problem -> easy stimulation | Frequent situational |
| automatic_rails_result_forgotten | 🚂🛤️⚠️🎯 | Automatic rails but Result forgotten | Frequent situational |

## Situational pattern labels

| Pattern ID | Emoji | Pattern | Type |
|---|---|---|---|
| fast_recovery_after_slip | 📉📈 | Fast recovery after slip | Situational |
| public_anxiety_inner_dialogue_slowdown | 🏙️🧠🔁⏳ | Public anxiety -> inner-dialogue slowdown | Situational |
| unactionable_out_of_scope_worry | 🧠🌪️🚫🎯 | Unactionable out-of-scope worry | Situational |
| complex_problem_easy_stimulation | 🧩🪜⚠️➡️🧲⚡ | Complex multi-level problem -> easy stimulation | Frequent situational |
| automatic_rails_result_forgotten | 🚂🛤️⚠️🎯 | Automatic rails but Result forgotten | Frequent situational |

## Point 6 compact table

Pattern source of truth: `Workflows/Real Reward Pattern Playbook.md`

This table is a compact rendering of active Point-6 pattern labels. Pattern meanings are defined by Pattern IDs in this playbook.

| Влияет на | Active score patterns |
|---|---|
| ✅D | 🎯💎📉 Useful result with minimal losses<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent)<br>🚂🛤️⚠️🎯 Automatic rails but Result forgotten (Frequent) |
| ⚡F | 🏁🥊👤↔️👤⏱️ Short-distance self-competition (also D/K/P + future inertia)<br>⏱️🚂🛤️➡️🎯 Session frame / visible target<br>🧲⚡🧪➡️🎯 Targeted stimuli / chemistry only<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent) |
| 🛤️K | 🛤️🌅➡️🎯 Course / Desired connection<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent) |
| 💎P | 👁️⏳➡️💎 Value left after attention ends<br>🚂🛤️⚠️🎯 Automatic rails but Result forgotten (Frequent) |
| 🚨 Penalty | 👁️🚫🥊🎭➡️🕳️ No-resistance known drift |
| 🔎 Full patterns | `/patterns` |

## Pattern format

Each pattern should include Pattern ID, Emoji, Type, Default point 6 status, Affects, Core idea, Adds, Subtracts, Do instead, Promise need when relevant, and Short D/F/K/P race.

Penalty patterns also include penalty condition, base penalty, time-loss penalty, and confirmation/safety rule.

---

## Fundamental score patterns

### Pattern: 🏁🥊👤↔️👤⏱️ Short-distance self-competition

Pattern ID: `short_distance_self_competition`

Type: Fundamental score pattern. Default point 6: yes. Affects: F primary; also D/K/P and future inertia.

Core idea: гонка с собой на короткой дистанции добавляет score, если я делаю отрезок лучше, чем сделал бы прошлый / дрейфующий я. Race means better D/F/K/P and future inertia, not panic-speed.

Adds: short segment, visible target, tempo, attempt to beat drifting self, useful output, future habit training.

Subtracts: no race, no attempt to do better, segment spreads, tempo dies, process presence without useful improvement.

Do instead: make the next segment short, target visible, timer/score visible, win by improving D/F/K/P.

Short race: D useful thing exists; F target/tempo/self-management; K on-course; P value remains; future inertia improves.

---

### Pattern: 🎯💎📉 Useful result with minimal losses

Pattern ID: `useful_result_min_losses`

Type: Fundamental score pattern. Default point 6: yes. Affects: D primary; F/P secondary.

Core idea: D grows when the segment creates a useful result that moves the real goal with the smallest reasonable losses. D does not grow maximally from just “some result”, process repetition, busy movement, or a result that costs too much.

Useful result means: it moves Desired/current goal, leaves usable value, reduces future friction, and justifies the time and attention spent.

Losses include: wasted time, focus leakage, unnecessary complexity, overbuilding, stimulation residue, future inertia damage, and process loops.

Adds: useful output exists; result is on-target; losses are limited; next action is easier; result leaves reusable value; result is not merely “something happened”.

Subtracts: process continued but useful result stayed weak; some result appeared but cost was too high; overbuilt solution; unnecessary rabbit holes; stimulation/process residue; result did not justify losses; useful-looking process left little real value.

Do not: count any visible output as good D automatically; count process repetition as D by itself; overbuild when a smaller sufficient result would close the need; keep paying losses after marginal value drops.

Do instead: ask what useful result should exist, what losses must be avoided, what the smallest sufficient output is, and when marginal value drops enough to stop or switch.

Short race: D useful result exists with minimal reasonable losses; F controls losses during the segment; K keeps result on current course / Desired; P leaves usable value after attention ends.

Deprecated previous name: `🎯📈≠🎭🔁 Result Tracking over process`.

Reason for replacement: old name made the contrast too simple. The real criterion is useful target result with minimal reasonable losses over merely some result or process.

---

### Pattern: ⏱️🚂🛤️➡️🎯 Session frame / visible target

Pattern ID: `session_frame_visible_target`

Type: Fundamental score pattern. Default point 6: yes. Affects: F primary; D/P secondary.

Core idea: F grows when there is a session frame, visible target, timer/short segment, score awareness, and clear end. `🚂🛤️` means rails/frame; bare `🛤️` means course.

Adds: session frame, visible target, timer, score awareness, clear end, loggable result.

Subtracts: unframed work, no target, unclear D/F/K/P, foggy “doing something”.

Do instead: start a session, name target, make target visible, use timer/frame, log after.

---

### Pattern: 🧲⚡🧪➡️🎯 Targeted stimuli / chemistry only

Pattern ID: `targeted_stimuli_chemistry_only`

Type: Fundamental score pattern. Default point 6: yes. Affects: F primary; also D/K/P.

Core idea: score rises when valid stimulation and useful chemistry are narrowed to target. Non-target stimuli/chemistry should not become authority.

Adds: stimuli fuel target, chemistry supports target, wrong stimuli not fed, non-target reactions noticed and not treated as truth, promise used when pull is strong.

Subtracts: stimuli spread to non-target branches, chemistry becomes authority, easy stimuli replace target, reaction is served instead of result.

Do instead: notice/name chemistry, do not argue/feed it, let it burn out when needed, redirect stimulation to timer/visible progress/score/race/D-F-K-P.

---

### Pattern: 🛤️🌅➡️🎯 Course / Desired connection

Pattern ID: `course_desired_connection`

Type: Fundamental score pattern. Default point 6: yes. Affects: K primary; D/P secondary.

Core idea: K grows when segment connects to current course / Desired / nearest global goals. K falls when interesting/easy/important-but-not-now replaces needed.

Adds: day goal, Desired, nearest global goals, current course, useful-now over useful-later.

Subtracts: interesting replaces needed, easy branch replaces course, important-but-not-now steals segment, side branch pretends to be main.

Do instead: check day goal / Desired / global goals. Defer non-current work or explicitly allow it.

---

### Pattern: 👁️⏳➡️💎 Value left after attention ends

Pattern ID: `value_left_after_attention`

Type: Fundamental score pattern. Default point 6: yes. Affects: P primary.

Core idea: P grows when something useful remains after the segment. P falls when the session disappears with attention.

Adds: artifact, structure, written decomposition, decision, draft, removed blocker, clear next action, continuation material.

Subtracts: only memory of effort remains; nothing can be continued; process ate time but left no value.

Do instead: leave a small artifact, capture decision, write decomposition, name blocker, create next action.

---

## Fundamental penalty patterns

### Pattern: 👁️🚫🥊🎭➡️🕳️ No-resistance known drift

Pattern ID: `no_resistance_known_drift`

Type: Fundamental penalty pattern. Default point 6: yes. Affects: Net Work Score through penalty adjustment; F/K/P meaning; future inertia.

Emoji: 👁️ = saw/understood; 🚫🥊 = no fight; 🎭 = pretended it was fine; ➡️🕳️ = drifted into damage.

Core idea: this is not ordinary drift. I understand the action is not needed / off-scope / not Desired / damaging, but I do not fight, recover, stop, mark, or promise. I normalize it and continue.

Formula: `noticed wrong -> normalized wrong -> continued`.

Penalty condition: apply when the user understood it was wrong, did not resist/recover, normalized it, and damage/time loss happened.

Penalty rule: minimum `-10`; add time-loss penalty proportional to lost sessions. Example: base `-10`, lost 2 sessions ≈ `-7.5`, total `-17.5`.

Subtracts: knowingly continued wrong action, no fight, no recovery, no honest mark, no promise when needed, off-scope action treated as allowed, future inertia trains no-resistance drift.

Prevents penalty: 📉📈 Fast recovery after slip, honest mark, stopping branch, promise, small recovery segment.

Do not: call known wrong drift rest/normal; hide it inside F0/Koff; let it disappear from day file.

Do instead: mark event, stop wrong action, use 📉📈 if recovered, create Penalty Event if no-resistance happened, use promise if pull is strong, return to smallest target segment.

---

## Situational patterns

### Pattern: 📉📈 Fast recovery after slip

Pattern ID: `fast_recovery_after_slip`

Type: Situational pattern. Default point 6: no unless marked frequent later. Affects: F primary; P/future inertia secondary.

When this appears: a slip happened, but user noticed quickly and recovered quickly.

Core idea: a slip is not good, but fast recovery sharply reduces damage and can prevent `👁️🚫🥊🎭➡️🕳️`.

Adds: quick noticing, honest mark, branch stopped, target segment restarted, future recovery trained.

Subtracts: slip hidden, called normal, recovery delayed, drift continues.

Do instead: mark slip, return quickly, start short target segment, use timer/visible target/promise if needed.

---

### Pattern: 🏙️🧠🔁⏳ Public anxiety -> inner-dialogue slowdown

Pattern ID: `public_anxiety_inner_dialogue_slowdown`

Type: Situational pattern. Default point 6: no unless marked frequent later. Affects: F primary; D/P secondary; support if draining.

When this appears: in a public/crowded place, anxiety starts and user tries to handle it through internal dialogue, making simple actions take too long.

Core idea: internal dialogue often does not solve public anxiety; it becomes a loop that slows physical action. Replacement is external next action.

Adds: anxiety noticed, inner dialogue shortened/stopped, next external action named, task continues, physical checklist/route replaces mental argument.

Subtracts: trying to think anxiety away, simple actions stretched, environment becomes focus, F/tempo collapse.

Do instead: name next external action, tiny checklist, move physically, keep task small, use timer.

---

### Pattern: 🧠🌪️🚫🎯 Unactionable out-of-scope worry

Pattern ID: `unactionable_out_of_scope_worry`

Type: Situational pattern. Default point 6: no unless marked frequent later. Affects: F/K primary; P secondary; support if damaging sleep/recovery.

When this appears: worry is outside current scope and cannot become action now.

Core idea: if worry cannot become action now, it is not planning; it is an unactionable loop that pulls from K and leaves residue.

Test: `Can this worry become an action in the current scope right now?` If no, it is unactionable worry.

Adds: worry recognized as unactionable now; if useful, one deferred line is written; current scope resumes; promise/timer used if sticky.

Subtracts: worry continues, worry pretends to be planning, current scope stolen, anxiety residue remains.

Do instead: write one deferred line if needed, name that it is not actionable now, return to current scope.

---

### Pattern: 🧩🪜⚠️➡️🧲⚡ Complex multi-level problem -> easy stimulation

Pattern ID: `complex_problem_easy_stimulation`

Type: Situational pattern. Frequency: frequent. Default point 6: yes while frequent. Affects: D/F/K/P depending on handling.

When this appears: a complex multi-level problem becomes heavy, and the mind wants easier stimulation such as YouTube, music, food, easy branch, pseudo-warmup, extra sources, loose browsing, or another useful-but-easier task.

Core idea: the problem is not decomposed enough. The user is not choosing real rest. The mind is escaping from unclear analytical pressure. The real blocker is written decomposition.

Subtracts: escaped into easy stimulus; opened external branches without a clear question; called escape rest; searched for easier stimulation; did not decompose in writing; left analytical fog.

Adds: recognized that problem is not decomposed; wrote 3–5 points; separated first layer; made first analytical move; used timer/checklist/self-competition as target-related stimulation.

Do instead: name the real blocker, write 3–5 small points, pick first layer, make first analytical move tiny, use target-related stimulation.

Promise need: use promise if pull to easier stimulation is strong or repeated.

---

### Pattern: 🚂🛤️⚠️🎯 Automatic rails but Result forgotten

Pattern ID: `automatic_rails_result_forgotten`

Type: Situational pattern. Frequency: frequent. Default point 6: yes while frequent. Affects: D/P primary; F/K secondary.

When this appears: the user is technically on rails. Actions are happening automatically. This is better than drift. But Desired / useful result is forgotten. The process starts running by itself.

Core idea: the system is working at process level, but the result has gone dim. The user is not off the rails, but the engine needs fuel.

Formula: ты на рельсах, но нужно ещё дрова в двигатель подкидывать.

Subtracts: continued process automatically, did not remember Desired/useful result, D/P stopped growing, work became mechanical, process turns but desired reality does not become closer.

Adds: remembered Desired, checked what should become more real, returned action to useful result, added fuel: timer, score, visible progress, short race, self-competition.

Do instead: pause briefly, name Desired / useful result, ask what should become more real, add timer/score/visible progress, continue rails with result pressure.

Promise need: usually no promise if already on rails. Use promise only if chemistry/stimulation starts pulling away from result or user resists result reconnection.
