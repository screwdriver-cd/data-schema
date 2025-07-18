'use strict';

const { assert } = require('chai');
const { config } = require('../..');

/* eslint-disable max-lines-per-function */
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

        it('checks good external trigger AND', () => {
            assert.isTrue(config.regex.EXTERNAL_TRIGGER_AND.test('sd@123:main'));
        });

        it('fails on bad external trigger AND', () => {
            assert.isFalse(config.regex.EXTERNAL_TRIGGER.test('sd:123'));
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

    describe('core trigger', () => {
        it('checks good trigger', () => {
            assert.isTrue(config.regex.CORE_TRIGGER.test('~commit'));
            assert.isTrue(config.regex.CORE_TRIGGER.test('~commit:master'));
            assert.isTrue(config.regex.CORE_TRIGGER.test('~pr'));
            assert.isTrue(config.regex.CORE_TRIGGER.test('~pr:master'));
        });

        it('fails on bad trigger', () => {
            assert.isFalse(config.regex.CORE_TRIGGER.test('~tag'));
            assert.isFalse(config.regex.CORE_TRIGGER.test('~release'));
        });
    });

    describe('extra trigger', () => {
        it('checks good trigger', () => {
            assert.isTrue(config.regex.EXTRA_TRIGGER.test('~tag'));
            assert.isTrue(config.regex.EXTRA_TRIGGER.test('~tag:master'));
            assert.isTrue(config.regex.EXTRA_TRIGGER.test('~release'));
            assert.isTrue(config.regex.EXTRA_TRIGGER.test('~release:master'));
        });

        it('fails on bad trigger', () => {
            assert.isFalse(config.regex.EXTRA_TRIGGER.test('~commit'));
            assert.isFalse(config.regex.EXTRA_TRIGGER.test('~pr'));
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

        it('checks good command full names with tag including dot', () => {
            assert.isTrue(config.regex.FULL_COMMAND_NAME.test('chefdk/knife@v1.1.1'));
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

        it('checks good command dotted tag names', () => {
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

        it('checks good template full names with tag including dot', () => {
            assert.isTrue(config.regex.FULL_TEMPLATE_NAME.test('chefdk/knife@v1.1.1'));
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

        it('checks good template tag names', () => {
            assert.isTrue(config.regex.TEMPLATE_TAG_NAME.test('stable'));
        });

        it('checks good template dotted tag names', () => {
            assert.isTrue(config.regex.TEMPLATE_TAG_NAME.test('v1.2.3'));
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
            assert.isTrue(config.regex.IMAGE_NAME.test('xcode:14.2'));
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
            assert.isTrue(config.regex.JOB_NAME.test('stage@integration:setup'));
            assert.isTrue(config.regex.JOB_NAME.test('stage@production-blue:teardown'));
        });

        it('fails on bad job names', () => {
            assert.isFalse(config.regex.JOB_NAME.test('run all the things'));
            assert.isFalse(config.regex.JOB_NAME.test('stage@integration'));
            assert.isFalse(config.regex.JOB_NAME.test('stage@integration:deploy'));
            assert.isFalse(config.regex.JOB_NAME.test('integration:deploy'));
        });

        it('checks good PR job names', () => {
            assert.isTrue(config.regex.PR_JOB_NAME.test('PR-1'));
            assert.isTrue(config.regex.PR_JOB_NAME.test('PR-1:main'));
            assert.isTrue(config.regex.PR_JOB_NAME.test('PR-1:main-job'));
            assert.isTrue(config.regex.PR_JOB_NAME.test('PR-1:stage@foo:setup'));
            assert.deepEqual('PR-1:main-job'.match(config.regex.PR_JOB_NAME)[1], 'PR-1');
            assert.deepEqual('PR-1:main-job'.match(config.regex.PR_JOB_NAME)[2], 'main-job');
            assert.deepEqual('PR-1:stage@foo:setup'.match(config.regex.PR_JOB_NAME)[1], 'PR-1');
            assert.deepEqual('PR-1:stage@foo:setup'.match(config.regex.PR_JOB_NAME)[2], 'stage@foo:setup');
        });

        it('checks all possible job names', () => {
            assert.isTrue(config.regex.ALL_JOB_NAME.test('foo-BAR_15'));
            assert.isTrue(config.regex.ALL_JOB_NAME.test('PR-1'));
            assert.isTrue(config.regex.ALL_JOB_NAME.test('PR-1:main'));
            assert.isTrue(config.regex.ALL_JOB_NAME.test('PR-1:main-job'));
            assert.isTrue(config.regex.ALL_JOB_NAME.test('PR-1:sd@21:external_fork'));
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
        const github = 'github.com';
        const bitbucket = 'bitbucket.org';
        const org = 'screwdriver-cd';
        const repo = 'data-schema';
        const bitbucketRepo = 'data.schema';
        const generalBranchName = '#foobar';
        const generalRootDir = ':path/to/source/dir';
        const specialBranchName = '#foo!"#$%&\'()-=|@`{;+]},<.>/　🚗';
        const specialRootDir = ':path/to/!"#$%&\'()-=|@`{;+]},<.>/　🚗';

        describe('checks good checkout Url', () => {
            const githubHttps = `https://${github}/${org}/${repo}.git`;
            const createTests = (branchName, rootDir) => {
                return [
                    {
                        url: githubHttps,
                        match: [githubHttps, github, org, repo, null, null]
                    },
                    {
                        url: `${githubHttps}${branchName}`,
                        match: [`${githubHttps}${branchName}`, github, org, repo, branchName, null]
                    },
                    {
                        url: `${githubHttps}${branchName}${rootDir}`,
                        match: [`${githubHttps}${branchName}${rootDir}`, github, org, repo, branchName, rootDir]
                    },
                    {
                        url: `git@${github}:${org}/${repo}.git`,
                        match: [`git@${github}:${org}/${repo}.git`, github, org, repo, null, null]
                    },
                    {
                        url: `git@${github}:${org}/${repo}.git${branchName}`,
                        match: [`git@${github}:${org}/${repo}.git${branchName}`, github, org, repo, branchName, null]
                    },
                    {
                        url: `git@${github}:${org}/${repo}.git${branchName}${rootDir}`,
                        match: [
                            `git@${github}:${org}/${repo}.git${branchName}${rootDir}`,
                            github,
                            org,
                            repo,
                            branchName,
                            rootDir
                        ]
                    },
                    {
                        url: `https://screwdriver-cd@${bitbucket}/${org}/${repo}.git`,
                        match: [
                            `https://screwdriver-cd@${bitbucket}/${org}/${repo}.git`,
                            bitbucket,
                            org,
                            repo,
                            null,
                            null
                        ]
                    },
                    {
                        url: `https://screwdriver-cd@${bitbucket}/${org}/${repo}.git${branchName}`,
                        match: [
                            `https://screwdriver-cd@${bitbucket}/${org}/${repo}.git${branchName}`,
                            bitbucket,
                            org,
                            repo,
                            branchName,
                            null
                        ]
                    },
                    {
                        url: `https://user@${bitbucket}/${org}/${repo}.git${branchName}${rootDir}`,
                        match: [
                            `https://user@${bitbucket}/${org}/${repo}.git${branchName}${rootDir}`,
                            bitbucket,
                            org,
                            repo,
                            branchName,
                            rootDir
                        ]
                    },
                    {
                        url: `git@${bitbucket}:${org}/${repo}.git`,
                        match: [`git@${bitbucket}:${org}/${repo}.git`, bitbucket, org, repo, null, null]
                    },
                    {
                        url: `git@${bitbucket}:${org}/${repo}.git${branchName}`,
                        match: [
                            `git@${bitbucket}:${org}/${repo}.git${branchName}`,
                            bitbucket,
                            org,
                            repo,
                            branchName,
                            null
                        ]
                    },
                    {
                        url: `git@${bitbucket}:${org}/${bitbucketRepo}.git${branchName}`,
                        match: [
                            `git@${bitbucket}:${org}/${bitbucketRepo}.git${branchName}`,
                            bitbucket,
                            org,
                            bitbucketRepo,
                            branchName,
                            null
                        ]
                    },
                    {
                        url: `org-1234@${bitbucket}:${org}/${bitbucketRepo}.git${branchName}`,
                        match: [
                            `org-1234@${bitbucket}:${org}/${bitbucketRepo}.git${branchName}`,
                            bitbucket,
                            org,
                            bitbucketRepo,
                            branchName,
                            null
                        ]
                    }
                ];
            };

            [createTests(generalBranchName, generalRootDir), createTests(specialBranchName, specialRootDir)].forEach(
                tests => {
                    tests.forEach(test => {
                        it(`correctly validates ${test.url}`, () => {
                            assert.deepEqual(
                                JSON.stringify(config.regex.CHECKOUT_URL.exec(test.url), null, 4),
                                JSON.stringify(test.match, null, 4)
                            );
                        });
                    });
                }
            );
        });

        it('fails on bad checkout Url', () => {
            assert.isFalse(config.regex.CHECKOUT_URL.test('https://github.com/screwdriver-cd/'));
            assert.isFalse(config.regex.CHECKOUT_URL.test(`git@${org}/${repo}.git`));
            assert.isFalse(config.regex.CHECKOUT_URL.test(`git@${org}/${repo}.git#${generalRootDir}`));
            assert.isFalse(config.regex.CHECKOUT_URL.test(`git@${org}/${repo}.git${generalBranchName}:`));
            assert.isFalse(config.regex.CHECKOUT_URL.test(`git@${org}/${repo}.git#${specialRootDir}`));
            assert.isFalse(config.regex.CHECKOUT_URL.test(`git@${org}/${repo}.git${specialBranchName}:`));
        });
    });

    describe('scmUri', () => {
        it('checks good scmUri', () => {
            assert.isTrue(config.regex.SCM_URI.test('github.com:abc-123:master'));
            assert.isTrue(config.regex.SCM_URI.test('github.com:abc-123:master:src/app/component'));
            assert.isTrue(config.regex.SCM_URI.test('github.com:abc-123:master:a:b:c'));
            assert.isTrue(config.regex.SCM_URI.test('bitbucket.org:d2lam/{123}:master'));
        });

        it('fails on bad scmUri', () => {
            assert.isFalse(config.regex.SCM_URI.test('github.com:master'));
            assert.isFalse(config.regex.SCM_URI.test('bitbucket.org:{123}'));
        });
    });

    describe('stageTrigger', () => {
        const stageTriggerRegex = config.regex.STAGE_TRIGGER;

        it('matches valid stage triggers', () => {
            assert.isTrue(stageTriggerRegex.test('stage@build'));
            assert.isTrue(stageTriggerRegex.test('stage@build:setup'));
            assert.isTrue(stageTriggerRegex.test('~stage@test'));
            assert.isTrue(stageTriggerRegex.test('~stage@test:tearDown'));
        });

        it('does not match invalid stage triggers', () => {
            assert.isFalse(stageTriggerRegex.test('stage:'));
            assert.isFalse(stageTriggerRegex.test('stage:build:test'));
            assert.isFalse(stageTriggerRegex.test('build'));
        });
    });

    describe('stageExternalTrigger', () => {
        const stageExternalTriggerRegex = config.regex.EXTERNAL_STAGE_TRIGGER;

        it('matches valid stage external triggers', () => {
            [
                'sd@26:stage@alpha:setup',
                '~sd@26:stage@alpha:setup',
                'sd@26:stage@alpha:teardown',
                '~sd@26:stage@alpha:teardown'
            ].forEach(trigger => {
                assert.isTrue(stageExternalTriggerRegex.test(trigger));
            });
        });

        it('does not match invalid stage external triggers', () => {
            [
                'sd@26:stage@alpha:deploy',
                '~sd@26:stage@alpha:deploy',
                'sd@26:stage@alpha',
                'sd@26:stage@',
                'sd@26:stage:',
                'stage@alpha:setup',
                'stage:build:test',
                'build'
            ].forEach(trigger => {
                assert.isFalse(stageExternalTriggerRegex.test(trigger));
            });
        });
    });

    describe('stageSetup', () => {
        const stageSetupRegex = config.regex.STAGE_SETUP_PATTERN;

        it('matches valid stage setup jobs', () => {
            ['stage@alpha:setup', 'PR-1:stage@alpha:setup'].forEach(trigger => {
                assert.isTrue(stageSetupRegex.test(trigger));
                assert.deepEqual(trigger.match(stageSetupRegex)[1], 'alpha');
            });
        });

        it('does not match invalid stage setup jobs', () => {
            ['stage@alpha:teardown', 'alpha-deploy', 'alpha:setup', 'stage@setup', 'PR-1:stage@alpha:teardown'].forEach(
                trigger => {
                    assert.isFalse(stageSetupRegex.test(trigger));
                }
            );
        });
    });

    describe('stageTeardown', () => {
        const stageTeardownRegex = config.regex.STAGE_TEARDOWN_PATTERN;

        it('matches valid stage teardown jobs', () => {
            ['stage@alpha:teardown', 'PR-1:stage@alpha:teardown'].forEach(trigger => {
                assert.isTrue(stageTeardownRegex.test(trigger));
                assert.deepEqual(trigger.match(stageTeardownRegex)[1], 'alpha');
            });
        });

        it('does not match invalid stage teardown jobs', () => {
            ['stage@alpha:setup', 'alpha-deploy', 'alpha:setup', 'stage@setup', 'PR-1:stage@alpha:setup'].forEach(
                trigger => {
                    assert.isFalse(stageTeardownRegex.test(trigger));
                }
            );
        });
    });

    describe('stageSetupTeardown', () => {
        const stageSetupTeardownRegex = config.regex.STAGE_SETUP_TEARDOWN_JOB_NAME;

        it('matches valid stage setup or teardown jobs', () => {
            ['stage@alpha:setup', 'stage@alpha:teardown'].forEach(trigger => {
                assert.isTrue(stageSetupTeardownRegex.test(trigger));
                assert.isTrue(stageSetupTeardownRegex.test(`PR-1:${trigger}`));
            });
        });

        it('does not match invalid stage setup or teardown jobs', () => {
            [
                'stage@alpha',
                'PR-1:stage@alpha',
                'alpha-deploy',
                'PR-1:alpha-deploy',
                'alpha:setup',
                'stage@setup',
                'stage@alpha:deploy',
                'stage@teardown',
                'sd@1234:stage@alpha:setup',
                'sd@1234:stage@alpha:teardown'
            ].forEach(trigger => {
                assert.isFalse(stageSetupTeardownRegex.test(trigger));
            });
        });
    });

    describe('extract downstream job name', () => {
        const externalTriggerRegex = config.regex.EXTERNAL_TRIGGER_ALL;

        it('matches valid external jobs', () => {
            ['sd@26:hello', '~sd@26:hello', 'sd@26:stage@alpha:setup', '~sd@26:stage@alpha:setup'].forEach(trigger => {
                assert.isTrue(externalTriggerRegex.test(trigger));
            });
        });

        it('does not match invalid downstream job name', () => {
            [
                'sd@26',
                '~sd@26',
                'sd@26:stage@alpha',
                'sd@26:stage@alpha:deploy',
                '~sd@26:stage@alpha:deploy',
                'sd@26:stage@alpha:teardown',
                '~sd@26:stage@alpha:teardown'
            ].forEach(trigger => {
                assert.isFalse(externalTriggerRegex.test(trigger));
            });
        });

        it('consistently extracts downstream job name', () => {
            [
                {
                    externalTrigger: 'sd@26:hello',
                    expectedJobName: 'hello'
                },
                {
                    externalTrigger: '~sd@26:hello',
                    expectedJobName: 'hello'
                },
                {
                    externalTrigger: 'sd@26:stage@alpha:setup',
                    expectedJobName: 'stage@alpha:setup'
                },
                {
                    externalTrigger: '~sd@26:stage@alpha:setup',
                    expectedJobName: 'stage@alpha:setup'
                }
            ].forEach(e => {
                const [, , actualJobName] = externalTriggerRegex.exec(e.externalTrigger);

                assert.equal(actualJobName, e.expectedJobName);
            });
        });
    });

    describe('stage name', () => {
        const stageNameRegex = config.regex.QUALIFIED_STAGE_NAME;
        const prStageNameRegex = config.regex.PR_STAGE_NAME;

        it('fails on bad stage names', () => {
            assert.isFalse(stageNameRegex.test('foo'));
            assert.isFalse(stageNameRegex.test('run all the things'));
            assert.isFalse(stageNameRegex.test('stage@integration:deploy'));
            assert.isFalse(stageNameRegex.test('PR-1:stage@integration:deploy'));
        });

        it('checks good stage names', () => {
            assert.isTrue(stageNameRegex.test('stage@foo'));
            assert.isTrue(stageNameRegex.test('stage@foo-bar'));
            assert.isTrue(stageNameRegex.test('PR-1:stage@foo'));
            assert.deepEqual('stage@foo'.match(stageNameRegex)[1], 'foo');
            assert.deepEqual('PR-1:stage@foo'.match(stageNameRegex)[1], 'foo');
        });

        it('fails on bad PR stage names', () => {
            assert.isFalse(prStageNameRegex.test('foo'));
            assert.isFalse(prStageNameRegex.test('run all the things'));
            assert.isFalse(prStageNameRegex.test('stage@integration:deploy'));
            assert.isFalse(prStageNameRegex.test('PR-1:stage@integration:deploy'));
            assert.isFalse(prStageNameRegex.test('PR-1:integration:deploy'));
        });

        it('checks good PR stage names', () => {
            assert.isTrue(prStageNameRegex.test('PR-1:foo'));
            assert.isTrue(prStageNameRegex.test('PR-1:foo-bar'));
            assert.deepEqual('PR-1:foo'.match(prStageNameRegex)[1], 'PR-1');
            assert.deepEqual('PR-1:foo'.match(prStageNameRegex)[2], 'foo');
        });
    });
});
