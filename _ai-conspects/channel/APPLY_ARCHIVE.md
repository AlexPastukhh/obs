# Apply archive: channel Stage4 NEXT03 transcript

Archive type: verified transcript / final conspect batch before audit.

Target branch:

```text
ai-processed-conspects-text
```

Use `tar.exe -xf` instead of PowerShell `Expand-Archive`.

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-channel-stage4-next03-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\channel"
$zip = "C:\Users\alexa\Downloads\ai-conspects-channel-stage4-next03-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\channel-stage4-next03-transcript-cached.diff"

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
git commit -m "Add channel conspect NEXT03 transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- "$target"
git restore -- "$target"
git clean -fd -- "$target"
```

## Notes

This archive completes CH05 and does not duplicate Stage0 source images.

Next step should be final closure/audit.
