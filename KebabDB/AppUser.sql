-- This file contains SQL statements that will be executed after the build script.

-- if executing this on your own database
-- add the login azfunction to the server by executing
-- CREATE LOGIN azfunction WITH PASSWORD='##your##password##here##';
-- against master db

CREATE USER azfunction
FROM LOGIN azfunction
WITH DEFAULT_SCHEMA=dbo;
GO

EXEC sp_addrolemember 'db_datareader', 'azfunction';

EXEC sp_addrolemember 'db_datawriter', 'azfunction';


CREATE ROLE serverless_app;
EXEC sp_addrolemember 'serverless_app', 'azfunction';

GRANT EXECUTE ON OBJECT ::dbo.saveRecipe  
    TO serverless_app;


GRANT EXECUTE ON OBJECT ::dbo.getRecord  
    TO serverless_app;
