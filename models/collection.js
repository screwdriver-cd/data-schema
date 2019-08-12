'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');

const BUILD_MODEL = require('./build').get;
const PIPELINE_MODEL = require('./pipeline').get;
const PRS = {
    open: Joi.number().integer().min(0),
    failing: Joi.number().integer().min(0)
};
const PIPELINE_OBJECT = PIPELINE_MODEL.keys({
    lastBuilds: Joi.array().items(BUILD_MODEL).optional(),
    prs: Joi.object(PRS).optional()
});
const PIPELINES_MODEL = Joi.array().items(PIPELINE_OBJECT);
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
        .allow('')
        .description('Collection description')
        .example('List of my favorite pipelines'),

    pipelineIds: Joi
        .array()
        .items(Joi.number().integer().positive()),

    type: Joi
        .string()
        .max(32)
        .valid(['default', 'shared', 'normal'])
        .description('Collection type')
        .example('default')
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
        'pipelineIds',
        'pipelines',
        'type'
    ], [
        'description'
    ])).label('Get collection'),

    /**
     * Properties for collections that will come back during a LIST request.
     * The LIST request will list all of the requesting user's collections.
     */
    list: Joi.array().items(Joi.object(mutate(MODEL, [
        'id',
        'name',
        'pipelineIds',
        'userId',
        'type'
    ], [
        'description'
    ]))).label('List collections for requesting user'),

    /**
     * Properties for Collection that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'name',
        'type'
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
    indexes: [{ fields: ['userId'] }]
};
