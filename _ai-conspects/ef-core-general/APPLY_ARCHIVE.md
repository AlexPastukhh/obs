# Apply archive: EF Core EF05A transcript

Archive type: verified region transcript.

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
C:\Users\alexa\Downloads\ai-conspects-ef-core-general-stage11-ef05a-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-ef-core-general-stage11-ef05a-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-ef-core-general-stage11-ef05a.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/ef-core-general

git --no-pager diff -- _ai-conspects/ef-core-general > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
```

## Commit commands

```powershell
git add _ai-conspects/ef-core-general
git commit -m "Add EF Core EF05A unique constraint transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/ef-core-general
```

## Notes

This archive completes EF05A only.

EF05B/EF05C/EF06 remain pending from Stage10 combined boundary review.
