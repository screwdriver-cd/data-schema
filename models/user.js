'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const Settings = require('../config/settings');

const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this user')
        .example(123345),

    username: Joi
        .string()
        .max(128)
        .description('Username')
        .example('batman123'),

    token: Joi
        .string()
        .description('Github token'),

    scmContext: Joi
        .string()
        .max(128)
        .description('The SCM to which the user belongs')
        .example('github:github.com'),

    settings: Settings.userSettings
};

module.exports = {
    /**
     * All the available properties of User
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('User'),

    /**
     * Properties for User that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'username', 'scmContext'
    ], [])).label('Create User'),

    /**
     * Properties for User that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [], [
        'id', 'username', 'scmContext', 'settings'
    ])).label('Get User'),

    /**
     * Properties for User that will be passed during a UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [], [
        'settings'
    ])).label('Update User'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['username', 'scmContext'],

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
    tableName: 'users',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['username'] }, { fields: ['scmContext'] }]
};
