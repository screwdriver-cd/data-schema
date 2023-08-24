'use strict';

const Joi = require('joi');
const pipelineSchema = require('../models/pipeline').base;
const eventSchema = require('../models/event').base;

module.exports = {
    get: Joi.array().items(
        Joi.object({
            id: pipelineSchema.extract('id').required(),
            name: pipelineSchema.extract('name').required(),
            scmRepo: pipelineSchema.extract('scmRepo').required(),
            lastRun: Joi.alternatives().try(eventSchema.extract('createTime'), Joi.allow(null)),
            admins: pipelineSchema.extract('admins').required()
        })
    )
};
