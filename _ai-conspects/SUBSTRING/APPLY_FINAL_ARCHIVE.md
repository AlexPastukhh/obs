# Apply combined final archive

Copy this single physical line into PowerShell and press Enter once:

```powershell
& { $ErrorActionPreference = "Stop"; Set-Location "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; $zip = (Resolve-Path (Join-Path $HOME "Downloads\ai-conspects-fifteen-mixed-conspects-full-transcripts-final-coverage-v001.zip")).Path; $targets = @("_ai-conspects/exaustiveness check with sicr union for enums,classes with inher", "_ai-conspects/STRINGBUILDER", "_ai-conspects/useRef to avoid including into deps array, to avoid rerenders or bad recreations", "_ai-conspects/default values of funcs, how to call, rest params in funcs", "_ai-conspects/BEM", "_ai-conspects/scroll block css", "_ai-conspects/scroll block", "_ai-conspects/remove from arr, copy", "_ai-conspects/uselocation", "_ai-conspects/SUBSTRING", "_ai-conspects/js regex", "_ai-conspects/pseudoel, pseudo with parents stacking context, darp popup on full screen pseudo el", "_ai-conspects/decorator", "_ai-conspects/pivot unpivot", "_ai-conspects/sheet get last"); Expand-Archive -LiteralPath $zip -DestinationPath . -Force; git add -A -- $targets; git status --short -- $targets; git commit -m "Complete fifteen mixed conspect transcripts"; git push origin ai-processed-conspects-text }
```
