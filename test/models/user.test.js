'use strict';
const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model user', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('user.yaml', models.user.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('user.create.yaml', models.user.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.user.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('user.update.yaml', models.user.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.user.update).error);
        });
    });
});
