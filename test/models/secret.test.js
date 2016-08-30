'use strict';
const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model secret', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('secret.yaml', models.secret.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('secret.create.yaml', models.secret.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.secret.create).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('secret.get.yaml', models.secret.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.secret.get).error);
        });
    });

    describe('remove', () => {
        it('validates the remove', () => {
            assert.isNull(validate('secret.remove.yaml', models.secret.remove).error);
        });

        it('fails the remove', () => {
            assert.isNotNull(validate('empty.yaml', models.secret.remove).error);
        });
    });
});
