'use strict';

const assert = require('chai').assert;
const config = require('../../').config;
const validate = require('../helper').validate;

describe('config annotations', () => {
    describe('annotations', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.annotations.yaml', config.annotations.annotations)
                .error);
        });
    });

    describe('annotations', () => {
        it('validates annotation docker', () => {
            assert.isNull(validate('config.annotations1.yaml', config.annotations.annotations)
                .error);
        });
    });
});
