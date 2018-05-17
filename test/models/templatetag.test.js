'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model template tag', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('templatetag.yaml', models.templateTag.base).error);
        });

        it('validates the base with namespace', () => {
            assert.isNull(validate('templatetag.withNamespace.yaml',
                models.templateTag.base).error);
        });
    });
});
