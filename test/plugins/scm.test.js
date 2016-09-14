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

    describe('getRepoId', () => {
        it('validates', () => {
            assert.isNull(validate('scm.getRepoId.yaml', scm.getRepoId).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.getRepoId).error);
        });
    });
});
