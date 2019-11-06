'use strict';

const Joi = require('joi');
const assert = require('chai').assert;
const config = require('../../').config;

describe('config parameters', () => {
    describe('parameters', () => {
        it('validates parameters', () => {
            assert.isNull(Joi.validate('github:github.com', config.scmContext.name).error);
        });
    });
});
