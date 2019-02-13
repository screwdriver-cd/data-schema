'use strict';

const yaml = require('js-yaml');
const joi = require('joi');
const fs = require('fs');
const path = require('path');
const DATA_DIR = path.join(__dirname, 'data');

module.exports = {
    /**
     * Validate a schema against a yaml file in the /data directory
     *
     * @method validate
     * @param  {String} filename Filename located in test/data
     * @param  {Joi}    schema   Join schema to validate against
     * @param  {Object} extend   Object to extend the parsed object with
     * @return {JoiResult}       Result from Joi.Validate
     */
    validate: (filename, schema, extend) => {
        const exampleFile = path.join(DATA_DIR, filename);
        const example = yaml.safeLoad(fs.readFileSync(exampleFile).toString());

        if (extend !== undefined) {
            Object.assign(example, extend);
        }

        return joi.validate(example, schema);
    }
};
