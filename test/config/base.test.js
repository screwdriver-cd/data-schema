'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');

describe('config base', () => {
    describe('config', () => {
        it('validates a screwdriver config', () => {
            assert.isNull(validate('config.base.config.yaml', config.base.configAfterMergingTemplate).error);
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

    describe('pipeline template', () => {
        it('validates the basic pipeline template usage', () => {
            assert.isNull(validate('config.base.pipelineTemplate.yaml', config.base.configBeforeMergingTemplate).error);
        });

        it('if template is provided then unsupported fields are forbidden', () => {
            assert.isNotNull(
                validate('config.base.pipelineTemplate-forbidden.yaml', config.base.configBeforeMergingTemplate).error
            );
        });

        it('if template is provided then allow user yaml to customize image, settings, environment, requires, and sourcePaths', () => {
            assert.isNull(
                validate('config.base.pipelineTemplate-customized.yaml', config.base.configBeforeMergingTemplate).error
            );
        });

        it('if template is not provided then job is required', () => {
            assert.isNotNull(
                validate('config.base.pipelineTemplate-invalid.yaml', config.base.configBeforeMergingTemplate).error
            );
        });
    });
});
