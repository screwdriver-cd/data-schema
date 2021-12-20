'use strict';

const { assert } = require('chai');
const { api } = require('../..');
const { validate } = require('../helper');

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

    it('contexts', () => {
        assert.isNull(validate('auth.contexts.yaml', api.auth.contexts).error);
    });
});
