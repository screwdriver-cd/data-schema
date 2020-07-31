'use strict';

const Joi = require('@hapi/joi');

const SCHEMA_STATUS = Joi.string().valid('OK');

module.exports = SCHEMA_STATUS;
