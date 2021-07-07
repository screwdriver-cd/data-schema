'use strict';

const { assert } = require('chai');
const { api } = require('../..');
const { validate } = require('../helper');

describe('api versions', () => {
    it('versions', () => {
        assert.isNull(validate('versions.yaml', api.versions).error);
    });
});
