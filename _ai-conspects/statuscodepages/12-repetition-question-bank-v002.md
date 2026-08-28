# Вопросы для повторения — StatusCodePages

1. Для каких responses запускается StatusCodePages?
2. Почему body должен быть empty?
3. Что означает HasStarted?
4. Чем UseStatusCodePages отличается от WithReExecute?
5. Как ограничить обработку API paths?
6. Где фильтровать codes при re-execute?
7. Как получить original path?
8. Почему 406 связан с Accept?
9. Почему 415 связан с Content-Type?
10. Что делает ProblemDetailsFactory?
11. Что делает IProblemDetailsService?
12. Что возвращает TryWriteAsync?
13. Когда нужен JSON fallback?
14. Запускается ли CustomizeProblemDetails?
15. Почему existing Problem body не заменяется?
16. Как content negotiation влияет на writer?
17. Какие поля generic ProblemDetails обычно заполнены?
18. Почему middleware не знает точную business reason?
19. Где ставить StatusCodePages в pipeline?
20. Чем он отличается от exception handler?
