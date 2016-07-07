'use strict';
const assert = require('chai').assert;
const model = require('../index');
const validate = require('./helper').validate;

describe('task test', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('task.yaml', model.task.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('task.create.yaml', model.task.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', model.task.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('task.update.yaml', model.task.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', model.task.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('task.get.yaml', model.task.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', model.task.get).error);
        });
    });
});
