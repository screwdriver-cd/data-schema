'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this Task')
        .example('7fbb727db4b2b6715b092505673cb5922a0d63a8'),

    buildId: Joi
        .string().hex().length(40)
        .description('Identifier of the Build')
        .example('50dc14f719cdc2c9cb1fb0e49dd2acc4cf6189a0'),

    container: Joi
        .string()
        .description('Container this Task is running in')
        .example('node:4'),

    environment: Joi
        .object()
        .description('Key=>Value environment variables for the task itself'),

    createTime: Joi
        .date()
        .description('When this task was created'),

    startTime: Joi
        .date()
        .description('When this task started on a machine'),

    endTime: Joi
        .date()
        .description('When this task stopped running'),

    meta: Joi
        .object()
        .description('Key=>Value information from the build itself'),

    // @NOTE UNSTABLE is merged into FAILURE
    status: Joi
        .string().valid([
            'SUCCESS',
            'FAILURE',
            'QUEUED',
            'ABORTED',
            'INPROGRESS'
        ])
        .description('Current status of the task')
        .example('SUCCESS')
        .default('QUEUED'),

    executor: Joi
        .string()
        .description('What machine did it run on')
        .example('executor-15')
};

module.exports = {
    /**
     * All the available properties of Task
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Task'),

    /**
     * Properties for Task that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'buildId', 'container', 'createTime', 'status', 'environment'
    ], [
        'startTime', 'endTime', 'meta', 'executor'
    ])).label('Get Task'),

    /**
     * Properties for Task that will be passed during an UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [
        'status'
    ], [])).label('Update Task'),

    /**
     * Properties for Task that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'buildId', 'environment'
    ], [])).label('Create Task'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['buildId', 'environment']
};
