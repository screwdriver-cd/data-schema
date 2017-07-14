'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');

const PIPELINE_MODEL = require('./pipeline').get;
const PIPELINES_MODEL = Joi.array().items(PIPELINE_MODEL);
const MODEL = {
    id: Joi
        .number()
        .integer()
        .positive(),

    userId: Joi
        .number()
        .integer()
        .positive()
        .description('User ID'),

    name: Joi
        .string()
        .max(128)
        .description('Collection name')
        .example('Favorites'),

    description: Joi
        .string()
        .max(256)
        .description('Collection description')
        .example('List of my favorite pipelines'),

    pipelineIds: Joi
        .array()
        .items(Joi.number().integer().positive())
};
const GET_MODEL = Object.assign({}, MODEL, { pipelines: PIPELINES_MODEL });

module.exports = {
    /**
     * All the available properties of Collection
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Collection'),

    /**
     * Properties for collection that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(GET_MODEL, [
        'id',
        'name',
        'pipelines'
    ], [
        'description'
    ])).label('Get collection'),

    /**
     * Properties for Collection that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'name'
    ], [
        'description',
        'pipelineIds'
    ])).label('Create collection'),

    /**
     * Properties for Collection that will be passed during a UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [], [
        'name',
        'description',
        'pipelineIds'
    ])).label('Update collection'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['userId', 'name'],

    /**
     * List of all fields in the model
     *
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
    tableName: 'collections',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['userId']
};
