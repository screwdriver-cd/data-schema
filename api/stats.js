'use strict';

const Joi = require('joi');

const SCHEMA_REQUESTS = Joi.object()
    .keys({
        total: Joi.number().integer().description('Total number of requests').example(100),
        timeouts: Joi.number().integer().description('Number of timeouts').example(0),
        success: Joi.number().integer().description('Number of successes').example(95),
        failure: Joi.number().integer().description('Number of failures').example('5'),
        concurrent: Joi.number().integer().description('Number of concurrent requests').example(0),
        averageTime: Joi.number().label('Average time per request').example(5.3134)
    })
    .label('Requests Object');

const SCHEMA_BREAKER = Joi.object()
    .keys({
        isClosed: Joi.boolean().label('Breaker is closed')
    })
    .label('Breaker Object');

const SCHEMA_EXECUTOR = Joi.object()
    .keys({
        requests: SCHEMA_REQUESTS,
        breaker: SCHEMA_BREAKER
    })
    .label('Executor Object');

const SCHEMA_STATS = Joi.object()
    .keys({
        executor: SCHEMA_EXECUTOR,
        scm: Joi.object().pattern(/^\S*:\S*$/, SCHEMA_EXECUTOR)
    })
    .label('Stats Object');

module.exports = SCHEMA_STATS;
