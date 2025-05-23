'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const Scm = require('../core/scm');
const WorkflowGraph = require('../config/workflowGraph');
const { trigger } = require('../config/job');
const jobName = require('./job').base.extract('name');
const parentBuildId = require('./build').get.extract('parentBuildId');
const parentBuilds = require('./build').get.extract('parentBuilds');
const buildId = require('./build').get.extract('id');
const prNum = Scm.hook.extract('prNum');
const { QUALIFIED_STAGE_NAME } = require('../config/regex');
const STATUSES = [
    'UNKNOWN',
    'ABORTED', // when one or more builds associated with the event is aborted
    'CREATED', // when the event is created but none of the builds are created
    'FAILURE',
    'IN_PROGRESS', // when one or more incomplete (being executed or awaiting execution) builds exists
    'SUCCESS'
];

const MODEL = {
    id: Joi.number().integer().positive().description('Identifier of this event').example(123345),
    parentEventId: Joi.number()
        .integer()
        .positive()
        .description('Identifier of the direct parent event')
        .example(123344),
    groupEventId: Joi.number().integer().positive().description('Identifier of the group parent event').example(123344),
    causeMessage: Joi.string()
        .max(512)
        .truncate()
        .allow('')
        .description('Message that describes why the event was created')
        .example('Merge pull request #26 from screwdriver-cd/data-schema'),
    commit: Scm.commit.description('Commit related to the event'),
    createTime: Joi.string()
        .isoDate()
        .max(32)
        .description('When this event was created')
        .example('2038-01-19T03:14:08.131Z'),
    creator: Scm.user.description('Creator of the event'),
    meta: Joi.object()
        .default({})
        .description('Key=>Value information from the event itself')
        .example({ parameters: { nameA: 'value1', jobA: { nameB: 'value2' } } }),
    pipelineId: Joi.number().integer().positive().description('Identifier of this pipeline').example(123345),
    sha: Joi.string()
        .hex()
        .length(40)
        .description('SHA this project was built on')
        .example('ccc49349d3cffbd12ea9e3d41521480b4aa5de5f'),
    configPipelineSha: Joi.string()
        .hex()
        .length(40)
        .description('SHA of the configuration pipeline this project depends on')
        .example('ccc49349d3cffbd12ea9e3d41521480b4aa5de5f'),
    startFrom: Joi.alternatives()
        .try(trigger, jobName, QUALIFIED_STAGE_NAME)
        .description('Event start point - a job name or trigger name (~commit/~pr)')
        .example('~commit'),
    type: Joi.string().valid('pr', 'pipeline').max(10).description('Type of the event').example('pr'),
    workflowGraph: WorkflowGraph.workflowGraph.description('Graph representation of the workflow').example({
        nodes: [{ name: '~commit' }, { name: 'main', id: 12345678 }, { name: 'publish', id: 23456789 }],
        edges: [
            { src: '~commit', dest: 'main' },
            { src: 'main', dest: 'publish' }
        ]
    }),
    pr: Scm.pr.description('Pull request object that holds information about the pull request'),
    prNum: prNum.description('Pull request number if it is a PR event'),
    baseBranch: Joi.string().description('build base branch').example('develop'),
    status: Joi.string()
        .valid(...STATUSES)
        .max(15)
        .description('Current status of the event')
        .example('SUCCESS')
        .default('UNKNOWN')
        .required()
};

const CREATE_MODEL = { ...MODEL, buildId, parentBuildId, parentBuilds, prNum };

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
     * All the available statuses of Build
     *
     * @property statuses
     * @type {Array}
     */
    allStatuses: STATUSES,

    /**
     * All the available properties of Event
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * Properties for Event that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(
        mutate(
            MODEL,
            ['id', 'commit', 'createTime', 'creator', 'pipelineId', 'sha', 'type', 'status'],
            [
                'causeMessage',
                'meta',
                'parentEventId',
                'groupEventId',
                'startFrom',
                'workflowGraph',
                'pr',
                'prNum',
                'configPipelineSha',
                'baseBranch'
            ]
        )
    ).label('Get Event'),

    /**
     * Properties for Event that will be passed in a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(
        mutate(
            CREATE_MODEL,
            [],
            [
                'pipelineId',
                'startFrom',
                'buildId',
                'causeMessage',
                'parentBuildId',
                'parentEventId',
                'groupEventId',
                'configPipelineSha',
                'meta',
                'prNum',
                'creator',
                'baseBranch',
                'parentBuilds'
            ]
        )
    ).label('Create Event'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['sha', 'createTime', 'pipelineId'],

    /**
     * Primary column to sort queries by.
     * This defines queries to optionally sort a query result set by createTime.
     * Each range key matches up with an element in the indexes property
     *
     * @property rangeKeys
     * @type {Array}
     */
    rangeKeys: ['createTime', 'pipelineId', 'type', 'groupEventId', 'parentEventId'],

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'events',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [
        { fields: ['createTime', 'pipelineId', 'status'] },
        { fields: ['pipelineId'] },
        { fields: ['type'] },
        { fields: ['groupEventId'] },
        { fields: ['parentEventId'] }
    ]
};
