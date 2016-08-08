'use strict';
const Joi = require('joi');
const models = require('../models');
const buildId = Joi.reach(models.build.base, 'id').required();
const SCHEMA_START = Joi.object().keys({
    buildId,
    container: Joi.reach(models.build.base, 'container').required(),
    apiUri: Joi.string().uri().required()
        .label('API URI'),
    token: Joi.string().required()
        .label('Build JWT')
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
