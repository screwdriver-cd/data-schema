'use strict';

const Joi = require('joi');
const Regex = require('../config/regex');

const MODEL = {
    id: Joi.number()
        .integer()
        .positive()
        .example(12345),

    pipelineId: Joi.number()
        .integer()
        .positive()
        .description('Pipeline associated with the Stage')
        .example(123345),

    name: Joi.string()
        .regex(Regex.STAGE_NAME)
        .max(110)
        .description('Name of the Stage')
        .example('deploy'),

    jobIds: Joi.array()
        .items(
            Joi.number()
                .integer()
                .positive()
                .description('Identifier for this job')
                .example(123345)
                .optional()
                .allow(null)
        )
        .description('Job IDs in this Stage'),

    state: Joi.string()
        .valid('ARCHIVED', 'ACTIVE')
        .max(10)
        .description('Current state of the Stage')
        .example('ARCHIVED')
        .default('ACTIVE'),

    description: Joi.string()
        .max(256)
        .description('Description of the Stage')
        .example('Deploys canary jobs'),

    color: Joi.string()
        .regex(Regex.STAGE_COLOR)
        .max(7)
        .description('Color for the Stage')
        .example('#FFFF00')
};

module.exports = {
    /**
     * All the available properties of Stage
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Stage'),

    /**
     * All the available properties of Stage
     *
     * @property fields
     * @type {Object}
     */
    fields: MODEL,

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['pipelineId', 'name'],

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
    tableName: 'stages',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['pipelineId'] }]
};
