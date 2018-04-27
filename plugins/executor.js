'use strict';

const Annotations = require('../config/annotations');
const Joi = require('joi');
const models = require('../models');
const buildId = Joi.reach(models.build.base, 'id').required();
const SCHEMA_START = Joi.object().keys({
    annotations: Annotations.annotations,
    buildId,
    container: Joi.reach(models.build.base, 'container').required(),
    apiUri: Joi.string().uri().required()
        .label('API URI'),
    token: Joi.string().required()
        .label('Build JWT')
}).required();
const SCHEMA_STOP = Joi.object().keys({
    annotations: Annotations.annotations,
    buildId
}).required();
const SCHEMA_START_PERIODIC = Joi.object().keys({
    pipeline: Joi.object().required(),
    job: Joi.object().required(),
    tokenGen: Joi.func().required(),
    update: Joi.boolean().required()
}).required();
const SCHEMA_STOP_PERIODIC = Joi.object().keys({
    jobId: Joi.reach(models.job.base, 'id').required()
}).required();
const SCHEMA_STATUS = Joi.object().keys({
    buildId
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
     * Properties for Executor that will be passed for the STARTPERIODIC method
     *
     * @property startPeriodic
     * @type {Joi}
     */
    startPeriodic: SCHEMA_START_PERIODIC,

    /**
     * Properties for Executor that will be passed for the STOPPERIODIC method
     *
     * @property stopPeriodic
     * @type {Joi}
     */
    stopPeriodic: SCHEMA_STOP_PERIODIC,

    /**
     * Properties for Executor that will be passed for the STATUS method
     *
     * @property status
     * @type {Joi}
     */
    status: SCHEMA_STATUS
};
