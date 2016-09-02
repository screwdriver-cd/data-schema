'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api auth', () => {
    it('token', () => {
        assert.isNull(validate('auth.token.yaml', api.auth.token).error);
    });

    it('crumb', () => {
        assert.isNull(validate('auth.crumb.yaml', api.auth.crumb).error);
    });

    it('key', () => {
        assert.isNull(validate('auth.key.yaml', api.auth.key).error);
    });
});
