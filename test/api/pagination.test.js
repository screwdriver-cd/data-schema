'use strict';

const assert = require('chai').assert;
const api = require('../../').api;
const validate = require('../helper').validate;

describe('api pagination', () => {
    describe('validates', () => {
        it('page and query', () => {
            assert.isNull(validate('pagination.yaml', api.pagination).error);
        });

        it('all keys', () => {
            assert.isNull(validate('paginationFull.yaml', api.pagination).error);
        });

        it('defaults', () => {
            const validatedObject = validate('pagination.defaults.yaml', api.pagination);

            assert.isNull(validatedObject.error);
            assert.equal(validatedObject.value.page, undefined);
            assert.equal(validatedObject.value.count, undefined);
            assert.equal(validatedObject.value.sort, 'descending');
        });
    });
});
