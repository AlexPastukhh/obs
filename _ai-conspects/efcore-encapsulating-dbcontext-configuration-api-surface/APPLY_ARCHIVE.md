# Apply archive: EF Core encapsulating DbContext R01/R02 final coverage transcript v001

Archive type: stage-1 final coverage transcript.

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
C:\Users\alexa\Downloads\ai-conspects-efcore-encapsulating-dbcontext-configuration-api-surface-stage1-r01r02-final-coverage-v001.zip
```

## Apply + staged-only check commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-efcore-encapsulating-dbcontext-configuration-api-surface-stage1-r01r02-final-coverage-v001.zip"
$target = "_ai-conspects\efcore-encapsulating-dbcontext-configuration-api-surface"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

## Commit commands after review

```powershell
git commit -m "Complete EF Core encapsulating DbContext conspect final coverage"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects\efcore-encapsulating-dbcontext-configuration-api-surface
git restore -- _ai-conspects\efcore-encapsulating-dbcontext-configuration-api-surface
git clean -fd -- _ai-conspects\efcore-encapsulating-dbcontext-configuration-api-surface
```
