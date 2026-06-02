# R01 - Database creation / master / model / GO / files

Generated: 2026-06-02 15:29:50 UTC

## 0.1 Area overview / key ideas / reading quality

This region is about SQL Server database creation and basic admin context.

The road is:

```text
CREATE DATABASE
→ ON PRIMARY / LOG ON
→ file options
→ default log behavior and size/growth
→ master database
→ model database
→ system databases
→ GO and batches
→ multiple windows / multiple connections
```

Key ideas:

```text
1. `CREATE DATABASE` can specify primary data files and transaction log files.
2. `ON PRIMARY` describes the primary data file group/file placement.
3. `LOG ON` describes transaction log files.
4. File options include logical name, physical path, initial size, max size, and growth.
5. SQL Server creates a log file by default if one is not explicitly specified.
6. `master` is instance-level metadata and configuration.
7. `model` is the template for new databases.
8. `GO` is a batch separator understood by SQL Server tools, not by the SQL Server engine as T-SQL.
9. Separate query windows can mean separate connections/sessions and can behave differently around context and variables.
```

Reading quality:

```text
overall: high
included image uses: 36
```

## 0.2 Coverage / boundary review

Included in R01:

```text
S-034, S-035, S-036, S-037, S-038, S-039, S-040, S-041, S-042, S-043, S-044, S-045, S-046, S-047, S-048, S-049, S-050, S-051, S-052, S-053, S-054, S-055, S-056, S-057, S-058, S-059, S-060, S-061, S-062, S-063, S-064, S-065, S-066, S-067, S-068, S-069
```

Checked but not included in P01:

```text
S-001, S-002, S-003, S-071, S-072
```

Reason: these are neighboring stored-procedure/DML screenshots and are reserved for P02/R03R04.

## 1. `CREATE DATABASE` basic structure

A basic database creation command:

```sql
CREATE DATABASE TestDb;
```

The fuller shape can include data files and log files:

```sql
CREATE DATABASE TestDb
ON PRIMARY
(
    NAME = TestDb_Data,
    FILENAME = 'C:\SqlData\TestDb.mdf',
    SIZE = 10MB,
    MAXSIZE = 100MB,
    FILEGROWTH = 10MB
)
LOG ON
(
    NAME = TestDb_Log,
    FILENAME = 'C:\SqlData\TestDb.ldf',
    SIZE = 5MB,
    MAXSIZE = 50MB,
    FILEGROWTH = 5MB
);
```

Meaning:

```text
database name       -> logical database name
ON PRIMARY          -> primary data file/filegroup section
LOG ON              -> transaction log section
NAME                -> logical file name inside SQL Server
FILENAME            -> physical file path
SIZE                -> initial size
MAXSIZE             -> maximum size
FILEGROWTH          -> growth step
```

## 2. Primary data files and log files

Primary data file:

```text
stores database data and metadata
often has .mdf extension
belongs to PRIMARY filegroup by default
```

Log file:

```text
stores transaction log records
often has .ldf extension
required for recovery and transaction consistency
```

The notes separate the sections:

```text
ON PRIMARY -> data file options
LOG ON     -> log file options
```

This makes the physical layout explicit and avoids relying only on defaults.

## 3. Default database/log behavior

If you do not specify a log file, SQL Server still creates one.

The default values come from server/database defaults and, for new database templates, from `model`.

The practical point:

```text
CREATE DATABASE without LOG ON does not mean "no log".
Every database has a transaction log.
```

This matters because log growth and max size can surprise you if defaults are not understood.

## 4. Checking database files

System views can be used to inspect created files.

Typical query shape:

```sql
SELECT
    name,
    type_desc,
    physical_name,
    size / 128.0 AS CurrentSizeMB,
    CASE max_size
        WHEN -1 THEN 'UNLIMITED'
        ELSE CAST(max_size / 128.0 AS varchar(20)) + ' MB'
    END AS MaxSizeMB,
    growth
FROM sys.master_files
WHERE database_id = DB_ID('TestDb');
```

Important conversion:

```text
size is stored in 8KB pages
size / 128.0 = MB
```

This explains the proof/check for log/data current size and limits.

## 5. `master`

`master` is a SQL Server system database.

Purpose:

```text
instance-level metadata
logins
server configuration
endpoints
database metadata
system-level information
```

If `master` is damaged, the instance can be unusable.

Practical rule:

```text
do not create user application tables in master
use master for instance-level operations and metadata queries
```

## 6. `model`

`model` is the template database used when SQL Server creates a new database.

If you customize `model`, those customizations can appear in future databases.

Examples of defaults affected by `model`:

```text
recovery model
file sizes / growth settings
database options
objects intentionally placed in model
```

The notes show checking model defaults and demonstrate that changes in `model` can influence newly created databases.

Use this carefully:

```text
changing model affects future databases, not existing ones
```

## 7. System databases

Important system databases:

```text
master
model
msdb
tempdb
Resource
```

Basic purpose:

```text
master   -> instance metadata and configuration
model    -> template for new databases
msdb     -> SQL Agent jobs, backup history, maintenance metadata
tempdb   -> temporary objects and working space; recreated on restart
Resource -> hidden read-only system objects
```

The road emphasizes knowing what each contains and why you normally should not use system databases as regular application databases.

## 8. `GO`

`GO` separates batches in SQL Server tools such as SSMS or sqlcmd.

Important:

```text
GO is not a T-SQL command.
SQL Server engine does not execute GO.
The client tool splits the script at GO and sends separate batches.
```

Example:

```sql
CREATE DATABASE DemoDb;
GO

USE DemoDb;
GO

CREATE TABLE dbo.Items
(
    Id int NOT NULL
);
GO
```

Why `GO` matters:

```text
some DDL statements must be first/alone in a batch
variables do not cross GO boundaries
it can separate context-changing operations
```

## 9. `GO n`

`GO` can repeat the previous batch in tools that support it:

```sql
PRINT 'Hello';
GO 5
```

This executes the batch five times.

The notes warn that this can accidentally run `CREATE` or `INSERT` logic multiple times if used carelessly.

## 10. Variable scope across batches

Variables declared before `GO` do not exist after `GO`:

```sql
DECLARE @x int = 1;
GO

SELECT @x; -- error: variable no longer exists
```

Reason:

```text
GO starts a new batch
local T-SQL variables are batch-scoped
```

## 11. Multiple query windows / connections

Multiple query windows can mean multiple connections.

That can affect:

```text
database context
transactions
temp tables
variables
settings
locks
```

Practical takeaway:

```text
If a script behaves differently in another query window, check connection/session context and selected database.
```

The notes also mention confusing behavior around using `model` or another database in one query file/window and seeing different results in another.

## 12. Evidence table

| Source group | What it supports |
|---|---|
| S-034-S040 | `CREATE DATABASE`, `ON PRIMARY`, `LOG ON`, data/log file options. |
| S-041-S045/S048/S050/S052 | Defaults, default log creation, 2GB/log-size notes, proof/checks. |
| S-046/S047/S049/S051/S053 | Multiple query windows/connections and context/session behavior. |
| S-054-S057 | `master`, what it contains, `model`, and checking/customizing model defaults. |
| S-058-S067 | `GO`, batch separation, variable scope, repeated execution, mistakes. |
| S-068/S069 | System databases and practical demonstration around master/model/GO. |

## 13. Open questions / follow-up hooks

- P02 should pick up stored-procedure/output-param/DML/control-flow screenshots.
- Security is split into R02 in the same P01 archive because it is another server/admin road.
- Later DDL/index/view material belongs to P03/R05, not this database-creation region.
