'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;
const parameters = config.parameters.parameters;

describe('config parameters', () => {
    describe('parameters', () => {
        it('validates parameters', () => {
            assert.isNull(validate('config.parameters.yaml', parameters).error);
        });
    });
});
