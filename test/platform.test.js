'use strict';
const assert = require('chai').assert;
const model = require('../index');
const validate = require('./helper').validate;

describe('platform test', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('platform.yaml', model.platform.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('platform.create.yaml', model.platform.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', model.platform.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('platform.update.yaml', model.platform.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', model.platform.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('platform.get.yaml', model.platform.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', model.platform.get).error);
        });
    });
});
