# Apply archive: Produces Consumes Formatters P01 transcript v001

Archive type: stage-1 verified combined transcript.

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
C:\Users\alexa\Downloads\ai-conspects-produces-consumes-input-output-formatters-406-415-vary-accept-stage1-p01-produces-consumes-formatters-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-produces-consumes-input-output-formatters-406-415-vary-accept-stage1-p01-produces-consumes-formatters-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-produces-consumes-input-output-formatters-406-415-vary-accept-stage1-p01-produces-consumes-formatters-transcript-v001.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/produces-consumes-input-output-formatters-406-415-vary-accept

git add -N _ai-conspects/produces-consumes-input-output-formatters-406-415-vary-accept

git --no-pager diff -- _ai-conspects/produces-consumes-input-output-formatters-406-415-vary-accept > $diffPath
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
git add _ai-conspects/produces-consumes-input-output-formatters-406-415-vary-accept
git commit -m "Add produces consumes formatters P01 transcript"
git push origin ai-processed-conspects-text
```

## Notes

This archive closes P01/R01R02 and reserves 406/415 diagnostics plus Vary/Accept screenshots for P02.
