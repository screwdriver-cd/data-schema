'use strict';

const Joi = require('joi');
const assert = require('chai').assert;
const config = require('../../').config;

describe('config scm context', () => {
    describe('scm context', () => {
        it('validates scm context', () => {
            assert.isNull(Joi.validate('github:github.com', config.scmContext.name).error);
        });
    });
});
