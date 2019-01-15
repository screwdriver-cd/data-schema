'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model job', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('job.yaml', models.job.base).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('job.get.yaml', models.job.get).error);
        });

        it('validates the get with PR job', () => {
            assert.isNull(validate('job.pr.get.yaml', models.job.get).error);
        });

        it('validates the get with job state fields', () => {
            assert.isNull(validate('job.state.get.yaml', models.job.get).error);
        });

        it('fails the get for empty yaml', () => {
            assert.isNotNull(validate('empty.yaml', models.job.get).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('job.update.yaml', models.job.update).error);
        });

        it('validates the update with job state fields', () => {
            assert.isNull(validate('job.state.update.yaml', models.job.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', models.job.update).error);
        });
    });
});
