# Apply archive - transactions-isolation-levels-snapshot-serializable-readcommitted

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-batch-stage0-compositekey-hashcode-transactions-v001.zip"
$target = "_ai-conspects\transactions-isolation-levels-snapshot-serializable-readcommitted"

$OutputEncoding = [System.Text.UTF8Encoding]::new()
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new()

Expand-Archive -Path $zip -DestinationPath . -Force
git add -A -- $target
git status --short -- $target
git diff --cached -- $target | Set-Clipboard
```
