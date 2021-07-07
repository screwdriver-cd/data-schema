'use strict';

const { assert } = require('chai');
const { api } = require('../..');
const { validate } = require('../helper');

describe('api validator', () => {
    const inputSchema = api.templateValidator.input;
    const outputSchema = api.templateValidator.output;

    describe('input', () => {
        it('accepts basic input', () => {
            assert.isNull(validate('template-validator.input.yaml', inputSchema).error);
        });

        it('accepts input with namespace', () => {
            assert.isNull(validate('template-validator.inputWithNamespace.yaml', inputSchema).error);
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
