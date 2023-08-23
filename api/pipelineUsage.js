'use strict';

const Joi = require('joi');
const pipelineSchema = require('../models/pipeline').base;
const eventSchema = require('../models/event').base;
const Scm = require('../core/scm');

module.exports = {
    get: Joi.array().items(
        Joi.object({
            id: pipelineId,
            name: Joi.string().required(),
            scmRepo: Scm.repo,
            lastRun: Joi.alternatives().try(Joi.string().isoDate(), Joi.allow(null)),
            admins: Joi.object().pattern(Joi.string(), Joi.boolean()).required()
        })
    )
};
