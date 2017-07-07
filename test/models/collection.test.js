'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('collection template', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('collection.yaml', models.collection.base).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('collection.get.yaml', models.collection.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.collection.get).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('collection.create.yaml', models.collection.create).error);
        });

        it('validates the create with a description', () => {
            assert.isNull(validate(
                'collection.createWithDescription.yaml',
                models.collection.create).error
            );
        });

        it('validates the create with pipeline ids', () => {
            assert.isNull(validate(
                'collection.createWithPipelineIds.yaml',
                models.collection.create).error
            );
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.collection.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('collection.update.yaml', models.collection.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.collection.update).error);
        });
    });
});
