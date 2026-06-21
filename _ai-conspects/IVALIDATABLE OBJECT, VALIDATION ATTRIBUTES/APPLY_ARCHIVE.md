# APPLY ARCHIVE — STRINGREADER / randomnumbergenerator / IVALIDATABLE OBJECT, VALIDATION ATTRIBUTES final coverage v001

All three conspects are delivered together in one archive.

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-STRINGREADER-randomnumbergenerator-IVALIDATABLE-OBJECT-VALIDATION-ATTRIBUTES-stage1-final-coverage-v001.zip"
$target1 = "_ai-conspects\STRINGREADER"
$target2 = "_ai-conspects\randomnumbergenerator"
$target3 = "_ai-conspects\IVALIDATABLE OBJECT, VALIDATION ATTRIBUTES"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target1 $target2 $target3
git status --short -- $target1 $target2 $target3
```

## Commit after review

```powershell
git commit -m "Complete STRINGREADER randomnumbergenerator and validation final coverage"
git push origin ai-processed-conspects-text
```

## Rollback only this batch

```powershell
git restore --staged -- $target1 $target2 $target3
git restore -- $target1 $target2 $target3
```
