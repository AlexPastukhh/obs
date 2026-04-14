---

excalidraw-plugin: parsed
tags: [excalidraw]

---
==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: 'Decompress current Excalidraw file'. For more info check in plugin settings under 'Saving'


# Excalidraw Data
## Text Elements
public abstract class Specification<T>
{
    public static readonly Specification<T> All = new IdentitySpecification<T>();

    public bool IsSatisfiedBy(T entity)
    {
        Func<T, bool> predicate = ToExpression().Compile();
        return predicate(entity);
    }

    public abstract Expression<Func<T, bool>> ToExpression();

    public Specification<T> And(Specification<T> specification)
    {
        if (this == All)
            return specification;
        if (specification == All)
            return this;
        return new AndSpecification<T>(this, specification);
    }

    public Specification<T> Or(Specification<T> specification)
    {
        if (this == All || specification == All)
            return All;
        return new OrSpecification<T>(this, specification);
    }

    public Specification<T> Not()
    {
        return new NotSpecification<T>(this);
    }
}


 ^bOR2QoDA

internal sealed class AndSpecification<T> : Specification<T>
{
    private readonly Specification<T> _left;
    private readonly Specification<T> _right;

    public AndSpecification(Specification<T> left, Specification<T> right)
    {
        _left = left;
        _right = right;
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        Expression<Func<T, bool>> leftExpression = _left.ToExpression();
        Expression<Func<T, bool>> rightExpression = _right.ToExpression();

        BinaryExpression andExpression = Expression.AndAlso(leftExpression.Body, rightExpression.Body);

        return Expression.Lambda<Func<T, bool>>(andExpression, leftExpression.Parameters.Single());
    }
} ^7kSdlkE8

internal sealed class OrSpecification<T> : Specification<T>
{
    private readonly Specification<T> _left;
    private readonly Specification<T> _right;

    public OrSpecification(Specification<T> left, Specification<T> right)
    {
        _left = left;
        _right = right;
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        Expression<Func<T, bool>> leftExpression = _left.ToExpression();
        Expression<Func<T, bool>> rightExpression = _right.ToExpression();

        BinaryExpression orExpression = Expression.OrElse(leftExpression.Body, rightExpression.Body);

        return Expression.Lambda<Func<T, bool>>(orExpression, leftExpression.Parameters.Single());
    }
} ^SU2XjYgN

internal sealed class NotSpecification<T> : Specification<T>
{
    private readonly Specification<T> _specification;

    public NotSpecification(Specification<T> specification)
    {
        _specification = specification;
    }

    public override Expression<Func<T, bool>> ToExpression()
    {
        Expression<Func<T, bool>> expression = _specification.ToExpression();
        UnaryExpression notExpression = Expression.Not(expression.Body);

        return Expression.Lambda<Func<T, bool>>(notExpression, expression.Parameters.Single());
    }
} ^TL8kg2uV

internal sealed class IdentitySpecification<T> : Specification<T>
{
    public override Expression<Func<T, bool>> ToExpression()
    {
        return x => true;
    }
}
 ^YWkaiysB

## Embedded Files
db339ddb1983d0adc94040140594e74f01e12738: [[image_1506.png]]

410fd2c3d395809ffcb9d7311cfd5428afc08694: [[image_1507.png]]

0d05c546b206820a4e11a05d31c2f5e7a4959b18: [[image_1508.png]]

728a3c7f57b730cfd2d051ac079d5cf3d60b1e1c: [[image_1509.png]]

bfba315a6409b24735e8d1c8fd8708470cedc3b9: [[image_1510.png]]

55da8cdceb3b570e8e555197b2b5b0b9c14193b7: [[image_1511.png]]

%%
## Drawing
```compressed-json
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
```
%%