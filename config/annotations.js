'use strict';

const Joi = require('joi');

// List of data, eventually key-value pairs
const SCHEMA_ANNOTATIONS = Joi.object().optional();

/**
 * The definition of the annotations pieces
 * @type {Object}
 */
module.exports = {
    annotations: SCHEMA_ANNOTATIONS
};
