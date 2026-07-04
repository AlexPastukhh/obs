# Repetition question bank

1. Что входит в equality contract?
2. Что делает `Equals(object?)`?
3. Что делает `IEquatable<T>.Equals(T?)`?
4. Зачем нужен `GetHashCode()`?
5. Почему равные объекты должны иметь одинаковый hash code?
6. Может ли одинаковый hash code означать разные объекты?
7. Почему `ToString()` не влияет на equality?
8. Когда полезно override `ToString()`?
9. Как реализовать `==` через equality?
10. Как реализовать `!=`?
11. Что такое value object?
12. Что делает `GetEqualityComponents()`?
13. Почему порядок компонентов важен?
14. Почему mutable fields опасны для hash collections?
15. Чем record отличается от class-based value object?
16. Почему `IEquatable<T>` полезен для performance?
17. Что будет, если override Equals, но забыть GetHashCode?
18. Как Dictionary использует hash code?
19. Как HashSet использует equality?
20. Соберите стандартный pattern для `Money`.
