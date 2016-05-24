# Screwdriver Data Model
[![Version][npm-image]][npm-url] ![Downloads][downloads-image] [![Build Status][wercker-image]][wercker-url] [![Open Issues][issues-image]][issues-url] [![Dependency Status][daviddm-image]][daviddm-url] ![License][license-image]

> Internal Data Model of Screwdriver

## Description

This contains the structure/validation for all the models/resources of Screwdriver.

The model represents a combination of what is required to create the resource and what is possible
for returning from the resource.

## Methodology

Each model contains four (4) schemas:
 - `base` - List of all available fields in the model
 - `get` - Expected return values from a GET request against this resource
 - `create` - Expected input values when making a CREATE action against this resource
 - `update` - Expected input values when making an UPDATE action against this resource

## Usage

```bash
npm install screwdriver-data-model
```

## Testing

```bash
npm test
```

## License

Code licensed under the BSD 3-Clause license. See LICENSE file for terms.

[npm-image]: https://img.shields.io/npm/v/screwdriver-data-model.svg
[npm-url]: https://npmjs.org/package/screwdriver-data-model
[downloads-image]: https://img.shields.io/npm/dt/screwdriver-data-model.svg
[license-image]: https://img.shields.io/npm/l/screwdriver-data-model.svg
[issues-image]: https://img.shields.io/github/issues/screwdriver-cd/screwdriver-data-model.svg
[issues-url]: https://github.com/screwdriver-cd/screwdriver-data-model/issues
[wercker-image]: https://app.wercker.com/status/f64078e61aa4a03bceba2a35abfdead1
[wercker-url]: https://app.wercker.com/project/bykey/f64078e61aa4a03bceba2a35abfdead1
[daviddm-image]: https://david-dm.org/screwdriver-cd/screwdriver-data-model.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/screwdriver-cd/screwdriver-data-model
