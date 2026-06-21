# R01 - SQL Server MARS purpose / connection / reader basics

Generated: 2026-06-20 08:05:01 UTC

MARS means Multiple Active Result Sets. It is a SQL Server connection feature that permits more than one active result set on the same connection.

Without MARS, an open DataReader usually blocks another command on that connection until the reader is closed. MARS is enabled through the connection string option `MultipleActiveResultSets=True`.

This region covers why MARS exists, DataReader basics, and what MARS does not imply.

