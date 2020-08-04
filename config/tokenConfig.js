'use strict';

const Joi = require('joi');
const models = require('../models');

const TOKEN_CONFIG = Joi.object({
    username: [Joi.string().required(), Joi.ref('buildId')],
    buildId: models.build.base.extract('id').required(),
    jobId: models.job.base.extract('id').required(),
    eventId: models.event.base.extract('id'),
    isPR: Joi.boolean().required(),
    pipelineId: models.pipeline.base.extract('id').required(),
    scmContext: models.pipeline.base.extract('scmContext').required(),
    configPipelineId: models.pipeline.base.extract('id').optional(),
    prParentJobId: models.job.base.extract('id').optional()
});

/**
 * The definition of the jwt token config
 * @type {Object}
 */
module.exports = TOKEN_CONFIG;
