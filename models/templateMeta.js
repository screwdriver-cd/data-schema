'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const pipelineTemplate = require('../config/pipelineTemplate');
const pipelineId = require('./pipeline').base.extract('id');

const MODEL = {
    id: Joi.number().integer().positive().description('Identifier of this template').example(123345),
    pipelineId,
    namespace: pipelineTemplate.namespace,
    name: Joi.string().max(64).description('Template name').example('nodejs/lib'),
    maintainer: pipelineTemplate.maintainer,
    trustedSinceVersion: Joi.string().max(32).description('Latest version that was marked trusted').example('1.2.3'),
    latest: Joi.boolean().description('Whether this is latest version'),
    createTime: Joi.string()
        .isoDate()
        .max(32)
        .description('When this template was created')
        .example('2038-01-19T03:14:08.131Z'),
    updateTime: Joi.string()
        .isoDate()
        .max(32)
        .description('When this template was updated')
        .example('2038-01-19T03:14:08.131Z')
};

const CREATE_MODEL = { ...MODEL, config: pipelineTemplate.configNoDupSteps };

module.exports = {
    /**
     * All the available properties of Template
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('templateMeta'),

    /**
     * All the available properties of Job
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
            [
                'id',
                'pipelineId',
                'namespace',
                'name',
                'maintainer',
                'trustedSinceVersion',
                'latest',
                'createTime',
                'updateTime'
            ],
            []
        )
    ).label('Get Template'),

    /**
     * Properties for template that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(
        mutate(
            CREATE_MODEL,
            [
                'id',
                'pipelineId',
                'namespace',
                'name',
                'maintainer',
                'trustedSinceVersion',
                'latest',
                'createTime',
                'updateTime'
            ],
            []
        )
    ).label('Create Template'),

    /**
     * Properties for template that will be passed during a UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [], [])).label('Update Template'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['namespace', 'name'],

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
    tableName: 'templateMeta',
    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['namespace'] }, { fields: ['name'] }]
};
