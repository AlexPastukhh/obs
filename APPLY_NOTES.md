# Apply notes

This archive is intended to be applied as one local commit.

It creates/updates:

- `-Repetition/START HERE.md`
- `-Repetition/FOR NEW AI CHAT.md`
- `-Repetition/USE CASE MAP.md`
- `-Repetition/RESPONSIBILITY MAP.md`
- `-Repetition/Documentation Principles.md`
- `-Repetition/Workflows/Add Or Route New Information Workflow.md`
- `-Repetition/Templates/Responsibility Map Entry Template.md`

## Important cleanup

A temporary file may exist on the remote branch because a direct GitHub write test created it:

```text
-Repetition/tmp-test-bulk.txt
```

Remove it before committing/pushing.

## Commands

From repo root:

```bash
git pull origin ai-conspects-repetition-plan

# remove accidental temp commit if it is the latest commit
git reset --hard HEAD~1

unzip -o /c/Users/alexa/Downloads/repetition_docs_architecture_bulk_update.zip -d .

git rm -f -- "-Repetition/tmp-test-bulk.txt" 2>/dev/null || true

git add -- "-Repetition"
git status
git commit -m "Add repetition documentation routing architecture"
git push --force-with-lease origin ai-conspects-repetition-plan
```
