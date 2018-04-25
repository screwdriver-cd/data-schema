'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .number()
        .integer()
        .positive(),

    message: Joi
        .string()
        .max(512)
        .description('Body of banner to display')
        .example('Due to planned upgrade of Kubernetes, Screwdriver will be down'),

    isActive: Joi
        .boolean()
        .description('Flag if the banner is active')
        .example(true)
        .default(false),

    dateCreated: Joi
        .string()
        .isoDate()
        .description('When this banner was created')
        .example('2017-01-06T01:49:50.384359267Z'),

    createdBy: Joi
        .number()
        .integer()
        .positive()
        .description('ID of user creating the banner'),

    type: Joi
        .string().valid([
            'info',
            'warn'
        ])
        .description('Type/Severity of the banner message')
        .example('info')
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
     * Properties for Event that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'message', 'isActive', 'dateCreated', 'createdBy', 'type'
    ], [])).label('Get Event'),

    /**
     * Properties for User that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'message'
    ], ['type'])).label('Create Banner'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['message', 'type', 'dateCreated'],

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
    indexes: ['isActive']
};
