'use strict';

const Joi = require('joi');

const compatibilities = Joi.object({
    clouds: Joi.array()
        .items(Joi.string())
        .description('A list of cloud that template supports')
        .example(['aws', 'gcp', 'azure'])
        .optional(),
    architectures: Joi.array()
        .items(Joi.string())
        .description('A list of architectures that template supports')
        .example(['x86', 'x86_64', 'arm64'])
        .optional()
});

module.exports = {
    compatibilities
};
