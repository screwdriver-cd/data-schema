'use strict';

const Joi = require('joi');
const Job = require('./job');
const Regex = require('./regex');

const TEMPLATE_NAME = Joi
            .string()
            .regex(Regex.TEMPLATE_NAME)
            .description('Name of the Template')
            .example('node/npm-install');

const TEMPLATE_VERSION = Joi
            .string()
            .regex(Regex.VERSION)
            .description('Version of the Template')
            .example('1.2.3');

const TEMPLATE_DESCRIPTION = Joi
            .string()
            .description('Description of the Template')
            .example('Installs npm modules');

const TEMPLATE_MAINTAINER = Joi
            .string()
            .email()
            .description('Maintainer of the Template')
            .example('foo@bar.com');

const SCHEMA_TEMPLATE = Joi.object()
    .keys({
        name: TEMPLATE_NAME,
        version: TEMPLATE_VERSION,
        description: TEMPLATE_DESCRIPTION,
        maintainer: TEMPLATE_MAINTAINER,
        config: Job.job
    })
    .requiredKeys('name', 'version', 'description', 'maintainer', 'config.steps');

/**
 * The definition of the Template pieces
 * @type {Object}
 */
module.exports = {
    template: SCHEMA_TEMPLATE
};
