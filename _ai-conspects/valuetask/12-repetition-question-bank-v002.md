# Вопросы для повторения — ValueTask

1. Какие два состояния представляет `ValueTask<T>`?
2. Где находится основная allocation-выгода?
3. Почему DB-ветка обычно не становится дешевле?
4. Что меняется при добавлении `async` внешнему wrapper?
5. Почему `return cached` корректен внутри `async ValueTask<T>`?
6. Почему нельзя вернуть `ValueTask.FromResult(cached)` из такого async-метода?
7. Как caller ожидает обе ветки?
8. Чем constructor отличается от `FromResult`?
9. Почему ValueTask обычно следует потреблять один раз?
10. Когда нужен `.AsTask()`?
11. Что такое task-backed ValueTask?
12. Что меняет `IValueTaskSource<T>`?
13. Почему `Task.Run` не делает I/O неблокирующим?
14. Напишите cache-first non-async ValueTask method.
15. Когда лучше оставить `Task<T>`?
16. Почему performance choice нужно подтверждать benchmark?
