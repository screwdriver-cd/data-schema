'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model event', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('event.yaml', models.event.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('event.create.yaml', models.event.create).error);
        });

        it('validates the create with optional fields', () => {
            assert.isNull(validate('event.create.full.yaml', models.event.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.event.create).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('event.get.yaml', models.event.get).error);
        });

        it('validates the get with optional fields', () => {
            assert.isNull(validate('event.get.full.yaml', models.event.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.event.get).error);
        });
    });

    describe('keys', () => {
        it('has the correct keys', () => {
            const expectedKeys = ['createTime', 'sha'];

            expectedKeys.forEach((keyName) => {
                assert.include(models.event.keys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('allKeys', () => {
        it('lists all of the fields in the model', () => {
            const expectedKeys = [
                'id',
                'commit',
                'createTime',
                'creator',
                'pipelineId',
                'sha'
            ];

            expectedKeys.forEach((keyName) => {
                assert.include(models.event.allKeys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('tableName', () => {
        it('provides the correct table name', () => {
            assert.strictEqual(models.event.tableName, 'events');
        });
    });

    describe('indexes', () => {
        it('defines the correct indexes', () => {
            const expected = [
                'pipelineId',
                'type'
            ];
            const indexes = models.event.indexes;

            expected.forEach((indexName) => {
                assert.include(indexes, indexName, `Index name ${indexName} not included`);
            });
        });
    });

    describe('rangeKeys', () => {
        it('defines the correct rangeKeys', () => {
            const expected = [
                'createTime',
                'createTime'
            ];
            const rangeKeys = models.event.rangeKeys;

            expected.forEach((keyName) => {
                assert.include(rangeKeys, keyName, `RangeKey name ${keyName} not included`);
            });
        });
    });
});
