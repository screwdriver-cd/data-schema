'use strict';

const Joi = require('joi');
const STATUSES = require('../models/build').allStatuses;
const SCHEMA_STATUS = Joi.string().valid(...STATUSES);
const SCHEMA_BUILD_SETTINGS = Joi.object()
    .keys({})
    .unknown(true);
const SCHEMA_SCM_REPO = Joi.object()
    .keys({
        name: Joi.string().required()
    })
    .unknown(true);
const SCHEMA_PIPELINE = Joi.object()
    .keys({
        scmRepo: SCHEMA_SCM_REPO.required()
    })
    .unknown(true);
const SCHEMA_BUILD_DATA = {
    settings: SCHEMA_BUILD_SETTINGS.required(),
    status: SCHEMA_STATUS.required(),
    pipeline: SCHEMA_PIPELINE.required(),
    jobName: Joi.string(),
    build: Joi.object()
        .keys({
            id: Joi.number()
                .integer()
                .required()
        })
        .unknown(true),
    event: Joi.object(),
    buildLink: Joi.string(),
    isFixed: Joi.boolean()
};
const SCHEMA_JOB_DATA = {
    settings: SCHEMA_BUILD_SETTINGS.required(),
    status: SCHEMA_STATUS.required(),
    pipeline: SCHEMA_PIPELINE.required(),
    message: Joi.string().required(),
    jobName: Joi.string().required(),
    pipelineLink: Joi.string().required()
};

module.exports = {
    /**
     * Validates the status for notifications plugins
     *
     * @property schemaBuildData
     * @type {Joi}
     */
    schemaStatus: SCHEMA_STATUS,

    /**
     * Validates the buildData for notifications plugins
     *
     * @property schemaBuildData
     * @type {Array}
     */
    schemaBuildData: SCHEMA_BUILD_DATA,

    /**
     * Validates the jobData for notifications plugins
     *
     * @property schemaJobData
     * @type {Array}
     */
    schemaJobData: SCHEMA_JOB_DATA
};
