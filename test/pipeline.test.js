'use strict';
const assert = require('chai').assert;
const model = require('../index');
const validate = require('./helper').validate;

describe('pipeline test', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('pipeline.yaml', model.pipeline.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('pipeline.create.yaml', model.pipeline.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', model.pipeline.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('pipeline.update.yaml', model.pipeline.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', model.pipeline.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('pipeline.get.yaml', model.pipeline.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', model.pipeline.get).error);
        });
    });
});
