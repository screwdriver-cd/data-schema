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

        it('validates that state is not allowed', () => {
            assert.isNotNull(
                validate('pipeline.update.yaml', models.pipeline.update, { state: models.pipeline.allStates[0] }).error
            );
        });
    });
});
