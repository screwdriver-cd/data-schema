'use strict';
const assert = require('chai').assert;
const model = require('../index');
const validate = require('./helper').validate;

describe('build test', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('build.yaml', model.build.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('build.create.yaml', model.build.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', model.build.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('build.update.yaml', model.build.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', model.build.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('build.get.yaml', model.build.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', model.build.get).error);
        });
    });
});
