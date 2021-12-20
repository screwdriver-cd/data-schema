'use strict';

const { assert } = require('chai');
const { api } = require('../..');
const { validate } = require('../helper');

describe('api stats', () => {
    it('stats', () => {
        assert.isNull(validate('stats.yaml', api.stats).error);
    });
});
