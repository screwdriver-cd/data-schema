'use strict';

const Joi = require('joi');
const mutate = require('../lib/mutate');
const Command = require('../config/command');
const scmContext = Joi.reach(require('./pipeline').base, 'scmContext');
const scmOrganization = Joi
    .string().max(100)
    .description('SCM organization name')
    .example('screwdriver-cd');

const MODEL = {
    id: Joi
        .number().integer().positive()
        .description('Identifier of this Job')
        .example(123345),

    name: Joi
        .string().regex(/^[\w-]+$/)
        .max(50)
        .description('Name of the build cluster')
        .example('iOS'),

    description: Joi
        .string().max(100)
        .description('Description of the build cluster')
        .example('Build cluster for iOS team'),

    scmContext,

    scmOrganizations: Joi.array().items(scmOrganization),

    isActive: Joi
        .boolean()
        .description('Flag if the the build cluster is active')
        .example(true),

    managedByScrewdriver: Joi
        .boolean()
        .description('Flag if the cluster is managed by screwdriver team')
        .example(true),

    maintainer: Command.maintainer,

    weightage: Joi
        .number()
        .min(1)
        .max(100)
        .description('Weight percentage for build cluster')
        .example(20)
};

module.exports = {
    /**
     * All the available properties of BuildCluster
     *
     * @property base
     * @type {Joi}
     */
    base: Joi.object(MODEL).label('BuildCluster'),

    /**
     * Properties for BuildCluster that will come back during a GET request
     *
     * @property get
     * @type {Joi}
     */
    get: Joi.object(mutate(MODEL, [
        'id', 'name', 'scmContext', 'scmOrganizations', 'isActive',
        'managedByScrewdriver', 'maintainer', 'weightage'
    ], [
        'description'
    ])).label('Get BuildCluster'),

    /**
     * Properties for BuildCluster that will be passed during a UPDATE request
     *
     * @property update
     * @type {Joi}
     */
    update: Joi.object(mutate(MODEL, [], [
        'description', 'isActive', 'scmOrganizations', 'managedByScrewdriver',
        'maintainer', 'weightage'
    ])).label('Update BuildCluster'),

    /**
     * Properties for BuildCluster that will be passed during a CREATE request
     *
     * @property create
     * @type {Joi}
     */
    create: Joi.object(mutate(MODEL, [
        'name', 'scmOrganizations', 'managedByScrewdriver', 'maintainer'
    ], [
        'description', 'isActive', 'weightage'
    ])).label('Create Build'),

    /**
     * List of fields that determine a unique row
     *
     * @property keys
     * @type {Array}
     */
    keys: ['name'],

    /**
     * List of all fields in the model
     * @property allKeys
     * @type {Array}
     */
    allKeys: Object.keys(MODEL),

    /**
     * Tablename to be used in the datastore
     *
     * @property tableName
     * @type {String}
     */
    tableName: 'buildClusters',

    /**
     * List of indexes to create in the datastore
     *
     * @property indexes
     * @type {Array}
     */
    indexes: ['name']
};
