'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');

describe('config annotations', () => {
    describe('annotations', () => {
        it('validates safely', () => {
            assert.isNull(validate('config.annotations.yaml', config.annotations.annotations).error);
        });
    });
});
