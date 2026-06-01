# Apply archive: EF Core general source check v001

Archive type: source check / materialization.

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
C:\Users\alexa\Downloads\ai-conspects-ef-core-general-stage0-source-check-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-ef-core-general-stage0-source-check-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-ef-core-general-stage0.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/ef-core-general

# Save full diff to file and copy to clipboard. Do not print it and do not open a pager.
git --no-pager diff -- _ai-conspects/ef-core-general > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
```

## Commit commands

```powershell
git add _ai-conspects/ef-core-general
git commit -m "Start EF Core general conspect source check"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/ef-core-general
```

## Notes

This archive does not create a verified transcript yet.

It only materializes the uploaded SVG into a safe source checklist and contact sheets.
