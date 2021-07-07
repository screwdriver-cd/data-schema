'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model template', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('template.yaml', models.template.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('template.create.yaml', models.template.create).error);
        });

        it('validates the create with namespace', () => {
            assert.isNull(validate('template.createWithNamespace.yaml', models.template.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.template.create).error);
        });

        it('fails the create with duplicate steps', () => {
            assert.isNotNull(validate('template.createWithDupSteps.yaml', models.template.create).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('template.get.yaml', models.template.get).error);
        });

        it('validates the get with duplicate steps', () => {
            assert.isNull(validate('template.getWithDupSteps.yaml', models.template.get).error);
        });

        it('validates the get with namespace', () => {
            assert.isNull(validate('template.getWithNamespace.yaml', models.template.get).error);
        });

        it('validates the compact get without "config" field', () => {
            assert.isNull(validate('template.compact.yaml', models.template.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.template.get).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('template.update.yaml', models.template.update).error);
        });

        it('fails the update with namespace', () => {
            assert.isNotNull(validate('template.updateWithNamespace.yaml', models.template.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.template.update).error);
        });
    });
});
