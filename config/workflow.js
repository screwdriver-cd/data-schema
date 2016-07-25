'use strict';

const Joi = require('joi');
const Regex = require('./regex');

const SCHEMA_WORKFLOW = Joi.array()
    // List of jobs
    .items(Joi.string().regex(Regex.JOB_NAME))
    // You cannot trigger the same job twice
    .unique();

/**
 * The definition of the Workflow pieces
 * @type {Object}
 */
module.exports = {
    workflow: SCHEMA_WORKFLOW
};
