'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');
// For example, '155' or '155:staging'
const jobPattern = new RegExp(/^([0-9]+)(:[\w-]+)?$/);

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
        .example(['155:staging', '264:production'])
        .default([]),

    triggeredBy: Joi
        .array()
        .items(Joi.string().regex(jobPattern))
        .description('Jobs that trigger this Job')
        .example(['948:staging', '264'])
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
    ], [])).label('Get Job')
};
