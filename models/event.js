'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const Scm = require('../core/scm');
const WorkflowGraph = require('../config/workflowGraph');
const { trigger } = require('../config/job');
const jobName = Joi.reach(require('./job').base, 'name');
const parentBuildId = Joi.reach(require('./build').get, 'parentBuildId');
const buildId = Joi.reach(require('./build').get, 'id');

const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this event')
        .example(123345),
    parentEventId: Joi
        .number().integer().positive()
        .description('Identifier of the parent event')
        .example(123344),
    causeMessage: Joi
        .string().max(512).truncate()
        .description('Message that describes why the event was created')
        .example('Merge pull request #26 from screwdriver-cd/data-schema'),
    commit: Scm.commit
        .description('Commit related to the event'),
    createTime: Joi
        .string()
        .isoDate()
        .max(32)
        .description('When this event was created')
        .example('2038-01-19T03:14:08.131Z'),
    creator: Scm.user
        .description('Creator of the event'),
    meta: Joi
        .object()
        .default({})
        .description('Key=>Value information from the event itself'),
    pipelineId: Joi
        .number().integer().positive()
        .description('Identifier of this pipeline')
        .example(123345),
    sha: Joi
        .string().hex().length(40)
        .description('SHA this project was built on')
        .example('ccc49349d3cffbd12ea9e3d41521480b4aa5de5f'),
    startFrom: Joi
        .string()
        .description('Event start point - a job name or trigger name (~commit/~pr)')
        .example('main'),
    type: Joi
        .string().valid([
            'pr',
            'pipeline'
        ])
        .description('Type of the event')
        .example('pr'),
    workflowGraph: WorkflowGraph.workflowGraph
        .description('Graph representation of the workflow')
        .example({
            nodes: [{ name: '~commit' }, { name: 'main' }, { name: 'publish' }],
            edges: [{ src: '~commit', dest: 'main' }, { src: 'main', dest: 'publish' }]
        }),
    pr: Scm.pr
        .description('Pull request object that holds information about the pull request')
};

const CREATE_MODEL = Object.assign({}, MODEL, {
    startFrom: Joi.alternatives().try(trigger, jobName),
    buildId,
    parentBuildId
});

module.exports = {
    /**
     * List of all fields in the model
     * @property allKeys
     * @type {Array}
     */
    allKeys: Object.keys(MODEL),

    /**
     * All the available properties of Event
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Event'),

    /**
     * Properties for Event that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'commit', 'createTime', 'creator', 'pipelineId', 'sha', 'type'
    ], [
        'causeMessage', 'meta', 'parentEventId', 'startFrom', 'workflowGraph', 'pr'
    ])).label('Get Event'),

    /**
     * Properties for Event that will be passed in a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(CREATE_MODEL, [], [
        'pipelineId', 'startFrom', 'buildId', 'causeMessage', 'parentBuildId', 'parentEventId'
    ])).label('Create Event'),

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['pipelineId', 'type'],

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['sha', 'createTime'],

    /**
     * Primary column to sort queries by.
     * This defines queries to optionally sort a query result set by createTime.
     * Each range key matches up with an element in the indexes property
     *
     * @property rangeKeys
     * @type {Array}
     */
    rangeKeys: ['createTime', 'createTime'],

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'events'
};
