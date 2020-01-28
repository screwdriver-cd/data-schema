'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const validator = require('../api/validator');
const SCM_PR_SCHEMA = require('../core/scm').pr;

const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this Job')
        .example(123345),

    name: Joi
        .string().regex(/^(PR-[0-9]+:)?[\w-]+$/)
        .max(110)
        .description('Name of the Job')
        .example('main'),

    prParentJobId: Joi
        .number().integer().positive()
        .description('Identifier of the parent job for this pr job')
        .example(98765),

    permutations: validator.jobPermutations,

    description: Joi
        .string().max(100)
        .description('Description of the Job')
        .example('builds and tests the code'),

    pipelineId: Joi
        .number().integer().positive()
        .description('Identifier of this Pipeline')
        .example(123345),

    state: Joi
        .string().valid([
            'ENABLED',
            'DISABLED'
        ])
        .max(10)
        .description('Current state of the Job')
        .example('ENABLED')
        .default('ENABLED'),

    stateChanger: Joi
        .string()
        .max(128)
        .description('Username for who changed the state'),

    stateChangeTime: Joi
        .string()
        .isoDate()
        .description('When the state of the job was changed'),

    stateChangeMessage: Joi
        .string()
        .max(512)
        .description('Reason why disabling or enabling job')
        .example('Testing out new feature change in beta only'),

    archived: Joi
        .boolean()
        .description('Flag if the job is archived')
        .example(true)
        .default(false)
};

const EXTENDED_MODEL = {
    title: Joi.reach(SCM_PR_SCHEMA, 'title'),
    createTime: Joi.reach(SCM_PR_SCHEMA, 'createTime'),
    username: Joi.reach(SCM_PR_SCHEMA, 'username'),
    userProfile: Joi.reach(SCM_PR_SCHEMA, 'userProfile'),
    url: Joi.reach(SCM_PR_SCHEMA, 'url'),
    ...MODEL
};

module.exports = {
    /**
     * All the available properties of Job
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Job'),

    /**
     * Properties for Job that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(EXTENDED_MODEL, [
        'id', 'pipelineId', 'name', 'state'
    ], [
        'description', 'permutations', 'archived', 'prParentJobId', 'templateDetails',
        // job enable/disable state change
        'stateChanger', 'stateChangeTime', 'stateChangeMessage',
        // possible extended fields for pull/merge request info from scm
        'username', 'title', 'createTime', 'url', 'userProfile'
    ])).label('Get Job'),

    /**
     * Properties for Job that will come back during a UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [], [
        'state', 'stateChanger', 'stateChangeTime',
        'stateChangeMessage'
    ])).label('Update Job'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['pipelineId', 'name'],

    /**
     * List of all fields in the model
     * @property allKeys
     * @type {Array}
     */
    allKeys: Object.keys(EXTENDED_MODEL),

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'jobs',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['pipelineId', 'state'] }, { fields: ['state'] }]
};
