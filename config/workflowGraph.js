'use strict';

const Joi = require('joi');
const { externalTrigger, jobName, requiresValue } = require('./job');

const SCHEMA_WORKFLOW_GRAPH = Joi.object().keys({
    nodes: Joi.array().items(
        Joi.object()
            .keys({
                name: requiresValue
            })
            .unknown()
    ),
    edges: Joi.array().items(
        Joi.object()
            .keys({
                src: requiresValue,
                dest: Joi.alternatives().try(externalTrigger, jobName)
            })
            .unknown()
    )
});

/**
 * The definition of the Workflow Graph pieces
 * @type {Object}
 */
module.exports = {
    workflowGraph: SCHEMA_WORKFLOW_GRAPH
};
