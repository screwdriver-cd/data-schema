'use strict';

const Joi = require('joi');

// essentially a Joi.ValidationError.details object
const TEMPLATE_ERROR = Joi.object()
    .keys({
        context: Joi.object()
            .label('Functional context regarding the error'),
        message: Joi.string()
            .label('Description of a particular validation error')
            .required(),
        path: Joi.array()
            .items(Joi.string(), Joi.number().integer())
            .label('Array of path to the field that caused the validation error')
            .required(),
        type: Joi.string()
            .label('The the Joi-type that categorizes the error')
            .required()
    });

const SCHEMA_OUTPUT = Joi.object()
    .keys({
        errors: Joi.array()
            .items(TEMPLATE_ERROR)
            .label('Array of errors encountered while validating the given template')
            .required(),
        // since a template could be parseable but invalid, the contents are unpredictable
        template: Joi.object()
            .label('The end-result of parsing the given template')
            .required(),
        warnMessages: Joi.array().optional()
    })
    .label('Template validation output');

const SCHEMA_INPUT = Joi.object({
    yaml: Joi.string()
        .required()
        .label('sd-template.yaml contents')
}).label('Certify input to template validator');

/**
 * Input and output specification for validation
 * @type {Object}
 */
module.exports = {
    input: SCHEMA_INPUT,
    output: SCHEMA_OUTPUT
};
