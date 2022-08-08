'use strict';

const Joi = require('joi');
const Annotations = require('../config/annotations');
const Base = require('../config/base');
const Regex = require('../config/regex');
const Settings = require('../config/settings');
const Scm = require('../core/scm');
const WorkflowGraph = require('../config/workflowGraph');
const Parameters = require('../config/parameters');
const mutate = require('../lib/mutate');

const STATES = ['ACTIVE', 'INACTIVE'];

const CREATE_MODEL = {
    checkoutUrl: Joi.string()
        .regex(Regex.CHECKOUT_URL)
        .description('Checkout url for the application')
        .example('git@github.com:screwdriver-cd/data-schema.git#master')
        .example('https://github.com/screwdriver-cd/data-schema.git#master')
        .required(),

    rootDir: Scm.rootDir,
    autoKeysGeneration: Joi.boolean()
        .optional()
        .description('Flag to generate and add the public deploy key for a specific scm')
};

const MODEL = {
    id: Joi.number()
        .integer()
        .positive()
        .description('Identifier of this pipeline')
        .example(123345),

    name: Scm.repoName.optional(),

    scmUri: Joi.string()
        .regex(Regex.SCM_URI)
        .max(128)
        .description('Unique identifier for the application')
        .example('github.com:123456:master')
        .example('github.com:123456:master:src/app/component'),

    scmContext: Joi.string()
        .regex(Regex.SCM_CONTEXT)
        .max(128)
        .description('The SCM in which the repository exists')
        .example('github:github.com'),

    scmRepo: Scm.repo,

    createTime: Joi.string()
        .isoDate()
        .description('When this pipeline was created'),

    admins: Joi.object()
        .description('Admins of this Pipeline')
        .example({ myself: true }),

    workflowGraph: WorkflowGraph.workflowGraph.description('Graph representation of the workflow'),

    annotations: Annotations.annotations.description('Pipeline-level annotations'),

    lastEventId: Joi.number()
        .integer()
        .positive()
        .description('Identifier of last event')
        .example(123345),

    configPipelineId: Joi.number()
        .integer()
        .positive()
        .description('Identifier of pipeline containing external configuration')
        .example(123),

    childPipelines: Base.childPipelines.description('Configuration of child pipelines'),

    // This property is set from the `chainPR` annotation.
    // We don't change this property name because `alter table` will be needed
    // in existing DB table and moreover UI still uses this property name.
    // We will add `chainPR` property setter/getter method to pipeline model instead
    // in order to convert the `prChain` to `chainPR`.
    prChain: Base.prChain.description('Configuration of chainPR'),

    parameters: Parameters.parameters.default({}),

    settings: Settings.pipelineSettings,

    state: Joi.string()
        .valid(...STATES)
        .max(10)
        .description('Current state of the pipeline')
        .example('ACTIVE')
        .default('ACTIVE'),

    subscribedScmUrlsWithActions: Joi.array()
        .items(
            Joi.object().keys({
                scmUri: Regex.SCM_URI,
                actions: Joi.array().items(Joi.string())
            })
        )
        .description('List of subscribed scm urls paired with actions')
};

const UPDATE_MODEL = { ...CREATE_MODEL, settings: MODEL.settings };

module.exports = {
    /**
     * All the available properties of Pipeline
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Pipeline'),

    /**
     * All the available properties of Job
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * Properties for Pipeline that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(
        mutate(
            MODEL,
            ['id', 'scmUri', 'scmContext', 'createTime', 'admins', 'state'],
            [
                'workflowGraph',
                'scmRepo',
                'annotations',
                'lastEventId',
                'configPipelineId',
                'childPipelines',
                'name',
                'prChain',
                'parameters',
                'subscribedScmUrlsWithActions',
                'settings'
            ]
        )
    ).label('Get Pipeline'),

    /**
     * Properties for Pipeline that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(CREATE_MODEL, ['checkoutUrl'], ['rootDir', 'autoKeysGeneration'])).label(
        'Create Pipeline'
    ),

    /**
     * Properties for Pipeline that will be passed during an UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(UPDATE_MODEL, [], ['checkoutUrl', 'rootDir', 'autoKeysGeneration', 'settings'])).label(
        'Update Pipeline'
    ),

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
     * All the available states of Pipeline
     *
     * @property allStates
     * @type {Array}
     */
    allStates: STATES,

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
    indexes: [{ fields: ['scmUri'] }, { fields: ['subscribedScmUrlsWithActions'], length: 128 }]
};
