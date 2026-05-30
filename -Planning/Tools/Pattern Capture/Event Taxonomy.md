# Pattern Capture Event Taxonomy

Status: active design requirement.

Purpose: define the quick-button taxonomy.

## Rule

Events are raw captured facts. They are not scores. They become useful when imported into date-based day files and reviewed by chat.

## UI grouping rule

Pattern Capture should not show every pattern as an equal always-visible button.

Use two layers:

1. Fundamental / active Point-6 patterns get concrete quick buttons.
2. Situational patterns live in a dropdown / expandable list / secondary menu.

Frequent situational patterns may be pinned in a small `Frequent` row.

## Fundamental quick buttons

| Button | Event pattern | Notes |
|---|---|---|
| 🏁🥊👤↔️👤⏱️ Self-race | Short-distance self-competition | fundamental |
| 🎯📈≠🎭🔁 Result > Process | Result Tracking over process | fundamental |
| ⏱️🚂🛤️➡️🎯 Frame | Session frame / visible target | fundamental |
| 🧲⚡🧪➡️🎯 Target stimuli | Targeted stimuli / chemistry only | fundamental |
| 🛤️🌅➡️🎯 Course | Course / Desired connection | fundamental |
| 👁️⏳➡️💎 Value left | Value left after attention ends | fundamental |
| 👁️🚫🥊🎭➡️🕳️ No resistance | No-resistance known drift | fundamental penalty; require confirmation |

## Frequent situational quick buttons

| Button | Event pattern | Notes |
|---|---|---|
| 🧩🪜⚠️➡️🧲⚡ Complexity → Stim | Complex multi-level problem → easy stimulation | frequent situational |
| 🚂🛤️⚠️🎯 Rails no Result | Automatic rails but Result forgotten | frequent situational |

## Situational dropdown

| Button | Event pattern | Notes |
|---|---|---|
| 📉📈 Recovery | Fast recovery after slip | situational |
| 🏙️🧠🔁⏳ Public anxiety | Public anxiety → inner-dialogue slowdown | situational |
| 🧠🌪️🚫🎯 Worry loop | Unactionable out-of-scope worry | situational |
| 🧵📜 Need Promise | Promise may be needed | situational marker |

## Penalty confirmation

The `👁️🚫🥊🎭➡️🕳️ No resistance` button should require confirmation before saving.

Suggested confirm text:

`Log no-resistance known drift penalty event?`

The script still only captures raw event data. It does not calculate the penalty by itself.

## Suggested effects

| Effect | Meaning |
|---|---|
| noticed | user noticed the pattern |
| returned | user returned to target |
| drifted | pattern pulled user away |
| avoided | user avoided negative version |
| used | user used the pattern positively |
| recovered | user slipped but recovered |
| penalty_candidate | possible penalty event requiring chat review |
| needs_review | needs later chat review |

## Support fact events

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
