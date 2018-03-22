'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const Scm = require('../core/scm');
const Job = require('../config/job');
const PARENT_BUILD_ID = Joi.number().integer().positive();

const STEP = {
    name: Joi
        .string()
        .description('Name of the Step')
        .example('install'),
    command: Joi
        .string()
        .description('Command of the Step to execute')
        .example('npm install'),
    code: Joi
        .number().integer()
        .description('Exit code')
        .example(1),
    startTime: Joi
        .string()
        .isoDate()
        .description('When this step started')
        .example('2017-01-06T01:49:50.384359267Z'),
    endTime: Joi
        .string()
        .isoDate()
        .description('When this step stopped running')
        .example('2017-01-06T01:49:51.676057192Z')
};
const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this build')
        .example(123345),

    environment: Job.environment,

    eventId: Joi
        .number().integer().positive()
        .description('Identifier of the parent event')
        .example(123345),

    jobId: Joi
        .number().integer().positive()
        .description('Identifier of the parent job')
        .example(123345),

    parentBuildId: Joi
        .array().items(PARENT_BUILD_ID)
        .description('Identifier(s) of this parent build(s)')
        .example([123, 234]),

    number: Joi
        .number().positive()
        .description('Timestamp of create time')
        .example(1473900790309),

    container: Joi
        .string()
        .description('Container this build is running in')
        .example('node:4'),

    cause: Joi
        .string()
        .description('Reason why this build started')
        .example('pull request opened'),

    sha: Joi
        .string().hex()
        .description('SHA this project was built on')
        .example('ccc49349d3cffbd12ea9e3d41521480b4aa5de5f'),

    commit: Scm.commit,

    createTime: Joi
        .string()
        .isoDate()
        .description('When this build was created'),

    startTime: Joi
        .string()
        .isoDate()
        .description('When this build started on a build machine'),

    endTime: Joi
        .string()
        .isoDate()
        .description('When this build stopped running'),

    parameters: Joi
        .object()
        .description('Input parameters that defined this build'),

    meta: Joi
        .object()
        .default({})
        .description('Key=>Value information from the build itself'),

    steps: Joi
        .array().items(
            Joi.object(
                mutate(STEP, ['name'], ['code', 'startTime', 'endTime', 'command'])
            ).description('Step metadata'))
        .description('List of steps'),

    status: Joi
        .string().valid([
            'ABORTED',
            'CREATED', // when the build is created but not started
            'FAILURE',
            'QUEUED', // when the build is created and put into the queue
            'RUNNING', // after the build is created, went through the queue, and has started
            'SUCCESS'
        ])
        .description('Current status of the build')
        .example('SUCCESS')
        .default('QUEUED'),

    statusMessage: Joi
        .string()
        .description('Status message to describe status of the build')
        .example('Build failed due to infrastructure error')
};

const parentBuildIdSchema = Joi
    .alternatives().try(
        Joi.array().items(PARENT_BUILD_ID),
        PARENT_BUILD_ID
    )
    .description('Identifier(s) of this parent build')
    .example([123, 234]);

const GET_MODEL = Object.assign({}, MODEL, { parentBuildId: parentBuildIdSchema });

module.exports = {
    /**
     * All the available properties of Build
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Build'),

    /**
     * Properties for Build that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(GET_MODEL, [
        'id', 'jobId', 'number', 'cause', 'createTime', 'status'
    ], [
        'container', 'parentBuildId', 'sha', 'startTime', 'endTime',
        'meta', 'parameters', 'steps', 'commit', 'eventId', 'environment', 'statusMessage'
    ])).label('Get Build'),

    /**
     * Properties for Build that will be passed during an UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [
        'status'
    ], [
        'meta', 'statusMessage'
    ])).label('Update Build'),

    /**
     * Properties for Build that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'jobId'
    ])).label('Create Build'),

    /**
     * Properties when getting step data
     *
     * @property getStep
     * @type {Joi}
     */
    getStep: Joi.object(mutate(STEP, [
        'name'
    ], [
        'code',
        'startTime',
        'endTime',
        'command'
    ])).label('Get Step Metadata'),

    /**
     * Properties when updating step data
     *
     * @property updateStep
     * @type {Joi}
     */
    updateStep: Joi.object(mutate(STEP, [], [
        'code',
        'startTime',
        'endTime'
    ])).label('Update Step Metadata'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['jobId', 'number'],

    /**
     * Primary column to sort queries by.
     * This defines queries to optionally sort a query result set by build number.
     * Each range key matches up with an element in the indexes property
     *
     * @property rangeKeys
     * @type {Array}
     */
    rangeKeys: ['number', null, 'number'],

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
    tableName: 'builds',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['jobId', 'parentBuildId', 'eventId']
};
