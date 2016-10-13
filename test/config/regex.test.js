'use strict';

const assert = require('chai').assert;
const config = require('../../').config;

describe('config regex', () => {
    describe('steps', () => {
        it('checks good step names', () => {
            assert.isTrue(config.regex.STEP_NAME.test('foo-BAR_15'));
        });

        it('fails on bad step names', () => {
            assert.isFalse(config.regex.STEP_NAME.test('run all the things'));
        });
    });

    describe('jobs', () => {
        it('checks good job names', () => {
            assert.isTrue(config.regex.JOB_NAME.test('foo-BAR_15'));
        });

        it('fails on bad job names', () => {
            assert.isFalse(config.regex.JOB_NAME.test('run all the things'));
        });
    });

    describe('environment', () => {
        it('checks good env names', () => {
            assert.isTrue(config.regex.ENV_NAME.test('OKAY_YES11'));
        });

        it('fails on bad job names', () => {
            assert.isFalse(config.regex.ENV_NAME.test('bad-bad-bad'));
            assert.isFalse(config.regex.ENV_NAME.test('1LOVE'));
        });
    });

    describe('checkoutUrl', () => {
        it('checks good checkout Url', () => {
            assert.isTrue(
                config.regex.CHECKOUT_URL.test('https://github.com/screwdriver-cd/data-schema.git'
            ));
            assert.isTrue(
                config.regex.CHECKOUT_URL.test('git@github.com:screwdriver-cd/data-schema.git'
            ));
        });

        it('fails on bad checkout Url', () => {
            assert.isFalse(
                config.regex.CHECKOUT_URL.test('https://github.com/screwdriver-cd/.git'));
            assert.isFalse(
                config.regex.CHECKOUT_URL.test('git@screwdriver-cd/data-schema.git'));
        });
    });

    describe('scmUri', () => {
        it('checks good scmUri', () => {
            assert.isTrue(
                config.regex.SCM_URI.test('github.com:abc-123:master'
            ));
            assert.isTrue(
                config.regex.SCM_URI.test('bitbucket.org:{123}:master'
            ));
        });

        it('fails on bad scmUri', () => {
            assert.isFalse(config.regex.SCM_URI.test('github.com:master'));
            assert.isFalse(config.regex.SCM_URI.test('bitbucket.org:{123}'));
        });
    });
});
