'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model stage build', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('stageBuild.yaml', models.stageBuild.base).error);
        });
    });

    describe('keys', () => {
        it('has the correct keys', () => {
            const expectedKeys = ['stageId', 'eventId'];

            expectedKeys.forEach(keyName => {
                assert.include(models.stageBuild.keys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('allKeys', () => {
        it('lists all of the fields in the model', () => {
            const expectedKeys = ['id', 'stageId', 'eventId', 'workflowGraph', 'status'];

            expectedKeys.forEach(keyName => {
                assert.include(models.stageBuild.allKeys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('tableName', () => {
        it('provides the correct table name', () => {
            assert.strictEqual(models.stageBuild.tableName, 'stageBuilds');
        });
    });

    describe('indexes', () => {
        it('defines the correct indexes', () => {
            const expected = [{ fields: ['stageId'] }];
            const { indexes } = models.stageBuild;

            expected.forEach(indexName => {
                assert.deepInclude(indexes, indexName, `Index name ${indexName} not included`);
            });
        });
    });
});
