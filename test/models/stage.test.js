'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model stage', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('stage.yaml', models.stage.base).error);
        });

        describe('validates setup and teardown', () => {
            ['setup', 'teardown'].forEach(fieldName => {
                [null, 0, -1].forEach(validType => {
                    it(`validates the invalid ${fieldName} job id`, () => {
                        assert.isNotNull(validate('stage.yaml', models.stage.base, { [fieldName]: validType }).error);
                    });
                });

                [22, 33].forEach(validType => {
                    it(`validates the valid ${fieldName} job id`, () => {
                        assert.isNull(validate('stage.yaml', models.stage.base, { [fieldName]: validType }).error);
                    });
                });
            });
        });

        describe('validates jobIds', () => {
            [null, [], [0], [-1], [1, -1]].forEach(validType => {
                it(`validates the invalid jobIds`, () => {
                    assert.isNotNull(validate('stage.yaml', models.stage.base, { jobIds: validType }).error);
                });
            });

            [[1], [1, 2]].forEach(validType => {
                it(`validates the valid jobIds`, () => {
                    assert.isNull(validate('stage.yaml', models.stage.base, { jobIds: validType }).error);
                });
            });
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
            const expectedKeys = ['id', 'pipelineId', 'name', 'jobIds', 'description', 'setup', 'teardown'];

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
