'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('token template', () => {
    describe('user token', () => {
        it('validates the user token', () => {
            assert.isNull(validate('token.yaml', models.token.base).error);
        });

        it('validates the user token with options', () => {
            assert.isNull(validate('token.options.yaml', models.token.base).error);
        });

        it('validates the user token with expires at', () => {
            assert.isNull(validate('token.expiresAt.yaml', models.token.base).error);
        });

        it('validates the user token with a issuer id', () => {
            assert.isNull(validate('token.issuerId.yaml', models.token.base).error);
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

        it('validates the token which have invalid options', () => {
            assert.isNotNull(validate('token.invalid-permission.yaml', models.token.base).error);
            assert.isNotNull(validate('token.invalid-resources-pipelines.yaml', models.token.base).error);
            assert.isNotNull(validate('token.invalid-resources-organizations.yaml', models.token.base).error);
            assert.isNotNull(validate('token.invalid-resources-privatePipeline.yaml', models.token.base).error);
            assert.isNotNull(validate('token.invalid-resources-jobs.yaml', models.token.base).error);
        });

        it('validates the token which have invalid expires at', () => {
            assert.isNotNull(validate('token.invalid-expiresAt.yaml', models.token.base).error);
        });

        it('validates the token which have invalid issuer id', () => {
            assert.isNotNull(validate('token.invalid-issuerId.yaml', models.token.base).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('token.get-minimum.yaml', models.token.get).error);
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

        it('validates the create with options', () => {
            assert.isNull(validate('token.createWithOptions.yaml', models.token.create).error);
        });

        it('validates the create with expiresAt', () => {
            assert.isNull(validate('token.createWithExpiresAt.yaml', models.token.create).error);
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
