'use strict';

const Joi = require('joi');
const Regex = require('../config/regex');
const Job = require('../config/job');
const Workflow = require('../config/workflow');

const SCHEMA_JOB_COMMAND = Joi.object()
    .keys({
        name: Joi.string(),
        command: Joi.string()
    })
    .unknown(false)
    .label('Named command to execute');

const SCHEMA_JOB_COMMANDS = Joi.array()
    .items(SCHEMA_JOB_COMMAND)
    .min(1)
    .label('List of named commands to execute');

const SCHEMA_JOB_PERMUTATION = Joi.object()
    .keys({
        image: Job.image,
        commands: SCHEMA_JOB_COMMANDS,
        environment: Job.environment,
        secrets: Job.secrets,
        settings: Job.settings
    }).label('Job permutation');

const SCHEMA_JOB_PERMUTATIONS = Joi.array().items(SCHEMA_JOB_PERMUTATION)
    .label('List of job permutations');

const SCHEMA_JOBS = Joi.object()
    .keys({
        main: SCHEMA_JOB_PERMUTATIONS.required()
    })
    // Jobs can only be named with A-Z,a-z,0-9,-,_
    .pattern(Regex.JOB_NAME, SCHEMA_JOB_PERMUTATIONS)
    // All others are marked as invalid
    .unknown(false)
    .label('List of available job configurations');

const SCHEMA_OUTPUT = Joi.object()
    .keys({
        jobs: SCHEMA_JOBS,
        workflow: Workflow.workflow,
        errors: Joi.array().items(Joi.string()).optional()
    })
    .label('Execution information');

const SCHEMA_INPUT = Joi.object({
    yaml: Joi.string().label('screwdriver.yaml contents')
}).label('Validation Input');

/**
 * Input and output specification for validation
 * @type {Object}
 */
module.exports = {
    input: SCHEMA_INPUT,
    output: SCHEMA_OUTPUT,
    jobPermutations: SCHEMA_JOB_PERMUTATIONS
};
