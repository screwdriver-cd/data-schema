'use strict';
const assert = require('chai').assert;
const models = require('../../').models;

describe('model commmons', () => {
    const modelsToCheck = [
        'pipeline',
        'build',
        'job',
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
        });
    });
});
