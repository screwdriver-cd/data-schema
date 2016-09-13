'use strict';
const Joi = require('joi');

const SCHEMA_USER = Joi.object().keys({
    id: Joi.string()
        .required()
        .label('Unique Identifier')
        .example('github.com:622065'),

    url: Joi.string()
        .uri()
        .required()
        .label('Link to Profile')
        .example('https://github.com/stjohnjohnson'),

    name: Joi.string()
        .required()
        .label('Display Name')
        .example('stjohnjohnson'),

    avatar: Joi.string()
        .uri()
        .required()
        .label('Link to Avatar')
        .example('https://avatars.githubusercontent.com/u/622065?v=3')
}).label('SCM User');

const SCHEMA_REPO = Joi.object().keys({
    id: Joi.string()
        .required()
        .label('Unique Identifier')
        .example('github.com:123456:master'),

    name: Joi.string()
        .required()
        .label('Display name')
        .example('screwdriver-cd/screwdriver'),

    url: Joi.string()
        .uri()
        .required()
        .label('Link to Repository')
        .example('https://github.com/screwdriver-cd/screwdriver/tree/master')
}).label('SCM Repository');

const SCHEMA_COMMIT = Joi.object().keys({
    sha: Joi.string()
        .hex()
        .length(40)
        .required()
        .label('SHA1 identifier for the commit')
        .example('8843d7f92416211de9ebb963ff4ce28125932878'),

    message: Joi.string()
        .max(100)
        .required()
        .label('Commit message')
        .example('Fixing a bug with signing'),

    author: SCHEMA_USER
        .required()
        .label('Author of the commit'),

    url: Joi.string()
        .uri()
        .required()
        .label('Link to commit')
        .example('https://github.com/scredriver-cd/screwdriver/commit/8843d7f92416211de')
}).label('SCM Commit');

module.exports = {
    commit: SCHEMA_COMMIT,
    repo: SCHEMA_REPO,
    user: SCHEMA_USER
};
