'use strict';

const Joi = require('joi');
const Annotations = require('./annotations');
const Job = require('./job');
const Regex = require('./regex');
const Parameters = require('./parameters');

const SCHEMA_CACHE_VALUE = Joi.string().uri({
    relativeOnly: true
});
const SCHEMA_CACHE_LIST = Joi.array().items(SCHEMA_CACHE_VALUE);
const SCHEMA_CACHE_JOBS = Joi.object().pattern(Job.jobName, SCHEMA_CACHE_LIST).unknown(false);
const SCHEMA_CACHE = Joi.object({
    event: SCHEMA_CACHE_LIST,
    pipeline: SCHEMA_CACHE_LIST,
    job: SCHEMA_CACHE_JOBS
}).or('event', 'pipeline', 'job');
const SCHEMA_CACHE_PERMUTATION = Joi.object({
    event: SCHEMA_CACHE_LIST,
    pipeline: SCHEMA_CACHE_LIST,
    job: SCHEMA_CACHE_LIST
}).or('event', 'pipeline', 'job');

const SCHEMA_PR_CHAIN = Joi.boolean().default(false);
const SCHEMA_JOBS = Joi.object()
    // Jobs can only be named with A-Z,a-z,0-9,-,_
    .pattern(Job.jobName, Job.job)
    // All others are marked as invalid
    .unknown(false);
const SCHEMA_SHARED = Job.job;
const SCHEMA_SCM_URL = Joi.string().regex(Regex.CHECKOUT_URL);
const SCHEMA_SCM_URLS = Joi.array().items(SCHEMA_SCM_URL).min(1);
const SCHEMA_CHILD_PIPELINES = Joi.object()
    .keys({
        scmUrls: SCHEMA_SCM_URLS.required(),
        startAll: Joi.boolean()
    })
    .unknown(false);
const SCHEMA_SETUP_JOB = Job.job.keys({ requires: Joi.forbidden() });
const SCHEMA_TEARDOWN_JOB = Job.job.keys({ requires: Joi.forbidden(), sourcePaths: Joi.forbidden() });
const SCHEMA_STAGE = Joi.object()
    .keys({
        description: Joi.string(),
        jobs: Joi.array().items(Job.jobName).min(0),
        setup: SCHEMA_SETUP_JOB,
        teardown: SCHEMA_TEARDOWN_JOB,
        requires: Job.requires,
        sourcePaths: Job.sourcePaths
    })
    .unknown(false);

const SCHEMA_STAGES = Joi.object()
    // Stages can only be named with A-Z,a-z,0-9,-,_
    // Stages only contain an object with the stages
    .pattern(Regex.STAGE_NAME, SCHEMA_STAGE)
    // All others are marked as invalid
    .unknown(false)
    // Add documentation
    .messages({ 'object.unknown': '{{#label}} only supports the following characters A-Z,a-z,0-9,-,_' });

const SCHEMA_SUBSCRIBE = Joi.object().keys({
    scmUrls: Joi.array().items(
        Joi.object().pattern(Regex.CHECKOUT_URL, Joi.array().items(Joi.string().regex(Regex.WEBHOOK_EVENT)))
    )
});

const ALLOWED_JOB_FIELDS_WITH_PIPELINE_TEMPLATE = Joi.object().keys({
    image: Job.image,
    environment: Job.environment,
    settings: Job.settings,
    requires: Job.requires,
    sourcePaths: Job.sourcePaths
});

const SCHEMA_CONFIG_PRE_TEMPLATE_MERGE = Joi.object()
    .keys({
        template: Joi.string().regex(Regex.FULL_TEMPLATE_NAME_WITH_NAMESPACE),
        version: Joi.number().integer().min(1).max(50),
        annotations: Annotations.annotations,
        jobs: Joi.when('template', {
            is: Joi.exist(),
            then: SCHEMA_JOBS.optional(),
            otherwise: SCHEMA_JOBS.required()
        }),
        shared: Joi.when('template', {
            is: Joi.exist(),
            then: ALLOWED_JOB_FIELDS_WITH_PIPELINE_TEMPLATE,
            otherwise: SCHEMA_SHARED
        }),
        cache: SCHEMA_CACHE,
        childPipelines: SCHEMA_CHILD_PIPELINES,
        stages: SCHEMA_STAGES,
        subscribe: SCHEMA_SUBSCRIBE,
        parameters: Parameters.parameters.default({})
    })
    .unknown(false);

const SCHEMA_CONFIG_POST_TEMPLATE_MERGE = Joi.object()
    .keys({
        version: Joi.number().integer().min(1).max(50),
        annotations: Annotations.annotations,
        jobs: SCHEMA_JOBS.required(),
        shared: SCHEMA_SHARED,
        cache: SCHEMA_CACHE,
        childPipelines: SCHEMA_CHILD_PIPELINES,
        stages: SCHEMA_STAGES,
        subscribe: SCHEMA_SUBSCRIBE,
        parameters: Parameters.parameters.default({}),
        templateVersionId: Joi.number().integer().positive().optional().allow(null)
    })
    .unknown(false);

/**
 * Main pieces of a screwdriver.yaml
 * @type {Object}
 */
module.exports = {
    allowedJobFieldsWithPipelineTemplate: ALLOWED_JOB_FIELDS_WITH_PIPELINE_TEMPLATE,
    jobs: SCHEMA_JOBS,
    shared: SCHEMA_SHARED,
    prChain: SCHEMA_PR_CHAIN, // This is still used by pipeline schema.
    cache: SCHEMA_CACHE,
    cachePerm: SCHEMA_CACHE_PERMUTATION,
    childPipelines: SCHEMA_CHILD_PIPELINES,
    configBeforeMergingTemplate: SCHEMA_CONFIG_PRE_TEMPLATE_MERGE,
    configAfterMergingTemplate: SCHEMA_CONFIG_POST_TEMPLATE_MERGE,
    stageSetupJob: SCHEMA_SETUP_JOB,
    stageTeardownJob: SCHEMA_TEARDOWN_JOB,
    stage: SCHEMA_STAGE,
    stages: SCHEMA_STAGES,
    subscribe: SCHEMA_SUBSCRIBE
};
