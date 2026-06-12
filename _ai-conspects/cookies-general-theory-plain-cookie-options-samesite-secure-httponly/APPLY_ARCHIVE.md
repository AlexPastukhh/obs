# Apply archive: Cookies general theory / plain cookie options stage0 boundary review v001

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
C:\Users\alexa\Downloads\ai-conspects-cookies-general-theory-plain-cookie-options-samesite-secure-httponly-stage0-boundary-review-v001.zip
```

## Apply + staged diff review commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-cookies-general-theory-plain-cookie-options-samesite-secure-httponly-stage0-boundary-review-v001.zip"
$target = "_ai-conspects\cookies-general-theory-plain-cookie-options-samesite-secure-httponly"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-cookies-stage0-boundary-review.cached.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

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
git commit -m "Start cookies conspect boundary review"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- _ai-conspects\cookies-general-theory-plain-cookie-options-samesite-secure-httponly
git clean -fd -- _ai-conspects\cookies-general-theory-plain-cookie-options-samesite-secure-httponly
```
