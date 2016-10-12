'use strict';

const assert = require('chai').assert;
const scm = require('../../plugins/scm');
const validate = require('../helper').validate;

describe('scm test', () => {
    describe('getPermissions', () => {
        it('validates', () => {
            assert.isNull(validate('scm.getPermissions.yaml', scm.getPermissions).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.getPermissions).error);
        });
    });

    describe('getCommitSha', () => {
        it('validates', () => {
            assert.isNull(validate('scm.getCommitSha.yaml', scm.getCommitSha).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.getCommitSha).error);
        });
    });

    describe('updateCommitStatus', () => {
        it('validates', () => {
            assert.isNull(validate('scm.updateCommitStatus.yaml', scm.updateCommitStatus).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.updateCommitStatus).error);
        });
    });

    describe('getFile', () => {
        it('validates', () => {
            assert.isNull(validate('scm.getFile.yaml', scm.getFile).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.getFile).error);
        });
    });

    describe('decorateUrl', () => {
        it('validates', () => {
            assert.isNull(validate('scm.decorateUrl.yaml', scm.decorateUrl).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.decorateUrl).error);
        });
    });

    describe('decorateCommit', () => {
        it('validates', () => {
            assert.isNull(validate('scm.decorateCommit.yaml', scm.decorateCommit).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.decorateCommit).error);
        });
    });

    describe('decorateAuthor', () => {
        it('validates', () => {
            assert.isNull(validate('scm.decorateAuthor.yaml', scm.decorateAuthor).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.decorateAuthor).error);
        });
    });

    describe('parseUrl', () => {
        it('validates', () => {
            assert.isNull(validate('scm.parseUrl.yaml', scm.parseUrl).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.parseUrl).error);
        });
    });
});
