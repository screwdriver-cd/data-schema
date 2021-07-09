'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');
const { parameters } = config.parameters;

describe('config parameters', () => {
    describe('parameters', () => {
        it('validates parameters', () => {
            assert.isNull(validate('config.parameters.yaml', parameters).error);
        });
    });
});
