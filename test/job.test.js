'use strict';
const assert = require('chai').assert;
const model = require('../index');
const validate = require('./helper').validate;

describe('job test', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('job.yaml', model.job.base).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('job.get.yaml', model.job.get).error);
        });

        it('fails the get for empty yaml', () => {
            assert.isNotNull(validate('empty.yaml', model.job.get).error);
        });
    });

    describe('update', () => {
        it('validates the update', () => {
            assert.isNull(validate('job.update.yaml', model.job.update).error);
        });

        it('fails the update', () => {
            assert.isNotNull(validate('empty.yaml', model.job.update).error);
        });
    });
});
