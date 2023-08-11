'use strict';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const DATA_DIR = path.join(__dirname, 'data');

module.exports = {
    /**
     * Validate a schema against a yaml file in the /data directory
     *
     * @method validate
     * @param  {String} filename Filename located in test/data
     * @param  {Joi}    schema   Join schema to validate against
     * @param  {Object} extend   Object to extend the parsed object with
     * @return {JoiResult}       Result from schema.validate
     */
    validate: (filename, schema, extend) => {
        const exampleFile = path.join(DATA_DIR, filename);
        const example = yaml.load(fs.readFileSync(exampleFile).toString());

        if (extend !== undefined) {
            Object.assign(example, extend);
        }

        const res = schema.validate(example);

        if (!res.error) {
            res.error = null;
        }

        return res;
    }
};
