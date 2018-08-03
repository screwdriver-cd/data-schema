'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model step', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('step.yaml', models.step.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('step.create.yaml', models.step.create).error);
        });

        it('validates the create with optional fields', () => {
            assert.isNull(validate('step.create.full.yaml', models.step.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.step.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('step.update.yaml', models.step.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.step.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('step.get.yaml', models.step.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.step.get).error);
        });
    });
});
