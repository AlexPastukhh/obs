# Apply archive

```powershell
& { Set-Location -LiteralPath "C:\Users\alexa\obs"; git checkout ai-processed-conspects-text; git config core.longpaths true; $zip="C:\Users\alexa\Downloads\ai-conspects-manual-lockout-ratelimiter-redis-full-svg-repair-final-v002.zip"; tar.exe -xf $zip -C .; $target="_ai-conspects\manual account lockout,ratelimiter middleware, idatabase vs idist cache"; $bundle="_ai-conspects\_bundles\manual-lockout-ratelimiter-redis-full-svg-repair-final-v002"; Push-Location -LiteralPath $target; git add -f -A -- .; Pop-Location; Push-Location -LiteralPath $bundle; git add -f -A -- .; Pop-Location; git commit --only -m "Complete manual lockout RateLimiter Redis full SVG repair" -- "$target" "$bundle"; git push origin ai-processed-conspects-text }
```
