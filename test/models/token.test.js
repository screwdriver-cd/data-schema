'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('token template', () => {
    describe('user token', () => {
        it('validates the user token', () => {
            assert.isNull(validate('token.yaml', models.token.base).error);
        });
    });

    describe('pipeline token', () => {
        it('validates the pipeline token', () => {
            assert.isNull(validate('token.pipeline.yaml', models.token.base).error);
        });
    });

    describe('invalid token', () => {
        it('validates the token which have both userId and pipelineId', () => {
            assert.isNotNull(validate('token.invalid.yaml', models.token.base).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('token.get.yaml', models.token.get).error);
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
