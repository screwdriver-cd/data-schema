'use strict';

const Joi = require('joi');
const JobsSchema = require('./base').jobs;
const Shared = require('./base').shared;
const Parameters = require('./parameters');
const Template = require('./template');

const SCHEMA_CONFIG = Joi.object()
    .keys({
        jobs: JobsSchema.required(),
        shared: Shared,
        parameters: Parameters.parameters.default({})
    })
    .unknown(false);

const SCHEMA_TEMPLATE = Joi.object().keys({
    namespace: Template.namespace,
    name: Template.name.required(),
    version: Template.version.required(),
    description: Template.description.required(),
    maintainer: Template.maintainer.required(),
    config: SCHEMA_CONFIG
});

/**
 * The definition of the Template pieces
 * @type {Object}
 */
module.exports = {
    template: SCHEMA_TEMPLATE,
    namespace: Template.namespace,
    name: Template.name,
    templateTag: Template.templateTag,
    version: Template.version,
    exactVersion: Template.exactVersion,
    description: Template.description,
    maintainer: Template.maintainer,
    config: JobsSchema.templateJob,
    configNoDupSteps: JobsSchema.jobNoDupSteps
};
