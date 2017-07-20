'use strict';

const Joi = require('joi');
const Template = require('../config/template');

const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this template tag')
        .example(123345),
    name: Template.name,
    tag: Template.templateTag,
    version: Template.exactVersion
};

module.exports = {
    /**
     * All the available properties of Template Tag
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('TemplateTag'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['name', 'tag'],

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
    indexes: ['name', 'tag'],

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'templateTags'
};
