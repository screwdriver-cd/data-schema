'use strict';

const Joi = require('joi');
const Annotations = require('../config/annotations');
const Job = require('../config/job');
const Provider = require('../config/provider');
const Template = require('../config/template');
const models = require('../models');
const buildId = models.build.base.extract('id').required();
const eventId = models.event.base.extract('id');
const causeMessage = models.event.base.extract('causeMessage');
const jobId = models.job.base.extract('id');
const jobName = models.job.base.extract('name');
const jobState = models.job.base.extract('state');
const jobArchived = models.job.base.extract('archived');
const pipelineId = models.pipeline.base.extract('id');

const SCHEMA_PIPELINE = Joi.object()
    .keys({
        id: pipelineId.required(),
        name: models.pipeline.base.extract('name').optional().allow(null),
        scmContext: models.pipeline.base.extract('scmContext').required(),
        configPipelineId: models.pipeline.base.extract('configPipelineId').optional().allow(null)
    })
    .unknown();
const SCHEMA_TEMPLATE = Joi.object()
    .keys({
        id: models.template.base.extract('id').optional(),
        fullName: Template.fullName.optional(),
        name: models.template.base.extract('name').optional(),
        namespace: models.template.base.extract('namespace').optional(),
        version: models.template.base.extract('version').optional()
    })
    .unknown();
const buildSchemaObj = {
    build: Joi.object(),
    causeMessage,
    jobId,
    jobName,
    jobState,
    jobArchived,
    provider: Provider.provider.optional(),
    annotations: Annotations.annotations,
    blockedBy: Joi.array().items(jobId),
    freezeWindows: Job.freezeWindows,
    buildId,
    eventId,
    tokenGen: Joi.func(),
    pipeline: SCHEMA_PIPELINE,
    pipelineId,
    template: SCHEMA_TEMPLATE,
    buildClusterName: models.buildCluster.base.extract('name'),
    container: models.build.base.extract('container').required(),
    apiUri: Joi.string().uri().required().label('API URI'),
    token: Joi.string().required().label('Build JWT'),
    enqueueTime: Joi.date().iso(),
    isPR: Joi.boolean().optional().default(true),
    prNum: models.event.base.extract('prNum').optional(),
    prParentJobId: jobId.optional()
};
const SCHEMA_START = Joi.object()
    .keys(buildSchemaObj)
    .unknown(true) // allow other fields
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
        provider: Provider.provider.optional(),
        apiUri: Joi.string().uri().required().label('API URI'),
        jobName
    })
    .unknown(true) // allow other fields
    .required();
const SCHEMA_STATUS = Joi.object()
    .keys({
        buildId,
        token: Joi.string().label('Build JWT'),
        pipelineId,
        jobId,
        provider: Provider.provider.optional()
    })
    .unknown(true) // allow other fields
    .required();
const SCHEMA_VERIFY = Joi.object()
    .keys(buildSchemaObj)
    .unknown(true) // allow other fields
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
