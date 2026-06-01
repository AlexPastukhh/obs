# Apply archive: EF Core EF01B transcript + EF01A correction

Archive type: verified region transcript + boundary correction.

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
C:\Users\alexa\Downloads\ai-conspects-ef-core-general-stage3-ef01b-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-ef-core-general-stage3-ef01b-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-ef-core-general-stage3-ef01b.diff"

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
git commit -m "Add EF Core EF01B loading transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore -- _ai-conspects/ef-core-general
```

## Notes

This archive completes EF01B and corrects EF01A source ownership for S-059/S-060.

S-006/S-029/S-030 are not EF01B and remain pending future boundary review.
