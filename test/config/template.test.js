'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;

describe('config template', () => {
    describe('template', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.template.yaml', config.template.template).error);
        });

        it('returns error when no config key in template', () => {
            assert.isNotNull(validate('config.template.bad.yaml',
                config.template.template).error);
        });
    });
});
