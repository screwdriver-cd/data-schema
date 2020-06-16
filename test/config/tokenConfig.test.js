'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;
const tokenConfig = config.tokenConfig;

describe('config tokenConfig', () => {
    describe('tokenConfig', () => {
        it('validates tokenConfig', () => {
            assert.isNull(validate('config.tokenConfig.yaml', tokenConfig).error);
        });
    });
});
