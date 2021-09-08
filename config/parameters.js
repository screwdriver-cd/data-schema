'use strict';

const Joi = require('joi');

const SCHEMA_PARAMETERS_STRING = Joi.string();
const SCHEMA_PARAMETERS_OBJECT = Joi.object({
    value: Joi.alternatives()
        .try(Joi.string(), Joi.array().items(Joi.string()))
        .required(),
    description: Joi.string()
}).messages({
    'object.unknown': 'only supports string or key: {{#label}} pair as values'
});

const SCHEMA_PARAMETERS_BASE = Joi.object().pattern(
    Joi.any(),
    Joi.alternatives().try(
        SCHEMA_PARAMETERS_STRING,
        Joi.array().items(SCHEMA_PARAMETERS_STRING),
        SCHEMA_PARAMETERS_OBJECT
    )
);

const SCHEMA_PARAMETERS_WITH_DEFAULT = SCHEMA_PARAMETERS_BASE.default({});
const SCHEMA_PARAMETERS_OPTIONAL = SCHEMA_PARAMETERS_BASE.optional();

module.exports = {
    parameters: SCHEMA_PARAMETERS_WITH_DEFAULT,
    parametersOptional: SCHEMA_PARAMETERS_OPTIONAL
};
