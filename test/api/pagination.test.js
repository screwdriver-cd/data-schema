'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api pagination', () => {
    describe('validates', () => {
        it('page and query', () => {
            assert.isNull(validate('pagination.yaml', api.pagination).error);
        });

        it('defaults both', () => {
            const validatedObject = validate('pagination.defaults.yaml', api.pagination);

            assert.isNull(validatedObject.error);
            assert.equal(validatedObject.value.page, 1);
            assert.equal(validatedObject.value.count, 50);
        });
    });
});
