# Apply combined stage0 archive

This folder is one member of the shared five-conspect archive.

```powershell
cd C:\Users\alexa\obs
git checkout ai-processed-conspects-text

$zip = "C:\Users\alexa\Downloads\ai-conspects-headers-identity-searching-compression-hashing-stage0-boundary-review-v001.zip"

$targets = @(
  "_ai-conspects\headers"
  "_ai-conspects\identity"
  "_ai-conspects\searching impl, ef core, full text search,sql server"
  "_ai-conspects\compression,decompression,request,response"
  "_ai-conspects\hashing"
)

Expand-Archive -Path $zip -DestinationPath . -Force
git add -A -- $targets
git status --short -- $targets
```
