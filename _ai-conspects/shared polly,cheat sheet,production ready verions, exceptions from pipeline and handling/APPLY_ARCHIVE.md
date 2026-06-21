# Apply archive: Polly R01/R02/R07 final coverage transcript v001

Archive type: stage-3 final coverage transcript.

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
C:\Users\alexa\Downloads\ai-conspects-shared polly,cheat sheet,production ready verions, exceptions from pipeline and handling-stage3-r01r02r07-final-coverage-v001.zip
```

## Apply + staged diff review commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-shared polly,cheat sheet,production ready verions, exceptions from pipeline and handling-stage3-r01r02r07-final-coverage-v001.zip"
$target = "_ai-conspects\shared polly,cheat sheet,production ready verions, exceptions from pipeline and handling"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-polly-stage3-r01r02r07-final-coverage.cached.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

# Stage ONLY this conspect folder, then review cached diff.
git add -A -- $target

git status --short -- $target
git diff --cached --stat -- $target
git diff --cached --name-status -- $target

git --no-pager diff --cached -- $target > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Cached diff saved to $diffPath"
Write-Host "Clipboard length:" (Get-Content $diffPath -Raw).Length
```

## Commit commands after review

```powershell
git commit -m "Complete Polly conspect final coverage"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects/shared polly,cheat sheet,production ready verions, exceptions from pipeline and handling
git restore -- _ai-conspects/shared polly,cheat sheet,production ready verions, exceptions from pipeline and handling
```
