'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api status', () => {
    it('status', () => {
        assert.isNull(validate('status.yaml', api.status).error);
    });
});
