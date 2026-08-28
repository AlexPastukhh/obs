# Технические исправления — MVC Razor

1. `ResponseCache` — не Tag Helper; это MVC attribute/filter metadata. `<cache>` — Cache Tag Helper.
2. POST FormTagHelper обычно автоматически вставляет antiforgery token. Не добавляйте одновременно второй `@Html.AntiForgeryToken()`.
3. Для decimal validation culture-independent форма:
   ```csharp
   [Range(typeof(decimal), "0.01", "100000")]
   ```
4. TempData предназначена для следующего request, но может быть прочитана в текущем до redirect.
5. ViewBag — dynamic facade над той же ViewData dictionary.
6. Fragment cache не кэширует весь HTTP response.
7. View Components не участвуют в model binding/endpoint pipeline как controllers.
8. Client validation не заменяет server-side ModelState.
9. Новый SVG содержит 43 image uses; прежний repo package закрыл только 41 и использовал другой SVG blob.
