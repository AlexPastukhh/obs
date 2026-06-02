# Apply archive: Auth/OIDC/Auth Events P03/P04 combined transcript v001

Archive type: stage-3 large combined verified transcript.

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
C:\Users\alexa\Downloads\ai-conspects-authentication-oidc-flows-handlers-forwarding-auth-events-stage3-p03p04-combined-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-authentication-oidc-flows-handlers-forwarding-auth-events-stage3-p03p04-combined-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-authentication-oidc-flows-handlers-forwarding-auth-events-stage3-p03p04-combined-transcript.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/authentication-oidc-flows-handlers-forwarding-auth-events

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
git commit -m "Add auth OIDC JWT and OIDC transcripts"
git push origin ai-processed-conspects-text
```

## Notes

This is a larger combined pass. It processes P03 and P04 in one archive, but keeps separate R03A/R03B/R04 region files so the semantic boundaries remain clear.
