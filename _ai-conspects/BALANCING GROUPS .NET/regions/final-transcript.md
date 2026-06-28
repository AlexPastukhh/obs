# Final semantic transcript — .NET regex balancing groups

Authoritative source: `source/BALANCING GROUPS .NET.svg`  
Coverage: **14 unique screenshots / 14 placements + 24 native SVG labels**

---

# R01 — balancing groups as capture stacks

.NET balancing groups can model nested constructs by treating captures of a named group like a stack.

Push an opening token:

```regex
(?<open>\()
```

Pop a previously captured opening token when a closing token appears:

```regex
(?<-open>\))
```

Conceptually:

```text
opening token
    push a capture onto group open

closing token
    require a capture and pop one

end of input
    require the stack to be empty
```

This supports arbitrary nesting depth within regex-engine limits, unlike a fixed number of manually nested groups.

Multiple balancing groups can track independent delimiter families:

```text
paren
    tracks ( )

bracket
    tracks [ ]
```

---

# R02 — final guards and complete matching

A balancing regex must verify that no unmatched openings remain:

```regex
(?(open)(?!))
```

This is a conditional:

```text
if group open currently has captures
    execute (?!), an always-failing negative lookahead

otherwise
    continue
```

The final guard is the empty-stack assertion.

The regex must also consume the complete input. Use whole-string anchors appropriate for the .NET pattern and options:

```regex
\A ... \z
```

or carefully controlled `^ ... $`.

Without complete anchoring, the engine can accept a valid prefix and ignore invalid trailing text.

Alternatives that are repeated must be grouped before applying `*` or `+`, otherwise the quantifier can bind to only one branch.

---

# R03 — matching corresponding names

Balancing groups can enforce stack depth. Matching a closing tag to the most recent opening tag also requires checking the captured tag name against the top capture.

The important invariant is LIFO order:

```text
<a><b></b></a>
    valid nesting order

<a><b></a></b>
    invalid nesting order
```

A pop should occur only when the closing token corresponds to the most recent unmatched opening token. If the comparison fails, that branch fails and the entire anchored match should fail.

Named captures are not a general mutable collection API. The regex engine exposes capture history according to its own matching and backtracking semantics.

---

# R04 — where balancing regexes are appropriate

Good use cases:

```text
balanced parentheses or brackets
small constrained mini-languages
validation of limited nested fragments
teaching capture-stack behavior
```

A regex that resembles an HTML validator remains fragile around:

```text
comments
script/style content
quoted angle brackets
void elements
malformed attributes
namespaces
browser parsing rules
```

Use an HTML/XML parser when real markup correctness matters.

Always consider a timeout for untrusted or complex input:

```csharp
var regex = new Regex(
    pattern,
    RegexOptions.CultureInvariant,
    TimeSpan.FromMilliseconds(200)
);
```

Balancing groups are powerful, but backtracking and nested alternatives can still create expensive searches.

---

# Coverage

```text
unique embedded screenshots: 14
image uses: 14
native SVG labels: 24
duplicate extra placements: 0

processed image uses: 14
processed text labels: 24
remaining unclosed image uses: 0
remaining unclosed text labels: 0
```
