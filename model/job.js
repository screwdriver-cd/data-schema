'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this Job')
        .example('50dc14f719cdc2c9cb1fb0e49dd2acc4cf6189a0'),

    name: Joi
        .string().regex(/^[A-Za-z0-9_-]+$/)
        .max(25)
        .description('Name of the Job')
        .example('main'),

    description: Joi
        .string().max(100)
        .description('Description of the Job')
        .example('builds and tests the code'),

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
        .default('ENABLED')
};

module.exports = {
    /**
     * All the available properties of Job
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Job'),

    /**
     * Properties for Job that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'pipelineId', 'name', 'state'
    ], [
        'description'
    ])).label('Get Job'),

    /**
     * Properties for Job that will come back during a UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [
        'state'
    ], [])).label('Update Job'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['pipelineId', 'name']
};
