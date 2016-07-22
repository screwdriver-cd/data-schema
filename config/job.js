'use strict';

const Joi = require('joi');
const Regex = require('./regex');

const SCHEMA_MATRIX = Joi.object()
    // IEEE Std 1003.1-2001
    // Environment names contain uppercase letters, digits, and underscore
    // They cannot start with digits
    .pattern(Regex.ENV_NAME, Joi.array().items())
    // All others are marked as invalid
    .unknown(false)
    // Add documentation
    .label('Job Matrix')
    .options({
        language: {
            object: {
                allowUnknown: 'only supports uppercase letters, digits, and underscore (cannot '
                + 'start with digit)'
            }
        }
    });
const SCHEMA_ENVIRONMENT = Joi.object()
    // IEEE Std 1003.1-2001
    // Environment names contain uppercase letters, digits, and underscore
    // They cannot start with digits
    .pattern(Regex.ENV_NAME, Joi.any())
    // All others are marked as invalid
    .unknown(false)
    // Add documentation
    .label('Environment')
    .options({
        language: {
            object: {
                allowUnknown: 'only supports uppercase letters, digits, and underscore (cannot '
                + 'start with digit)'
            }
        }
    });
const SCHEMA_STEPS = Joi.object()
    // Steps can only be named with A-Z,a-z,0-9,-,_
    // Steps only contain strings (the command to execute)
    .pattern(Regex.STEP_NAME, Joi.string())
    // All others are marked as invalid
    .unknown(false)
    // Add documentation
    .label('Steps')
    .options({
        language: {
            object: {
                allowUnknown: 'only supports the following characters A-Z,a-z,0-9,-,_'
            }
        }
    });
const SCHEMA_IMAGE = Joi.string()
    .label('Container Image');
const SCHEMA_JOB = Joi.object()
    .keys({
        steps: SCHEMA_STEPS,
        environment: SCHEMA_ENVIRONMENT,
        matrix: SCHEMA_MATRIX,
        image: SCHEMA_IMAGE
    })
    .default({})
    .label('Job');

/**
 * Various components of a Job
 * @type {Object}
 */
module.exports = {
    matrix: SCHEMA_MATRIX,
    steps: SCHEMA_STEPS,
    environment: SCHEMA_ENVIRONMENT,
    image: SCHEMA_IMAGE,
    job: SCHEMA_JOB
};
