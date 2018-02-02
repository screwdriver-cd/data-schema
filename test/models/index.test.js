'use strict';

const assert = require('chai').assert;
const models = require('../../').models;

describe('model commmons', () => {
    const modelsToCheck = [
        'build',
        'collection',
        'command',
        'commandTag',
        'event',
        'job',
        'pipeline',
        'secret',
        'template',
        'templateTag',
        'token',
        'trigger',
        'user'
    ];

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
    it('selected models have same lenght of indexes and rangeKeys.', () => {
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

    it('selected models have rangeKeys defined', () => {
        const buildModel = models.build;

        assert.deepEqual(buildModel.rangeKeys, ['number', null, 'number']);
    });
});
