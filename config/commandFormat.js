'use strict';

const Joi = require('joi');

const HABITAT_MODE = Joi
    .string().valid([
        'remote',
        'local'
    ])
    .description('Mode of the Habitat command')
    .example('remote');

const HABITAT_PACKAGE = Joi
    .string()
    .description('Package of the Habitat command')
    .example('core/git/2.14.1');

const HABITAT_BINARY = Joi
    .string()
    .description('Binary of the Habitat command')
    .example('git');

const SCHEMA_HABITAT = Joi.object()
    .keys({
        mode: HABITAT_MODE,
        package: HABITAT_PACKAGE,
        binary: HABITAT_BINARY
    })
    .requiredKeys('mode', 'package', 'binary');

const DOCKER_IMAGE = Joi
    .string()
    .description('Image of the Docker command')
    .example('node:1.2.3');

const SCHEMA_DOCKER = Joi.object()
    .keys({
        image: DOCKER_IMAGE
    })
    .requiredKeys('image');

const BINARY_FILE = Joi
    .string()
    .description('File of the Binary command')
    .example('./foobar.sh');

const SCHEMA_BINARY = Joi.object()
    .keys({
        file: BINARY_FILE
    })
    .requiredKeys('file');

/**
 * The definition of the Command pieces
 * @type {Object}
 */
module.exports = {
    habitat: SCHEMA_HABITAT,
    habitatMode: HABITAT_MODE,
    habitatPackage: HABITAT_PACKAGE,
    habitatBinary: HABITAT_BINARY,
    docker: SCHEMA_DOCKER,
    dockerImage: DOCKER_IMAGE,
    binary: SCHEMA_BINARY,
    binaryFile: BINARY_FILE
};
