'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api validator', () => {
    const inputSchema = api.templateValidator.input;
    const outputSchema = api.templateValidator.output;

    describe('input', () => {
        it('accepts basic input', () => {
            assert.isNull(validate('template-validator.input.yaml', inputSchema).error);
        });

        it('fails', () => {
            assert.isOk(validate('template-validator.invalid-input.yaml', inputSchema).error);
        });
    });

    describe('output', () => {
        it('validates basic output', () => {
            assert.isNull(validate('template-validator.output.yaml', outputSchema).error);
        });

        it('validates basic output with errors', () => {
            assert.isNull(validate('template-validator.erroroutput.yaml', outputSchema).error);
        });
    });
});
