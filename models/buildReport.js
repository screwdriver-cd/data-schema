'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    buildId: Joi
        .number().integer().positive()
        .description('Build identifier')
        .example(123345),

    jobId: Joi
        .number().integer().positive()
        .description('Job identifier')
        .example(123345),

    parentBuildId: Joi
        .string()
        .description('Parent build(s) identifier(s)')
        .example([123, 234]),

    number: Joi
        .number().positive()
        .description('Timestamp of create time')
        .example(1473900790309),

    created: Joi
        .string()
        .max(10)
        .isoDate()
        .description('Build created'),

    createdWeek: Joi
        .string()
        .max(10)
        .isoDate()
        .description('Build created week'),

    createTime: Joi
        .string()
        .max(32)
        .isoDate()
        .description('Build created timestamp')
        .example('2017-01-06T01:49:50.384359267Z'),

    startTime: Joi
        .string()
        .max(32)
        .isoDate()
        .description('Build created timestamp')
        .example('2017-01-06T01:49:50.384359267Z'),

    endTime: Joi
        .string()
        .max(32)
        .isoDate()
        .description('Build created timestamp')
        .example('2017-01-06T01:49:50.384359267Z'),

    status: Joi
        .string()
        .description('Build status')
        .example('SUCCESS'),

    statusMessage: Joi
        .string()
        .description('Build status message')
        .example('Build failed due to infrastructure error'),

    cluster: Joi
        .string()
        .description('Build cluster')
        .example('gq1'),

    stats: Joi
        .string()
        .description('Build stats'),

    totalSteps: Joi
        .number().positive()
        .description('total steps for a build')
        .example(10),

    stepsDuration: Joi
        .string()
        .max(32)
        .isoDate()
        .description('Duration between first and last step')
        .example('01:49:50.384359267Z'),

    steps: Joi
        .string()
        .description('Steps'),

    eventId: Joi
        .number().positive()
        .description('Event id')
        .example(1),

    eventCreateTime: Joi
        .string()
        .max(32)
        .isoDate()
        .description('Event create time')
        .example('01:49:50.384359267Z'),

    eventType: Joi
        .string()
        .description('Event type')
        .example('~pr'),

    startFrom: Joi
        .string()
        .description('start From'),

    parentEventId: Joi
        .number().integer().positive()
        .description('Identifier of the parent event')
        .example(123344),

    causeMessage: Joi
        .string()
        .description('Message that describes why the event was created')
        .example('Merge pull request #26 from screwdriver-cd/data-schema'),

    commit: Joi
        .string()
        .description('Commit related to the event'),

    pr: Joi
        .string()
        .description('Pull request object that holds information about the pull request'),

    pipelineId: Joi
        .number().integer().positive()
        .description('Pipeline identifier')
        .example(123345),

    scmUri: Joi
        .string()
        .description('Unique identifier for the application')
        .example('github.com:123456:master'),

    scmContext: Joi
        .string()
        .description('The SCM in which the repository exists')
        .example('github:github.com'),

    pipelineCreateTime: Joi
        .string()
        .isoDate()
        .description('Pipeline create time'),

    pipelineLastEventId: Joi
        .number().integer().positive()
        .description('Identifier of last event')
        .example(123345)
};

module.exports = {
    /**
     * All the available properties of BuildReport
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('BuildReport'),

    /**
     * Properties for BuildReport that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id'
    ], [])).label('Get Build Report'),

    /**
     * Properties for BuildReport that will come back during a LIST request.
     * The LIST request will list all banners
     */
    list: Joi.array().items(Joi.object(mutate(MODEL, [
        'id'
    ], []))).label('List Build Reports'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['buildId'],

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
    tableName: 'buildReports',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['buildId'] }, { fields: ['created', 'buildId'] },
        { fields: ['created', 'pipelineId'] }, { fields: ['created', 'eventId'] }]
};
