'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this build')
        .example('4b8d9b530d2e5e297b4f470d5b0a6e1310d29c5e'),

    jobId: Joi
        .string().hex().length(40)
        .description('Identifier of the Job')
        .example('50dc14f719cdc2c9cb1fb0e49dd2acc4cf6189a0'),

    parentBuildId: Joi
        .string().hex().length(40)
        .description('Parent build in the case of matrix jobs')
        .example('50dc14f719cdc2c9cb1fb0e49dd2acc4cf6189a0'),

    number: Joi
        .number().positive()
        .description('Incrementing number of a Job')
        .example(15),

    container: Joi
        .string()
        .description('Container this build is running in')
        .example('node:4'),

    cause: Joi
        .string()
        .description('Reason why this build started')
        .example('Commit ccc493 was pushed to master'),

    sha: Joi
        .string().hex()
        .length(40)
        .description('SHA this project was built on')
        .example('ccc49349d3cffbd12ea9e3d41521480b4aa5de5f'),

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
        .description('Key=>Value information from the build itself'),

    status: Joi
        .string().valid([
            'SUCCESS',
            'FAILURE',
            'QUEUED',
            'ABORTED',
            'RUNNING'
        ])
        .description('Current status of the build')
        .example('SUCCESS')
        .default('QUEUED')
};

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
    get: Joi.object(mutate(MODEL, [
        'id', 'jobId', 'number', 'cause', 'createTime', 'status'
    ], [
        'container', 'parentBuildId', 'sha', 'startTime', 'endTime', 'meta', 'parameters'
    ])).label('Get Build'),

    /**
     * Properties for Build that will be passed during an UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [
        'status'
    ], [])).label('Update Build'),

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
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['jobId', 'number'],

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
    indexes: ['jobId', 'parentBuildId']
};
