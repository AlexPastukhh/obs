# R02 - Login / user / roles / permissions

Generated: 2026-06-02 15:29:50 UTC

## 0.1 Area overview / key ideas / reading quality

This region is about SQL Server security hierarchy.

The road is:

```text
login vs user
→ authentication vs authorization
→ fixed server roles
→ fixed database roles
→ custom database roles
→ ALTER ROLE / ADD MEMBER
→ GRANT permissions
```

Key ideas:

```text
1. A login is server-level.
2. A user is database-level.
3. Login is mainly authentication: can this principal connect to SQL Server?
4. User/roles/permissions are authorization: what can this principal do inside a database?
5. A login can be mapped to a user in one or more databases.
6. Server roles are instance-wide.
7. Database roles are scoped to one database.
8. Custom roles group permissions for app-specific access.
9. `GRANT` gives permissions to users or roles.
```

Reading quality:

```text
overall: high
included image uses: 11
```

## 0.2 Coverage / boundary review

Included in R02:

```text
S-024, S-025, S-026, S-027, S-028, S-029, S-030, S-031, S-032, S-033, S-070
```

## 1. Login vs user

SQL Server separates identity at two levels.

Server level:

```text
login
```

Database level:

```text
user
```

Analogy:

```text
login = building entrance key
user  = permissions inside a specific room/database
```

A login lets someone connect to the SQL Server instance. A database user lets that login exist inside a specific database and receive permissions there.

Common setup:

```sql
CREATE LOGIN app_login WITH PASSWORD = 'StrongPassword!';
GO

USE AppDb;
GO

CREATE USER app_user FOR LOGIN app_login;
GO
```

## 2. Authentication vs authorization

Authentication:

```text
Who are you?
Can you connect to the SQL Server instance?
```

Authorization:

```text
What can you do in this database/object?
Can you SELECT, INSERT, UPDATE, EXECUTE, ALTER?
```

The notes connect this to the hierarchy:

```text
SQL Server instance
→ login
→ database
→ user
→ roles
→ permissions
```

## 3. Login creation options

SQL login:

```sql
CREATE LOGIN app_login
WITH PASSWORD = 'StrongPassword!';
```

Windows authentication login:

```sql
CREATE LOGIN [DOMAIN\UserName]
FROM WINDOWS;
```

Common options can include password policy/expiration settings and default database.

The important distinction:

```text
server login exists at SQL Server instance level
database user must still be created/mapped in a database
```

## 4. Database user

After creating a login, create a database user in the target database:

```sql
USE AppDb;
GO

CREATE USER app_user FOR LOGIN app_login;
```

A user can also be associated with Windows logins/groups.

This gives the login a database-level identity.

## 5. Fixed server roles

Fixed server roles are built-in instance-level roles.

Examples:

```text
sysadmin
serveradmin
securityadmin
processadmin
setupadmin
bulkadmin
diskadmin
dbcreator
public
```

These affect the server/instance, not just one database.

Be careful:

```text
sysadmin is effectively full control
securityadmin can manage logins and permissions
dbcreator can create/alter/drop databases
```

Use least privilege instead of granting broad fixed server roles by default.

## 6. Fixed database roles

Fixed database roles are built-in roles inside a database.

Common examples:

```text
db_owner
db_datareader
db_datawriter
db_ddladmin
db_securityadmin
db_backupoperator
db_denydatareader
db_denydatawriter
public
```

Examples:

```sql
ALTER ROLE db_datareader ADD MEMBER app_user;
ALTER ROLE db_datawriter ADD MEMBER app_user;
```

These roles apply only inside the current database.

## 7. Custom database roles

Custom roles are useful when fixed roles are too broad.

Create role:

```sql
CREATE ROLE app_readonly;
```

Grant permissions to the role:

```sql
GRANT SELECT ON SCHEMA::dbo TO app_readonly;
```

Add user to role:

```sql
ALTER ROLE app_readonly ADD MEMBER app_user;
```

Now the role defines a reusable permission bundle.

## 8. Granting permissions

`GRANT` gives permissions to a principal.

Examples:

```sql
GRANT SELECT ON dbo.Products TO app_user;
GRANT INSERT ON dbo.Orders TO app_user;
GRANT EXECUTE ON dbo.GetOrders TO app_user;
```

Grant to a role:

```sql
GRANT SELECT ON SCHEMA::dbo TO app_readonly;
```

Common permissions:

```text
SELECT
INSERT
UPDATE
DELETE
EXECUTE
ALTER
CONTROL
```

Better pattern:

```text
grant to roles
add users to roles
avoid granting many permissions directly to individual users
```

## 9. Role membership

Use `ALTER ROLE ... ADD MEMBER`:

```sql
ALTER ROLE app_readonly ADD MEMBER app_user;
```

For fixed database roles:

```sql
ALTER ROLE db_datareader ADD MEMBER app_user;
```

For custom roles:

```sql
ALTER ROLE app_readonly ADD MEMBER app_user;
```

This is more modern than old `sp_addrolemember` style APIs.

## 10. Practical security shape

A typical application setup:

```sql
CREATE LOGIN app_login WITH PASSWORD = 'StrongPassword!';
GO

USE AppDb;
GO

CREATE USER app_user FOR LOGIN app_login;
GO

CREATE ROLE app_executor;
GO

GRANT EXECUTE ON SCHEMA::dbo TO app_executor;
GO

ALTER ROLE app_executor ADD MEMBER app_user;
GO
```

This gives the app the ability to execute stored procedures without granting broad owner privileges.

## 11. Evidence table

| Source group | What it supports |
|---|---|
| S-024-S027 | Login vs user, authentication vs authorization, security hierarchy, Windows auth examples. |
| S-028/S029/S033 | Creating login/user, common options, Windows authentication account, user mapping. |
| S-030/S031/S070 | Fixed server roles, fixed database roles, role membership with `ALTER ROLE ... ADD MEMBER`. |
| S-032 | Custom database roles and granting permissions. |

## 12. Open questions / follow-up hooks

- P02 should cover stored procedures and procedural SQL, including output parameters and rowversion return patterns.
- Later object permissions may reappear around views/procedures; keep the security model here as the prerequisite.
