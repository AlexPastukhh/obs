# Apply archive: EF Core encapsulating DbContext stage0 boundary review v001

Archive type: source check / boundary review.

Target branch:

```text
ai-processed-conspects-text
```

Apply from repository root.

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-efcore-encapsulating-dbcontext-configuration-api-surface-stage0-boundary-review-v001.zip
```

## Apply + stage commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-efcore-encapsulating-dbcontext-configuration-api-surface-stage0-boundary-review-v001.zip"
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
git commit -m "Start EF Core encapsulating DbContext conspect boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects\efcore-encapsulating-dbcontext-configuration-api-surface
git clean -fd -- _ai-conspects\efcore-encapsulating-dbcontext-configuration-api-surface
```
