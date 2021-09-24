'use strict';

const Joi = require('joi');
const Annotations = require('./annotations');
const Regex = require('./regex');
const sdCron = require('./cronExpression');
const Parameters = require('./parameters');
const Provider = require('./provider');

const SPECIFIC_BRANCH_POS = 4;

// ref. https://github.com/sideway/joi/blob/v17.1.1/API.md#extendextensions
const sdJoi = Joi.extend(joi => ({
    type: 'string',
    base: joi.string(),
    messages: {
        'string.branchFilter': '{{#label}} has invalid trigger format {{#q}}'
    },
    rules: {
        branchFilter: {
            validate(value, helpers) {
                const matched = Regex.TRIGGER.exec(value);

                if (!matched) {
                    return helpers.error('string.branchFilter', { q: value });
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
                        return helpers.error('string.branchFilter', { q: value });
                    }
                }

                // no filter or exact match string
                return value;
            }
        }
    }
}));

const SCHEMA_MATRIX = Joi.object()
    // IEEE Std 1003.1-2001
    // Environment names contain uppercase letters, digits, and underscore
    // They cannot start with digits
    .pattern(Regex.ENV_NAME, Joi.array().items())
    // All others are marked as invalid
    .unknown(false)
    // Add documentation
    .messages({
        'object.unknown': '{{#label}} only supports uppercase letters, digits, and underscore (cannot start with digit)'
    });
// Secrets must be all uppercase
const SCHEMA_SECRET = Joi.string()
    .regex(Regex.ENV_NAME)
    .max(64);
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
    .messages({
        'object.unknown': '{{#label}} only supports uppercase letters, digits, and underscore (cannot start with digit)'
    });
const SCHEMA_JOBNAME = Joi.string()
    .max(100)
    .regex(Regex.JOB_NAME);
// Step can be in the following formats:
// npm install
// { init: npm install }
// { init: { command: npm install } }
const SCHEMA_STEP_STRING = Joi.string();
const SCHEMA_STEP_SUBOBJECT_BASE = Joi.object().keys({
    command: SCHEMA_STEP_STRING.required()
});
const SCHEMA_STEP_COMMAND = Joi.alternatives().try(SCHEMA_STEP_STRING, SCHEMA_STEP_SUBOBJECT_BASE);
const SCHEMA_STEP_OBJECT = Joi.object()
    // Steps can only be named with A-Z,a-z,0-9,-,_
    // Steps only contain strings or object with the command to execute
    .pattern(Regex.STEP_NAME, SCHEMA_STEP_COMMAND)
    // All others are marked as invalid
    .unknown(false)
    // And there can be only one command per step or an object with command
    .length(1)
    // Add documentation
    .messages({ 'object.unknown': '{{#label}} only supports the following characters A-Z,a-z,0-9,-,_' });
const SCHEMA_STEP = Joi.alternatives().try(SCHEMA_STEP_STRING, SCHEMA_STEP_OBJECT);
const SCHEMA_STEPS = Joi.array()
    .items(SCHEMA_STEP)
    .min(1);
// Template steps
const SCHEMA_TEMPLATE_STEP_SUBOBJECT = SCHEMA_STEP_SUBOBJECT_BASE.keys({
    locked: Joi.boolean()
});
const SCHEMA_TEMPLATE_STEP_COMMAND = Joi.alternatives().try(SCHEMA_STEP_STRING, SCHEMA_TEMPLATE_STEP_SUBOBJECT);
const SCHEMA_TEMPLATE_STEP_OBJECT = Joi.object()
    // Steps can only be named with A-Z,a-z,0-9,-,_
    // Steps only contain strings or object with the command to execute
    .pattern(Regex.STEP_NAME, SCHEMA_TEMPLATE_STEP_COMMAND)
    // All others are marked as invalid
    .unknown(false)
    // And there can be only one command per step
    .length(1);
const SCHEMA_TEMPLATE_STEP = Joi.alternatives().try(SCHEMA_STEP_STRING, SCHEMA_TEMPLATE_STEP_OBJECT);
const SCHEMA_TEMPLATE_STEPS = Joi.array()
    .items(SCHEMA_TEMPLATE_STEP)
    .min(1);
const SCHEMA_STEPS_NO_DUPS = Joi.array()
    .items(SCHEMA_TEMPLATE_STEP)
    .min(1)
    .unique((a, b) => {
        if (typeof a === 'string' || typeof b === 'string') {
            return false;
        }

        return Object.keys(a).some(key => b[key]);
    });
const SCHEMA_DESCRIPTION = Joi.string()
    .max(100)
    .optional();
const SCHEMA_IMAGE = Joi.string().regex(Regex.IMAGE_NAME);
const SCHEMA_ORDER = Joi.array()
    .items(SCHEMA_STEP_STRING.regex(Regex.STEP_NAME))
    .min(0);
const SCHEMA_SETTINGS = Joi.object().optional();

const SCHEMA_TEMPLATE = Joi.string().regex(Regex.FULL_TEMPLATE_NAME);
const SCHEMA_TEMPLATEID = Joi.number()
    .integer()
    .positive()
    .description("Identifier for this job's template")
    .example(123345)
    .optional()
    .allow(null);
// ~commit, ~commit:staging, ~commit:/^user-.*$/, ~pr, etc.
const SCHEMA_TRIGGER = sdJoi.string().branchFilter();
const SCHEMA_INTERNAL_TRIGGER = Joi.string().regex(Regex.INTERNAL_TRIGGER); // ~main, ~jobOne
const SCHEMA_EXTERNAL_TRIGGER = Joi.string()
    .regex(Regex.EXTERNAL_TRIGGER_ALL)
    .example('~sd@1234:component'); // ~sd@123:main or sd@123:main
const SCHEMA_CRON_EXPRESSION = sdCron.string().cron();
const SCHEMA_REQUIRES_VALUE = Joi.alternatives().try(SCHEMA_INTERNAL_TRIGGER, SCHEMA_JOBNAME, SCHEMA_TRIGGER);
const SCHEMA_REQUIRES = Joi.alternatives().try(Joi.array().items(SCHEMA_REQUIRES_VALUE), SCHEMA_REQUIRES_VALUE);
const SCHEMA_BLOCKEDBY_VALUE = Joi.alternatives().try(
    SCHEMA_INTERNAL_TRIGGER,
    Joi.string().regex(Regex.EXTERNAL_TRIGGER)
);
const SCHEMA_BLOCKEDBY = Joi.alternatives().try(Joi.array().items(SCHEMA_BLOCKEDBY_VALUE), SCHEMA_BLOCKEDBY_VALUE);
const SCHEMA_FREEZEWINDOWS = Joi.alternatives().try(Joi.array().items(SCHEMA_CRON_EXPRESSION), SCHEMA_CRON_EXPRESSION);
const SCHEMA_SOURCEPATH = Joi.string()
    .max(1024)
    .optional();
const SCHEMA_SOURCEPATHS = Joi.alternatives().try(Joi.array().items(SCHEMA_SOURCEPATH), SCHEMA_SOURCEPATH);
const SCHEMA_CACHE = Joi.boolean().optional();
const SCHEMA_PARAMETERS = Parameters.parameters.optional();
const SCHEMA_PROVIDER = Provider.provider.optional();
const SCHEMA_JOB = Joi.object()
    .keys({
        annotations: Annotations.annotations,
        blockedBy: SCHEMA_BLOCKEDBY,
        cache: SCHEMA_CACHE,
        description: SCHEMA_DESCRIPTION,
        environment: SCHEMA_ENVIRONMENT,
        freezeWindows: SCHEMA_FREEZEWINDOWS,
        image: SCHEMA_IMAGE,
        matrix: SCHEMA_MATRIX,
        order: SCHEMA_ORDER,
        parameters: SCHEMA_PARAMETERS,
        provider: SCHEMA_PROVIDER,
        requires: SCHEMA_REQUIRES,
        secrets: SCHEMA_SECRETS,
        settings: SCHEMA_SETTINGS,
        sourcePaths: SCHEMA_SOURCEPATHS,
        steps: SCHEMA_STEPS,
        template: SCHEMA_TEMPLATE,
        templateId: SCHEMA_TEMPLATEID
    })
    .default({});
const SCHEMA_JOB_NO_DUP_STEPS = SCHEMA_JOB.keys({
    steps: SCHEMA_STEPS_NO_DUPS
}).default({});
const SCHEMA_TEMPLATE_JOB = SCHEMA_JOB.keys({
    steps: SCHEMA_TEMPLATE_STEPS
}).default({});

/**
 * Various components of a Job
 * @type {Object}
 */
module.exports = {
    annotations: Annotations.annotations,
    blockedBy: SCHEMA_BLOCKEDBY,
    cache: SCHEMA_CACHE,
    description: SCHEMA_DESCRIPTION,
    environment: SCHEMA_ENVIRONMENT,
    externalTrigger: SCHEMA_EXTERNAL_TRIGGER,
    freezeWindows: SCHEMA_FREEZEWINDOWS,
    image: SCHEMA_IMAGE,
    job: SCHEMA_JOB,
    jobName: SCHEMA_JOBNAME,
    jobNoDupSteps: SCHEMA_JOB_NO_DUP_STEPS,
    matrix: SCHEMA_MATRIX,
    order: SCHEMA_ORDER,
    parameters: SCHEMA_PARAMETERS,
    provider: SCHEMA_PROVIDER,
    requires: SCHEMA_REQUIRES,
    requiresValue: SCHEMA_REQUIRES_VALUE,
    secret: SCHEMA_SECRET,
    secrets: SCHEMA_SECRETS,
    settings: SCHEMA_SETTINGS,
    sourcePath: SCHEMA_SOURCEPATH,
    sourcePaths: SCHEMA_SOURCEPATHS,
    step: SCHEMA_STEP,
    steps: SCHEMA_STEPS,
    template: SCHEMA_TEMPLATE,
    templateId: SCHEMA_TEMPLATEID,
    templateJob: SCHEMA_TEMPLATE_JOB,
    trigger: SCHEMA_TRIGGER
};
