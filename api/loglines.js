'use strict';

const Joi = require('joi');
const Build = require('../models/build');

const SCHEMA_PARAMS = Joi.object()
    .keys({
        id: Build.base.extract('id'),
        name: Build.getStep.extract('name')
    })
    .label('URL Parameters');

const SCHEMA_QUERY = Joi.object()
    .keys({
        from: Joi.number().integer().min(0).default(0).description('Starting line Number'),
        pages: Joi.number().integer().min(1).default(10).description('Max pages sent per request'),
        sort: Joi.string()
            .lowercase()
            .valid('ascending', 'descending')
            .default('ascending')
            .description('Sorting option for lines'),
        type: Joi.string()
            .valid('download', 'preview')
            .default('preview')
            .label('Flag to trigger type either to download or preview')
    })
    .label('Query Parameters');

const SCHEMA_LOGLINE = Joi.object()
    .keys({
        n: Joi.number().integer().description('Numbered line number since the start of the step').example(15),
        t: Joi.number().positive().description('Unix timestamp of the log line').example(1472084645.33),
        m: Joi.string().allow('').description('Line Message'),
        s: Joi.string().min(1).description('Step Name')
    })
    .label('Log Line');

const SCHEMA_OUTPUT = Joi.alternatives()
    .try(Joi.array().items(SCHEMA_LOGLINE), Joi.string())
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
