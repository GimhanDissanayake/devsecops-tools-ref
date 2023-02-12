# Creates the login AbolrousHazem with password '340$Uuxwp7Mcxo7Khy'.  
CREATE LOGIN AbolrousHazem   
    WITH PASSWORD = '340$Uuxwp7Mcxo7Khy';  
GO  

# Creates a database user for the login created above.  
CREATE USER AbolrousHazem FOR LOGIN AbolrousHazem;  
GO  

# Add a role to user
ALTER ROLE db_datawriter ADD MEMBER AbolrousHazem;

# Remove a user from role
ALTER ROLE db_datawriter DROP MEMBER BaAbolrousHazemrry;   

# List all users
select name as username,
       create_date,
       modify_date,
       type_desc as type,
       authentication_type_desc as authentication_type
from sys.database_principals
where type not in ('A', 'G', 'R', 'X')
      and sid is not null
      and name != 'guest'
order by username;

# List members of the database roles.

SELECT DP1.name AS DatabaseRoleName,   
   isnull (DP2.name, 'No members') AS DatabaseUserName   
 FROM sys.database_role_members AS DRM  
 RIGHT OUTER JOIN sys.database_principals AS DP1  
   ON DRM.role_principal_id = DP1.principal_id  
 LEFT OUTER JOIN sys.database_principals AS DP2  
   ON DRM.member_principal_id = DP2.principal_id  
WHERE DP1.type = 'R'
ORDER BY DP1.name;  

# Change default schema
ALTER USER AbolrousHazem WITH DEFAULT_SCHEMA = db_name;
GO

# Create new Role
CREATE ROLE db_droptable;
GO 

# List all schemas
select s.name as schema_name,
    s.schema_id,
    u.name as schema_owner
from sys.schemas s
    inner join sys.sysusers u
        on u.uid = s.principal_id
order by s.name

# Grant permission to Role
GRANT ALTER ON SCHEMA::stg TO db_droptable;
GRANT CREATE TABLE TO db_tablemanagement;

# lists all permissions explicitly granted or denied to principals in the database
SELECT DISTINCT pr.principal_id, pr.name, pr.type_desc, 
    pr.authentication_type_desc, pe.state_desc, pe.permission_name
FROM sys.database_principals AS pr
JOIN sys.database_permissions AS pe
    ON pe.grantee_principal_id = pr.principal_id;

# lists all permissions on a schema level
SELECT DISTINCT 
       pr.principal_id
     , pr.name AS [UserName]
     , pr.type_desc AS [User_or_Role]
     , pr.authentication_type_desc AS [Auth_Type]
     , pe.state_desc
     , pe.permission_name
     , pe.class_desc
     , coalesce(o.[name], sch.name) AS [Object]
FROM sys.database_principals AS pr
    JOIN sys.database_permissions AS pe
        ON pe.grantee_principal_id = pr.principal_id
    LEFT JOIN sys.objects AS o
        ON o.object_id = pe.major_id
    LEFT JOIN sys.schemas AS sch
        ON sch.schema_id = pe.major_id
        AND class_desc = 'SCHEMA'

# TABLE MANAGEMENT
CREATE TABLE stg.test_table (
    testorders_uuid VARCHAR(max) NULL, 
    testcreated_date VARCHAR(max) NULL, 
);

DROP TABLE IF EXISTS stg.test_table;