# Apply archive: options-pattern Stage3 final closure audit

Archive type: final closure / audit.

Target branch:

```text
ai-processed-conspects-text
```

Use `tar.exe -xf` instead of PowerShell `Expand-Archive`.

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-options-pattern-stage3-final-closure-audit-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\options-pattern"
$zip = "C:\Users\alexa\Downloads\ai-conspects-options-pattern-stage3-final-closure-audit-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\options-pattern-stage3-final-closure-audit-cached.diff"

git status --short

tar.exe -xf $zip -C .

git add -A -- "$target"

git status --short -- "$target"
git diff --cached --stat -- "$target"
git diff --cached --name-status -- "$target"

git --no-pager diff --cached -- "$target" > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard

Write-Host "Cached diff saved to $diffPath"
Write-Host "Clipboard length:" (Get-Content $diffPath -Raw).Length
```

## Commit commands

```powershell
git commit -m "Finalize options pattern conspect audit"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- "$target"
git restore -- "$target"
git clean -fd -- "$target"
```

## Notes

This archive marks the options-pattern conspect complete if the cached diff matches the audit summary.
