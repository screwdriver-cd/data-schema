'use strict';

const assert = require('chai').assert;
const scm = require('../../plugins/scm');
const Joi = require('joi');
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

    describe('getChangedFiles', () => {
        it('validates input', () => {
            assert.isNull(validate('scm.getChangedFilesInput.yaml',
                scm.getChangedFilesInput).error);
        });

        it('fails empty input', () => {
            assert.isNotNull(validate('empty.yaml', scm.getChangedFilesInput).error);
        });

        it('validates output', () => {
            assert.isNull(validate('scm.getChangedFilesOutput.yaml',
                scm.getChangedFilesOutput).error);
        });

        it('validates empty array output', () => {
            assert.isNull(validate('scm.getChangedFilesEmptyArrayOutput.yaml',
                scm.getChangedFilesOutput).error);
        });

        it('validates empty output', () => {
            assert.isNull(validate('empty.yaml', scm.getChangedFilesOutput).error);
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

    describe('getCheckoutCommand', () => {
        it('validates', () => {
            assert.isNull(validate('scm.getCheckoutCommand.yaml', scm.getCheckoutCommand).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.getCheckoutCommand).error);
        });
    });

    describe('parseHook', () => {
        it('validates full output', () => {
            assert.isNull(validate('scm.parseHook.yaml', scm.parseHookOutput).error);
        });

        it('validates null output', () => {
            assert.isNull(Joi.validate(null, scm.parseHookOutput).error);
        });
    });

    describe('addWebhook', () => {
        it('validates', () => {
            assert.isNull(validate('scm.addWebhook.yaml', scm.addWebhook).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.addWebhook).error);
        });
    });

    describe('getBranchList', () => {
        it('validates', () => {
            assert.isNull(validate('scm.getBranchList.yaml', scm.getBranchList).error);
        });

        it('fails', () => {
            assert.isNotNull(validate('empty.yaml', scm.getBranchList).error);
        });
    });
});
