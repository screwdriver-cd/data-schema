'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model command tag', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('commandTag.yaml', models.commandTag.base).error);
        });
    });
});
