'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    value: Joi
        .string()
        .token(),

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
        .description('Token name')
        .example('Mobile token'),

    description: Joi
        .string()
        .max(256)
        .description('Token description')
        .example('Used to authenticate the mobile app'),

    lastUsed: Joi
        .string()
        .isoDate()
        .allow(null)
        .description('Last used')
};

module.exports = {
    /**
     * All the available properties of Token
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Token'),

    /**
     * Properties for token that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi
        .array()
        .items(Joi.object(mutate(MODEL, [
            'id',
            'name',
            'lastUsed'
        ], [
            'description'
        ]))).label('Get tokens'),

    /**
     * Properties for Token that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'userId',
        'name'
    ], [
        'description'
    ])).label('Create token'),

    /**
     * Properties for token that will be passed during a UPDATE requeste
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [], [
        'name',
        'description'
    ])).label('Update token metadata'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['userId', 'name'],

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
    tableName: 'tokens',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['userId']
};
