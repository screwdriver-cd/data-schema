'use strict';

const Joi = require('joi');
const models = require('../models');

const TOKEN_CONFIG = Joi.object({
    username: [Joi.string().required(), Joi.ref('buildId')],
    buildId: Joi.reach(models.build.base, 'id').required(),
    jobId: Joi.reach(models.job.base, 'id').required(),
    eventId: Joi.reach(models.event.base, 'id'),
    isPR: Joi.boolean().required(),
    pipelineId: Joi.reach(models.pipeline.base, 'id').required(),
    scmContext: Joi.reach(models.pipeline.base, 'scmContext').required(),
    configPipelineId: Joi.reach(models.pipeline.base, 'id').optional(),
    prParentJobId: Joi.reach(models.job.base, 'id').optional()
});

/**
 * The definition of the jwt token config
 * @type {Object}
 */
module.exports = TOKEN_CONFIG;
