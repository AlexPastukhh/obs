# Технические уточнения — ValueTask

1. `ValueTask<T>` обычно следует потреблять один раз, особенно если он backed by `IValueTaskSource<T>`.
2. Для повторного ожидания, кэширования или нескольких consumers используйте `.AsTask()`.
3. `async ValueTask<T>` допустим, но не гарантирует отсутствие allocation.
4. EF Core и `HttpClient` обычно возвращают Task; wrapper не отменяет их стоимость.
5. Публичные APIs часто лучше оставлять на `Task<T>` из-за более простых правил composition.
6. Выбирайте ValueTask только для измеренного hot path с частым synchronous completion.
