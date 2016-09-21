'use strict';
const Joi = require('joi');
const table = Joi.string().required();
const id = Joi.string().hex().required();
const SCHEMA_ID = Joi.object().keys({
    table,
    params: Joi.object().keys({
        id
    }).required()
});
const SCHEMA_DATA = Joi.object().keys({
    table,
    params: Joi.object().keys({
        id,
        data: Joi.object().required()
    }).required()
});
const SCHEMA_SCAN = Joi.object().keys({
    table,
    params: Joi.object(),
    paginate: Joi.object().keys({
        count: Joi.number().integer().positive().required(),
        page: Joi.number().integer().positive().required()
    }).required(),
    sort: Joi.string().lowercase().valid(['ascending', 'descending']).default('descending')
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
    update: SCHEMA_DATA,

    /**
     * Properties for Datastore that will be passed for the SAVE method
     *
     * @property save
     * @type {Joi}
     */
    save: SCHEMA_DATA,

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
    scan: SCHEMA_SCAN
};
