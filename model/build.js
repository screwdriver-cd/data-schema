'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this Build')
        .example('4b8d9b530d2e5e297b4f470d5b0a6e1310d29c5e'),

    jobId: Joi
        .string().hex().length(40)
        .description('Identifier of the Job')
        .example('50dc14f719cdc2c9cb1fb0e49dd2acc4cf6189a0'),

    runNumber: Joi
        .number().positive()
        .description('Incrementing number of a Job')
        .example(15),

    cause: Joi
        .string()
        .description('Reason why this build started')
        .example('Commit ccc493 was pushed to master'),

    sha1: Joi
        .string().hex()
        .length(40)
        .description('SHA1 this project was built on')
        .example('ccc49349d3cffbd12ea9e3d41521480b4aa5de5f'),

    createTime: Joi
        .date()
        .description('When this build was created'),

    startTime: Joi
        .date()
        .description('When this build started on a build machine'),

    endTime: Joi
        .date()
        .description('When this build stopped running'),

    parameters: Joi
        .object()
        .description('Input parameters that defined this build'),

    // @NOTE UNSTABLE is merged into FAILURE
    status: Joi
        .string().valid([
            'SUCCESS',
            'FAILURE',
            'QUEUED',
            'ABORTED',
            'INPROGRESS'
        ])
        .description('Current status of the build')
        .example('SUCCESS')
        .default('QUEUED'),

    executor: Joi
        .string()
        .description('What machine did it run on')
        .example('executor-15')
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
        'id', 'jobId', 'runNumber', 'cause', 'createTime', 'status'
    ], [
        'sha1', 'startTime', 'endTime', 'meta', 'parameters', 'executor'
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
    keys: ['jobId', 'runNumber']
};
