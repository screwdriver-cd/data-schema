'use strict';

const Joi = require('joi');
const Regex = require('../config/regex');

const MODEL = {
    id: Joi.number()
        .integer()
        .positive()
        .example(12345),

    src: Joi.alternatives()
        .try(
            Joi.string()
                .regex(Regex.EXTERNAL_TRIGGER)
                .max(64),
            Joi.string()
                .regex(Regex.EXTERNAL_TRIGGER_AND)
                .max(64)
        )
        .example('~sd@1234:component'),

    dest: Joi.alternatives()
        .try(
            Joi.string()
                .regex(Regex.EXTERNAL_TRIGGER)
                .max(64),
            Joi.string()
                .regex(Regex.EXTERNAL_TRIGGER_AND)
                .max(64)
        )
        .example('~sd@5678:test')
};

module.exports = {
    /**
     * All the available properties of Trigger
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('Trigger'),

    /**
     * All the available properties of Job
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
    keys: ['src', 'dest'],

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
    tableName: 'triggers',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: [{ fields: ['dest'] }, { fields: ['src'] }]
};
