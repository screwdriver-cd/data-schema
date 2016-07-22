# Screwdriver Data Schema
[![Version][npm-image]][npm-url] ![Downloads][downloads-image] [![Build Status][wercker-image]][wercker-url] [![Open Issues][issues-image]][issues-url] [![Dependency Status][daviddm-image]][daviddm-url] ![License][license-image]

> Internal data schema of Screwdriver

## Description

This contains the structure/validation for all the models/resources of Screwdriver.

It's broken down into three sections:
 - `api` - API related input/output structure
 - `config` - Screwdriver.yaml definitions
 - `models` - Internal data resources

## Models

The model represents a combination of what is required to create the resource and what is possible for returning from the resource.

### Methodology

Each model contains seven (7) schemas:
 - `base` - List of all available fields in the model
 - `get` - Expected return values from a GET request against this resource
 - `create` - Expected input values when making a CREATE action against this resource
 - `update` - Expected input values when making an UPDATE action against this resource
 - `keys` - List of keys that combine to represent a unique row
 - `tableName` - Internal name of the table
 - `indexes` - Secondary indexes to make search/lookup faster

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
[issues-image]: https://img.shields.io/github/issues/screwdriver-cd/data-schema.svg
[issues-url]: https://github.com/screwdriver-cd/data-schema/issues
[wercker-image]: https://app.wercker.com/status/5af7b45967fcef5a8769b23c0f150040
[wercker-url]: https://app.wercker.com/project/bykey/5af7b45967fcef5a8769b23c0f150040
[daviddm-image]: https://david-dm.org/screwdriver-cd/data-schema.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/screwdriver-cd/data-schema
