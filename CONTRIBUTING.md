# Contributing

Thank you for considering contributing! There are many ways you can help.

## Issues

File an issue if you think you've found a bug. Be sure to describe

1. How can it be reproduced?
2. What did you expect?
3. What actually occurred?
4. Version, platform, etc. if possibly relevant.

## Docs

Documentation, READMEs, and examples are extremely important. Please help improve them and if you find a typo or notice a problem, please send a fix or say something.

## Submitting Patches

Patches for fixes, features, and improvements are accepted through pull requests.

* Write good commit messages, in the present tense! (Add X, not Added X). Short title, blank line, bullet points if needed. Capitalize the first letter of the title or bullet item. No punctuation in the title.
* Code must pass lint and style checks.
* All external methods must be documented.
* Include tests to improve coverage and prevent regressions.
* Squash changes into a single commit per feature/fix. Ask if you're unsure how to discretize your work.

Please ask before embarking on a large improvement so you're not disappointed if it does not align with the goals of the project or owner(s).

## Commit message format

We use [semantic-release](https://www.npmjs.com/package/semantic-release), which requires commit messages to be in this specific format: `<type>(<scope>): <subject>`

* Types:
  * feat (feature)
  * fix (bug fix)
  * docs (documentation)
  * style (formatting, missing semi colons, …)
  * refactor
  * test (when adding missing tests)
  * chore (maintain)
* Scope: anything that specifies the scope of the commit. Can be blank or `*`
* Subject: description of the commit. For **breaking changes** that require major version bump, add `BREAKING CHANGE` to the commit message.

**Examples commit messages:**
* Bug fix: `fix: Remove extra space`
* Breaking change: `feat(api): Add webhook data-schema. BREAKING CHANGE: webhook input will be validated now`

## Feature Requests

Make the case for a feature via an issue with a good title. The feature should be discussed and given a target inclusion milestone or closed.

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