# Pattern Capture Export Format

Status: active export contract.

Purpose: define what the Tampermonkey tool copies for chat import.

## Main export

Markdown is the main export format.

JSON is backup/debug.

The exported markdown should be easy to paste into chat with:

`импортируй pattern capture в day file YYYY-MM-DD`

## Markdown export shape

```markdown
## Pattern Capture Export — YYYY-MM-DD

Source: Tampermonkey Pattern Capture

### Work Pattern Events

| Time | Session | Pattern | Effect | Note |
|---|---|---|---|---|
| 14:22 | S3 | 🧩🪜⚠️➡️🧲⚡ Complex multi-level problem → easy stimulation | returned | hard analysis |

### Support Facts

| # | Time / After | Type | Fact | Effect on next work |
|---|---|---|---|---|
| 1 | after S5 | 🏃 movement / sport | 15 минут ходьбы | restored energy |
| 2 | after S6 | 🍽️ food | Объелся | worsened F / sleep risk |

### Raw Counts

| Metric | Count |
|---|---:|
| Work-pattern events | 1 |
| Support facts | 2 |
| Stimulus drift | 0 |
| Returned | 1 |
```

## JSON export shape

```json
{
  "exportedAt": "2026-05-30T21:10:00.000-04:00",
  "date": "2026-05-30",
  "events": []
}
```

## Export rules

- Export should include selected date by default.
- Export should not automatically clear stored events.
- Clear Date should be explicit.
- Export should preserve event order.
- Export should group work-pattern events and support facts.
- Export should include counts.
- Export should not calculate Work Score.
- Export should not calculate Support Score.

## Import destination

Work Pattern Events may become:

- day-file Notes;
- session review hints;
- pattern review material;
- future D/F/K/P interpretation context.

Support Facts become rows in:

`Between-session / Support Facts`

inside:

`Days/YYYY/YYYY-MM-DD.md`
