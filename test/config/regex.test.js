'use strict';

const assert = require('chai').assert;
const config = require('../../').config;

describe('config regex', () => {
    describe('internal trigger', () => {
        it('checks good internal trigger', () => {
            assert.isTrue(config.regex.INTERNAL_TRIGGER.test('~main'));
        });

        it('fails on bad internal trigger', () => {
            assert.isFalse(config.regex.INTERNAL_TRIGGER.test('main'));
        });
    });

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

    describe('pr trigger', () => {
        it('checks good trigger', () => {
            assert.isTrue(config.regex.TRIGGER.test('~pr'));
            assert.isTrue(config.regex.TRIGGER.test('~pr:master'));
            assert.isTrue(config.regex.PR_TRIGGER.test('~pr'));
            assert.isTrue(config.regex.PR_TRIGGER.test('~pr:master'));
        });

        it('fails on bad trigger', () => {
            assert.isFalse(config.regex.TRIGGER.test('~pr:'));
            assert.isFalse(config.regex.PR_TRIGGER.test('~pr:'));
        });
    });

    describe('commit trigger', () => {
        it('checks good trigger', () => {
            assert.isTrue(config.regex.TRIGGER.test('~commit'));
            assert.isTrue(config.regex.TRIGGER.test('~commit:master'));
            assert.isTrue(config.regex.COMMIT_TRIGGER.test('~commit'));
            assert.isTrue(config.regex.COMMIT_TRIGGER.test('~commit:master'));
        });

        it('fails on bad trigger', () => {
            assert.isFalse(config.regex.TRIGGER.test('~commit:'));
            assert.isFalse(config.regex.COMMIT_TRIGGER.test('~commit:'));
        });
    });

    describe('release trigger', () => {
        it('checks good trigger', () => {
            assert.isTrue(config.regex.TRIGGER.test('~release'));
            assert.isTrue(config.regex.TRIGGER.test('~release:master'));
            assert.isTrue(config.regex.RELEASE_TRIGGER.test('~release'));
            assert.isTrue(config.regex.RELEASE_TRIGGER.test('~release:master'));
        });

        it('fails on bad trigger', () => {
            assert.isFalse(config.regex.TRIGGER.test('~release:'));
            assert.isFalse(config.regex.COMMIT_TRIGGER.test('~release:'));
        });
    });

    describe('tag trigger', () => {
        it('checks good trigger', () => {
            assert.isTrue(config.regex.TRIGGER.test('~tag'));
            assert.isTrue(config.regex.TRIGGER.test('~tag:master'));
            assert.isTrue(config.regex.TAG_TRIGGER.test('~tag'));
            assert.isTrue(config.regex.TAG_TRIGGER.test('~tag:master'));
        });

        it('fails on bad trigger', () => {
            assert.isFalse(config.regex.TRIGGER.test('~tag:'));
            assert.isFalse(config.regex.TAG_TRIGGER.test('~tag:'));
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

        it('checks good command tag names', () => {
            assert.isTrue(config.regex.COMMAND_TAG_NAME.test('stable'));
        });

        it('checks good template tag names', () => {
            assert.isTrue(config.regex.COMMAND_TAG_NAME.test('v1.2.3'));
        });
    });

    describe('templates', () => {
        it('checks good template namespaces', () => {
            assert.isTrue(config.regex.TEMPLATE_NAMESPACE.test('chefdk'));
        });

        it('fails on bad template namespaces', () => {
            assert.isFalse(config.regex.TEMPLATE_NAMESPACE.test('bad/namespace'));
        });

        it('checks good template names', () => {
            assert.isTrue(config.regex.TEMPLATE_NAME_ALLOW_SLASH.test('node/npm-install'));
        });

        it('fails on bad template names', () => {
            assert.isFalse(config.regex.TEMPLATE_NAME_ALLOW_SLASH.test('bad@/name'));
        });

        it('checks good template full names', () => {
            assert.isTrue(config.regex.FULL_TEMPLATE_NAME.test('chefdk/knife@1.2.3'));
        });

        it('checks good template full names with namespace', () => {
            assert.isTrue(config.regex.FULL_TEMPLATE_NAME_WITH_NAMESPACE.test('chefdk/knife'));
        });

        it('checks good template full names without version', () => {
            assert.isTrue(config.regex.FULL_TEMPLATE_NAME.test('chefdk/knife'));
        });

        it('fails on bad template full names', () => {
            assert.isFalse(config.regex.FULL_TEMPLATE_NAME.test('bad name'));
        });

        it('fails on bad formatted template full names', () => {
            assert.isFalse(config.regex.FULL_TEMPLATE_NAME.test('namespace::command@1.2.3'));
        });

        it('fails on bad template names', () => {
            assert.isFalse(config.regex.TEMPLATE_NAME_NO_SLASH.test('run all the things'));
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

    describe('images', () => {
        it('checks good image names', () => {
            assert.isTrue(config.regex.IMAGE_NAME.test('10-13_931-9E501_20180531234344_platform'));
        });

        it('fails on bad image names', () => {
            assert.isFalse(config.regex.IMAGE_NAME.test('ubuntu abc"CPU'));
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
