'use strict';

const Joi = require('joi');

const SCHEMA_KEY = Joi.object().keys({
    key: Joi.string().label('Public Key for Verifying JWTs')
}).label('Public Key for Verifying JWTs Object');

const SCHEMA_TOKEN = Joi.object().keys({
    token: Joi.string().label('JSON Web Token')
}).label('JSON Web Token Object');

const SCHEMA_CRUMB = Joi.object().keys({
    crumb: Joi.string().label('Crumb to prevent CSRF')
}).label('Crumb to prevent CSRF Object');

module.exports = {
    key: SCHEMA_KEY,
    token: SCHEMA_TOKEN,
    crumb: SCHEMA_CRUMB
};
