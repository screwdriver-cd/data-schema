'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;

describe('config template', () => {
    describe('template', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.template.yaml', config.template.template).error);
        });

        it('validates safely with namespace', () => {
            assert.isNull(validate('config.template.withNamespace.yaml',
                config.template.template).error);
        });

        it('returns error when no config key in template', () => {
            assert.isNotNull(validate('config.template.bad.yaml',
                config.template.template).error);
        });

        it('returns error when template namespace has bad format', () => {
            assert.isNotNull(validate('config.template.badWithNamespace.yaml',
                config.template.template).error);
        });
    });
});
