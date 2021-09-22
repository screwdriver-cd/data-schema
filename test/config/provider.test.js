'use strict';

const { assert } = require('chai');
const { config } = require('../..');
const { validate } = require('../helper');
const { provider } = config.provider;

describe('config provider', () => {
    describe('provider', () => {
        it('validates provider', () => {
            assert.isNull(validate('config.provider.yaml', provider).error);
        });
    });
});
