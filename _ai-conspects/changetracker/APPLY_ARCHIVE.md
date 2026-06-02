# Apply archive: ChangeTracker Stage0 boundary review v001

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
C:\Users\alexa\Downloads\ai-conspects-changetracker-stage0-boundary-review-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-changetracker-stage0-boundary-review-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-changetracker-stage0-boundary-review.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/changetracker

git add -N _ai-conspects/changetracker

git --no-pager diff -- _ai-conspects/changetracker > $diffPath
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
git add _ai-conspects/changetracker
git commit -m "Start changetracker conspect boundary review"
git push origin ai-processed-conspects-text
```

## Notes

This is not a transcript archive. It prepares a safe workflow and first split plan.
