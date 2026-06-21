# APPLY ARCHIVE - three security/auth conspects stage0 batch v001

This single archive contains three conspect folders plus this batch manifest.

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-auth-security-triple-stage0-boundary-review-v001.zip"
$batch = "_ai-conspects\_batches\batch-auth-cors-antiforgery-basic-auth-account-activation-stage0-v001"
$target1 = "_ai-conspects\aspnetcore-cors-vs-antiforgery-simple-requests-preflight-credentials"
$target2 = "_ai-conspects\aspnetcore-basic-authentication-custom-handler-httpclient-curl"
$target3 = "_ai-conspects\aspnetcore-account-activation-email-confirmation-dataprotection-identity"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $batch $target1 $target2 $target3

git status --short -- $batch $target1 $target2 $target3
```

## Commit after review

```powershell
git commit -m "Start CORS antiforgery Basic auth and account activation conspects"
git push origin ai-processed-conspects-text
```

## Rollback this batch before commit

```powershell
git restore --staged -- $batch $target1 $target2 $target3
git restore -- $batch $target1 $target2 $target3
```
