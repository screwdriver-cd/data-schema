'use strict';

const Joi = require('joi');
const Command = require('../config/command');

const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this command tag')
        .example(123345),
    namespace: Command.namespace,
    command: Command.command,
    tag: Command.commandTag,
    version: Command.exactVersion
};

module.exports = {
    /**
     * All the available properties of Command Tag
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('CommandTag'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['namespace', 'command', 'tag'],

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
    indexes: ['namespace', 'command', 'tag'],

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'commandTags'
};
