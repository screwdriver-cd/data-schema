'use strict';

const Joi = require('joi');

const SCHEMA_STATUS = Joi.alternatives().try(
    Joi.string().valid('OK'),
    Joi.object({
        queue: Joi.string(),
        store: Joi.string(),
        api: Joi.string()
    }).required()
);

module.exports = SCHEMA_STATUS;
