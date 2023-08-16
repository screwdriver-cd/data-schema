'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const pipelineTemplateVersions = require('../config/pipelineTemplate');
const JobTemplateConfig = require('../config/template');
const templateId = require('./templateMeta').base.extract('id');

const MODEL = {
    id: Joi.number().integer().positive().description('Identifier of this template').example(123345).required(),
    templateId,
    description: pipelineTemplateVersions.template.extract('description'),
    version: JobTemplateConfig.exactVersion.description('Exact version of the template').required(),
    config: pipelineTemplateVersions.config,
    createTime: Joi.string()
        .isoDate()
        .max(32)
        .description('When this template was created')
        .example('2038-01-19T03:14:08.131Z')
        .required()
};

module.exports = {
    /**
     * All the available properties of Template
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('pipelineTemplateVersions'),

    /**
     * All the available properties of pipelineTemplateVersions
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * Properties for template that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, ['id', 'templateId', 'version'], ['description', 'config', 'createTime'])).label(
        'Get Template'
    ),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['templateId', 'version'],

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
    rangeKeys: ['templateId', 'version'],

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'pipelineTemplateVersions',
    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['templateId'] }, { fields: ['version'] }]
};
