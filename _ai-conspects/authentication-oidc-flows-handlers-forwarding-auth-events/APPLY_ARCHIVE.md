# Apply archive: Auth/OIDC/Auth Events Stage0 boundary review v001

Archive type: stage0 boundary review / split plan.

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
C:\Users\alexa\Downloads\ai-conspects-authentication-oidc-flows-handlers-forwarding-auth-events-stage0-boundary-review-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-authentication-oidc-flows-handlers-forwarding-auth-events-stage0-boundary-review-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-authentication-oidc-flows-handlers-forwarding-auth-events-stage0-boundary-review.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/authentication-oidc-flows-handlers-forwarding-auth-events

git --no-pager diff -- _ai-conspects/authentication-oidc-flows-handlers-forwarding-auth-events > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
```

## Commit commands

```powershell
git add _ai-conspects/authentication-oidc-flows-handlers-forwarding-auth-events
git commit -m "Start auth OIDC conspect boundary review"
git push origin ai-processed-conspects-text
```

## Notes

This is not a transcript archive. It prepares a safe larger-pass workflow.
