'use strict';

const Joi = require('joi');

const SCM_CONTEXT_STRING = Joi
    .string()
    .max(128)
    .required()
    .description('The SCM in which the repository exists')
    .example('github:github.com');

module.exports = {
    name: SCM_CONTEXT_STRING
};
