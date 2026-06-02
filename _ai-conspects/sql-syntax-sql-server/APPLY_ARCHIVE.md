# Apply archive: SQL Syntax / SQL Server P03 upsert MERGE DDL transcript v001

Archive type: stage-3 verified transcript.

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
C:\Users\alexa\Downloads\ai-conspects-sql-syntax-sql-server-stage3-p03-upsert-merge-ddl-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-sql-syntax-sql-server-stage3-p03-upsert-merge-ddl-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-sql-syntax-sql-server-stage3-p03-upsert-merge-ddl-transcript.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/sql-syntax-sql-server

git add -N _ai-conspects/sql-syntax-sql-server

git --no-pager diff -- _ai-conspects/sql-syntax-sql-server > $diffPath
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
git add _ai-conspects/sql-syntax-sql-server
git commit -m "Add sql server P03 upsert merge ddl transcript"
git push origin ai-processed-conspects-text
```

## Notes

This is the final transcript region before coverage audit.
