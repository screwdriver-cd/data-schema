'use strict';

const assert = require('chai').assert;
const fs = require('fs');
const models = require('../../').models;

describe('model commmons', () => {
    const modelsPath = `${__dirname}/../../models`;

    const modelsToCheck = fs.readdirSync(modelsPath).filter(file =>
        fs.statSync(`${modelsPath}/${file}`).isFile()
        && file !== 'index.js' && /^.*\.js$/.test(file))
        .map(file => file.match(/^(.*)\.js$/)[1]);

    it('selected models have tableName defined', () => {
        modelsToCheck.forEach((model) => {
            assert.isString(models[model].tableName);
        });
    });

    it('selected models have indexes defined', () => {
        modelsToCheck.forEach((model) => {
            assert.isArray(models[model].indexes);
        });
    });

    it('selected models have keys defined', () => {
        modelsToCheck.forEach((model) => {
            assert.isArray(models[model].keys);
            assert.isArray(models[model].allKeys);
        });
    });

    // See https://github.com/screwdriver-cd/datastore-sequelize/blob/master/index.js#L311
    it('selected models have same length of indexes and rangeKeys', () => {
        modelsToCheck.forEach((model) => {
            if (Object.prototype.hasOwnProperty.call(models[model], 'rangeKeys')) {
                assert.strictEqual(
                    models[model].indexes.length,
                    models[model].rangeKeys.length,
                    `${model} model: Each range key must matches up with ` +
                    'an element in the indexes property.');
            }
        });
    });

    it('selected models have (valids|length|max) definition of indexes for MySQL.', () => {
        modelsToCheck.forEach((model) => {
            if (Object.prototype.hasOwnProperty.call(models[model], 'indexes')) {
                models[model].indexes.forEach((index) => {
                    const columnName = index.fields[0];

                    /* eslint no-underscore-dangle: ["error", { "allow": ["_inner"] }] */
                    models[model].base.$_terms.keys.forEach((column) => {
                        const schema = column.schema.describe();

                        // console.log(column, columnName);
                        if (column.key === columnName && schema.type === 'string') {
                            if (schema.valids || !schema.rules) {
                                // OK
                            } else {
                                const result = schema.rules.find(
                                    rule => rule.name === 'max' || rule.name === 'length');

                                assert.isDefined(
                                    result,
                                    `${model}.${columnName} schema must have ` +
                                    '(valids|length|max) definition.');
                            }
                        }
                    });
                });
            }
        });
    });

    it('selected models have rangeKeys defined', () => {
        const buildModel = models.build;

        assert.deepEqual(buildModel.rangeKeys, ['number', 'number', 'number', 'number']);
    });
});
