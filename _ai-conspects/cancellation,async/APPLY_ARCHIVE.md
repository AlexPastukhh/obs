# Apply archive

```powershell
& { Set-Location -LiteralPath "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; git config core.longpaths true; $zip="C:\Users\alexa\Downloads\ai-conspects-cancellation-async-full-svg-repair-final-v002.zip"; tar.exe -xf $zip -C .; $target="_ai-conspects\cancellation,async"; $bundle="_ai-conspects\_bundles\cancellation,async-full-svg-repair-final-v002"; Push-Location -LiteralPath $target; git add -f -A -- .; Pop-Location; Push-Location -LiteralPath $bundle; git add -f -A -- .; Pop-Location; git commit -m "Complete cancellation async full SVG repair"; git push origin ai-processed-conspects-text }
```
