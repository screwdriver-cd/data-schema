'use strict';

const Joi = require('@hapi/joi');

// essentially a Joi.ValidationError.details object
const COMMAND_ERROR = Joi.object()
    .keys({
        context: Joi.object()
            .label('Functional context regarding the error'),
        message: Joi.string()
            .label('Description of a particular validation error').required(),
        path: Joi.array()
            .items(Joi.string())
            .label('Dot-notation path to the field that caused the validation error')
            .required(),
        type: Joi.string()
            .label('The the Joi-type that categorizes the error')
            .required()
    });

const SCHEMA_OUTPUT = Joi.object()
    .keys({
        errors: Joi.array()
            .items(COMMAND_ERROR)
            .label('Array of errors encountered while validating the given command')
            .required(),
        // since a command could be parseable but invalid, the contents are unpredicatble
        command: Joi.object()
            .label('The end-result of parsing the given command')
            .required()
    })
    .label('Command validation output');

const SCHEMA_INPUT = Joi.object({
    yaml: Joi.string()
        .required()
        .label('sd-command.yaml contents')
}).label('Certify input to command validator');

/**
 * Input and output specification for validation
 * @type {Object}
 */
module.exports = {
    input: SCHEMA_INPUT,
    output: SCHEMA_OUTPUT
};
