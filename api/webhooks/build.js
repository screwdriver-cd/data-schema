'use strict';
const Joi = require('joi');
const buildBase = require('../../models/build').base;

const MODEL = {
    meta: Joi.reach(buildBase, 'meta').optional(),

    status: Joi.reach(buildBase, 'status').required()
};

/**
 * All the desired properties for notifying a build
 * @type {Joi}
 */
module.exports = Joi.object(MODEL).label('Build Webhook');
