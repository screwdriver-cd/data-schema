'use strict';
const assert = require('chai').assert;
const config = require('../../').config;

describe('config regex', () => {
    describe('steps', () => {
        it('checks good step names', () => {
            assert.isNotNull(config.regex.STEP_NAME.test('foo-BAR_15'));
        });

        it('fails on bad step names', () => {
            assert.isFalse(config.regex.STEP_NAME.test('run all the things'));
        });
    });

    describe('jobs', () => {
        it('checks good job names', () => {
            assert.isNotNull(config.regex.JOB_NAME.test('foo-BAR_15'));
        });

        it('fails on bad job names', () => {
            assert.isFalse(config.regex.JOB_NAME.test('run all the things'));
        });
    });

    describe('environment', () => {
        it('checks good env names', () => {
            assert.isNotNull(config.regex.ENV_NAME.test('OKAY_YES11'));
        });

        it('fails on bad job names', () => {
            assert.isFalse(config.regex.ENV_NAME.test('bad-bad-bad'));
            assert.isFalse(config.regex.ENV_NAME.test('1LOVE'));
        });
    });
});
