'use strict';

const Joi = require('joi');
const BaseSchema = require('./base');
const Annotations = require('./annotations');
const Parameters = require('./parameters');
const Template = require('./template');
const Regex = require('./regex');
const WorkflowGraph = require('./workflowGraph');

const SCHEMA_CONFIG = Joi.object()
    .keys({
        jobs: BaseSchema.jobs.required(),
        shared: BaseSchema.shared,
        parameters: Parameters.parameters.default({}),
        annotations: Annotations.annotations,
        cache: BaseSchema.cache,
        subscribe: BaseSchema.subscribe,
        stages: BaseSchema.stages,
        workflowGraph: WorkflowGraph.workflowGraph
    })
    .unknown(false);

const SCHEMA_TEMPLATE = Joi.object()
    .keys({
        namespace: Template.namespace.required(),
        name: Joi.string()
            .regex(Regex.TEMPLATE_NAME_NO_SLASH)
            .max(64)
            .description('Name of the template')
            .example('nodePipeline')
            .required(),
        version: Template.version.required(),
        description: Template.description.required(),
        maintainer: Template.maintainer.required(),
        config: SCHEMA_CONFIG.required()
    })
    .unknown(false);

/**
 * The definition of the Template pieces
 * @type {Object}
 */
module.exports = {
    template: SCHEMA_TEMPLATE,
    config: SCHEMA_CONFIG
};
