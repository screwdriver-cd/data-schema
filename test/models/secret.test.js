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

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('secret.update.yaml', models.secret.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.secret.update).error);
        });
    });
});
