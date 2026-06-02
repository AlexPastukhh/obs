# Apply archive: Stage4 NEXT03 CTXDB04 + CTXDB05 transcript

Archive type: verified transcript / large batch.

Target branch:

```text
ai-processed-conspects-text
```

Use `tar.exe -xf` instead of PowerShell `Expand-Archive`.

## Expected download path

```powershell
C:\Users\alexa\Downloads\ai-conspects-ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction-stage4-next03-ctxdb04-ctxdb05-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$target = "_ai-conspects\ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction"
$zip = "C:\Users\alexa\Downloads\ai-conspects-ef-core-context-database-transaction-savechanges-dbconnection-dbtransaction-stage4-next03-ctxdb04-ctxdb05-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\efcore-context-dbtx-stage4-next03-ctxdb04-ctxdb05-cached.diff"

git status --short

tar.exe -xf $zip -C .

git add -A -- "$target"

git status --short -- "$target"
git diff --cached --stat -- "$target"
git diff --cached --name-status -- "$target"

git --no-pager diff --cached -- "$target" > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard

Write-Host "Cached diff saved to $diffPath"
Write-Host "Clipboard length:" (Get-Content $diffPath -Raw).Length
```

## Commit commands

```powershell
git commit -m "Add EF Core context database transaction CTXDB04 CTXDB05 transcript"
git push origin ai-processed-conspects-text
```

## Rollback before commit

```powershell
git restore --staged -- "$target"
git restore -- "$target"
git clean -fd -- "$target"
```

## Notes

This archive completes CTXDB04 and CTXDB05.

NEXT04 should process CTXDB06 + CTXDB07.
