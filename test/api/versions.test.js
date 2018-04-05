'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api versions', () => {
    it('versions', () => {
        assert.isNull(validate('versions.yaml', api.versions).error);
    });
});
