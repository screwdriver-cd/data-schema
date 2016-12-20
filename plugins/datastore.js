'use strict';

const Joi = require('joi');
const table = Joi.string().required();
const SCHEMA_ID = Joi.object().keys({
    table,
    params: Joi.object().min(1).required()
});
const SCHEMA_UPDATE = Joi.object().keys({
    table,
    params: Joi.object().keys({
        id: Joi.number().integer().positive().required()
    }).unknown(true).min(2)
    .required()
});
const SCHEMA_SAVE = Joi.object().keys({
    table,
    params: Joi.object().unknown(true).min(1).required()
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
    scan: SCHEMA_SCAN
};
