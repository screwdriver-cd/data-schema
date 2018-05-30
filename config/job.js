'use strict';

const Annotations = require('./annotations');
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
    .options({
        language: {
            object: {
                allowUnknown: 'only supports uppercase letters, digits, and underscore (cannot '
                + 'start with digit)'
            }
        }
    });
// Secrets must be all uppercase
const SCHEMA_SECRET = Joi.string().regex(Regex.ENV_NAME).max(25);
const SCHEMA_SECRETS = Joi.array()
    .items(SCHEMA_SECRET)
    .min(0);
const SCHEMA_ENVIRONMENT = Joi.object()
    // IEEE Std 1003.1-2001
    // Environment names contain uppercase letters, digits, and underscore
    // They cannot start with digits
    .pattern(Regex.ENV_NAME, Joi.any())
    // All others are marked as invalid
    .unknown(false)
    // Add documentation
    .options({
        language: {
            object: {
                allowUnknown: 'only supports uppercase letters, digits, and underscore (cannot '
                + 'start with digit)'
            }
        }
    });
const SCHEMA_STEP_STRING = Joi.string();
const SCHEMA_STEP_OBJECT = Joi.object()
    // Steps can only be named with A-Z,a-z,0-9,-,_
    // Steps only contain strings (the command to execute)
    .pattern(Regex.STEP_NAME, Joi.string())
    // All others are marked as invalid
    .unknown(false)
    // And there can be only one command per step
    .length(1)
    // Add documentation
    .options({
        language: {
            object: {
                allowUnknown: 'only supports the following characters A-Z,a-z,0-9,-,_'
            }
        }
    });

const SCHEMA_DESCRIPTION = Joi.string().max(100).optional();

const SCHEMA_IMAGE = Joi.string();
const SCHEMA_IMAGES = Joi.object()
    .pattern(Regex.IMAGE_ALIAS, SCHEMA_IMAGE)
    .min(1)
    .options({
        language: {
            object: {
                allowUnknown: 'only supports the following characters A-Z,a-z,0-9,-,_'
            }
        }
    });

const SCHEMA_SETTINGS = Joi.object().optional();
const SCHEMA_STEP = Joi.alternatives().try(SCHEMA_STEP_STRING, SCHEMA_STEP_OBJECT);
const SCHEMA_STEPS = Joi.array().items(SCHEMA_STEP).min(1);
const SCHEMA_TEMPLATE = Joi.string().regex(Regex.FULL_TEMPLATE_NAME);
const SCHEMA_JOBNAME = Joi.string().regex(Regex.JOB_NAME);
const SCHEMA_TRIGGER = Joi.string().regex(Regex.TRIGGER); // ~commit, ~pr, etc.
const SCHEMA_INTERNAL_TRIGGER = Joi.string().regex(Regex.INTERNAL_TRIGGER); // ~main, ~jobOne
const SCHEMA_EXTERNAL_TRIGGER = Joi.string().regex(Regex.EXTERNAL_TRIGGER); // ~sd@123:main
const SCHEMA_REQUIRES_VALUE = Joi.alternatives().try(SCHEMA_JOBNAME, SCHEMA_TRIGGER);
const SCHEMA_REQUIRES = Joi.alternatives().try(
    Joi.array().items(SCHEMA_REQUIRES_VALUE),
    SCHEMA_REQUIRES_VALUE
);
const SCHEMA_BLOCKEDBY_VALUE = Joi.alternatives().try(
    SCHEMA_INTERNAL_TRIGGER,
    SCHEMA_EXTERNAL_TRIGGER
);
const SCHEMA_BLOCKEDBY = Joi.alternatives().try(
    Joi.array().items(SCHEMA_BLOCKEDBY_VALUE),
    SCHEMA_BLOCKEDBY_VALUE
);
const SCHEMA_SOURCEPATH = Joi.string().max(100).optional();
const SCHEMA_SOURCEPATHS = Joi.alternatives().try(
    Joi.array().items(SCHEMA_SOURCEPATH),
    SCHEMA_SOURCEPATH
);
const SCHEMA_JOB = Joi.object()
    .keys({
        annotations: Annotations.annotations,
        description: SCHEMA_DESCRIPTION,
        environment: SCHEMA_ENVIRONMENT,
        image: SCHEMA_IMAGE,
        images: SCHEMA_IMAGES,
        matrix: SCHEMA_MATRIX,
        requires: SCHEMA_REQUIRES,
        blockedBy: SCHEMA_BLOCKEDBY,
        secrets: SCHEMA_SECRETS,
        settings: SCHEMA_SETTINGS,
        sourcePaths: SCHEMA_SOURCEPATHS,
        steps: SCHEMA_STEPS,
        template: SCHEMA_TEMPLATE
    })
    .default({});

/**
 * Various components of a Job
 * @type {Object}
 */
module.exports = {
    annotations: Annotations.annotations,
    description: SCHEMA_DESCRIPTION,
    environment: SCHEMA_ENVIRONMENT,
    image: SCHEMA_IMAGE,
    images: SCHEMA_IMAGES,
    job: SCHEMA_JOB,
    matrix: SCHEMA_MATRIX,
    requires: SCHEMA_REQUIRES,
    blockedBy: SCHEMA_BLOCKEDBY,
    secret: SCHEMA_SECRET,
    secrets: SCHEMA_SECRETS,
    settings: SCHEMA_SETTINGS,
    sourcePath: SCHEMA_SOURCEPATH,
    sourcePaths: SCHEMA_SOURCEPATHS,
    step: SCHEMA_STEP,
    steps: SCHEMA_STEPS,
    template: SCHEMA_TEMPLATE,
    requiresValue: SCHEMA_REQUIRES_VALUE,
    jobname: SCHEMA_JOBNAME,
    trigger: SCHEMA_TRIGGER
};
