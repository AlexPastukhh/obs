# Apply archive: ASP.NET Core Application Model Conventions final coverage audit v001

Archive type: stage-3 final coverage audit.

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
C:\Users\alexa\Downloads\ai-conspects-conventions-stage3-final-coverage-audit-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-conventions-stage3-final-coverage-audit-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-conventions-stage3-final-coverage-audit-v001.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/conventions

git add -N _ai-conspects/conventions

git --no-pager diff -- _ai-conspects/conventions > $diffPath
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
git add _ai-conspects/conventions
git commit -m "Finalize application model conventions coverage audit"
git push origin ai-processed-conspects-text
```

## Notes

This archive does not add a new transcript. It records final coverage completeness for all 50 image uses.
