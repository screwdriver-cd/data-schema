'use strict';
const Joi = require('joi');
const mutate = require('../lib/mutate');

const MODEL = {
    id: Joi
        .number().positive()
        .description('Identifier of this user')
        .example(12345),

    username: Joi
        .string()
        .description('Username')
        .example('batman123')
};

module.exports = {
    /**
     * All the available properties of User
     *
     * @property base
     * @return {Joi} Joi Object
     */
    base: Joi.object(MODEL).label('User'),

    /**
     * Properties for User that will be passed during a CREATE request
     *
     * @property create
     * @return {Joi} Joi Object
     */
    create: Joi.object(mutate(MODEL, [
        'username'
    ], [])).label('Create User')
};
