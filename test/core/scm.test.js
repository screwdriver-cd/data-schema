'use strict';

const assert = require('chai').assert;
const core = require('../../').core;
const validate = require('../helper').validate;

describe('scm core', () => {
    describe('command', () => {
        it('validates the command', () => {
            assert.isNull(validate('scm.command.yaml', core.scm.command).error);
        });

        it('fails the command', () => {
            assert.isNotNull(validate('empty.yaml', core.scm.command).error);
        });
    });

    describe('commit', () => {
        it('validates the commit', () => {
            assert.isNull(validate('scm.commit.yaml', core.scm.commit).error);
        });

        it('fails the commit', () => {
            assert.isNotNull(validate('empty.yaml', core.scm.commit).error);
        });
    });

    describe('repo', () => {
        it('validates the repo', () => {
            assert.isNull(validate('scm.repo.yaml', core.scm.repo).error);
        });

        it('fails the repo', () => {
            assert.isNotNull(validate('empty.yaml', core.scm.repo).error);
        });
    });

    describe('user', () => {
        it('validates the user', () => {
            assert.isNull(validate('scm.user.yaml', core.scm.user).error);
        });

        it('fails the user', () => {
            assert.isNotNull(validate('empty.yaml', core.scm.user).error);
        });
    });

    describe('hook', () => {
        it('validates the pull request hook', () => {
            assert.isNull(validate('scm.hook.pr.yaml', core.scm.hook).error);
        });

        it('validates the push hook', () => {
            assert.isNull(validate('scm.hook.push.yaml', core.scm.hook).error);
        });

        it('validates the ping hook', () => {
            assert.isNull(validate('scm.hook.ping.yaml', core.scm.hook).error);
        });

        it('validates the release hook', () => {
            assert.isNull(validate('scm.hook.release.yaml', core.scm.hook).error);
        });

        it('validates the tag hook', () => {
            assert.isNull(validate('scm.hook.tag.yaml', core.scm.hook).error);
        });

        it('fails the commit', () => {
            assert.isNotNull(validate('empty.yaml', core.scm.hook).error);
        });
    });
});
