'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this log')
        .example('7babc233de26ab19ead1b9c278128d5c434910ee'),

    buildId: Joi
        .string().hex().length(40)
        .description('Identifier of the Build')
        .example('4b8d9b530d2e5e297b4f470d5b0a6e1310d29c5e'),

    stepName: Joi
        .string()
        .description('Name of the Step'),

    number: Joi
        .number().positive()
        .description('Numbered line number since the start of the step')
        .example(15),

    time: Joi
        .string()
        .isoDate()
        .description('Unix Timestamp of the log line'),

    message: Joi
        .string()
        .description('Contents of the log')
};

module.exports = {
    /**
     * All the available properties of Log
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Log'),

    /**
     * Properties for Log that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'buildId', 'time', 'message', 'number', 'stepName'
    ], [])).label('Get Log'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['buildId', 'stepName', 'number'],

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
    tableName: 'logs',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['buildId', 'stepName', 'number']
};
