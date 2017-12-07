'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const Command = require('../config/command');

const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this command')
        .example(123345),

    labels: Joi
        .array()
        .items(Joi.string())
        .description('Labels for command')
        .example(['stable', 'latest', 'beta']),

    namespace: Command.namespace,
    command: Command.command,
    version: Command.version,
    description: Command.description,
    maintainer: Command.maintainer,
    format: Command.format,
    habitat: Command.habitat,
    docker: Command.docker,
    binary: Command.binary
};

module.exports = {
    /**
     * All the available properties of Command
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Command'),

    /**
     * Properties for command that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id',
        'labels',
        'namespace',
        'command',
        'version',
        'description',
        'maintainer',
        'format'
    ], [
        'habitat',
        'docker',
        'binary'
    ])).label('Get Command'),

    /**
     * Properties for command that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'namespace',
        'command',
        'version',
        'description',
        'maintainer',
        'format'
    ], [
        'habitat',
        'docker',
        'binary',
        'labels'
    ])).label('Create Command'),

    /**
     * Properties for command that will be passed during a UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [], ['labels']))
        .label('Update Command'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['namespace', 'command', 'version'],

    /**
     * List of all fields in the model
     * @property allKeys
     * @type {Array}
     */
    allKeys: Object.keys(MODEL),

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['namespace', 'command'],

    /**
     * Primary column to sort queries by.
     * This defines queries to optionally sort a query result set by id.
     * Each range key matches up with an element in the indexes property
     *
     * @property rangeKeys
     * @type {Array}
     */
    rangeKeys: ['id'],

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'commands'
};
