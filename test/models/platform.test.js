'use strict';
const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model platform', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('platform.yaml', models.platform.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('platform.create.yaml', models.platform.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.platform.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('platform.update.yaml', models.platform.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.platform.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('platform.get.yaml', models.platform.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.platform.get).error);
        });
    });
});
