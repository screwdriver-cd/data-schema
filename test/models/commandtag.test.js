'use strict';

const { assert } = require('chai');
const { models } = require('../..');
const { validate } = require('../helper');

describe('model command tag', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('commandTag.yaml', models.commandTag.base).error);
        });
    });
});
