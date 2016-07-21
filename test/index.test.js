'use strict';
const assert = require('chai').assert;
const models = require('../index');

describe('commmons tests', () => {
    const modelsToCheck = [
        'pipeline',
        'build',
        'job',
        'platform',
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
});
