# Apply archive: returning-most-specific-passing-most-generic Stage0 source check

Archive type: source check / materialization.

Target branch:

```text
ai-processed-conspects-text
```

Use `tar.exe -xf` instead of PowerShell `Expand-Archive`.

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-returning-most-specific-passing-most-generic-stage0-source-check-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\returning-most-specific-passing-most-generic"
$zip = "C:\Users\alexa\Downloads\ai-conspects-returning-most-specific-passing-most-generic-stage0-source-check-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\returning-most-specific-passing-most-generic-stage0-source-check-cached.diff"

git status --short

tar.exe -xf $zip -C .

git add -A -- "$target"

git status --short -- "$target"
git --no-pager diff --cached --stat -- "$target"
git --no-pager diff --cached --name-status -- "$target"

git --no-pager diff --cached -- "$target" > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard

Write-Host "Cached diff saved to $diffPath"
Write-Host "Clipboard length:" (Get-Content $diffPath -Raw).Length
```

## Commit commands

```powershell
git commit -m "Start returning most specific passing most generic conspect source check"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- "$target"
git restore -- "$target"
git clean -fd -- "$target"
```

## Notes

This archive does not create transcript content.

Next step should be Stage1 boundary review.
