'use strict';

const Joi = require('joi');
// const mutate = require('../lib/mutate');
const buildId = Joi.reach(require('./build').base, 'id');
const startTime = Joi.reach(require('./build').base, 'startTime');
const endTime = Joi.reach(require('./build').base, 'endTime');
const status = Joi.reach(require('./build').base, 'status');
const cluster = Joi.reach(require('./buildCluster').base, 'name');
const stats = Joi.reach(require('./build').base, 'stats');
const eventId = Joi.reach(require('./event').base, 'id');
const eventCreateTime = Joi.reach(require('./event').base, 'createTime');
const eventType = Joi.reach(require('./event').base, 'type');
const pipelineId = Joi.reach(require('./pipeline').base, 'id');
const scmUri = Joi.reach(require('./pipeline').base, 'scmUri');
const scmContext = Joi.reach(require('./pipeline').base, 'scmContext');
const pipelineCreateTime = Joi.reach(require('./pipeline').base, 'createTime');

const MODEL = {
    buildId,
    startTime,
    endTime,
    status,
    cluster,
    stats,
    eventId,
    eventCreateTime,
    eventType,
    pipelineId,
    scmUri,
    scmContext,
    pipelineCreateTime,
    created: Joi
        .string()
        .max(10)
        .isoDate()
        .description('Build created'),
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
        .description('Steps')
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
    indexes: [{ fields: ['buildId'] }, { fields: ['pipelineId'] },
        { fields: ['eventId'] }, { fields: ['created', 'buildId'] },
        { fields: ['created', 'pipelineId'] }, { fields: ['created', 'eventId'] }]
};
