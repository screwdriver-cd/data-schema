'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model pipeline', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('pipeline.yaml', models.pipeline.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('pipeline.create.yaml', models.pipeline.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.pipeline.create).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('pipeline.get.yaml', models.pipeline.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.pipeline.get).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('pipeline.update.yaml', models.pipeline.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.pipeline.update).error);
        });
    });
});
