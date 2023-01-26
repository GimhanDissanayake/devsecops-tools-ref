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
