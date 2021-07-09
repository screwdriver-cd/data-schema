'use strict';

const Joi = require('joi');
const Command = require('../config/command');

const MODEL = {
    id: Joi.number()
        .integer()
        .positive()
        .description('Identifier of this command tag')
        .example(123345),
    createTime: Joi.string()
        .isoDate()
        .max(32)
        .description('When this command tag was created')
        .example('2038-01-19T03:14:08.131Z'),
    namespace: Command.namespace,
    name: Command.name,
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
     * All the available properties of Job
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['namespace', 'name', 'tag'],

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
    tableName: 'commandTags',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['namespace'] }, { fields: ['name'] }, { fields: ['tag'] }]
};
