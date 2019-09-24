'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;

describe('config parameters', () => {
    describe('parameters', () => {
        it('validates parameters', () => {
            assert.isNull(validate('config.job.parameters.yaml', config.job.parameters).error);
        });
    });
});
