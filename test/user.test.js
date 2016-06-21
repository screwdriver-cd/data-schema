'use strict';
const assert = require('chai').assert;
const model = require('../index');
const validate = require('./helper').validate;

describe('user test', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('user.yaml', model.user.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('user.create.yaml', model.user.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', model.user.create).error);
        });
    });
});
