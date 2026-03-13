'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model pipeline', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('pipeline.yaml', models.pipeline.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('pipeline.create.yaml', models.pipeline.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.pipeline.create).error);
        });

        it('validates that state is not allowed', () => {
            assert.isNotNull(
                validate('pipeline.create.yaml', models.pipeline.create, { state: models.pipeline.allStates[0] }).error
            );
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('pipeline.get.yaml', models.pipeline.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.pipeline.get).error);
        });

        // valid states
        models.pipeline.allStates.forEach(validState => {
            it('validates the valid states', () => {
                assert.isNull(validate('pipeline.get.yaml', models.pipeline.get, { state: validState }).error);
            });
        });

        // invalid states
        [null, '', 'some_invalid_state'].forEach(validState => {
            it('validates the invalid states', () => {
                assert.isNotNull(validate('pipeline.get.yaml', models.pipeline.get, { state: validState }).error);
            });
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('pipeline.update.yaml', models.pipeline.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.pipeline.update).error);
        });

        it('validates state change fields', () => {
            assert.isNull(
                validate('pipeline.update.yaml', models.pipeline.update, {
                    state: 'DISABLED',
                    stateChangeMessage: 'Disabling for maintenance'
                }).error
            );
        });

        it('rejects invalid stateChangeMessage that is too long', () => {
            assert.isNotNull(
                validate('pipeline.update.yaml', models.pipeline.update, {
                    stateChangeMessage: 'x'.repeat(513)
                }).error
            );
        });

        it('rejects INACTIVE and DELETING states in update', () => {
            assert.isNotNull(validate('pipeline.update.yaml', models.pipeline.update, { state: 'INACTIVE' }).error);
            assert.isNotNull(validate('pipeline.update.yaml', models.pipeline.update, { state: 'DELETING' }).error);
        });
    });

    describe('allStates', () => {
        it('includes DISABLED state', () => {
            assert.include(models.pipeline.allStates, 'DISABLED');
        });

        it('includes all expected states', () => {
            assert.deepEqual(models.pipeline.allStates, ['ACTIVE', 'INACTIVE', 'DELETING', 'DISABLED']);
        });
    });

    describe('stateChanger fields', () => {
        it('validates get with stateChanger fields', () => {
            assert.isNull(
                validate('pipeline.get.yaml', models.pipeline.get, {
                    stateChanger: 'username',
                    stateChangeTime: '2026-03-12T00:00:00.000Z',
                    stateChangeMessage: 'Disabling for maintenance'
                }).error
            );
        });

        it('validates get with DISABLED state', () => {
            assert.isNull(
                validate('pipeline.get.yaml', models.pipeline.get, {
                    state: 'DISABLED'
                }).error
            );
        });

        it('rejects stateChanger longer than 128 characters', () => {
            assert.isNotNull(
                validate('pipeline.get.yaml', models.pipeline.get, {
                    stateChanger: 'x'.repeat(129)
                }).error
            );
        });

        it('rejects stateChangeMessage longer than 512 characters', () => {
            assert.isNotNull(
                validate('pipeline.get.yaml', models.pipeline.get, {
                    stateChangeMessage: 'x'.repeat(513)
                }).error
            );
        });
    });
});
