'use strict';

const assert = require('chai').assert;
const config = require('../../').config;

describe('config regex', () => {
    describe('external trigger', () => {
        it('checks good external trigger', () => {
            assert.isTrue(config.regex.EXTERNAL_TRIGGER.test('~sd@123:main'));
        });

        it('fails on bad external trigger', () => {
            assert.isFalse(config.regex.EXTERNAL_TRIGGER.test('~sd:123'));
        });
    });

    describe('trigger', () => {
        it('checks good trigger', () => {
            assert.isTrue(config.regex.TRIGGER.test('~commit'));
        });

        it('fails on bad trigger', () => {
            assert.isFalse(config.regex.TRIGGER.test('~'));
        });
    });

    describe('commands', () => {
        it('checks good command namespaces', () => {
            assert.isTrue(config.regex.COMMAND_NAMESPACE.test('chefdk'));
        });

        it('fails on bad command namespaces', () => {
            assert.isFalse(config.regex.COMMAND_NAMESPACE.test('bad/namespace'));
        });

        it('checks good command names', () => {
            assert.isTrue(config.regex.COMMAND_NAME.test('knife'));
        });

        it('fails on bad command names', () => {
            assert.isFalse(config.regex.COMMAND_NAME.test('bad/name'));
        });

        it('checks good command full names', () => {
            assert.isTrue(config.regex.FULL_COMMAND_NAME.test('chefdk/knife@1.2.3'));
        });

        it('checks good command full names without version', () => {
            assert.isTrue(config.regex.FULL_COMMAND_NAME.test('chefdk/knife'));
        });

        it('fails on bad command full names', () => {
            assert.isFalse(config.regex.FULL_COMMAND_NAME.test('bad name'));
        });

        it('fails on bad formatted command full names', () => {
            assert.isFalse(config.regex.FULL_COMMAND_NAME.test('namespace::command@1.2.3'));
        });
    });

    describe('templates', () => {
        it('checks good template names', () => {
            assert.isTrue(config.regex.TEMPLATE_NAME.test('node/npm-install'));
        });

        it('fails on bad template names', () => {
            assert.isFalse(config.regex.TEMPLATE_NAME.test('run all the things'));
        });
    });

    describe('versions', () => {
        it('checks good versions', () => {
            assert.isTrue(config.regex.VERSION.test('12.1.2'));
        });

        it('fails on bad versions', () => {
            assert.isFalse(config.regex.VERSION.test('1.0.1.0.1'));
        });
    });

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

        it('checks good PR job names', () => {
            assert.isTrue(config.regex.PR_JOB_NAME.test('PR-1'));
            assert.isTrue(config.regex.PR_JOB_NAME.test('PR-1:main'));
            assert.isTrue(config.regex.PR_JOB_NAME.test('PR-1:main-job'));
            assert.deepEqual('PR-1:main-job'.match(config.regex.PR_JOB_NAME)[1], 'PR-1');
            assert.deepEqual('PR-1:main-job'.match(config.regex.PR_JOB_NAME)[2], 'main-job');
        });

        it('checks bad PR job names', () => {
            assert.isFalse(config.regex.PR_JOB_NAME.test('PR-1-main'));
            assert.isFalse(config.regex.PR_JOB_NAME.test('PR-1:main:job'));
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
        describe('checks good checkout Url', () => {
            const tests = [
                {
                    url: 'https://github.com/screwdriver-cd/data-schema.git',
                    match: [
                        'https://github.com/screwdriver-cd/data-schema.git',
                        'github.com',
                        'screwdriver-cd',
                        'data-schema',
                        null
                    ]
                },
                {
                    url: 'https://github.com/screwdriver-cd/data-schema.git#foobar',
                    match: [
                        'https://github.com/screwdriver-cd/data-schema.git#foobar',
                        'github.com',
                        'screwdriver-cd',
                        'data-schema',
                        '#foobar'
                    ]
                },
                {
                    url: 'git@github.com:screwdriver-cd/data-schema.git',
                    match: [
                        'git@github.com:screwdriver-cd/data-schema.git',
                        'github.com',
                        'screwdriver-cd',
                        'data-schema',
                        null
                    ]
                },
                {
                    url: 'git@github.com:screwdriver-cd/data-schema.git#foobar',
                    match: [
                        'git@github.com:screwdriver-cd/data-schema.git#foobar',
                        'github.com',
                        'screwdriver-cd',
                        'data-schema',
                        '#foobar'
                    ]
                },
                {
                    url: 'https://screwdriver-cd@bitbucket.org/screwdriver-cd/data-schema',
                    match: [
                        'https://screwdriver-cd@bitbucket.org/screwdriver-cd/data-schema',
                        'bitbucket.org',
                        'screwdriver-cd',
                        'data-schema',
                        null
                    ]
                },
                {
                    url: 'https://screwdriver-cd@bitbucket.org/screwdriver-cd/data-schema#banana',
                    match: [
                        'https://screwdriver-cd@bitbucket.org/screwdriver-cd/data-schema#banana',
                        'bitbucket.org',
                        'screwdriver-cd',
                        'data-schema',
                        '#banana'
                    ]
                },
                {
                    url: 'git@bitbucket.org:screwdriver-cd/data-schema',
                    match: [
                        'git@bitbucket.org:screwdriver-cd/data-schema',
                        'bitbucket.org',
                        'screwdriver-cd',
                        'data-schema',
                        null
                    ]
                },
                {
                    url: 'git@bitbucket.org:screwdriver-cd/data-schema#banana',
                    match: [
                        'git@bitbucket.org:screwdriver-cd/data-schema#banana',
                        'bitbucket.org',
                        'screwdriver-cd',
                        'data-schema',
                        '#banana'
                    ]
                },
                {
                    url: 'git@bitbucket.org:screwdriver-cd/data.schema#banana',
                    match: [
                        'git@bitbucket.org:screwdriver-cd/data.schema#banana',
                        'bitbucket.org',
                        'screwdriver-cd',
                        'data.schema',
                        '#banana'
                    ]
                }
            ];

            tests.forEach((test) => {
                it(`correctly validates ${test.url}`, () => {
                    assert.deepEqual(
                        JSON.stringify(test.match, null, 4),
                        JSON.stringify(config.regex.CHECKOUT_URL.exec(test.url), null, 4)
                    );
                });
            });
        });

        it('fails on bad checkout Url', () => {
            assert.isFalse(config.regex.CHECKOUT_URL.test('https://github.com/screwdriver-cd/'));
            assert.isFalse(config.regex.CHECKOUT_URL.test('git@screwdriver-cd/data-schema.git'));
        });
    });

    describe('scmUri', () => {
        it('checks good scmUri', () => {
            assert.isTrue(config.regex.SCM_URI.test('github.com:abc-123:master'));
            assert.isTrue(config.regex.SCM_URI.test('bitbucket.org:d2lam/{123}:master'));
        });

        it('fails on bad scmUri', () => {
            assert.isFalse(config.regex.SCM_URI.test('github.com:master'));
            assert.isFalse(config.regex.SCM_URI.test('github.com:master:a:b'));
            assert.isFalse(config.regex.SCM_URI.test('bitbucket.org:{123}'));
        });
    });
});
