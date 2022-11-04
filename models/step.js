'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi.number().integer().positive().description('Identifier of this Step').example(123345),

    buildId: Joi.number().integer().positive().description('Identifier of the parent Build').example(123345),

    name: Joi.string().max(64).description('Name of the Step').example('install'),

    command: Joi.string().description('Command of the Step to execute').example('npm install'),

    code: Joi.number().integer().description('Exit code').example(1),

    startTime: Joi.string().isoDate().description('When this Step started').example('2017-01-06T01:49:50.384359267Z'),

    endTime: Joi.string()
        .isoDate()
        .description('When this Step stopped running')
        .example('2017-01-06T01:49:51.676057192Z'),

    lines: Joi.number().integer().description('Number of Step log lines').example(100)
};

module.exports = {
    /**
     * All the available properties of Step
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Step'),

    /**
     * All the available properties of Job
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * Properties for Step that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(
        mutate(
            MODEL,
            ['name'],
            [
                // Make id and buildId optional for backwards compatibility
                'command',
                'id',
                'buildId',
                'code',
                'startTime',
                'endTime',
                'lines'
            ]
        )
    ).label('Get Step metadata'),

    /**
     * Properties for Step that will be passed during an UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [], ['code', 'startTime', 'endTime', 'lines'])).label('Update Step metadata'),

    /**
     * Properties for Step that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, ['buildId', 'name'], ['command', 'code', 'startTime', 'endTime', 'lines'])).label(
        'Create Step'
    ),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['buildId', 'name'],

    /**
     * List of all fields in the model
     * @property allKeys
     * @type {Array}
     */
    allKeys: Object.keys(MODEL),

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'steps',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['buildId'] }, { fields: ['name'] }]
};
