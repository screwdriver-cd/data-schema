'use strict';
const Joi = require('joi');
const table = Joi.string().required();
const id = Joi.string().hex().required();
const idReferenceObject = Joi.object().keys({
    table,
    params: Joi.object().keys({
        id
    }).required()
});
const dataReferenceObject = Joi.object().keys({
    table,
    params: Joi.object().keys({
        id,
        data: Joi.object().required()
    }).required()
});
const paginateReferenceObject = Joi.object().keys({
    table,
    params: Joi.object(),
    paginate: Joi.object().keys({
        count: Joi.number().required(),
        page: Joi.number().required()
    }).required()
});

module.exports = {
    /**
     * Properties for Datastore that will be passed during a GET
     *
     * @property get
     * @type {Joi}
     */
    get: idReferenceObject,

    /**
     * Properties for Datastore that will be passed during an UPDATE
     *
     * @property update
     * @type {Joi}
     */
    update: dataReferenceObject,

    /**
     * Properties for Datastore that will be passed during an SAVE
     *
     * @property save
     * @type {Joi}
     */
    save: dataReferenceObject,

    /**
     * Properties for Datastore that will be passed during a REMOVE
     *
     * @property remove
     * @type {Joi}
     */
    remove: idReferenceObject,

    /**
     * Properties for Datastore that will be passed during a SCAN
     *
     * @property create
     * @type {Joi}
     */
    scan: paginateReferenceObject
};
