'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const WorkflowGraph = require('../config/workflowGraph');
const status = require('./build').base.extract('status');

const MODEL = {
    id: Joi.number().integer().positive().example(12345),

    stageId: Joi.number().integer().positive().description('Stage associated with the Stage build').example(123345),

    eventId: Joi.number().integer().positive().description('Identifier of the event').example(123345),

    workflowGraph: WorkflowGraph.workflowGraph.description('Graph representation of the workflow').example({
        nodes: [{ name: '~commit' }, { name: 'main' }, { name: 'publish' }],
        edges: [
            { src: '~commit', dest: 'main' },
            { src: 'main', dest: 'publish' }
        ]
    }),

    status
};

module.exports = {
    /**
     * All the available properties of StageBuild
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Stage Build'),

    /**
     * All the available properties of StageBuild
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * Properties for StageBuild that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, ['id', 'stageId', 'eventId'], ['workflowGraph', 'status'])).label(
        'Get Stage Build metadata'
    ),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['stageId', 'eventId'],

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
    tableName: 'stageBuilds',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['stageId'] }, { fields: ['eventId'] }]
};
