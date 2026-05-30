# Pattern Capture Event Taxonomy

Status: active design requirement.

Purpose: define the initial quick-button taxonomy.

## Rule

Events are raw captured facts.

They are not scores.

They become useful when imported into date-based day files and reviewed by chat.

## Work-pattern events

Work-pattern events mostly connect to Point 6 and the Real Reward Pattern Playbook.

Initial buttons:

| Button | Event pattern |
|---|---|
| 🎯📈≠🎭🔁 Result > Process | Result Tracking over process |
| 🧩🪜⚠️➡️🧲⚡ Complexity → Stim | Complex multi-level problem → easy stimulation |
| 🚂🛤️⚠️🎯 Rails no Result | Automatic rails but Result forgotten |
| 🏁🥊👤↔️👤⏱️ Self-race | Short-distance self-competition |
| ⏱️🚂🛤️➡️🎯 Frame | Session frame / visible target |
| 🧲⚡🧪➡️🎯 Target stimuli | Targeted stimuli / chemistry only |
| 🛤️🌅➡️🎯 Course | Course / Desired connection |
| 👁️⏳➡️💎 Value left | Value left after attention ends |
| 🧵📜 Need Promise | Promise may be needed |

Suggested effects:

| Effect | Meaning |
|---|---|
| noticed | user noticed the pattern |
| returned | user returned to target |
| drifted | pattern pulled user away |
| avoided | user avoided negative version |
| used | user used the pattern positively |
| needs_review | needs later chat review |

## Support fact events

Support events import into `Between-session / Support Facts`.

Initial buttons:

| Button | Type | Fact | Effect |
|---|---|---|---|
| 🍽️ ok | 🍽️ food | Не объелся | helped continue |
| 🍽️ over | 🍽️ food | Объелся | worsened F / sleep risk |
| 🏃 moved | 🏃 movement / sport | Двигался | restored energy |
| 🛌 sleep try | 🛌 sleep / sleep attempt | Пытался заснуть | valid sleep attempt |
| 🧲⚡ drift | 🧲⚡ stimulus control | Stimulus drift | hurt readiness |
| 🔋 recovered | 🔋 recovery / readiness | Восстановился | helped continue |
| 🔁 returned | 🔁 transition | Вернулся к следующей сессии | helped continue |
| 🩺 health | 🩺 health | Сделал доп. время для здоровья | supported day |

## Session/control events

Optional v1 or v2:

| Button | Meaning |
|---|---|
| Start S | start/mark active session |
| End S | end/mark active session |
| After S | set session context to `after S#` |
| Pause | mark pause |
| Back | returned from pause/drift |

These events are optional and should not replace actual session logging.

## Customization

V1 may use fixed buttons.

V2 may allow editing buttons/config locally.

Custom buttons should still export into the same data model.
