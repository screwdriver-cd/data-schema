'use strict';

const Annotations = require('../config/annotations');
const Job = require('../config/job');
const Joi = require('joi');
const models = require('../models');
const buildId = Joi.reach(models.build.base, 'id').required();
const eventId = Joi.reach(models.event.base, 'id');
const causeMessage = Joi.reach(models.event.base, 'causeMessage');
const jobId = Joi.reach(models.job.base, 'id');
const jobName = Joi.reach(models.job.base, 'name');
const jobState = Joi.reach(models.job.base, 'state');
const jobArchived = Joi.reach(models.job.base, 'archived');

const SCHEMA_PIPELINE = Joi.object().keys({
    id: Joi.reach(models.pipeline.base, 'id').required(),
    scmContext: Joi.reach(models.pipeline.base, 'scmContext').required()
}).unknown();
const pipelineId = Joi.reach(models.pipeline.base, 'id');
const SCHEMA_START = Joi.object().keys({
    build: Joi.object(),
    causeMessage,
    jobId,
    jobName,
    jobState,
    jobArchived,
    annotations: Annotations.annotations,
    blockedBy: Joi.array().items(jobId),
    freezeWindows: Job.freezeWindows,
    buildId,
    eventId,
    tokenGen: Joi.func(),
    pipeline: SCHEMA_PIPELINE,
    pipelineId,
    buildClusterName: Joi.reach(models.buildCluster.base, 'name'),
    container: Joi.reach(models.build.base, 'container').required(),
    apiUri: Joi.string().uri().required()
        .label('API URI'),
    token: Joi.string().required()
        .label('Build JWT'),
    enqueueTime: Joi.date().iso(),
    isPR: Joi.boolean().optional().default(false),
    prParentJobId: jobId.optional()
}).required();
const SCHEMA_STOP = Joi.object().keys({
    annotations: Annotations.annotations,
    blockedBy: Joi.array().items(jobId),
    freezeWindows: Job.freezeWindows,
    buildId,
    buildClusterName: Joi.reach(models.buildCluster.base, 'name'),
    jobId,
    token: Joi.string().label('Build JWT'),
    pipelineId
}).required();
const SCHEMA_STATUS = Joi.object().keys({
    buildId,
    token: Joi.string().label('Build JWT'),
    pipelineId,
    jobId
}).required();

module.exports = {
    /**
     * Properties for Executor that will be passed for the START method
     *
     * @property start
     * @type {Joi}
     */
    start: SCHEMA_START,

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
