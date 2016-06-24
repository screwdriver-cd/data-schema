'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');
// Hex string of length 40, '50dc14f719cdc2c9cb1fb0e49dd2acc4cf6189a0'
// or '50dc14f719cdc2c9cb1fb0e49dd2acc4cf6189a0:staging'
const jobPattern = new RegExp(/^([0-9a-f]{40})(:[\w-]+)?$/);

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this Job')
        .example('50dc14f719cdc2c9cb1fb0e49dd2acc4cf6189a0'),

    name: Joi
        .string()
        .description('Name of the Job')
        .example('component'),

    pipelineId: Joi
        .string().hex().length(40)
        .description('Identifier of the Pipeline')
        .example('2d991790bab1ac8576097ca87f170df73410b55c'),

    state: Joi
        .string().valid([
            'ENABLED',
            'DISABLED'
        ])
        .description('Current state of the Job')
        .example('ENABLED')
        .default('ENABLED'),

    triggers: Joi
        .array()
        .items(Joi.string().regex(jobPattern))
        .description('Jobs that are triggered by this Job')
        .example([
            '13360deaa1a3b2225afb414e278aaf1a04e939bd:staging',
            '01a9a103020d69886fd17797282341f6a6b43070:production'
        ])
        .default([]),

    triggeredBy: Joi
        .array()
        .items(Joi.string().regex(jobPattern))
        .description('Jobs that trigger this Job')
        .example([
            'b2a8f21dfd7a8fa17f1daf2861c866488a8be607:staging',
            'a58a4b4277c4b3e13d92e4566868be0f4aec062b'
        ])
        .default([])
};

module.exports = {
    /**
     * All the available properties of Job
     *
     * @property base
     * @return {Joi} Joi Object
     */
    base: Joi.object(MODEL).label('Job'),

    /**
     * Properties for Job that will come back during a GET request
     *
     * @property get
     * @return {Joi} Joi Object
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'pipelineId', 'name', 'state', 'triggers', 'triggeredBy'
    ], [])).label('Get Job'),

    /**
     * Properties for Job that will come back during a UPDATE request
     *
     * @property update
     * @return {Joi} Joi Object
     */
    update: Joi.object(mutate(MODEL, [
        'state'
    ], [])).label('Update Job')
};
