'use strict';

const Joi = require('joi');

// essentially a Joi.ValidationError.details object
const TEMPLATE_ERROR = Joi.object()
    .keys({
        context: Joi.object()
            .label('Functional context regarding the error'),
        message: Joi.string()
            .label('Description of a particular validation error'),
        path: Joi.string()
            .label('Dot-notation path to the field that caused the validation error'),
        type: Joi.string()
            .label('The the Joi-type that categorizes the error')
    })
    .requiredKeys('message', 'path', 'type');

const SCHEMA_OUTPUT = Joi.object()
    .keys({
        errors: Joi.array()
            .items(TEMPLATE_ERROR)
            .label('Array of errors encountered while validating the given template'),
        // since a template could be parseable but invalid, the contents are unpredicatble
        template: Joi.object()
            .label('The end-result of parsing the given template')
    })
    .requiredKeys('errors', 'template')
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
