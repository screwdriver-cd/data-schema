'use strict';

const Joi = require('joi');
const Regex = require('./regex');
const Job = require('./job');
const Workflow = require('./workflow');

const SCHEMA_JOBS = Joi.object()
    .keys({
        main: Job.job.required()
    })
    // Jobs can only be named with A-Z,a-z,0-9,-,_
    .pattern(Regex.JOB_NAME, Job.job)
    // All others are marked as invalid
    .unknown(false);
const SCHEMA_SHARED = Job.job;
const SCHEMA_CONFIG = Joi.object()
    .keys({
        jobs: SCHEMA_JOBS,
        workflow: Workflow.workflow,
        shared: SCHEMA_SHARED
    })
    .requiredKeys('jobs')
    .unknown(false);

/**
 * Main pieces of a screwdriver.yaml
 * @type {Object}
 */
module.exports = {
    jobs: SCHEMA_JOBS,
    shared: SCHEMA_SHARED,
    config: SCHEMA_CONFIG
};
