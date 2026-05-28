Batch 5: Default Dashboard Mode

This package contains a git patch instead of full file replacements.
Reason: it updates a large principles file without risking accidental loss of existing content.

Apply from the root of the obs repository:

  Expand-Archive -Path "C:\Users\alexa\Downloads\planning-work-rails-batch5-default-dashboard-package.zip" -DestinationPath "." -Force
  git apply -- "planning-work-rails-batch5-default-dashboard.patch"
  git status
  git diff
  git add -A
  git commit -m "Add default dashboard mode"
  git push

Files changed by the patch:
- -Planning/Work Rails Principles.md
- -Planning/Workflows/Log Session Workflow.md
- -Planning/Workflows/Start Day Workflow.md
- -Planning/Use Case Map.md
