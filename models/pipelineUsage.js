'use strict';

const Joi = require('joi');
const Template = require('../config/template');
const pipelineId = require('./pipeline').base.extract('id');
const Scm = require('../core/scm');

module.exports = {
    get: Joi.array().items(
        Joi.object({
            id: pipelineId,
            name: Joi.string().required(),
            scmRepo: Scm.repo,
            lastRun: Joi.alternatives().try(
                Joi.string().isoDate(),
                Joi.allow(null),
            ),
            admins: Joi.object()
                .pattern(Joi.string(), Joi.boolean())
                .required(),
        }),
    ),
};
