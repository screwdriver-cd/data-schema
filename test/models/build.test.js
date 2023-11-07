'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model build', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('build.yaml', models.build.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('build.create.yaml', models.build.create).error);
        });

        it('validates the create with optional fields', () => {
            assert.isNull(validate('build.create.full.yaml', models.build.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.build.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('build.update.yaml', models.build.update).error);
        });

        it('validates the update with only statusMessage', () => {
            assert.isNull(validate('build.update.optional.yaml', models.build.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.build.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('build.get.yaml', models.build.get).error);
            assert.include(validate('build.get.yaml', models.build.get).value.meta, {});
        });

        it('validates the get with templateId defined', () => {
            assert.isNull(validate('build.get.templateId.yaml', models.build.get).error);
            assert.include(validate('build.get.templateId.yaml', models.build.get).value.meta, {});
        });

        it('validates the get with environment as an array', () => {
            assert.isNull(validate('build.get.environment.yaml', models.build.get).error);
            assert.include(validate('build.get.environment.yaml', models.build.get).value.meta, {});
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.build.get).error);
        });
    });

    describe('steps', () => {
        it('validates the get', () => {
            assert.isNull(validate('step.get.yaml', models.build.getStep).error);
        });

        it('validates the update', () => {
            assert.isNull(validate('step.update.yaml', models.build.updateStep).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.build.getStep).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.build.updateStep).error);
        });
    });

    describe('indexes', () => {
        it('defines the correct indexes', () => {
            const expected = [
                { fields: ['eventId', 'createTime'] },
                { fields: ['jobId'] },
                { fields: [{ attribute: 'parentBuildId', length: 32 }] },
                { fields: ['templateId', { name: 'startTime', length: 32 }, { name: 'endTime', length: 32 }] }
            ];
            const { indexes } = models.build;

            expected.forEach(indexName => {
                assert.deepInclude(indexes, indexName, `Index name ${indexName} not included`);
            });
        });
    });
});
