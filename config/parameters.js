'use strict';

const Joi = require('joi');

const SCHEMA_PARAMETERS_STRING = Joi.string();
const SCHEMA_PARAMETERS_OBJECT = Joi.object({
    value: Joi.string().required(),
    description: Joi.string()
})
    .options({
        language: {
            object: {
                allowUnknown: 'only supports string or key: { value, description } pair as values'
            }
        }
    });

const SCHEMA_PARAMETERS = Joi.object()
    .pattern(Joi.any(),
        Joi.alternatives().try(SCHEMA_PARAMETERS_STRING, SCHEMA_PARAMETERS_OBJECT))
    .default({});

module.exports = {
    parameters: SCHEMA_PARAMETERS
};
