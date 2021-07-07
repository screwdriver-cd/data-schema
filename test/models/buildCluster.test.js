'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model buildCluster', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('buildCluster.yaml', models.buildCluster.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('buildCluster.create.yaml', models.buildCluster.create).error);
        });

        it('validates the create with optional fields', () => {
            assert.isNull(validate('buildCluster.create.full.yaml', models.buildCluster.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.buildCluster.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('buildCluster.update.yaml', models.buildCluster.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.buildCluster.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('buildCluster.get.yaml', models.buildCluster.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.buildCluster.get).error);
        });
    });

    describe('keys', () => {
        it('has the correct keys', () => {
            const expectedKeys = ['name', 'scmContext'];

            expectedKeys.forEach(keyName => {
                assert.include(models.buildCluster.keys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('indexes', () => {
        it('defines the correct indexes', () => {
            const expected = [{ fields: ['name'] }];
            const { indexes } = models.buildCluster;

            expected.forEach(indexName => {
                assert.include(indexes, indexName, `Index name ${indexName} not included`);
            });
        });
    });
});
