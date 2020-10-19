'use strict';

const Joi = require('joi');
const Job = require('./job');

const SCHEMA_DISPLAY_JOB_NAME_LENGTH = Joi.number().integer()
    .min(20)
    .max(99)
    .default(20)
    .description('Job name length to display on workflowGraph')
    .example(20);
const SCHEMA_METRICS_DOWNTIME_JOBS = Joi.array().items(
    Job.jobName
).description('Jobs to watch for downtime');

const SCHEMA_PIPELINE_SETTINGS = Joi.object()
    .keys({
        metricsDowntimeJobs: SCHEMA_METRICS_DOWNTIME_JOBS
    })
    .default({});
const SCHEMA_USER_SETTINGS = Joi.object()
    .keys({
        displayJobNameLength: SCHEMA_DISPLAY_JOB_NAME_LENGTH
    })
    .default({});

module.exports = {
    pipelineSettings: SCHEMA_PIPELINE_SETTINGS,
    userSettings: SCHEMA_USER_SETTINGS
};
