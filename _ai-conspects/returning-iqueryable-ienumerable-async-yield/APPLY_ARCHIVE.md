# Apply archive: returning-iqueryable-ienumerable-async-yield Stage1 boundary review

Archive type: boundary review / split plan.

Target branch:

```text
ai-processed-conspects-text
```

Use `tar.exe -xf` instead of PowerShell `Expand-Archive`.

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-returning-iqueryable-ienumerable-async-yield-stage1-boundary-review-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\returning-iqueryable-ienumerable-async-yield"
$zip = "C:\Users\alexa\Downloads\ai-conspects-returning-iqueryable-ienumerable-async-yield-stage1-boundary-review-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\returning-iqueryable-ienumerable-async-yield-stage1-boundary-review-cached.diff"

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
git commit -m "Add returning IQueryable IEnumerable async yield conspect boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- "$target"
git restore -- "$target"
git clean -fd -- "$target"
```

## Notes

This archive does not create transcript content and does not duplicate Stage0 source images.

Next step should be NEXT01 full transcript.
