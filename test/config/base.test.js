'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;

describe('config base', () => {
    describe('config', () => {
        it('validates a screwdriver config', () => {
            assert.isNull(validate('config.base.config.yaml', config.base.config).error);
        });
    });

    describe('jobs', () => {
        it('validates a list of jobs', () => {
            assert.isNull(validate('config.base.jobs.yaml', config.base.jobs).error);
        });
    });

    describe('shared', () => {
        it('validates the shared object', () => {
            assert.isNull(validate('config.base.shared.yaml', config.base.shared).error);
        });
    });

    describe('scmUrls', () => {
        it('validates a list of scmUrls', () => {
            assert.isNull(validate('config.base.scmUrls.yaml', config.base.scmUrls).error);
        });
    });
});
