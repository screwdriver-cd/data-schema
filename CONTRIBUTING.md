# Contributing

Have a look at our guidelines, as well as pointers on where to start making changes, in our official [documentation](http://docs.screwdriver.cd/about/contributing).

## Migrations

When adding any fields to `models` in the `data-schema`, you will need to add a migration file. Sequelize-cli migrations keep track of changes to the database, helping with adding and/or reverting the changes to the DB. They also ensure models and migration files are in sync.

### Migration files

Create new migration files for any new DDL changes. Do not edit or remove migration files even after it's migrated and available in the database. 

Reference links: 
1. https://sequelize.org/master/manual/migrations.html
2. https://github.com/sequelize/cli/tree/master

_CAUTION: Create migrations user (sd_migrator) in DB and this user should be given restrictive privileges to perform DDL operations. Be careful when reverting migrations, as this may end up in table getting DELETED if the user has PRIVILEGES.

### Existing Screwdriver instance
Create a new table SequelizeMeta in the existing screwdriver database. Insert a record (name column matching filename) into the SequelizeMeta table for each 20190919-initdb- file under the migrations folder. This will ensure migrations will not run for these files. After insert, verify the SequelizeMeta table has 16 records.

```bash
    CREATE TABLE public."SequelizeMeta" (
        name character varying(255) NOT NULL,
        updated timestamp without time zone DEFAULT now(),
        CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name)
    )

    INSERT INTO public."SequelizeMeta"(name) VALUES ('20190919-initdb-banners.js');
```

### New Screwdriver instance
To track migrations timestamp, create new table SequelizeMeta as below in existing screwdriver database; otherwise sequelize-cli will automatically create SequelizeMeta without 'updated' column.

```bash
    CREATE TABLE public."SequelizeMeta" (
        name character varying(255) NOT NULL,
        updated timestamp without time zone DEFAULT now(),
        CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name)
    )
```

### Environment variables 

```bash
postgres - postgres://user:password@host:port/db
mysql - mysql://user:password@host:post/db
sqlite - sqlite:/dir/file.db

DEV_DATASTORE_SEQUELIZE_URL => dialect://username:password@devhost:port/database_name
TEST_DATASTORE_SEQUELIZE_URL => dialect://username:password@testhost:port/database_name
DATASTORE_SEQUELIZE_URL => dialect://username:password@prodhost:port/database_name
DATASTORE_SEQUELIZE_PREFIX => if table names need to be prefixed (ex: 'beta-')
```

### Usage
```bash
postgres: npm install npx pg sequelize sequelize-cli 
mysql: npm install npx mysql2 sequelize sequelize-cli 
sqlite3: npm install npx sqlite3 sequelize sequelize-cli 

npx sequelize-cli db:migrate --env=development --config=./config/migrationsConfig.js --migrations-path=./migrations

npx sequelize-cli db:migrate:undo --env=development --config=./config/migrationsConfig.js --migrations-path=./migrations
``` 