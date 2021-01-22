'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const Command = require('../config/command');
const pipelineId = require('./pipeline').base.extract('id');

const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this command')
        .example(123345),
    namespace: Command.namespace,
    version: Command.version,
    description: Command.description,
    maintainer: Command.maintainer,
    format: Command.format,
    habitat: Command.habitat,
    docker: Command.docker,
    binary: Command.binary,
    name: Command.name,
    pipelineId,
    createTime: Joi
        .string()
        .isoDate()
        .max(32)
        .description('When this command was created')
        .example('2038-01-19T03:14:08.131Z'),
    usage: Command.usage,
    trusted: Joi.boolean()
        .description('Mark whether command is trusted'),
    latestVersion: Joi.boolean()
        .description('Whether this is latest version')
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
     * All the available properties of Job
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * Properties for command that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id',
        'namespace',
        'name',
        'version',
        'description',
        'maintainer',
        'format',
        'pipelineId'
    ], [
        'habitat',
        'docker',
        'binary',
        'createTime',
        'usage',
        'trusted',
        'latestVersion'
    ])).label('Get Command'),

    /**
     * Properties for command that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'namespace',
        'name',
        'version',
        'description',
        'maintainer',
        'format'
    ], [
        'habitat',
        'docker',
        'binary',
        'usage'
    ])).label('Create Command'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['namespace', 'name', 'version'],

    /**
     * List of all fields in the model
     * @property allKeys
     * @type {Array}
     */
    allKeys: Object.keys(MODEL),

    /**
     * Primary column to sort queries by.
     * This defines queries to optionally sort a query result set by id.
     * Each range key matches up with an element in the indexes property
     *
     * @property rangeKeys
     * @type {Array}
     */
    rangeKeys: ['id', 'id'],

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'commands',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['namespace'] }, { fields: ['name'] }]
};
