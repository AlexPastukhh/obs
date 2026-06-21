# R02 - Monitor.Wait / Pulse / PulseAll condition signaling

Generated: 2026-06-20 08:05:01 UTC

`Monitor.Wait` releases the monitor and blocks until signaled, then reacquires the monitor before returning. `Pulse` wakes one waiter; `PulseAll` wakes all waiters.

The standard pattern is to wait in a `while` loop around the condition, because a wakeup does not guarantee the condition is still true.

This region covers producer/consumer coordination, condition loops, and common Wait/Pulse mistakes.

