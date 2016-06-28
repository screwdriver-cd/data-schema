'use strict';
const assert = require('chai').assert;
const model = require('../index');
const validate = require('./helper').validate;

describe('pagination test', () => {
    describe('validates', () => {
        it('page and query', () => {
            assert.isNull(validate('pagination.yaml', model.pagination).error);
        });

        it('defaults both', () => {
            const validatedObject = validate('pagination.defaults.yaml', model.pagination);

            assert.isNull(validatedObject.error);
            assert.equal(validatedObject.value.page, 1);
            assert.equal(validatedObject.value.count, 50);
        });
    });
});
