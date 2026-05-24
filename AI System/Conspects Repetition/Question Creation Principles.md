# Question Creation Principles

Status: planning draft

## 1. Questions are a main repeat method

Questions are not only for weak parts.

Rule:

```text
Every topic note should have a markdown question note.
Repeating a topic means answering questions, not only rereading.
```

## 2. Question note per topic note

Preferred structure:

```text
Topics/Server/Antiforgery.md
Topics/Server/Antiforgery.questions.md
```

The question note should link back to the topic note.

## 3. Question types

AI should create questions that test:

```text
- core definitions;
- why the concept exists;
- step-by-step flows;
- comparisons;
- common mistakes;
- edge cases;
- practical usage;
- section-specific understanding;
- weak points found during repetition.
```

## 4. Good questions

Good repeat questions should:

```text
- force recall, not recognition;
- ask for explanation from memory;
- expose hidden gaps;
- be answerable from the topic note;
- be grouped by topic section when the topic note is large;
- include practical examples when useful;
- avoid yes/no questions unless followed by why/how.
```

## 5. Section-specific scope

When a topic note becomes large, area-day notes may point to a section instead of the whole note.

Example:

```md
- [[Antiforgery#Token validation flow]]
  Questions: [[Antiforgery.questions#Token validation flow]]
```

The user can choose the section manually when needed.

## 6. Weak-point questions

If a weak part is found during a scheduled repeat, AI should:

```text
- add or update weak-point questions in the topic question note;
- create a focused repeat session note if the part needs earlier/special repeat;
- avoid pasting long topic fragments into area-day/general notes.
```

## 7. Suggested question note format

```md
# Topic Name — Questions

Source:
- [[Topic Name]]

## Core questions

- 

## Flow / process questions

- 

## Comparison questions

- 

## Practical questions

- 

## Section-specific questions

### Section name

- 

## Weak-point questions

- 
```
