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

    container: Joi
        .string()
        .description('Container this Build is running in')
        .example('node:4'),

    cause: Joi
        .string()
        .description('Reason why this build started')
        .example('Commit ccc493 was pushed to master'),

    sha1: Joi
        .string().hex()
        .length(40)
        .description('SHA1 this project was built on')
        .example('ccc49349d3cffbd12ea9e3d41521480b4aa5de5f'),

    queuedReason: Joi
        .string()
        .description('Why this build is currently queued')
        .example('Build 14 is already running'),

    createTime: Joi
        .date()
        .description('When this build was created'),

    startTime: Joi
        .date()
        .description('When this build started on a build slave'),

    endTime: Joi
        .date()
        .description('When this build stopped running'),

    meta: Joi
        .object()
        .description('Key=>Value information from the build itself'),

    parameters: Joi
        .object()
        .description('Input parameters that defined this build'),

    // @NOTE UNSTABLE is merged into FAILURE
    status: Joi
        .string().valid([
            'SUCCESS',
            'FAILURE',
            'BUILDING',
            'QUEUED',
            'ABORTED',
            'INPROGRESS'
        ])
        .description('Current status of the build')
        .example('SUCCESS')
        .default('QUEUED'),

    executor: Joi
        .string()
        .description('What build slave did it run on')
        .example('slave-15')
};

module.exports = {
    /**
     * All the available properties of Build
     *
     * @property base
     * @return {Joi} Joi Object
     */
    base: Joi.object(MODEL).label('Build'),

    /**
     * Properties for Build that will come back during a GET request
     *
     * @property get
     * @return {Joi} Joi Object
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'jobId', 'runNumber', 'container', 'cause', 'createTime', 'status'
    ], [
        'sha1', 'queuedReason', 'startTime', 'endTime', 'meta', 'parameters', 'executor'
    ])).label('Get Build'),

    /**
     * Properties for Build that will be passed during an UPDATE request
     *
     * @property update
     * @return {Joi} Joi Object
     */
    update: Joi.object(mutate(MODEL, [
        'status'
    ], [])).label('Update Build'),

    /**
     * Properties for Build that will be passed during a CREATE request
     *
     * @property create
     * @return {Joi} Joi Object
     */
    create: Joi.object(mutate(MODEL, [
        'jobId', 'container'
    ], [
        'parameters'
    ])).label('Create Build')
};
