'use strict';

const Joi = require('joi');
const Annotations = require('../config/annotations');
const Job = require('../config/job');
const models = require('../models');
const buildId = models.build.base.extract('id').required();
const eventId = models.event.base.extract('id');
const causeMessage = models.event.base.extract('causeMessage');
const jobId = models.job.base.extract('id');
const jobName = models.job.base.extract('name');
const jobState = models.job.base.extract('state');
const jobArchived = models.job.base.extract('archived');

const SCHEMA_PIPELINE = Joi.object()
    .keys({
        id: models.pipeline.base.extract('id').required(),
        scmContext: models.pipeline.base.extract('scmContext').required()
    })
    .unknown();
const pipelineId = models.pipeline.base.extract('id');
const buildSchemaObj = {
    build: Joi.object(),
    causeMessage,
    jobId,
    jobName,
    jobState,
    jobArchived,
    provider: Job.provider,
    annotations: Annotations.annotations,
    blockedBy: Joi.array().items(jobId),
    freezeWindows: Job.freezeWindows,
    buildId,
    eventId,
    tokenGen: Joi.func(),
    pipeline: SCHEMA_PIPELINE,
    pipelineId,
    buildClusterName: models.buildCluster.base.extract('name'),
    container: models.build.base.extract('container').required(),
    apiUri: Joi.string()
        .uri()
        .required()
        .label('API URI'),
    token: Joi.string()
        .required()
        .label('Build JWT'),
    enqueueTime: Joi.date().iso(),
    isPR: Joi.boolean()
        .optional()
        .default(true),
    prParentJobId: jobId.optional()
};
const SCHEMA_START = Joi.object()
    .keys(buildSchemaObj)
    .required();
const SCHEMA_STOP = Joi.object()
    .keys({
        annotations: Annotations.annotations,
        blockedBy: Joi.array().items(jobId),
        freezeWindows: Job.freezeWindows,
        buildId,
        buildClusterName: models.buildCluster.base.extract('name'),
        jobId,
        token: Joi.string().label('Build JWT'),
        pipelineId,
        provider: Job.provider
    })
    .required();
const SCHEMA_STATUS = Joi.object()
    .keys({
        buildId,
        token: Joi.string().label('Build JWT'),
        pipelineId,
        jobId,
        provider: Job.provider
    })
    .required();
const SCHEMA_VERIFY = Joi.object()
    .keys(buildSchemaObj)
    .required();

module.exports = {
    /**
     * Properties for Executor that will be passed for the START method
     *
     * @property start
     * @type {Joi}
     */
    start: SCHEMA_START,

    /**
     * Properties for Executor that will be passed for the VERIFY method
     *
     * @property start
     * @type {Joi}
     */
    verify: SCHEMA_VERIFY,

    /**
     * Properties for Executor that will be passed for the STOP method
     *
     * @property stop
     * @type {Joi}
     */
    stop: SCHEMA_STOP,

    /**
     * Properties for Executor that will be passed for the STATUS method
     *
     * @property status
     * @type {Joi}
     */
    status: SCHEMA_STATUS
};
