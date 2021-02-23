'use strict';

const Joi = require('joi');

const SCHEMA_DISPLAY_JOB_NAME_LENGTH = Joi.number().integer()
    .min(20)
    .max(99)
    .default(20)
    .description('Job name length to display on workflowGraph')
    .example(20);
const SCHEMA_METRICS_DOWNTIME_JOBS = Joi.array().items(
    Joi
        .number().integer().positive()
        .description('Identifier for this job')
        .example(123345)
        .optional()
        .allow(null)
).description('Job IDs to watch for downtime');
const SCHEMA_METRICS_DOWNTIME_STATUSES = Joi.array().items(
    Joi.string()
).description('Build statuses to watch for downtime');

const SCHEMA_PIPELINE_SETTINGS = Joi.object()
    .keys({
        metricsDowntimeJobs: SCHEMA_METRICS_DOWNTIME_JOBS,
        metricsDowntimeStatuses: SCHEMA_METRICS_DOWNTIME_STATUSES
    })
    .default({});

const SCHEMA_USER_SETTINGS = Joi.object()
    .default({})
    .pattern(/\d/, Joi.object().keys({
        displayJobNameLength: SCHEMA_DISPLAY_JOB_NAME_LENGTH,
        showPRJobs: Joi.boolean()
    }))
    .unknown();

module.exports = {
    pipelineSettings: SCHEMA_PIPELINE_SETTINGS,
    userSettings: SCHEMA_USER_SETTINGS,
    metricsDowntimeJobs: SCHEMA_METRICS_DOWNTIME_JOBS
};
