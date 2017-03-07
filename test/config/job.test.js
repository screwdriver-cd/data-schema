'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;

describe('config job', () => {
    describe('job', () => {
        it('validates a job', () => {
            assert.isNull(validate('config.job.job.yaml', config.job.job).error);
        });
    });

    describe('matrix', () => {
        it('validates the matrix', () => {
            assert.isNull(validate('config.job.matrix.yaml', config.job.matrix).error);
        });
    });

    describe('steps', () => {
        it('validates steps', () => {
            assert.isNull(validate('config.job.steps.yaml', config.job.steps).error);
        });
    });

    describe('secrets', () => {
        it('validates secrets', () => {
            assert.isNull(validate('config.job.secrets.yaml', config.job.secrets).error);
        });
    });

    describe('environment', () => {
        it('validates environment', () => {
            assert.isNull(validate('config.job.environment.yaml', config.job.environment).error);
        });
    });

    describe('image', () => {
        it('validates an image', () => {
            assert.isNull(validate('config.job.image.yaml', config.job.image).error);
        });
    });

    describe('settings', () => {
        it('validates settings', () => {
            assert.isNull(validate('config.job.settings.yaml', config.job.settings).error);
        });
    });

    describe('template', () => {
        it('validates good template', () => {
            assert.isNull(validate('config.job.template.good.yaml', config.job.job).error);
        });

        it('returns error for bad template', () => {
            assert.isNotNull(validate('config.job.template.bad.yaml', config.job.job).error);
        });
    });
});
