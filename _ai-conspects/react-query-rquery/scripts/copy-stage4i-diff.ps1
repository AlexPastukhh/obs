$diffPath = "C:\Users\alexa\Downloads\ai-conspects-stage4i-combined-corrections.diff"
git --no-pager diff -- _ai-conspects/react-query-rquery > $diffPath
Get-Content $diffPath -Raw | Set-Clipboard
Write-Host "Full diff saved to $diffPath and copied to clipboard."
