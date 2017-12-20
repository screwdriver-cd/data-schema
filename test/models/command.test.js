'use strict';

const assert = require('chai').assert;
const models = require('../../').models;
const validate = require('../helper').validate;

describe('model command', () => {
    describe('base', () => {
        it('validates the base', () => {
            assert.isNull(validate('command.yaml', models.command.base).error);
        });
    });

    describe('create', () => {
        it('validates the create', () => {
            assert.isNull(validate('command.create.yaml', models.command.create).error);
        });

        it('fails the create', () => {
            assert.isNotNull(validate('empty.yaml', models.command.create).error);
        });
    });

    describe('get', () => {
        it('validates the get', () => {
            assert.isNull(validate('command.get.yaml', models.command.get).error);
        });

        it('fails the get', () => {
            assert.isNotNull(validate('empty.yaml', models.command.get).error);
        });
    });
});
