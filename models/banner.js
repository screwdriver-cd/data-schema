'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');

const SCOPES = ['GLOBAL', 'PIPELINE', 'BUILD'];

const MODEL = {
    id: Joi.number().integer().positive(),

    message: Joi.string()
        .max(512)
        .description('Body of banner to display')
        .example('Due to planned upgrade of Kubernetes, Screwdriver will be down'),

    isActive: Joi.boolean().description('Flag if the banner is active').example(true),

    createTime: Joi.string()
        .max(32)
        .isoDate()
        .description('When this banner was created')
        .example('2017-01-06T01:49:50.384359267Z'),

    createdBy: Joi.string().max(128).description('Username of user creating the banner').example('batman123'),

    type: Joi.string().valid('info', 'warn').max(32).description('Type/Severity of the banner message').example('info'),

    scope: Joi.string()
        .max(16)
        .valid(...SCOPES)
        .description('Scope of the banner')
        .example('GLOBAL')
        .default('GLOBAL')
        .required(),

    scopeId: Joi.number()
        .integer()
        .positive()
        .description('Identifier to pipelineId for PIPELINE, buildId for BUILD, or null for GLOBAL')
        .when('scope', {
            is: Joi.valid('GLOBAL'),
            then: Joi.allow(null).optional(),
            otherwise: Joi.required()
        })
        .example(1234)
};

module.exports = {
    /**
     * All the available properties of Banner
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Banner'),

    /**
     * All the available properties of Banner
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * Properties for Banner that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(
        mutate(MODEL, ['id', 'message', 'type', 'isActive', 'scope', 'scopeId', 'createdBy', 'createTime'], [])
    ).label('Get Banner'),

    /**
     * Properties for Banners that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, ['message'], ['type', 'isActive', 'scope', 'scopeId'])).label('Create Banner'),

    /**
     * Properties for Banners that will be passed during a UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [], ['message', 'type', 'isActive'])).label('Update Banner'),

    /**
     * Properties for Banners that will come back during a LIST request.
     * The LIST request will list all banners
     */
    list: Joi.array()
        .items(
            Joi.object(
                mutate(MODEL, ['id', 'message', 'type', 'isActive', 'scope', 'scopeId', 'createdBy', 'createTime'], [])
            )
        )
        .label('List Banners'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['message', 'type', 'createTime', 'scope', 'scopeId'],

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
    tableName: 'banners',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['isActive'] }, { fields: ['scope', 'scopeId'] }]
};
