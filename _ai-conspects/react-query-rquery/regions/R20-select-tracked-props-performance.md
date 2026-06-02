# R20 - Select / tracked props / performance

Conspect: `react query,rquery`  
File type: **verified region/correction transcript**  
Stage: **6c / transcript v001**  
Generated: 2026-06-02 13:00:55 UTC

---

## Direction check

Goal:
Process the next transcript batch after Stage6b.

Done:
Stage6b processed the upper technical block and left R20/R22/R21/R23 candidates.

Now:
This file processes `18` sources for `R20`.

Why:
The cards are readable and were locally rechecked before marking processed.

Next:
After Stage6c review/commit, process Stage6d R21 + R23.

---

## 0.1 Area overview / key ideas / reading quality

What this area is about:
```text
select, tracked properties, destructuring pitfalls, subscription granularity, selector memoization, and child-component subscription patterns.
```

Key ideas:

- Tracked properties optimize query result field tracking: using `data` does not mean `isFetching` changes must rerender the component.
- `select` optimizes data subscription granularity by subscribing a component to a derived slice of data.
- Destructuring the whole `data` object is not enough to subscribe only to a nested field like `name`.
- Without `select`, if the backend response changes elsewhere in the data object, the component can rerender even if JSX only displays one field.
- With `select`, unchanged selected output can prevent unnecessary rerenders.
- Avoid rest destructuring because it can defeat tracked-property optimization.
- For lists, a parent can subscribe to IDs while children subscribe to item details separately.
- Inline selectors can be recreated on parent rerender; expensive selectors should be memoized.

Reading quality:
```text
Visible text was read from Stage6a source images/contact sheets with OCR assistance.
No OCR-timeout, image-missing, empty-visible-text, or placeholder transcript is used.
If a later review finds a small OCR artifact, fix that source with a precision patch.
```

---

## 0.2 Coverage / boundary review

Included source IDs:
```text
S-427, S-432, S-434, S-435, S-439, S-440, S-442, S-449, S-450, S-451, S-453, S-456, S-459, S-460, S-462, S-466, S-468, S-474
```

Boundary decision:
```text
Included in R20 after Stage6c local visual/semantic recheck.
```

---

## 1. Source inventory

| Source | Image use | fileId short | Stage6a group | Status | Theme |
|---|---|---|---|---|---|
| S-427 | IU-427 | `f300d1e3f8` | `R20` | `verified-visible-ocr-assisted` | 7. Best mental model |
| S-432 | IU-432 | `f9d115e85c` | `R20` | `verified-visible-ocr-assisted` | 1. Two different things are being tracked |
| S-434 | IU-434 | `7af8af0e27` | `R20` | `verified-visible-ocr-assisted` | 4. Concrete comparison |
| S-435 | IU-435 | `2ff8c1ed2c` | `R20` | `verified-visible-ocr-assisted` | 8. Example where select is very useful |
| S-439 | IU-439 | `f85216609d` | `R20` | `verified-visible-ocr-assisted` | Component A only needs total count |
| S-440 | IU-440 | `f45203256b` | `R20` | `verified-visible-ocr-assisted` | Example: |
| S-442 | IU-442 | `9d94722eb4` | `R20` | `verified-visible-ocr-assisted` | If server response changes from: |
| S-449 | IU-449 | `c34c30d1ff` | `R20` | `verified-visible-ocr-assisted` | Layer B — the data value itself |
| S-450 | IU-450 | `354cfa90ec` | `R20` | `verified-visible-ocr-assisted` | With select |
| S-451 | IU-451 | `118de21a71` | `R20` | `verified-visible-ocr-assisted` | 15. Another useful pattern: select for IDs only |
| S-453 | IU-453 | `69361022f8` | `R20` | `verified-visible-ocr-assisted` | Important rule |
| S-456 | IU-456 | `8c2777d94e` | `R20` | `verified-visible-ocr-assisted` | If your component only cares about name , destructuring like this: |
| S-459 | IU-459 | `ec416766ce` | `R20` | `verified-visible-ocr-assisted` | to |
| S-460 | IU-460 | `d773e1a9ce` | `R20` | `verified-visible-ocr-assisted` | 16. select + child components |
| S-462 | IU-462 | `18fbb6e056` | `R20` | `verified-visible-ocr-assisted` | 2. Why destructuring is not enough |
| S-466 | IU-466 | `dca612dbc2` | `R20` | `verified-visible-ocr-assisted` | function TodoItem({ id }: { id: string }) { |
| S-468 | IU-468 | `572bca185e` | `R20` | `verified-visible-ocr-assisted` | and component does: |
| S-474 | IU-474 | `78182e8040` | `R20` | `verified-visible-ocr-assisted` | Example |

---

## 2. Source transcript

### S-427 - 7. Best mental model

Metadata:
```text
source_id: S-427
image_use_id: IU-427
fileId_short: f300d1e3f8
image_file: S-427__f300d1e3f8.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
7. Best mental model
Destructure less

Optimizes query result field tracking
select

Optimizes data subscription granularity
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-432 - 1. Two different things are being tracked

Metadata:
```text
source_id: S-432
image_use_id: IU-432
fileId_short: f9d115e85c
image_file: S-432__f9d115e85c.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
1. Two different things are being tracked
When you call useQuery , there are really two layers:
Layer A — the query result object
Things like:
° data
° isFetching
°  isError
° status
- error
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-434 - 4. Concrete comparison

Metadata:
```text
source_id: S-434
image_use_id: IU-434
fileId_short: 7af8af0e27
image_file: S-434__7af8af0e27.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
4. Concrete comparison
Without select
</> TypeScript
function UserName() {
const { data } = useQuery({
queryKey: [‘user’],
queryFn: fetchUser,
})
return <div>{data?.name}</div>
}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-435 - 8. Example where select is very useful

Metadata:
```text
source_id: S-435
image_use_id: IU-435
fileId_short: 2ff8c1ed2c
image_file: S-435__2ff8c1ed2c.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
8. Example where select is very useful
Imagine query returns whole cart:
<> TypeScript O
type Cart = {
items: { id: string; price: number; qty: number }[]
couponCode: string | null
shippingAddress: string
}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-439 - Component A only needs total count

Metadata:
```text
source_id: S-439
image_use_id: IU-439
fileId_short: f85216609d
image_file: S-439__f85216609d.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Component A only needs total count
</> TypeScript oO
function CartBadge() {
const { data: itemCount } = useQuery({
queryKey: [‘cart'],
queryFn: fetchCart,
select: (cart) => cart.items.reduce((sum, item) => sum + item.qty, 9),
})
return <span>{itemCount}</span>
t
If shipping address changes, but item count stays the same, badge may avoid rerender.
Without select , component would receive whole cart object and rerender more often.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-440 - Example:

Metadata:
```text
source_id: S-440
image_use_id: IU-440
fileId_short: f45203256b
image_file: S-440__f45203256b.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Example:
</> TypeScript O
const query = useQuery(...)
React Query can track which of these properties you used during render.
So if you only read:
<> TypeScript O
const { data } = useQuery(...)
and never read isFetching, then changes to isFetching may not force your component to rerender.
That is what tracked properties is about.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-442 - If server response changes from:

Metadata:
```text
source_id: S-442
image_use_id: IU-442
fileId_short: 9d94722eb4
image_file: S-442__9d94722eb4.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
If server response changes from:
<> TypeScript
{ name: ‘Alice’, email: ‘a@mail.com’ }
to
<> TypeScript
{ name: ‘Alice’, email: ‘new@mail.com' }
your component may rerender because data changed.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-449 - Layer B — the data value itself

Metadata:
```text
source_id: S-449
image_use_id: IU-449
fileId_short: c34c30d1ff
image_file: S-449__c34c30d1ff.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Layer B — the data value itself
Inside data , maybe you have:
</> TypeScript
sf
id: ‘1’,
name: ‘Alice’,
email: ‘a@mail.com’,
settings: {..-},
posts: [...]
}
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-450 - With select

Metadata:
```text
source_id: S-450
image_use_id: IU-450
fileId_short: 354cfa90ec
image_file: S-450__354cfa90ec.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
With select
</> TypeScript
function UserName() {
const { data: name } = useQuery({
queryKey: [‘user’],
queryFn: fetchUser,
select: (user) => user.name,
})
return <div>{name}</div>
}
Same backend change:
</> TypeScript
{ name: ‘Alice’, email: ‘a@mail.com' }
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-451 - 15. Another useful pattern: select for IDs only

Metadata:
```text
source_id: S-451
image_use_id: IU-451
fileId_short: 118de21a71
image_file: S-451__118de21a71.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
15. Another useful pattern: select for IDs only
If full list objects change often, but IDs stay stable, you can subscribe to IDs.
</> TypeScript oO
function TodolIds() {
const { data: ids } = useQuery({
queryKey: [‘todos'],
queryFn: fetchTodos,
select: (todos) => todos.map((t) => t-.id),
})
return <div>{ids?.join(', ')}</div>
t
This can reduce rerenders if object content changes but list membership/order stays same.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-453 - Important rule

Metadata:
```text
source_id: S-453
image_use_id: IU-453
fileId_short: 69361022f8
image_file: S-453__69361022f8.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Important rule

Avoid rest destructuring:
</> TypeScript OD
const { data, ...rest } = useQuery(...)

This can defeat tracked-property optimization because it touches many fields.

Prefer:
</> TypeScript O
const query = useQuery(...)
const { data, isFetching } = query

or destructure only what you need.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-456 - If your component only cares about name , destructuring like this:

Metadata:
```text
source_id: S-456
image_use_id: IU-456
fileId_short: 8c2777d94e
image_file: S-456__8c2777d94e.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
If your component only cares about name , destructuring like this:
</> TypeScript O
const { data } = useQuery(...)
const name = data?-.name
does not automatically mean React Query can subscribe only to name .
From React Query’s point of view, your component still subscribed to data.
So if email changes, or posts changes, the data object may change, and your component can rerender.
That is where select matters.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-459 - to

Metadata:
```text
source_id: S-459
image_use_id: IU-459
fileId_short: ec416766ce
image_file: S-459__ec416766ce.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
to
‘) TypeScript O
{ name: ‘Alice’, email: ‘new@mail.com' }
Selected result is still:
‘) TypeScript OD
"Alice’
So React Query can say:
e selected value did not change
* no need to rerender this component
That is the real benefit.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-460 - 16. select + child components

Metadata:
```text
source_id: S-460
image_use_id: IU-460
fileId_short: d773e1a9ce
image_file: S-460__d773e1a9ce.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
16. select + child components
A powerful pattern is:
e parent subscribes to IDs
e children subscribe to details separately
</> TypeScript
function TodoList() {
const { data: todoIds } = useQuery({
queryKey: [‘todos'],
queryFn: fetchTodos,
select: (todos) => todos.map((t) => t-.id),
})
return (
<ul>
{todoIds?.map((id) => (
<TodoItem key={id} id={id} />
))}
</ul>
)
}
NY
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-462 - 2. Why destructuring is not enough

Metadata:
```text
source_id: S-462
image_use_id: IU-462
fileId_short: 18fbb6e056
image_file: S-462__18fbb6e056.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
2. Why destructuring is not enough
Let’s say query returns:
</> TypeScript
type User = {
id: string
name: string
email: string
notifications: number
t
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-466 - function TodoItem({ id }: { id: string }) {

Metadata:
```text
source_id: S-466
image_use_id: IU-466
fileId_short: dca612dbc2
image_file: S-466__dca612dbc2.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
function TodoItem({ id }: { id: string }) {
const { data: todo } = useQuery({
queryKey: [‘todo', id],
queryFn: () => fetchTodo(id),
})
return <1li>{todo?.text}</1li>
}
This makes updates more local.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-468 - and component does:

Metadata:
```text
source_id: S-468
image_use_id: IU-468
fileId_short: 572bca185e
image_file: S-468__572bca185e.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
and component does:
<) TypeScript OD
function UserName() {
const { data } = useQuery({
queryKey: [‘user’],
queryFn: fetchUser,
})
return <div>{data?.name}</div>
}
You might think:
“| only use name , so why rerender if email changes?”
Because React Query gave you the whole data object.
Your component is subscribed to the query result containing that data.
If the fetched data changes, React Query may deliver anew data reference, and your component
rerenders.
Even though your JSX only displays name .
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

### S-474 - Example

Metadata:
```text
source_id: S-474
image_use_id: IU-474
fileId_short: 78182e8040
image_file: S-474__78182e8040.png
stage6a_group: R20
stage6c_region: R20
status: verified-visible-ocr-assisted
transcript_method: Stage6c visible read from source image; OCR-assisted
```

#### Verified visible text
```text
Example
Inline selector
<> TypeScript O
function UserName() {
const { data } = useQuery({
queryKey: [‘user'],
queryFn: fetchUser,
select: (user) => user.name,
})
return <div>{data}</div>
t
If UserName rerenders because its parent rerendered, this inline function is created again.
So even if cached user data is unchanged, React Query now sees a new selector reference.
That can cause the selection step to run again.
```

#### Notes

Visible text present; OCR-assisted read, not an OCR-timeout/error placeholder.

---

## 3. Cleaned source notes

- Tracked properties optimize query result field tracking: using `data` does not mean `isFetching` changes must rerender the component.
- `select` optimizes data subscription granularity by subscribing a component to a derived slice of data.
- Destructuring the whole `data` object is not enough to subscribe only to a nested field like `name`.
- Without `select`, if the backend response changes elsewhere in the data object, the component can rerender even if JSX only displays one field.
- With `select`, unchanged selected output can prevent unnecessary rerenders.
- Avoid rest destructuring because it can defeat tracked-property optimization.
- For lists, a parent can subscribe to IDs while children subscribe to item details separately.
- Inline selectors can be recreated on parent rerender; expensive selectors should be memoized.

---

## 4. Evidence table

| Claim | Evidence | Confidence |
|---|---|---|
| Tracked properties and `select` solve different layers of rerender optimization. | S-427, S-432, S-440 | high |
| Without select, the component receives/depends on the full data object. | S-434, S-442, S-449, S-462, S-468 | high |
| With select, selected values like `user.name` or cart count can avoid rerenders when unrelated data changes. | S-435, S-439, S-450, S-459 | high |
| Rest destructuring can defeat tracked-property optimization. | S-453 | high |
| ID-only parent subscriptions and per-item child subscriptions make updates more local. | S-451, S-460, S-466 | high |
| Inline selectors can recompute if selector reference changes. | S-474 | medium-high |

---

## 5. Open review issues

- This file is valid for Stage6c because every included source has visible text and no OCR-placeholder processed source.
- Remaining Stage6a groups are not closed by this file: R21/R23.
- Stage6 closure audit must run after Stage6d is complete.
