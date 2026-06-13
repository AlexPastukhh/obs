# Apply archive: ASP.NET Core authorization flow/options/result-handler stage0 boundary review v001

Archive type: source check / boundary review.

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
C:\Users\alexa\Downloads\ai-conspects-aspnetcore-authorization-flow-options-framework-authorizationmiddleware-result-handler-stage0-boundary-review-v001.zip
```

## Apply + staged-only check commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-aspnetcore-authorization-flow-options-framework-authorizationmiddleware-result-handler-stage0-boundary-review-v001.zip"
$target = "_ai-conspects\aspnetcore-authorization-flow-options-framework-authorizationmiddleware-result-handler"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

## Commit commands after review

```powershell
git commit -m "Start ASP.NET Core authorization flow conspect boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects\aspnetcore-authorization-flow-options-framework-authorizationmiddleware-result-handler
git clean -fd -- _ai-conspects\aspnetcore-authorization-flow-options-framework-authorizationmiddleware-result-handler
```
