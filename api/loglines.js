'use strict';

const Joi = require('joi');
const Build = require('../models/build');

const SCHEMA_PARAMS = Joi.object().keys({
    id: Joi.reach(Build.base, 'id'),
    name: Joi.reach(Build.getStep, 'name')
}).label('URL Parameters');

const SCHEMA_QUERY = Joi.object().keys({
    from: Joi.number().integer()
        .min(0)
        .default(0)
        .description('Starting line Number'),
    pages: Joi.number().integer()
        .min(1)
        .default(10)
        .description('Max pages sent per request'),
    sort: Joi
        .string().lowercase()
        .valid(['ascending', 'descending'])
        .default('ascending')
        .description('Sorting option for lines')
}).label('Query Parameters');

const SCHEMA_LOGLINE = Joi.object().keys({
    n: Joi
        .number().integer()
        .description('Numbered line number since the start of the step')
        .example(15),
    t: Joi
        .number().positive()
        .description('Unix timestamp of the log line')
        .example(1472084645.33),
    m: Joi
        .string().allow('')
        .description('Line Message'),
    s: Joi
        .string().min(1)
        .description('Step Name')
}).label('Log Line');

const SCHEMA_OUTPUT = Joi.array().items(SCHEMA_LOGLINE)
    .label('List of Log Lines');

/**
 * Input and output specification for reading log lines
 * @type {Object}
 */
module.exports = {
    params: SCHEMA_PARAMS,
    query: SCHEMA_QUERY,
    output: SCHEMA_OUTPUT
};
