# Технические уточнения — StatusCodePages

1. Middleware предназначен для status 400–599 с empty body; это не exception middleware.
2. WithReExecute повторно выполняет pipeline и должен избегать recursion.
3. Для exact callback/filter удобнее UseStatusCodePages.
4. IStatusCodeReExecuteFeature хранит original path/query.
5. Не отдавайте internal exception details клиенту.
6. Public detail должен быть безопасным и не изображать точную причину, если известен только status.
7. JSON fallback допустим только до начала response.
