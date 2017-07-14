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

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('templatetag.create.yaml', models.templateTag.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.templateTag.create).error);
        });
    });

    describe('remove', () => {
        it('validates the remove', () => {
            assert.isNull(validate('templatetag.remove.yaml', models.templateTag.remove).error);
        });

        it('fails the remove', () => {
            assert.isNotNull(validate('empty.yaml', models.templateTag.remove).error);
        });
    });
});
