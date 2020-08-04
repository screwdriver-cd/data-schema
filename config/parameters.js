'use strict';

const Joi = require('@hapi/joi');

const SCHEMA_PARAMETERS_STRING = Joi.string();
const SCHEMA_PARAMETERS_OBJECT = Joi.object({
    value: Joi.alternatives().try(Joi.string(), Joi.array().items(Joi.string())).required(),
    description: Joi.string()
}).messages({
    'any.required': 'only supports string or key pair {#value}:{#description} as values'
});

const SCHEMA_PARAMETERS = Joi.object()
    .pattern(Joi.any(),
        Joi.alternatives().try(SCHEMA_PARAMETERS_STRING,
            Joi.array().items(SCHEMA_PARAMETERS_STRING),
            SCHEMA_PARAMETERS_OBJECT))
    .default({});

module.exports = {
    parameters: SCHEMA_PARAMETERS
};
