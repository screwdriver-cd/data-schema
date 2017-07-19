'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model template tag', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('templatetag.yaml', models.templateTag.base).error);
        });
    });
});
