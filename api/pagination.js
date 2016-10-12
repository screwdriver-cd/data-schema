'use strict';

const Joi = require('joi');

const MODEL = {
    page: Joi
        .number().integer().min(1)
        .default(1)
        .description('Page to paginate'),

    count: Joi
        .number().integer().min(1)
        .max(50)
        .default(50)
        .description('Count to paginate'),

    sort: Joi
        .string().lowercase()
        .valid(['ascending', 'descending'])
        .default('descending')
        .description('Sorting option')
};

/**
 * All the available properties of Pagination
 * @type {Joi}
 */
module.exports = Joi.object(MODEL).label('Pagination');
