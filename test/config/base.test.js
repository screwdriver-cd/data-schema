'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');

describe('config base', () => {
    describe('config', () => {
        it('validates a screwdriver config', () => {
            assert.isNull(validate('config.base.config.yaml', config.base.config).error);
        });
    });

    describe('jobs', () => {
        it('validates a list of jobs', () => {
            assert.isNull(validate('config.base.jobs.yaml', config.base.jobs).error);
        });

        it('throws error for a job with long job name', () => {
            assert.isNotNull(validate('config.base.jobs.badJobName.yaml', config.base.jobs).error);
        });
    });

    describe('shared', () => {
        it('validates the shared object', () => {
            assert.isNull(validate('config.base.shared.yaml', config.base.shared).error);
        });
    });

    describe('cache', () => {
        it('validates the cache object', () => {
            assert.isNull(validate('config.base.cache.yaml', config.base.cache).error);
        });
    });

    describe('childPipelines', () => {
        it('validates the childPipelines object', () => {
            assert.isNull(validate('config.base.childPipelines.yaml', config.base.childPipelines).error);
        });
    });

    describe('stages', () => {
        it('validates the stages object', () => {
            assert.isNull(validate('config.base.stages.yaml', config.base.stages).error);
        });
    });
});
