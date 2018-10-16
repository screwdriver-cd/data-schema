'use strict';

const Annotations = require('./annotations');
const Job = require('./job');
const Joi = require('joi');
const Regex = require('./regex');

const SCHEMA_JOBNAME = Joi.string().regex(Regex.JOB_NAME);
const SCHEMA_CACHE_VALUE = Joi.string().uri({
    relativeOnly: true
});
const SCHEMA_CACHE_LIST = Joi.array().items(SCHEMA_CACHE_VALUE).min(1);
const SCHEMA_CACHE_JOB = Joi.object()
    .pattern(SCHEMA_JOBNAME, SCHEMA_CACHE_LIST)
    .unknown(false)
    .length(1);
const SCHEMA_CACHE_JOB_LIST = Joi.array().items(SCHEMA_CACHE_JOB).min(1);
const SCHEMA_CACHE = Joi.object({
    event: SCHEMA_CACHE_LIST,
    pipeline: SCHEMA_CACHE_LIST,
    job: SCHEMA_CACHE_JOB_LIST
}).or('event', 'pipeline', 'job');

const SCHEMA_JOBS = Joi.object()
    // Jobs can only be named with A-Z,a-z,0-9,-,_
    .pattern(Regex.JOB_NAME, Job.job)
    // All others are marked as invalid
    .unknown(false);
const SCHEMA_SHARED = Job.job;
const SCHEMA_SCM_URL = Joi.string().regex(Regex.CHECKOUT_URL);
const SCHEMA_SCM_URLS = Joi.array().items(SCHEMA_SCM_URL).min(1);
const SCHEMA_CHILD_PIPELINES = Joi.object()
    .keys({
        scmUrls: SCHEMA_SCM_URLS,
        startAll: Joi.boolean()
    })
    .requiredKeys('scmUrls')
    .unknown(false);
const SCHEMA_CONFIG = Joi.object()
    .keys({
        version: Joi.number().integer().min(1).max(50),
        annotations: Annotations.annotations,
        jobs: SCHEMA_JOBS,
        shared: SCHEMA_SHARED,
        cache: SCHEMA_CACHE,
        childPipelines: SCHEMA_CHILD_PIPELINES
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
    cache: SCHEMA_CACHE,
    childPipelines: SCHEMA_CHILD_PIPELINES,
    config: SCHEMA_CONFIG
};
