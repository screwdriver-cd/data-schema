'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api log lines', () => {
    describe('input', () => {
        it('accepts params', () => {
            assert.isNull(validate('loglines.params.yaml', api.loglines.params).error);
        });

        it('accepts query', () => {
            assert.isNull(validate('loglines.query.yaml', api.loglines.query).error);
        });
    });

    describe('output', () => {
        it('validates basic output', () => {
            assert.isNull(validate('loglines.output.yaml', api.loglines.output).error);
        });
    });
});
