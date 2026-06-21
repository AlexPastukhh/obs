# APPLY ARCHIVE — Google reCAPTCHA v2/v3 final coverage transcript v001

Target branch: `ai-processed-conspects-text`

## Apply

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-google-recaptcha-v2-v3-razor-react-aspnetcore-verification-stage1-r01r02r03r04-final-coverage-v001.zip"
$target = "_ai-conspects\google-recaptcha-v2-v3-razor-react-aspnetcore-verification"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $target

git status --short -- $target
```

## Commit after review

```powershell
git commit -m "Complete Google reCAPTCHA v2 v3 conspect final coverage"
git push origin ai-processed-conspects-text
```

## Rollback staged target only

```powershell
git restore --staged -- $target
git restore -- $target
```
