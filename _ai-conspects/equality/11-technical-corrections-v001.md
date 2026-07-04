# Technical corrections — Equality

1. `ToString()` is not part of equality correctness.
2. If `Equals` says two objects are equal, `GetHashCode` must return the same hash code.
3. `IEquatable<T>` avoids boxing and gives strongly typed equality.
4. `Equals(object?)`, `Equals(T?)`, `GetHashCode`, `==` and `!=` must agree.
5. Do not include mutable fields in equality/hash code if the object can be used as a dictionary key.
6. `GetEqualityComponents()` is a common value-object pattern; ordering matters.
7. Records synthesize value equality, but class-based value objects must implement it manually.
8. Hash code equality does not imply object equality; it is allowed to collide.
