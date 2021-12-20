'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');
const { tokenConfig } = config;

describe('config tokenConfig', () => {
    describe('tokenConfig', () => {
        it('validates tokenConfig', () => {
            assert.isNull(validate('config.tokenConfig.yaml', tokenConfig).error);
        });
    });
});
