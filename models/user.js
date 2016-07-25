'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this user')
        .example('b09833cec69eff1bb667940a45e311262e85a422'),

    username: Joi
        .string()
        .description('Username')
        .example('batman123'),

    token: Joi
        .string()
        .description('Token')
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
        'username',
        'token'
    ], [])).label('Create User'),

    /**
     * Properties for User that will be passed during a UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [
        'id',
        'token'
    ], [])).label('Update User'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['username'],

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
    indexes: ['username']
};
