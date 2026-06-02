# Apply archive: ASP.NET Core filters R01 main theory transcript v001

Archive type: stage-1 verified region transcript.

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
C:\Users\alexa\Downloads\ai-conspects-aspnet-core-filters-pipeline-ordering-exception-resource-action-endpoint-stage1-r01-transcript-v001.zip
```

## Apply + staged diff review commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-aspnet-core-filters-pipeline-ordering-exception-resource-action-endpoint-stage1-r01-transcript-v001.zip"
$target = "_ai-conspects\aspnet-core-filters-pipeline-ordering-exception-resource-action-endpoint"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-filters-stage1-r01-transcript.cached.diff"

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
git commit -m "Add ASP.NET Core filters R01 main theory transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects\aspnet-core-filters-pipeline-ordering-exception-resource-action-endpoint
git restore -- _ai-conspects\aspnet-core-filters-pipeline-ordering-exception-resource-action-endpoint
```
