# Apply archive: EF Core General closure audit

Archive type: closure audit.

Target branch:

```text
ai-processed-conspects-text
```

Apply from repository root:

```powershell
PS C:\Users\alexa\obs>
```

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-ef-core-general-closure-audit-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\ef-core-general"
$zip = "C:\Users\alexa\Downloads\ai-conspects-ef-core-general-closure-audit-v001.zip"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short

Expand-Archive -Path $zip -DestinationPath . -Force

# Stage ONLY this target folder.
git add -A -- $target

# Review staged file list/status.
git status --short -- $target
```

## Commit commands

```powershell
git commit -m "Close EF Core General coverage audit"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects/ef-core-general
git restore -- _ai-conspects/ef-core-general
git clean -fd -- _ai-conspects/ef-core-general
```

## Notes

This archive does not add new transcripts. It closes EF Core General by source coverage after Stage1 and Stage2.
