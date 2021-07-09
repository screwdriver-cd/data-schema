'use strict';

const Joi = require('joi');

const HABITAT_MODE = Joi.string()
    .valid('remote', 'local')
    .description('Mode of the Habitat command')
    .example('remote');

const HABITAT_FILE = Joi.string()
    .description('File path of the Habitat artifact')
    .example('./foobar.hart');

const HABITAT_PACKAGE = Joi.string()
    .description('Package of the Habitat command')
    .example('core/git/2.14.1');

const HABITAT_COMMAND = Joi.string()
    .description('Executable of the Habitat command')
    .example('git');

const SCHEMA_HABITAT = Joi.object().keys({
    mode: HABITAT_MODE.required(),
    file: HABITAT_FILE.when('mode', { is: 'local', then: Joi.required() }),
    package: HABITAT_PACKAGE.required(),
    command: HABITAT_COMMAND.required()
});

const DOCKER_IMAGE = Joi.string()
    .description('Image of the Docker command')
    .example('chefdk:1.2.3');

const DOCKER_COMMAND = Joi.string()
    .description('Executable of the Docker command')
    .default('')
    .example('knife');

const SCHEMA_DOCKER = Joi.object().keys({
    image: DOCKER_IMAGE.required(),
    command: DOCKER_COMMAND
});

const BINARY_FILE = Joi.string()
    .description('File of the Binary command')
    .example('./foobar.sh');

const SCHEMA_BINARY = Joi.object().keys({
    file: BINARY_FILE.required()
});

/**
 * The definition of the Command pieces
 * @type {Object}
 */
module.exports = {
    habitat: SCHEMA_HABITAT,
    habitatMode: HABITAT_MODE,
    habitatFile: HABITAT_FILE,
    habitatPackage: HABITAT_PACKAGE,
    habitatCommand: HABITAT_COMMAND,
    docker: SCHEMA_DOCKER,
    dockerImage: DOCKER_IMAGE,
    dockerCommand: DOCKER_COMMAND,
    binary: SCHEMA_BINARY,
    binaryFile: BINARY_FILE
};
