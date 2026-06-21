# APPLY ARCHIVE — auth/security triple final coverage v001

This archive supersedes the previous stage0-only batch and contains stage0 + final transcripts.

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-auth-security-triple-final-coverage-v001.zip"
$batch0 = "_ai-conspects\_batches\batch-auth-cors-antiforgery-basic-auth-account-activation-stage0-v001"
$batch1 = "_ai-conspects\_batches\batch-auth-cors-antiforgery-basic-auth-account-activation-final-v001"
$target1 = "_ai-conspects\aspnetcore-cors-vs-antiforgery-simple-requests-preflight-credentials"
$target2 = "_ai-conspects\aspnetcore-basic-authentication-custom-handler-httpclient-curl"
$target3 = "_ai-conspects\aspnetcore-account-activation-email-confirmation-dataprotection-identity"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git add -A -- $batch0 $batch1 $target1 $target2 $target3

git status --short -- $batch0 $batch1 $target1 $target2 $target3
```

## Commit after review

```powershell
git commit -m "Complete CORS antiforgery Basic auth and account activation conspects"
git push origin ai-processed-conspects-text
```
