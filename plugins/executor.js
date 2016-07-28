'use strict';
const Joi = require('joi');
const models = require('../models');
const buildId = Joi.reach(models.build.base, 'id').required();
const SCHEMA_START = Joi.object().keys({
    buildId,
    jobId: Joi.reach(models.job.base, 'id').required(),
    jobName: Joi.reach(models.job.base, 'name').required(),
    pipelineId: Joi.reach(models.pipeline.base, 'id').required(),
    container: Joi.reach(models.build.base, 'container').required(),
    scmUrl: Joi.reach(models.pipeline.base, 'scmUrl').required()
}).required();
const SCHEMA_STOP = Joi.object().keys({
    buildId
}).required();
const SCHEMA_STREAM = Joi.object().keys({
    buildId
}).required();

module.exports = {
    /**
     * Properties for Executor that will be passed for the START method
     *
     * @property get
     * @type {Joi}
     */
    start: SCHEMA_START,

    /**
     * Properties for Executor that will be passed for the STOP method
     *
     * @property update
     * @type {Joi}
     */
    stop: SCHEMA_STOP,

    /**
     * Properties for Executor that will be passed for the STREAM method
     *
     * @property save
     * @type {Joi}
     */
    stream: SCHEMA_STREAM
};
