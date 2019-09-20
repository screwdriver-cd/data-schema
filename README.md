# Screwdriver Data Schema
[![Version][npm-image]][npm-url] ![Downloads][downloads-image] [![Build Status][status-image]][status-url] [![Open Issues][issues-image]][issues-url] [![Dependency Status][daviddm-image]][daviddm-url] ![License][license-image]

> Internal data schema of [Screwdriver](https://github.com/screwdriver-cd/screwdriver)

## Description

This contains the structure/validation for all the models/resources of Screwdriver.

It's broken down into five (5) sections:
 - `api` - API related input/output structure
 - `config` - Screwdriver.yaml definitions
 - `models` - Internal data resources (pipeline, job, build, collection etc.)
 - `plugins` - Plugins (datastore, executor, etc.)
 - `core` - SCM plugin related output structure

## Models

The model represents a combination of what is required to create the resource and what is possible for returning from the resource.

### Methodology

Each model contains eight (8) schemas:
 - `base` - List of all available fields in the model
 - `allKeys` - List of all fields in the model
 - `get` - Expected return values from a GET request against this resource
 - `create` - Expected input values when making a CREATE action against this resource
 - `update` - Expected input values when making an UPDATE action against this resource
 - `keys` - List of keys that combine to represent a unique row
 - `tableName` - Internal name of the table
 - `indexes` - Secondary indexes to make search/lookup faster

## Migrations
sequelize-cli migrations keep track of changes to the database, will help to get to new state and revert the changes in order to get back to the old or desired state.

reference links: 
1. https://sequelize.org/master/manual/migrations.html
2. https://github.com/sequelize/cli/tree/master

CAUTION: Create migrations user (sd_migrator) in DB and this user should be given restrictive privileges to perform DDL operations. Be careful when reverting migrations, as this may end up in table getting deleted if user has privileges.

### Existing Screwdriver instance
Create new table SequelizeMeta in existing screwdriver database. Insert a record (name column matching filename) into SequelizeMeta table for each initdb- file under migrations folder. This will ensure migrations will not run for these files. 

```bash
    CREATE TABLE public."SequelizeMeta" (
        name character varying(255) NOT NULL,
        updated timestamp without time zone DEFAULT now(),
        CONSTRAINT "SequelizeMeta_pkey" PRIMARY KEY (name)
    )

    INSERT INTO public."SequelizeMeta"(name) VALUES ('initdb-banners.js');
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
DEV_DATASTORE_SEQUELIZE_URL => dialect://username:password@host/database_name
TEST_DATASTORE_SEQUELIZE_URL => dialect://username:password@host/database_name
DATASTORE_SEQUELIZE_URL => dialect://username:password@host/database_name
DATASTORE_SEQUELIZE_OWNER => default: postgres
DATASTORE_SEQUELIZE_SCHEMA => default: public
DATASTORE_SEQUELIZE_LOCKTIMEOUT => default: '2s'
DATASTORE_SEQUELIZE_PREFIX => if table names need to be prefixed (ex: 'beta-')

### Usage
pg, sequelize, sequelize-cli npm packages are pre-requisite for npx sequelize.

```bash
npm install pg sequelize sequelize-cli 

npx sequelize db:migrate --env=development --config=./config/migrationsConfig.js --migrations-path=./migrations

npx sequelize db:migrate:undo --env=development --config=./config/migrationsConfig.js --migrations-path=./migrations
``` 

## Usage

```bash
npm install screwdriver-data-schema
```

## Testing

```bash
npm test
```

## License

Code licensed under the BSD 3-Clause license. See LICENSE file for terms.

[npm-image]: https://img.shields.io/npm/v/screwdriver-data-schema.svg
[npm-url]: https://npmjs.org/package/screwdriver-data-schema
[downloads-image]: https://img.shields.io/npm/dt/screwdriver-data-schema.svg
[license-image]: https://img.shields.io/npm/l/screwdriver-data-schema.svg
[issues-image]: https://img.shields.io/github/issues/screwdriver-cd/screwdriver.svg
[issues-url]: https://github.com/screwdriver-cd/screwdriver/issues
[status-image]: https://cd.screwdriver.cd/pipelines/12/badge
[status-url]: https://cd.screwdriver.cd/pipelines/12
[daviddm-image]: https://david-dm.org/screwdriver-cd/data-schema.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/screwdriver-cd/data-schema
