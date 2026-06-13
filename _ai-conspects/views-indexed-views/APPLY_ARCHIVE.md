# Apply archive: views-indexed-views Stage3 NEXT02 transcript

Archive type: verified transcript / partial conspect batch.

Target branch:

```text
ai-processed-conspects-text
```

Use `tar.exe -xf` instead of PowerShell `Expand-Archive`.

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-views-indexed-views-stage3-next02-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\views-indexed-views"
$zip = "C:\Users\alexa\Downloads\ai-conspects-views-indexed-views-stage3-next02-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\views-indexed-views-stage3-next02-transcript-cached.diff"

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
git commit -m "Add views indexed views conspect NEXT02 transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- "$target"
git restore -- "$target"
git clean -fd -- "$target"
```

## Notes

This archive completes VIV03 only and does not duplicate Stage0 source images.

Next step should be NEXT03 transcript.
