# Apply archive: Auth/OIDC/Auth Events R02 transcript v001

Archive type: stage-2 verified combined transcript.

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
C:\Users\alexa\Downloads\ai-conspects-authentication-oidc-flows-handlers-forwarding-auth-events-stage2-r02-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-authentication-oidc-flows-handlers-forwarding-auth-events-stage2-r02-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-authentication-oidc-flows-handlers-forwarding-auth-events-stage2-r02-transcript.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/authentication-oidc-flows-handlers-forwarding-auth-events

# If this archive is still untracked, use git add -N before copying diff.
git add -N _ai-conspects/authentication-oidc-flows-handlers-forwarding-auth-events

git --no-pager diff -- _ai-conspects/authentication-oidc-flows-handlers-forwarding-auth-events > $diffPath
$text = Get-Content $diffPath -Raw
if ([string]::IsNullOrWhiteSpace($text)) {
  Write-Host "Diff is empty. Check whether files are already committed."
} else {
  Set-Clipboard -Value $text
  Write-Host "Full diff saved and copied: $diffPath"
}
```

## Commit commands

```powershell
git add _ai-conspects/authentication-oidc-flows-handlers-forwarding-auth-events
git commit -m "Add auth OIDC R02 cookie auth transcript"
git push origin ai-processed-conspects-text
```

## Notes

This is a larger combined transcript pass. Inventory/ledger remains checklist only; R02 includes local boundary review.
