'use strict';

const Joi = require('joi');

const MODEL = {
    page: Joi.number()
        .integer()
        .min(1)
        .description('Page to paginate'),

    count: Joi.number()
        .integer()
        .min(1)
        .max(50)
        .description('Count to paginate'),

    search: Joi.string()
        .max(200)
        .description('Keyword to search by'),

    sort: Joi.string()
        .lowercase()
        .valid('ascending', 'descending')
        .default('descending')
        .description('Sorting option'),

    sortBy: Joi.string()
        .max(100)
        .description('Field to sort by'),

    getCount: Joi.boolean().description('Return total count')
};

/**
 * All the available properties of Pagination
 * @type {Joi}
 */
module.exports = Joi.object(MODEL).label('Pagination');
