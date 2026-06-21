# APPLY ARCHIVE - next three SVG-named conspects stage0 boundary reviews v001

Target branch: `ai-processed-conspects-text`

This single archive applies three stage0 conspects:

```text
_ai-conspects\claimstransformation
_ai-conspects\when need to add content type, encoding
_ai-conspects\view discovery conventions
```

## Apply

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-next-three-stage0-boundary-reviews-v001.zip"
$target1 = "_ai-conspects\claimstransformation"
$target2 = "_ai-conspects\when need to add content type, encoding"
$target3 = "_ai-conspects\view discovery conventions"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target1 $target2 $target3

git status --short -- $target1 $target2 $target3
```

## Commit after review

```powershell
git commit -m "Start three SVG-named conspect boundary reviews"
git push origin ai-processed-conspects-text
```

## Rollback staged targets only

```powershell
git restore --staged -- $target1 $target2 $target3
git restore -- $target1 $target2 $target3
```
