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
        .example('Due to planned upgrade of Kubernetes, Screwdriver will be down')
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
     * Properties for User that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'message'
    ], [])).label('Create Banner'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['message'],

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
    indexes: ['message']
};
