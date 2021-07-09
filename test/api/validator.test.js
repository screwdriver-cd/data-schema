'use strict';

const { assert } = require('chai');
const { api } = require('../..');
const { validate } = require('../helper');

describe('api validator', () => {
    describe('input', () => {
        it('accepts basic input', () => {
            assert.isNull(validate('validator.input.yaml', api.validator.input).error);
        });

        it('accepts input with requires keyword', () => {
            assert.isNull(validate('validator-with-requires.input.yaml', api.validator.input).error);
        });
    });

    describe('output', () => {
        it('validates basic output', () => {
            assert.isNull(validate('validator.output.yaml', api.validator.output).error);
        });

        it('validates output with requires keyword', () => {
            assert.isNull(validate('validator-with-requires.output.yaml', api.validator.output).error);
        });

        it('validates basic output with errors', () => {
            assert.isNull(validate('validator.erroroutput.yaml', api.validator.output).error);
        });

        it('validates basic output with warnings', () => {
            assert.isNull(validate('validator.warningsoutput.yaml', api.validator.output).error);
        });

        it('validates output with childPipelines', () => {
            assert.isNull(validate('validator-with-childPipelines.output.yaml', api.validator.output).error);
        });
    });
});
