'use strict';

const Joi = require('joi');
const Regex = require('../config/regex');
const mutate = require('../lib/mutate');
const jobName = require('./job').base.extract('name');

const MODEL = {
    id: Joi.number().integer().positive().example(12345),

    pipelineId: Joi.number().integer().positive().description('Pipeline associated with the Stage').example(123345),

    name: Joi.string().regex(Regex.STAGE_NAME).max(110).description('Name of the Stage').example('deploy'),

    setup: Joi.array()
        .items(Joi.number().integer().positive().description('Identifier for this job').example(123345))
        .description('Job IDs in this Stage'),

    teardown: Joi.array()
        .items(Joi.number().integer().positive().description('Identifier for this job').example(123345))
        .description('Job IDs in this Stage'),

    jobIds: Joi.array()
        .items(Joi.number().integer().positive().description('Identifier for this job').example(123345))
        .description('Job IDs in this Stage'),

    description: Joi.string().max(256).description('Description of the Stage').example('Deploys canary jobs'),

    startFrom: jobName.description('Stage start point - a job name').example('main')
};

module.exports = {
    /**
     * All the available properties of Stage
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Stage'),

    /**
     * All the available properties of Stage
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * Properties for Stage that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(
        mutate(MODEL, ['id', 'pipelineId', 'name', 'jobIds'], ['description', 'setup', 'teardown', 'startFrom'])
    ).label('Get Stage metadata'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['pipelineId', 'name'],

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
    tableName: 'stages',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['pipelineId'] }]
};
