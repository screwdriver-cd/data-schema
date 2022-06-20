'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model stage', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('stage.yaml', models.stage.base).error);
        });
    });

    describe('keys', () => {
        it('has the correct keys', () => {
            const expectedKeys = ['pipelineId', 'name'];

            expectedKeys.forEach(keyName => {
                assert.include(models.stage.keys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('allKeys', () => {
        it('lists all of the fields in the model', () => {
            const expectedKeys = ['id', 'pipelineId', 'name', 'jobIds', 'state', 'description', 'color'];

            expectedKeys.forEach(keyName => {
                assert.include(models.stage.allKeys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('tableName', () => {
        it('provides the correct table name', () => {
            assert.strictEqual(models.stage.tableName, 'stages');
        });
    });

    describe('indexes', () => {
        it('defines the correct indexes', () => {
            const expected = [{ fields: ['pipelineId'] }];
            const { indexes } = models.stage;

            expected.forEach(indexName => {
                assert.deepInclude(indexes, indexName, `Index name ${indexName} not included`);
            });
        });
    });
});
