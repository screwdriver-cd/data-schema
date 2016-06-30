'use strict';

/**
 * Mutate an object with Joi values and return fields that are required/optional
 *
 * @method
 * @param  {Object} model               Object that contains key=>Joi
 * @param  {Array}  requiredFields      Fields to flag as required
 * @param  {Array}  [optionalFields=[]] Fields to flag as optional
 * @return {Object}                     Object that contains key=>Joi (flagged as required/optional)
 */
module.exports = (model, requiredFields, optionalFields) => {
    const newModel = {};

    Object.keys(model).forEach((field) => {
        if (requiredFields.indexOf(field) > -1) {
            newModel[field] = model[field].required();
        } else if (optionalFields && optionalFields.indexOf(field) > -1) {
            newModel[field] = model[field].optional();
        }
    });

    return newModel;
};
