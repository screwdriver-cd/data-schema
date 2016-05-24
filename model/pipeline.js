'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .number().positive()
        .description('Identifier of this Pipeline')
        .example(16695),

    platform: Joi
        .string()
        .description('Specified Platform + Version')
        .example('nodejs_app@4'),

    scm_url: Joi
        .string().regex(/^git@([^:]+):([^\/]+)\/(.+?)\.git(#.+)?$/)
        .description('Source Code URL for the application')
        .example('git@github.com:screwdriver-cd/data-model.git#master'),

    config_url: Joi
        .string().regex(/^git@([^:]+):([^\/]+)\/(.+?)\.git(#.+)?$/)
        .description('Source Code URL for Screwdriver configuration')
        .example('git@github.com:screwdriver-cd/optional-config.git#master'),

    create_time: Joi
        .date()
        .description('When this pipeline was created')
};

module.exports = {
    /**
     * All the available properties of Pipeline
     *
     * @property base
     * @return {Joi} Joi Object
     */
    base: Joi.object(MODEL).label('Pipeline'),

    /**
     * Properties for Pipeline that will come back during a GET request
     *
     * @property get
     * @return {Joi} Joi Object
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'platform', 'scm_url', 'create_time'
    ], [
        'config_url'
    ])).label('Get Pipeline'),

    /**
     * Properties for Pipeline that will be passed during an UPDATE request
     *
     * @property update
     * @return {Joi} Joi Object
     */
    update: Joi.object(mutate(MODEL, [
        'scm_url'
    ], [
        'config_url'
    ])).label('Update Pipeline'),

    /**
     * Properties for Pipeline that will be passed during a CREATE request
     *
     * @property create
     * @return {Joi} Joi Object
     */
    create: Joi.object(mutate(MODEL, [
        'scm_url'
    ], [
        'config_url'
    ])).label('Create Pipeline')
};
