'use strict';

const Joi = require('joi');
const Template = require('../config/template');

const TEMPLATE_TYPES = ['JOB', 'PIPELINE'];

const MODEL = {
    id: Joi.number()
        .integer()
        .positive()
        .description('Identifier of this template tag')
        .example(123345),
    createTime: Joi.string()
        .isoDate()
        .max(32)
        .description('When this template tag was created')
        .example('2038-01-19T03:14:08.131Z'),
    namespace: Template.namespace,
    name: Joi.string()
        .max(64)
        .description('Template name')
        .example('nodejs/lib'),
    tag: Template.templateTag,
    version: Template.exactVersion,
    templateType: Joi.string()
        .valid(...TEMPLATE_TYPES)
        .max(16)
        .description('Template Type')
        .example('PIPELINE')
        .required()
        .default('JOB')
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
     * All the available properties of Template Tag
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
    keys: ['namespace', 'name', 'tag', 'templateType'],

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
    tableName: 'templateTags',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['namespace'] }, { fields: ['name'] }, { fields: ['tag'] }]
};
