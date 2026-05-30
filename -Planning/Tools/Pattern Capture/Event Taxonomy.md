# Pattern Capture Event Taxonomy

Status: active design requirement.

Purpose: define the quick-button taxonomy.

## Source of truth

Pattern meanings, Pattern IDs, active Point-6 status, and classification are owned by:

`Workflows/Real Reward Pattern Playbook.md`

This file only defines Tampermonkey UI grouping and button presentation.

Tampermonkey may duplicate compact button labels, but each pattern button should map to a Pattern ID owned by the playbook.

Do not redefine pattern meanings here.

## Rule

Events are raw captured facts.

Pattern events are not scores by themselves.

D/F/K/P quick score adjustments may create session score draft deltas, but final day/session scoring is reviewed by chat.

## UI grouping rule

Pattern Capture should not show every pattern as an equal always-visible button.

Use layers:

1. D/F/K/P quick score adjustment buttons.
2. Fundamental / active Point-6 pattern quick buttons.
3. Frequent situational patterns pinned in a small `Frequent` row.
4. Situational patterns in a dropdown / expandable list / secondary menu.

## D/F/K/P quick score buttons

These buttons adjust the active session score draft by `±0.1`.

They do not replace final chat review.

| Button | Dimension | Delta | Meaning |
|---|---|---:|---|
| ✅D+ | D | +0.1 | useful result improved |
| ✅D- | D | -0.1 | useful result / losses worsened |
| ⚡F+ | F | +0.1 | focus / tempo / control improved |
| ⚡F- | F | -0.1 | focus / tempo / control worsened |
| 🛤️K+ | K | +0.1 | course / Desired connection improved |
| 🛤️K- | K | -0.1 | course / Desired connection worsened |
| 💎P+ | P | +0.1 | value left after attention improved |
| 💎P- | P | -0.1 | value left after attention worsened |

## Fundamental quick buttons

| Button | Pattern ID | Event pattern | Notes |
|---|---|---|---|
| 🏁🥊👤↔️👤⏱️ Self-race | short_distance_self_competition | Short-distance self-competition | fundamental; F primary |
| 🎯💎📉 Useful Result | useful_result_min_losses | Useful result with minimal losses | fundamental; D primary |
| ⏱️🚂🛤️➡️🎯 Frame | session_frame_visible_target | Session frame / visible target | fundamental; F |
| 🧲⚡🧪➡️🎯 Target stimuli | targeted_stimuli_chemistry_only | Targeted stimuli / chemistry only | fundamental; F |
| 🛤️🌅➡️🎯 Course | course_desired_connection | Course / Desired connection | fundamental; K |
| 👁️⏳➡️💎 Value left | value_left_after_attention | Value left after attention ends | fundamental; P |
| 👁️🚫🥊🎭➡️🕳️ No resistance | no_resistance_known_drift | No-resistance known drift | fundamental penalty; require confirmation |

## Frequent situational quick buttons

| Button | Pattern ID | Event pattern | Notes |
|---|---|---|---|
| 🧩🪜⚠️➡️🧲⚡ Complexity → Stim | complex_problem_easy_stimulation | Complex multi-level problem → easy stimulation | frequent situational |
| 🚂🛤️⚠️🎯 Rails no Result | automatic_rails_result_forgotten | Automatic rails but Result forgotten | frequent situational |

## Situational dropdown

| Button | Pattern ID | Event pattern | Notes |
|---|---|---|---|
| 📉📈 Recovery | fast_recovery_after_slip | Fast recovery after slip | situational |
| 🏙️🧠🔁⏳ Public anxiety | public_anxiety_inner_dialogue_slowdown | Public anxiety → inner-dialogue slowdown | situational |
| 🧠🌪️🚫🎯 Worry loop | unactionable_out_of_scope_worry | Unactionable out-of-scope worry | situational |
| 🧵📜 Need Promise | promise_may_be_needed | Promise may be needed | situational marker; not a playbook pattern yet |

## Tampermonkey pattern object convention

Tampermonkey can duplicate UI labels, but should include `id` and `source`.

Example:

```javascript
{
  id: "useful_result_min_losses",
  label: "🎯💎📉",
  full: "🎯💎📉 Useful result with minimal losses",
  source: "Workflows/Real Reward Pattern Playbook.md#useful_result_min_losses"
}
```

## Penalty confirmation

The `👁️🚫🥊🎭➡️🕳️ No resistance` button should require confirmation before saving.

Suggested confirm text:

`Log no-resistance known drift penalty event?`

The script captures raw event data / penalty candidate.

Chat confirms the actual penalty event and score adjustment.

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
