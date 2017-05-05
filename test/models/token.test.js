'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('token template', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('token.yaml', models.token.base).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('token.get.yaml', models.token.get).error);
        });

        it('validates a get with no tokens returned', () => {
            assert.isNull(validate('emptyArray.yaml', models.token.get).error);
        });

        it('validates a get with several tokens returned', () => {
            assert.isNull(validate('tokenArray.get.yaml', models.token.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.token.get).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('token.create.yaml', models.token.create).error);
        });

        it('validates the create with a description', () => {
            assert.isNull(validate('token.createWithDescription.yaml', models.token.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.token.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('token.update.yaml', models.token.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.token.update).error);
        });
    });
});
