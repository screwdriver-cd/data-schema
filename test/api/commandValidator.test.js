'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api command validator', () => {
    const inputSchema = api.commandValidator.input;
    const outputSchema = api.commandValidator.output;

    describe('input', () => {
        it('accepts basic input', () => {
            assert.isNull(validate('command-validator.input.yaml', inputSchema).error);
        });

        it('fails', () => {
            assert.isOk(validate('command-validator.invalid-input.yaml', inputSchema).error);
        });
    });

    describe('output', () => {
        it('validates basic output', () => {
            assert.isNull(validate('command-validator.output.yaml', outputSchema).error);
        });

        it('validates basic output with errors', () => {
            assert.isNull(validate('command-validator.erroroutput.yaml', outputSchema).error);
        });
    });
});
