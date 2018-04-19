'use strict';

const Annotations = require('../config/annotations');
const Joi = require('joi');
const Regex = require('../config/regex');
const Scm = require('../core/scm');
const WorkflowGraph = require('../config/workflowGraph');
const mutate = require('../lib/mutate');

const CHECKOUT_URL = {
    checkoutUrl: Joi
        .string().regex(Regex.CHECKOUT_URL)
        .description('Checkout url for the application')
        .example('git@github.com:screwdriver-cd/data-schema.git#master')
        .example('https://github.com/screwdriver-cd/data-schema.git#master')
        .required()
};

const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this pipeline')
        .example(123345),

    scmUri: Joi
        .string().regex(Regex.SCM_URI).max(128)
        .description('Unique identifier for the application')
        .example('github.com:123456:master'),

    scmContext: Joi
        .string().max(128)
        .description('The SCM in which the repository exists')
        .example('github:github.com'),

    scmRepo: Scm.repo,

    createTime: Joi
        .string()
        .isoDate()
        .description('When this pipeline was created'),

    admins: Joi
        .object()
        .description('Admins of this Pipeline')
        .example({ myself: true }),

    workflowGraph: WorkflowGraph.workflowGraph
        .description('Graph representation of the workflow'),

    annotations: Annotations.annotations
        .description('Pipeline-level annotations'),

    lastEventId: Joi.number().integer().positive()
        .description('Identifier of last event')
        .example(123345)
};

module.exports = {
    /**
     * All the available properties of Pipeline
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Pipeline'),

    /**
     * Properties for Pipeline that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'scmUri', 'scmContext', 'createTime', 'admins'
    ], [
        'workflowGraph', 'scmRepo', 'annotations', 'lastEventId'
    ])).label('Get Pipeline'),

    /**
     * Properties for Pipeline that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(CHECKOUT_URL).label('Create Pipeline'),

    /**
     * Properties for Pipeline that will be passed during an UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(CHECKOUT_URL).label('Update Pipeline'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['scmUri'],

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
    tableName: 'pipelines',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['scmUri']
};
