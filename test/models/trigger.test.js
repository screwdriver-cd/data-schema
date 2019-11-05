'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model trigger', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('trigger.yaml', models.trigger.base).error);
        });
        it('validates the base with AND', () => {
            assert.isNull(validate('trigger.and.yaml', models.trigger.base).error);
        });
    });

    describe('keys', () => {
        it('has the correct keys', () => {
            const expectedKeys = ['src', 'dest'];

            expectedKeys.forEach((keyName) => {
                assert.include(models.trigger.keys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('allKeys', () => {
        it('lists all of the fields in the model', () => {
            const expectedKeys = [
                'id',
                'src',
                'dest'
            ];

            expectedKeys.forEach((keyName) => {
                assert.include(models.trigger.allKeys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('tableName', () => {
        it('provides the correct table name', () => {
            assert.strictEqual(models.trigger.tableName, 'triggers');
        });
    });

    describe('indexes', () => {
        it('defines the correct indexes', () => {
            const expected = [{ fields: ['dest'] }, { fields: ['src'] }];
            const indexes = models.trigger.indexes;

            expected.forEach((indexName) => {
                assert.include(indexes, indexName, `Index name ${indexName} not included`);
            });
        });
    });
});
