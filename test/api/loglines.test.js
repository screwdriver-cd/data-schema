'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api log lines', () => {
    describe('input', () => {
        it('accepts params', () => {
            assert.isNull(validate('loglines.params.yaml', api.loglines.params).error);
        });

        it('accepts queries', () => {
            assert.isNull(validate('loglines.query.yaml', api.loglines.query).error);
        });

        it('fails on pages=0', () => {
            assert.isOk(validate('loglines.query.bad.yaml', api.loglines.query).error);
        });
    });

    describe('output', () => {
        it('validates basic output', () => {
            assert.isNull(validate('loglines.output.yaml', api.loglines.output).error);
        });

        it('validates string output', () => {
            assert.isNull(validate('loglines.output.string.yaml', api.loglines.output).error);
        });
    });
});
