'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model buildCluster', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('buildCluster.yaml', models.buildCluster.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('buildCluster.create.yaml', models.buildCluster.create).error);
        });

        it('validates the create with optional fields', () => {
            assert.isNull(validate('buildCluster.create.full.yaml',
                models.buildCluster.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.buildCluster.create).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('buildCluster.update.yaml', models.buildCluster.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.buildCluster.update).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('buildCluster.get.yaml', models.buildCluster.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.buildCluster.get).error);
        });
    });
});
