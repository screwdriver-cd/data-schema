'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api stats', () => {
    it('stats', () => {
        assert.isNull(validate('stats.yaml', api.stats).error);
    });
});
