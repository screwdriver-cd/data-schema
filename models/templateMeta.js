'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const pipelineTemplateConfig = require('../config/pipelineTemplate');
const pipelineId = require('./pipeline').base.extract('id');
const JobTemplateConfig = require('../config/template');

const TEMPLATE_TYPES = ['JOB', 'PIPELINE'];

const MODEL = {
    id: Joi.number().integer().positive().description('Identifier of this template').example(123345).required(),
    pipelineId,
    namespace: pipelineTemplateConfig.template.extract('namespace'),
    name: pipelineTemplateConfig.template.extract('name'),
    maintainer: pipelineTemplateConfig.template.extract('maintainer'),
    trustedSinceVersion: JobTemplateConfig.exactVersion
        .description('The version since the template is marked as trusted')
        .example('1.2.3'),
    latestVersion: JobTemplateConfig.exactVersion.description('Latest version of the template'),
    createTime: Joi.string()
        .isoDate()
        .max(32)
        .description('When this template was created')
        .example('2038-01-19T03:14:08.131Z')
        .required(),
    updateTime: Joi.string()
        .isoDate()
        .max(32)
        .description('When this template was updated')
        .example('2038-01-19T03:14:08.131Z')
        .required(),
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
     * All the available properties of Template
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('templateMeta'),

    /**
     * All the available properties of TemplateMeta
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
    get: Joi.object(
        // eslint-disable-next-line no-sparse-arrays
        mutate(
            MODEL,
            ['id', 'pipelineId', 'namespace', 'name', 'maintainer', 'templateType'],
            ['trustedSinceVersion', 'latestVersion', 'createTime', 'updateTime']
        )
    ).label('Get Template'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['namespace', 'name', 'templateType'],

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
    rangeKeys: ['namespace', 'name'],

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'templateMeta',
    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['namespace'] }, { fields: ['name'] }]
};
