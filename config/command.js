'use strict';

const Joi = require('joi');
const Regex = require('./regex');
const CommandFormat = require('./commandFormat');

const COMMAND_NAMESPACE = Joi.string()
    .regex(Regex.COMMAND_NAMESPACE)
    .max(64)
    .description('Namespace of the Command')
    .example('chefdk');

const COMMAND_NAME = Joi.string().regex(Regex.COMMAND_NAME).max(64).description('Name of the Command').example('knife');

const COMMAND_TAG_NAME = Joi.string()
    .regex(Regex.COMMAND_TAG_NAME)
    .max(30)
    .description('Name of the Command Tag')
    .example('latest');

const COMMAND_VERSION = Joi.string().regex(Regex.VERSION).max(16).description('Version of the Command').example('1.2');

const COMMAND_EXACT_VERSION = Joi.string()
    .regex(Regex.EXACT_VERSION)
    .max(16)
    .description('Exact version of the Command')
    .example('1.2.3');

const COMMAND_DESCRIPTION = Joi.string()
    .max(256)
    .description('Description of the Command')
    .example('Installs npm modules');

const COMMAND_USAGE = Joi.string()
    .max(4096)
    .allow('')
    .description('Usage and arguments of the command')
    .example('sd_cmd exec foo/bar@1 -h <host> -d <domain>');

const COMMAND_MAINTAINER = Joi.string().email().max(64).description('Maintainer of the Command').example('foo@bar.com');

const COMMAND_FORMAT = Joi.string()
    .valid('habitat', 'docker', 'binary')
    .max(16)
    .description('Format of the Command')
    .example('habitat');

const SCHEMA_COMMAND = Joi.object()
    .keys({
        namespace: COMMAND_NAMESPACE.required(),
        name: COMMAND_NAME.required(),
        version: COMMAND_VERSION.required(),
        description: COMMAND_DESCRIPTION.required(),
        usage: COMMAND_USAGE,
        maintainer: COMMAND_MAINTAINER.required(),
        format: COMMAND_FORMAT.required(),
        habitat: CommandFormat.habitat.when('format', { is: 'habitat', then: Joi.required() }),
        docker: CommandFormat.docker.when('format', { is: 'docker', then: Joi.required() }),
        binary: CommandFormat.binary.when('format', { is: 'binary', then: Joi.required() })
    })
    // any one of them
    .or('habitat', 'docker', 'binary')
    .xor('habitat', 'docker', 'binary');

/**
 * The definition of the Command pieces
 * @type {Object}
 */
module.exports = {
    schemaCommand: SCHEMA_COMMAND,
    namespace: COMMAND_NAMESPACE,
    name: COMMAND_NAME,
    commandTag: COMMAND_TAG_NAME,
    version: COMMAND_VERSION,
    exactVersion: COMMAND_EXACT_VERSION,
    description: COMMAND_DESCRIPTION,
    usage: COMMAND_USAGE,
    maintainer: COMMAND_MAINTAINER,
    format: COMMAND_FORMAT,
    habitat: CommandFormat.habitat,
    docker: CommandFormat.docker,
    binary: CommandFormat.binary
};
