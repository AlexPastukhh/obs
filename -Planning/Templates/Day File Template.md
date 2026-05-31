# Day — YYYY-MM-DD

Status: active

Day file source of truth: this file owns the concrete state, sessions, support facts, penalty events, and final review for this date.

AI must not infer current day automatically.

User provides the date or establishes an active conversation day date.

If this file does not exist, create it from `Templates/Day File Template.md`.

Reusable owners:

- Compact planning output structure: `Templates/Planning State Output Template.md`
- Support facts table: `Templates/Support Facts Table Template.md`
- Support score review layout: `Templates/Support Score Review Template.md`
- Support score rules: `Support Score Guide.md`
- Pattern meanings and IDs: `Workflows/Real Reward Pattern Playbook.md`
- Emoji notation: `Emoji Notation Map.md`

---

## 🎯 Result Tracking

| Поле | Значение |
|---|---|
| 🎯 Цель дня | ⚠️ не задана — нужно выбрать цель дня |
| 🌅 Desired | ⚠️ не задан — нужно определить текущую значимую желаемую цель |
| 🌑 Undesired | ⚠️ не задан — нужно определить реальную плохую цену / слив |
| 🗺️ Ближайшие глобальные цели | ⚠️ не подтянуты — нужно прочитать / обновить Current Plan State.md |

---

## 🏁📊 Point 6 — Short D/F/K/P Race

Pattern source of truth: `Workflows/Real Reward Pattern Playbook.md`

This section stores the active compact Point-6 view for the day. Pattern meanings and Pattern IDs are owned by the playbook.

| Влияет на | Active score patterns |
|---|---|
| ✅D | 🎯💎📉 Useful result with minimal losses<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent)<br>🚂🛤️⚠️🎯 Automatic rails but Result forgotten (Frequent) |
| ⚡F | 🏁🥊👤↔️👤⏱️ Short-distance self-competition (also D/K/P + future inertia)<br>⏱️🚂🛤️➡️🎯 Session frame / visible target<br>🧲⚡🧪➡️🎯 Targeted stimuli / chemistry only<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent) |
| 🛤️K | 🛤️🌅➡️🎯 Course / Desired connection<br>🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation (Frequent) |
| 💎P | 👁️⏳➡️💎 Value left after attention ends<br>🚂🛤️⚠️🎯 Automatic rails but Result forgotten (Frequent) |
| 🚨 Penalty | 👁️🚫🥊🎭➡️🕳️ No-resistance known drift |
| 🔎 Full patterns | `/patterns` |

---

## 🧵📜>🧪 Active Promises

Нет активных promises.

⚠️ Promise не создаётся автоматически. Сначала нужно определить цель / Desired / текущее ощущение / аналитическое предсказание.

---

## 🧾 Finished Sessions

| # | Time | Session | D/F/K/P | Points | Progress Signal | Result |
|---|---|---|---|---:|---|---|

---

## 🚨 Penalty Events

| # | Time | Pattern | Base penalty | Time loss | Total penalty | Reason |
|---|---|---|---:|---:|---:|---|

Rules:

- Penalty Events are not normal Finished Sessions.
- Penalty Events create negative Work Score adjustment.
- `👁️🚫🥊🎭➡️🕳️ No-resistance known drift` minimum penalty is `-10`.
- Additional penalty is proportional to lost session-equivalent time.
- Apply penalty only when the user knowingly normalized wrong drift without resistance.
- Fast recovery after slip `📉📈` can prevent a slip from becoming a penalty event.

### Work Score Summary

| Поле | Значение |
|---|---|
| Work Points | 0 |
| Penalties | 0 |
| Net Work Score | 0 |
| Old baseline | 0 / 35 |
| Full closure | 0 / 70 |
| Main course movement | — |
| Progress | — |

Notes:

35 points = close old 4y2m baseline.

70 points = close old baseline + current day.

Work Points are counted only from Finished Sessions.

Penalties come only from Penalty Events.

Net Work Score = Work Points + Penalties.

Baseline closure is evaluated from Net Work Score when penalties exist.

Support Score never closes 35/70 work baselines.

---

## 🧯 Between-session / Support Facts

During the day, collect facts and/or provisional support marks only.

Do not calculate final Support Score during the day.

| # | Time / After | Type | Fact | Effect on next work |
|---|---|---|---|---|
| 1 |  |  |  |  |

Types:

| Type | Meaning |
|---|---|
| 🛌 sleep / sleep attempt | сон или честная попытка заснуть |
| 🍽️ food | еда / переедание / не объелся |
| 🏃 movement / sport | движение, спорт, прогулка |
| 🧲⚡ stimulus control | стимулы, залипание, не разжёг стимулы |
| 🔋 recovery / readiness | восстановление, готовность продолжать |
| 🔁 transition | переход между сессиями |
| 🩺 health | доп. время для здоровья |
| 🧩 other | другое |

---

## 🌙 Day Close / Next-Morning Support Review

Status: not calculated yet.

Support Score is calculated only at day close / next-morning review from support facts and support marks.

### Support Marks

| # | Category | Mark | Reason |
|---|---|---:|---|
| 1 |  |  |  |

Support Score: not calculated

Formula:

`Support Score = average(support marks used for the day)`

Rules:

- Do not normalize Support Score to `/10`.
- Do not calculate `Max Support Score = 10`.
- Do not sum categories into a 10-point total.
- Typical positive marks often use a `0..2` feel-scale.
- Sleep may use strong negative marks, such as `-5`, when sleep collapses.

### Support Interpretation

not calculated

### Support Facts Used

| Fact | Effect |
|---|---|

---

## 🧾 Final Day Summary

Status: not closed.

| Поле | Значение |
|---|---|
| Work Score | not closed |
| Work Points | 0 |
| Penalties | 0 |
| Net Work Score | 0 |
| Support Score | not calculated |
| Old baseline | not closed |
| Full closure | not closed |
| Day class | active |
| Main result | — |
| Main risk / lesson | — |
| Next-day note | — |

---

## Notes

-
