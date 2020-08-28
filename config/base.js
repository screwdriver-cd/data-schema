'use strict';

const Annotations = require('./annotations');
const Job = require('./job');
const Joi = require('joi');
const Regex = require('./regex');
const Parameters = require('./parameters');

const SCHEMA_CACHE_VALUE = Joi.string().uri({
    relativeOnly: true
});
const SCHEMA_CACHE_LIST = Joi.array().items(SCHEMA_CACHE_VALUE);
const SCHEMA_CACHE_JOBS = Joi.object()
    .pattern(Job.jobName, SCHEMA_CACHE_LIST)
    .unknown(false);
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

const SCHEMA_SUBSCRIBE = Joi.object()
    .keys({
        scmUrls: Joi.array()
            .items(Joi.object()
                .pattern(Regex.CHECKOUT_URL, Joi.array().items(Joi.string().regex(Regex.WEBHOOK_EVENT))))
    });

const SCHEMA_CONFIG = Joi.object()
    .keys({
        version: Joi.number().integer().min(1).max(50),
        annotations: Annotations.annotations,
        jobs: SCHEMA_JOBS.required(),
        shared: SCHEMA_SHARED,
        cache: SCHEMA_CACHE,
        childPipelines: SCHEMA_CHILD_PIPELINES,
        subscribe: SCHEMA_SUBSCRIBE,
        parameters: Parameters.parameters
    })
    .unknown(false);

/**
 * Main pieces of a screwdriver.yaml
 * @type {Object}
 */
module.exports = {
    jobs: SCHEMA_JOBS,
    shared: SCHEMA_SHARED,
    prChain: SCHEMA_PR_CHAIN, // This is still used by pipeline schema.
    cache: SCHEMA_CACHE,
    cachePerm: SCHEMA_CACHE_PERMUTATION,
    childPipelines: SCHEMA_CHILD_PIPELINES,
    config: SCHEMA_CONFIG,
    subscribe: SCHEMA_SUBSCRIBE
};
