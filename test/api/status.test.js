'use strict';

const { assert } = require('chai');
const { api } = require('../..');
const { validate } = require('../helper');

describe('api status', () => {
    it('status', () => {
        assert.isNull(validate('status.yaml', api.status).error);
    });
});

describe('api status', () => {
    it('status', () => {
        assert.isNull(validate('status-exhaustive.yaml', api.status).error);
    });
});
