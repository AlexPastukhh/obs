# Apply archive: Time R04 timezone transcript v001

Archive type: stage-3 verified transcript + R03 correction.

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
C:\Users\alexa\Downloads\ai-conspects-time-stage3-r04-timezone-transcript-v001.zip
```

## Apply commands

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-time-stage3-r04-timezone-transcript-v001.zip"
$diffPath = "C:\Users\alexa\Downloads\ai-conspects-time-stage3-r04-timezone-transcript.diff"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

git status --short
Expand-Archive -Path $zip -DestinationPath . -Force

git status --short
git diff --stat -- _ai-conspects/time

git add -N _ai-conspects/time

git --no-pager diff -- _ai-conspects/time > $diffPath
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
git add _ai-conspects/time
git commit -m "Add time R04 timezone transcript"
git push origin ai-processed-conspects-text
```

## Notes

This archive includes one small correction to the previous R03 transcript: S158 belongs to custom-format escaping.
