'use strict';

const assert = require('chai').assert;
const scmCommons = require('../../lib/scmCommons');

describe('scm commons base', () => {
    describe('scm to build map', () => {
        it('validates a scm statuses mapping', () => {
            assert.strictEqual(scmCommons.SCM_STATE_MAP.QUEUED, 'PENDING');
        });
        it('validates an invalid scm statuses mapping', () => {
            assert.notStrictEqual(scmCommons.SCM_STATE_MAP.QUEUED, 'SUCCESS');
        });
    });
    describe('scm statuses', () => {
        it('check a valid scm status', () => {
            assert.isTrue(scmCommons.SCM_STATUSES.includes('PENDING'));
        });
        it('check an invalid scm status', () => {
            assert.isFalse(scmCommons.SCM_STATUSES.includes('QUEUED'));
        });
    });
});

