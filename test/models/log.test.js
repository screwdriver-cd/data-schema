'use strict';
const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model log', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('log.yaml', models.log.base).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('log.yaml', models.log.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.log.get).error);
        });
    });
});
