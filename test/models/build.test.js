'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model build', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('build.yaml', models.build.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('build.create.yaml', models.build.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.build.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('build.update.yaml', models.build.update).error);
        });

        it('validates updating status to creating container', () => {
            assert.isNull(validate('build.update-creating-container.yaml',
                    models.build.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.build.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('build.get.yaml', models.build.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.build.get).error);
        });
    });

    describe('steps', () => {
        it('validates the get', () => {
            assert.isNull(validate('step.get.yaml', models.build.getStep).error);
        });

        it('validates the update', () => {
            assert.isNull(validate('step.update.yaml', models.build.updateStep).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.build.getStep).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.build.updateStep).error);
        });
    });
});
