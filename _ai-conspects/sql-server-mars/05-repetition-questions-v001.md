# SQL Server MARS — repetition questions

## Direct recall

1. What does MARS stand for?
2. What connection-string option enables it?
3. Does MARS mean true parallel command execution?
4. What does MARS allow that a normal single-reader connection does not?
5. Why might EF Core buffer roots before issuing later split queries without MARS?
6. How does EF correlate Posts and Contributors to Blogs?
7. What is the difference between an active reader and a concurrently executing command?
8. Which three row/message-returning statement families are shown as yield points?
9. What is SQL Server Service Broker RECEIVE used for?
10. Why does FETCH count as a yield point?
11. Why does EF Core avoid transaction savepoints when MARS is enabled?
12. Does MARS make one connection safe for concurrent use from multiple threads?
13. Which bottlenecks are not fixed by turning on MARS?
14. What is the practical alternative when real parallel work is needed?
15. When is the buffering reduction provided by MARS actually valuable?

## Explain the flow

16. Reconstruct the without-MARS split-query flow for Blogs, Posts, and Contributors.
17. Reconstruct the with-MARS interleaved-reader flow.
18. Explain why the final result is one object graph rather than one combined SQL row.
19. Explain the conflict between active readers and rollback-to-savepoint semantics.
20. Explain why interleaving can still result in blocking.

## Scenario questions

21. A query is CPU-bound because of a bad execution plan. Will MARS likely help?
22. A repository needs to keep a roots reader open while starting a child query. What can MARS change?
23. Two application threads want to share one SqlConnection with MARS enabled. Is that a good design?
24. EF Core needs savepoints for retry/recovery inside a transaction. What MARS-related risk should be checked?
25. A cursor uses repeated FETCH NEXT calls. Where can MARS interleaving occur?
