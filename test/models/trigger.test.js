'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model trigger', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('trigger.yaml', models.trigger.base).error);
        });
    });
});
