'use strict';

const Joi = require('joi');

const SCHEMA_PACKAGE_VERSIONS = Joi.array().items(
   Joi.string().description('Package and its version')
).label('List of package versions');

const SCHEMA_LICENSES = Joi.array().items(
    Joi.object().keys({
        name: Joi.string().label('Package name'),
        repository: Joi.string().label('Package repository'),
        licenses: Joi.any().label('License type')
    }).label('License Object')
).label('List of Licenses');

const SCHEMA_VERSIONS = Joi.object().keys({
    versions: SCHEMA_PACKAGE_VERSIONS,
    licenses: SCHEMA_LICENSES
}).label('Versions Object');

module.exports = SCHEMA_VERSIONS;
