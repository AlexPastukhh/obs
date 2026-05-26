# Long Break Stage Rollback Workflow

Status: draft workflow.

Use when the user explicitly decides that active repeat stages are too advanced after a long break.

## Goal

Downgrade active pending repeat stages while keeping historical completed stages.

## Important

This is an explicit recovery decision, not default behavior.

Do not apply stage rollback unless the user clearly asks for it.

## Default rollback idea

```text
+80 -> review  may become +40 -> +80
+40 -> +80     may become +20 -> +40
+20 -> +40     may become +10 -> +20
+10 -> +20     usually stays unless user asks
```

## Algorithm

```text
1. Record the explicit recovery decision in a recovery note.
2. Identify affected active pending schedule items.
3. Decide rollback mapping with user.
4. Update active chain stages and future dates.
5. Regenerate affected month schedule entries.
6. Preserve old completed history.
7. Report changed chains and touched schedule files.
```

## Do not

```text
- Do not delete old history.
- Do not change completed stages before the recovery point.
- Do not apply rollback to future breaks automatically.
- Do not combine this with +1 month shift unless explicitly requested.
```

## Output shape

```text
Recovery decision:
- ...

Affected chains:
- ...

Rollback rule used:
- ...

Updated schedule entries:
- ...

Touched files:
- ...
```
