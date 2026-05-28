# Planning Documentation Principles

Status: local documentation principles.

This file repeats/adapts local documentation principles for `-Planning`.

Later it may be merged into repo-level documentation principles.

## File types

`START HERE.md` = entrypoint.

`System Overview.md` = conceptual model.

`Use Case Map.md` = use-case router.

`Responsibility Map.md` = ownership map.

`... Principles.md` = rules and criteria.

`... Workflow.md` = step-by-step algorithm.

`... Template.md` = skeleton.

`... State.md` = current active state.

`... Log.md` = accumulated factual history.

`... Notes.md` = deferred items, unstable ideas, open questions, staging.

`Examples/*.md` = concrete rendered examples of expected output.

## Examples rule

Examples are reference outputs.

They show what a good rendered answer or state view should look like.

Examples are not templates, workflows, principles, or source-of-truth state.

If an example conflicts with a template/workflow/principle, update the example or the owner file intentionally; do not silently treat the example as the owner.

## No duplication

One rule = one owner file.

Other files may link to it.

## No sprawl

Do not create a file for every idea.

Use `Deferred and Ideas Notes.md` until the idea becomes stable.

Create an example file only when repeated output shape needs a stable reference.

## Notes files can have templates

A notes file may have a template when it needs recurring sections.

Example:

- `Deferred and Ideas Notes.md`
- `Templates/Deferred and Ideas Notes Template.md`

## Natural language first

User may write ordinary text.

AI structures it.
