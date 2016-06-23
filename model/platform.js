'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .string().hex().length(40)
        .description('Identifier of this platform')
        .example('334b3152916f7cbc59579f7a18744450d5a5a907'),

    name: Joi
        .string()
        .description('Name of platform')
        .example('node'),

    version: Joi
        .string()
        .description('Version of platform')
        .example('1.0.0'),

    config: Joi
        .object()
        .description('Config of platform')
        .example({ notification: 'batman@email.com' }),

    author: Joi
        .string()
        .description('Author of platform')
        .example('batman'),

    docUrl: Joi
        .string()
        .default('')
        .description('Doc URL for the platform')
        .example('http://blah.com'),

    scmUrl: Joi
        .string().regex(/^git@([^:]+):([^\/]+)\/(.+?)\.git(#.+)?$/)
        .description('Source Code URL for Screwdriver configuration')
        .example(
            'git@github.com:screwdriver-cd/data-model.git#c55494cdc55063ecd854800cc4ccc949659c1519'
        ),

    experimental: Joi
        .boolean()
        .default(false)
        .description('Whether platform is experimental')
};

module.exports = {
    /**
     * All the available properties of Platform
     *
     * @property base
     * @return {Joi} Joi Object
     */
    base: Joi.object(MODEL).label('Platform'),

    /**
     * Properties for Platform that will come back during a GET request
     *
     * @property get
     * @return {Joi} Joi Object
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'name', 'version', 'config', 'author', 'docUrl', 'scmUrl', 'experimental'
    ], [])).label('Get Platform'),

    /**
     * Properties for Platform that will be passed during an UPDATE request
     *
     * @property update
     * @return {Joi} Joi Object
     */
    update: Joi.object(mutate(MODEL, [
        'experimental'
    ], [])).label('Update Platform'),

    /**
     * Properties for Platform that will be passed during a CREATE request
     *
     * @property create
     * @return {Joi} Joi Object
     */
    create: Joi.object(mutate(MODEL, [
        'name', 'version', 'config', 'author', 'scmUrl'
    ], [
        'docUrl', 'experimental'
    ])).label('Create Platform')
};
