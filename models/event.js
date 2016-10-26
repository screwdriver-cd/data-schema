'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const Pipeline = require('./pipeline');
const Scm = require('../core/scm');
const Workflow = require('../config/workflow');

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this build')
        .example('4b8d9b530d2e5e297b4f470d5b0a6e1310d29c5e'),
    causeMessage: Joi
        .string().max(512).truncate()
        .description('Message that describes why the event was created')
        .example('Merge pull request #26 from screwdriver-cd/data-schema'),
    commit: Scm.commit
        .description('Commit related to the event'),
    createTime: Joi
        .string()
        .isoDate()
        .description('When this event was created')
        .example('2038-01-19T03:14:08.131Z'),
    creator: Scm.user
        .description('Creator of the event'),
    pipelineId: Joi.reach(Pipeline.base, 'id')
        .description('The pipeline that the event belongs to')
        .example('2d991790bab1ac8576097ca87f170df73410b55c'),
    sha: Joi
        .string().hex()
        .description('SHA this project was built on')
        .example('ccc49349d3cffbd12ea9e3d41521480b4aa5de5f'),
    status: Joi
        .string().valid([
            'SUCCESS',
            'FAILURE',
            'ABORTED',
            'RUNNING'
        ])
        .description('Current status of the event')
        .example('SUCCESS')
        .default('RUNNING'),
    workflow: Workflow.workflow
        .description('Workflow of the associated pipeline')
        .example(['main', 'publish', 'deploy'])
};

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
        'id', 'commit', 'createTime', 'creator', 'pipelineId', 'sha', 'status', 'workflow'
    ], [
        'causeMessage'
    ])).label('Get Event'),

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['pipelineId'],

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['sha', 'createTime'],

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'events'
};
