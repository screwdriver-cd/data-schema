'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('banner create', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('banner.yaml', models.banner.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('banner.create.yaml', models.banner.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.banner.create).error);
        });
    });
});
