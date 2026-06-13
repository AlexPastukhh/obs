# Apply archive: ASP.NET Core Application Model Conventions Stage0 v001

Archive type: stage-0 boundary review and split plan.

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
C:\Users\alexa\Downloads\ai-conspects-aspnet-core-application-model-conventions-stage0-boundary-review-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-aspnet-core-application-model-conventions-stage0-boundary-review-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-aspnet-core-application-model-conventions-stage0-boundary-review-v001.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/aspnet-core-application-model-conventions

git add -N _ai-conspects/aspnet-core-application-model-conventions

git --no-pager diff -- _ai-conspects/aspnet-core-application-model-conventions > $diffPath
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
git add _ai-conspects/aspnet-core-application-model-conventions
git commit -m "Start application model conventions boundary review"
git push origin ai-processed-conspects-text
```

## Notes

Stage0 is inventory/split plan only. Do not treat region ownership as final until transcript boundary review.
