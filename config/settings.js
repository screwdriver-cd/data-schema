'use strict';

const Joi = require('joi');

const SCHEMA_TIMESTAMP_FORMAT = Joi.string()
    .valid('UTC', 'LOCAL_TIMEZONE')
    .optional()
    .default('LOCAL_TIMEZONE')
    .description('User preferred timestamp');
const SCHEMA_DISPLAY_JOB_NAME_LENGTH = Joi.number()
    .integer()
    .min(20)
    .max(99)
    .default(20)
    .description('Job name length to display on workflowGraph')
    .example(20);
const SCHEMA_METRICS_DOWNTIME_JOBS = Joi.array()
    .items(
        Joi.number().integer().positive().description('Identifier for this job').example(123345).optional().allow(null)
    )
    .description('Job IDs to watch for downtime');
const SCHEMA_METRICS_DOWNTIME_STATUSES = Joi.array()
    .items(Joi.string())
    .description('Build statuses to watch for downtime');

const SCHEMA_PIPELINE_SETTINGS = Joi.object()
    .keys({
        metricsDowntimeJobs: SCHEMA_METRICS_DOWNTIME_JOBS,
        metricsDowntimeStatuses: SCHEMA_METRICS_DOWNTIME_STATUSES,
        public: Joi.boolean(),
        groupedEvents: Joi.boolean().optional(),
        showEventTriggers: Joi.boolean().optional(),
        filterEventsForNoBuilds: Joi.boolean().optional(),
        aliasName: Joi.string()
            .allow('')
            .max(32)
            .description('A customizable alias for pipeline name')
            .example('scwdvr-cd')
            .optional()
    })
    .default({});

const SCHEMA_USER_SETTINGS = Joi.object()
    .default({})
    .pattern(
        /\d/,
        Joi.object().keys({
            showPRJobs: Joi.boolean()
        })
    )
    .unknown();

SCHEMA_USER_SETTINGS.append({
    displayJobNameLength: SCHEMA_DISPLAY_JOB_NAME_LENGTH,
    timestampFormat: SCHEMA_TIMESTAMP_FORMAT
});

module.exports = {
    pipelineSettings: SCHEMA_PIPELINE_SETTINGS,
    userSettings: SCHEMA_USER_SETTINGS,
    metricsDowntimeJobs: SCHEMA_METRICS_DOWNTIME_JOBS
};
