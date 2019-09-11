'use strict';

const Annotations = require('./annotations');
const Joi = require('joi');
const Regex = require('./regex');
const Cron = require('./cronExpression');

const SPECIFIC_BRANCH_POS = 4;

// ref. https://github.com/hapijs/joi/blob/v13.3.0/API.md#extendextension
const sdJoi = Joi.extend(joi => ({
    base: joi.string(),
    name: 'string',
    language: {
        branchFilter: 'invalid trigger format'
    },
    rules: [
        {
            name: 'branchFilter',
            validate(params, value, state, options) {
                const matched = Regex.TRIGGER.exec(value);

                if (!matched) {
                    return this.createError('string.branchFilter', { v: value }, state, options);
                }

                // e.g. value = ~commit:/^user-.*$/ => brFilter = /^user-.*$/
                const brFilter = matched[SPECIFIC_BRANCH_POS];

                // branch regex filter
                if (typeof brFilter !== 'undefined' && /^\/.+\/$/.test(brFilter)) {
                    try {
                        // e.g. /^user-.*$/ => ^user-.*$
                        const filterRegex = brFilter.substr(1, brFilter.length - 2);
                        /* eslint-disable no-unused-vars */
                        // compile for syntax validation
                        const re = new RegExp(filterRegex);
                        /* eslint-enable */
                    } catch (e) {
                        return this.createError(
                            'string.branchFilter', { v: value, err: e.message }, state, options);
                    }
                }

                // no filter or exact match string
                return value;
            }
        }
    ]
}));

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
const SCHEMA_SECRET = Joi.string().regex(Regex.ENV_NAME).max(64);
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
const SCHEMA_PARAMETERS_STRING = Joi.string();
const SCHEMA_PARAMETERS_OBJECT = Joi.object({
    value: Joi.string().required(),
    description: Joi.string()
})
    .options({
        language: {
            object: {
                allowUnknown: 'only supports uppercase letters, digits, and underscore (cannot '
                + 'start with digit)'
            }
        }
    });

const SCHEMA_PARAMETERS = Joi.object()
    .pattern(Joi.any(),
        Joi.alternatives().try(SCHEMA_PARAMETERS_STRING, SCHEMA_PARAMETERS_OBJECT));
const SCHEMA_JOBNAME = Joi.string().max(100).regex(Regex.JOB_NAME);
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
const SCHEMA_IMAGE = Joi.string().regex(Regex.IMAGE_NAME);
const SCHEMA_SETTINGS = Joi.object().optional();
const SCHEMA_STEP = Joi.alternatives().try(SCHEMA_STEP_STRING, SCHEMA_STEP_OBJECT);
const SCHEMA_STEPS = Joi.array().items(SCHEMA_STEP).min(1);
const SCHEMA_STEPS_NO_DUPS = Joi.array().items(SCHEMA_STEP).min(1).unique((a, b) => {
    if (typeof a === 'string' || typeof b === 'string') {
        return false;
    }

    return Object.keys(a).some(key => b[key]);
});
const SCHEMA_TEMPLATE = Joi.string().regex(Regex.FULL_TEMPLATE_NAME);
// ~commit, ~commit:staging, ~commit:/^user-.*$/, ~pr, etc.
const SCHEMA_TRIGGER = sdJoi.string().regex(Regex.TRIGGER).branchFilter();
const SCHEMA_INTERNAL_TRIGGER = Joi.string().regex(Regex.INTERNAL_TRIGGER); // ~main, ~jobOne
const SCHEMA_EXTERNAL_TRIGGER = Joi.string().regex(Regex.EXTERNAL_TRIGGER); // ~sd@123:main
const SCHEMA_CRON_EXPRESSION = Cron.string().cron();
const SCHEMA_REQUIRES_VALUE = Joi.alternatives().try(
    SCHEMA_INTERNAL_TRIGGER, SCHEMA_JOBNAME, SCHEMA_TRIGGER);
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
const SCHEMA_FREEZEWINDOWS = Joi.alternatives().try(
    Joi.array().items(SCHEMA_CRON_EXPRESSION),
    SCHEMA_CRON_EXPRESSION
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
        parameters: SCHEMA_PARAMETERS,
        image: SCHEMA_IMAGE,
        matrix: SCHEMA_MATRIX,
        requires: SCHEMA_REQUIRES,
        blockedBy: SCHEMA_BLOCKEDBY,
        freezeWindows: SCHEMA_FREEZEWINDOWS,
        secrets: SCHEMA_SECRETS,
        settings: SCHEMA_SETTINGS,
        sourcePaths: SCHEMA_SOURCEPATHS,
        steps: SCHEMA_STEPS,
        template: SCHEMA_TEMPLATE
    })
    .default({});
const SCHEMA_JOB_NO_DUP_STEPS = Joi.object()
    .keys({
        annotations: Annotations.annotations,
        description: SCHEMA_DESCRIPTION,
        environment: SCHEMA_ENVIRONMENT,
        image: SCHEMA_IMAGE,
        matrix: SCHEMA_MATRIX,
        requires: SCHEMA_REQUIRES,
        blockedBy: SCHEMA_BLOCKEDBY,
        freezeWindows: SCHEMA_FREEZEWINDOWS,
        secrets: SCHEMA_SECRETS,
        settings: SCHEMA_SETTINGS,
        sourcePaths: SCHEMA_SOURCEPATHS,
        steps: SCHEMA_STEPS_NO_DUPS,
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
    parameters: SCHEMA_PARAMETERS,
    image: SCHEMA_IMAGE,
    job: SCHEMA_JOB,
    jobNoDupSteps: SCHEMA_JOB_NO_DUP_STEPS,
    matrix: SCHEMA_MATRIX,
    requires: SCHEMA_REQUIRES,
    blockedBy: SCHEMA_BLOCKEDBY,
    freezeWindows: SCHEMA_FREEZEWINDOWS,
    secret: SCHEMA_SECRET,
    secrets: SCHEMA_SECRETS,
    settings: SCHEMA_SETTINGS,
    sourcePath: SCHEMA_SOURCEPATH,
    sourcePaths: SCHEMA_SOURCEPATHS,
    step: SCHEMA_STEP,
    steps: SCHEMA_STEPS,
    template: SCHEMA_TEMPLATE,
    requiresValue: SCHEMA_REQUIRES_VALUE,
    jobName: SCHEMA_JOBNAME,
    trigger: SCHEMA_TRIGGER
};
