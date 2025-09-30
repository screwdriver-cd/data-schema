'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model event', () => {
    describe('base', () => {
        const schema = models.event.base;
        const baseYamlFile = 'event.yaml';

        it('validates the base', () => {
            assert.isNull(validate(baseYamlFile, schema).error);
        });

        describe('tests for startFrom', () => {
            [null, '', '~some-internal-job-name', '~stage@integration', '~stage@integration:setup'].forEach(
                startFrom => {
                    it('validates the invalid startFrom', () => {
                        assert.isNotNull(validate(baseYamlFile, schema, { startFrom }).error);
                    });
                }
            );

            [
                '~commit',
                '~pr',
                '~tag',
                '~release',
                'some-internal-job-name',
                'stage@integration',
                'stage@integration:setup',
                'sd@123:some-external-job-name',
                '~sd@123:some-external-job-name'
            ].forEach(startFrom => {
                it('validates the valid startFrom', () => {
                    assert.isNull(validate(baseYamlFile, schema, { startFrom }).error);
                });
            });
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('event.create.yaml', models.event.create).error);
        });

        it('validates the create with startFrom PR job name', () => {
            assert.isNull(validate('event.create.pr.yaml', models.event.create).error);
        });

        it('validates the create with optional fields', () => {
            assert.isNull(validate('event.create.full.yaml', models.event.create).error);
        });

        it('validates the create with only buildId field', () => {
            assert.isNull(validate('event.create.restart.yaml', models.event.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.event.create).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('event.get.yaml', models.event.get).error);
            assert.include(validate('event.get.yaml', models.event.get).value.meta, {});
        });

        it('validates the get with optional fields', () => {
            assert.isNull(validate('event.get.full.yaml', models.event.get).error);
        });

        it('validates the get with pr fields', () => {
            assert.isNull(validate('event.get.pr.yaml', models.event.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.event.get).error);
        });

        describe('test status', () => {
            // valid statuses
            models.event.allStatuses.forEach(validStatus => {
                it('validates the valid statuses', () => {
                    assert.isNull(validate('event.get.yaml', models.event.get, { status: validStatus }).error);
                });
            });

            // invalid statuses
            [null, '', 'some_invalid_state', 'success'].forEach(validState => {
                it('validates the invalid statuses', () => {
                    assert.isNotNull(validate('event.get.yaml', models.event.get, { status: validState }).error);
                });
            });
        });
    });

    describe('keys', () => {
        it('has the correct keys', () => {
            const expectedKeys = ['createTime', 'sha'];

            expectedKeys.forEach(keyName => {
                assert.include(models.event.keys, keyName, `Key name ${keyName} not included`);
            });
        });
    });

    describe('allKeys', () => {
        it('lists all of the fields in the model', () => {
            const expectedKeys = ['id', 'commit', 'createTime', 'creator', 'pipelineId', 'sha'];

            expectedKeys.forEach(keyName => {
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
                { fields: ['createTime', 'pipelineId', 'status'] },
                { fields: ['pipelineId'] },
                { fields: ['type'] },
                { fields: ['groupEventId'] },
                { fields: ['parentEventId'] }
            ];
            const { indexes } = models.event;

            expected.forEach(indexName => {
                assert.deepInclude(indexes, indexName, `Index name ${indexName} not included`);
            });
        });
    });

    describe('rangeKeys', () => {
        it('defines the correct rangeKeys', () => {
            const expected = ['createTime', 'createTime'];
            const { rangeKeys } = models.event;

            expected.forEach(keyName => {
                assert.deepInclude(rangeKeys, keyName, `RangeKey name ${keyName} not included`);
            });
        });
    });
});
