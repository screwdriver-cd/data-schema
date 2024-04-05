'use strict';

const Joi = require('joi');
const table = Joi.string().required();
const SCHEMA_ID = Joi.object().keys({
    table,
    params: Joi.object().min(1).required()
});
const SCHEMA_UPDATE = Joi.object().keys({
    table,
    params: Joi.object()
        .keys({
            id: Joi.number().integer().positive().required()
        })
        .unknown(true)
        .min(2)
        .required()
});
const SCHEMA_SAVE = Joi.object().keys({
    table,
    params: Joi.object().unknown(true).min(1).required()
});
const SCHEMA_SEARCH_FIELD = Joi.string().max(100).required();
const SCHEMA_SEARCH_KEYWORD = Joi.alternatives().try(Joi.string().max(200).required(), Joi.number().required());
const SCHEMA_SCAN = Joi.object().keys({
    table,
    params: Joi.object(),
    paginate: Joi.object().keys({
        count: Joi.number().integer().positive().required(),
        page: Joi.number().integer().positive().required()
    }),
    search: Joi.object().keys({
        field: Joi.alternatives().try(Joi.array().items(SCHEMA_SEARCH_FIELD), SCHEMA_SEARCH_FIELD),
        keyword: Joi.alternatives().try(Joi.array().items(SCHEMA_SEARCH_KEYWORD), SCHEMA_SEARCH_KEYWORD),
        inverse: Joi.boolean().default(false).optional()
    }),
    sort: Joi.string().lowercase().valid('ascending', 'descending').default('descending'),
    sortBy: Joi.string().max(100),
    exclude: Joi.array().items(Joi.string().max(100)).max(100),
    groupBy: Joi.array().items(Joi.string().max(100)).max(100),
    startTime: Joi.string().isoDate(),
    endTime: Joi.string().isoDate(),
    timeKey: Joi.string(),
    aggregationField: Joi.string(),
    getCount: Joi.boolean()
});
const SCHEMA_QUERY = Joi.object().keys({
    table,
    queries: Joi.array()
        .items(
            Joi.object().keys({
                dbType: Joi.string().required(),
                query: Joi.string().required()
            })
        )
        .required(),
    replacements: Joi.object(),
    rawResponse: Joi.boolean()
});

module.exports = {
    /**
     * Properties for Datastore that will be passed for the GET method
     *
     * @property get
     * @type {Joi}
     */
    get: SCHEMA_ID,

    /**
     * Properties for Datastore that will be passed for the UPDATE method
     *
     * @property update
     * @type {Joi}
     */
    update: SCHEMA_UPDATE,

    /**
     * Properties for Datastore that will be passed for the SAVE method
     *
     * @property save
     * @type {Joi}
     */
    save: SCHEMA_SAVE,

    /**
     * Properties for Datastore that will be passed for the REMOVE method
     *
     * @property remove
     * @type {Joi}
     */
    remove: SCHEMA_ID,

    /**
     * Properties for Datastore that will be passed for the SCAN method
     *
     * @property scan
     * @type {Joi}
     */
    scan: SCHEMA_SCAN,

    /**
     * Properties for Datastore that will be passed for the QUERY method
     *
     * @property query
     * @type {Joi}
     */
    query: SCHEMA_QUERY
};
